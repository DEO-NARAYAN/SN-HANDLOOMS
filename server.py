"""
Sabnam Handlooms & Arts — Backend Server & Admin API
Secure, Database-Free Persistent File Storage (data/products.json)
"""

import sys
import os
import re

# Configure utf-8 stdout for Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
import json
import time
import uuid
import hmac
import hashlib
import secrets
from pathlib import Path
from datetime import datetime, timezone
from functools import wraps

from flask import (
    Flask, request, jsonify, session, send_from_directory,
    render_template_string, redirect, url_for, abort
)
from werkzeug.utils import secure_filename
from PIL import Image

# ─── Load Environment Variables manually (zero dependency) ───────
def load_env():
    env_path = Path(__file__).resolve().parent / '.env'
    if env_path.is_file():
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ.setdefault(k.strip(), v.strip())

load_env()

# ─── Configuration ───────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / 'data'
UPLOADS_DIR = BASE_DIR / 'uploads'
IMAGES_DIR = BASE_DIR / 'images'
ADMIN_DIR = BASE_DIR / 'admin'
PRODUCTS_FILE = DATA_DIR / 'products.json'

# Serverless / Read-only filesystem support
IS_VERCEL = bool(os.environ.get('VERCEL'))
TMP_DATA_DIR = Path('/tmp/sabnam_data') if IS_VERCEL else DATA_DIR
TMP_PRODUCTS_FILE = TMP_DATA_DIR / 'products.json'

try:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    ADMIN_DIR.mkdir(parents=True, exist_ok=True)
    if IS_VERCEL:
        TMP_DATA_DIR.mkdir(parents=True, exist_ok=True)
except Exception:
    pass

ADMIN_ID = os.environ.get('ADMIN_ID', 'Sabnam@AVM1')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'Sabnam@Handloom')
SESSION_SECRET = os.environ.get('SESSION_SECRET', secrets.token_hex(32))
PORT = int(os.environ.get('PORT', 5000))
HOST = os.environ.get('HOST', '0.0.0.0')

# Hash the admin password with salt for secure verification
def hash_password(password: str, salt: bytes = None) -> str:
    if salt is None:
        salt = secrets.token_bytes(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100_000)
    return f"{salt.hex()}${key.hex()}"

def verify_password(stored_hash: str, provided_password: str) -> bool:
    try:
        salt_hex, key_hex = stored_hash.split('$')
        salt = bytes.fromhex(salt_hex)
        expected_key = bytes.fromhex(key_hex)
        key = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), salt, 100_000)
        return hmac.compare_digest(key, expected_key)
    except Exception:
        return False

# Initialize Admin password hash in memory
STORED_ADMIN_HASH = hash_password(ADMIN_PASSWORD)

# ─── Flask App Initialization ────────────────────────────────────
app = Flask(__name__, static_folder=None)
app.config['SECRET_KEY'] = SESSION_SECRET
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True when using HTTPS in production
app.config['PERMANENT_SESSION_LIFETIME'] = 86400 * 7  # 7 days
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB limit for uploads

# Rate limiting dictionary for login protection: { ip: [timestamp1, timestamp2, ...] }
LOGIN_ATTEMPTS = {}
MAX_FAILED_ATTEMPTS = 6
LOCKOUT_PERIOD = 300  # 5 minutes

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}

# ─── Atomic File Storage Operations ──────────────────────────────
def read_products():
    """Reads all products safely from writable /tmp or static data/products.json."""
    target = TMP_PRODUCTS_FILE if (IS_VERCEL and TMP_PRODUCTS_FILE.is_file()) else PRODUCTS_FILE
    if not target.is_file():
        target = PRODUCTS_FILE
    if not target.is_file():
        return []
    try:
        with open(target, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
            return []
    except Exception as e:
        print(f"[ERROR] Failed to read products: {e}")
        return []

def write_products(products_list):
    """Atomically writes products list."""
    save_dir = TMP_DATA_DIR if IS_VERCEL else DATA_DIR
    target_file = TMP_PRODUCTS_FILE if IS_VERCEL else PRODUCTS_FILE
    try:
        save_dir.mkdir(parents=True, exist_ok=True)
    except Exception:
        pass
    temp_file = save_dir / f"products_temp_{uuid.uuid4().hex}.json"
    try:
        with open(temp_file, 'w', encoding='utf-8') as f:
            json.dump(products_list, f, indent=2, ensure_ascii=False)
        temp_file.replace(target_file)
        return True
    except Exception as e:
        print(f"[ERROR] Failed to write products atomically: {e}")
        if temp_file.is_file():
            try:
                temp_file.unlink()
            except Exception:
                pass
        return False

# ─── Auth Middleware ─────────────────────────────────────────────
def require_admin(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_authenticated'):
            return jsonify({'error': 'Unauthorized. Please log in as admin.'}), 401
        return f(*args, **kwargs)
    return decorated_function

# ─── Public API Endpoints ─────────────────────────────────────────
@app.route('/api/products', methods=['GET'])
def get_public_products():
    """Returns all active/enabled products sorted by displayOrder for the public storefront."""
    products = read_products()
    # Filter only available/enabled products
    active_products = [p for p in products if p.get('available', True) is not False]
    active_products.sort(key=lambda x: (x.get('displayOrder', 999), x.get('id', '')))
    return jsonify({
        'success': True,
        'count': len(active_products),
        'products': active_products
    })

@app.route('/api/products/<product_id>', methods=['GET'])
def get_single_product(product_id):
    """Returns a single product by ID."""
    products = read_products()
    product = next((p for p in products if str(p.get('id')) == str(product_id)), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify({'success': True, 'product': product})

# ─── Admin Authentication API ─────────────────────────────────────
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    """Handles admin authentication with rate-limiting and session creation."""
    client_ip = request.remote_addr or 'unknown'
    now = time.time()
    
    # Check rate limit
    attempts = LOGIN_ATTEMPTS.get(client_ip, [])
    attempts = [t for t in attempts if now - t < LOCKOUT_PERIOD]
    LOGIN_ATTEMPTS[client_ip] = attempts
    
    if len(attempts) >= MAX_FAILED_ATTEMPTS:
        wait_seconds = int(LOCKOUT_PERIOD - (now - attempts[0]))
        return jsonify({
            'error': f'Too many failed attempts. Please try again in {wait_seconds} seconds.'
        }), 429

    data = request.get_json() or {}
    user_id = str(data.get('id', '')).strip()
    password = str(data.get('password', '')).strip()

    if not user_id or not password:
        return jsonify({'error': 'Both ID/Username and Password are required.'}), 400

    # Verify ID and Password robustly
    expected_id = ADMIN_ID.strip()
    expected_pass = ADMIN_PASSWORD.strip()

    valid_id = (user_id.lower() == expected_id.lower())
    valid_pass = (
        (password == expected_pass) or 
        verify_password(STORED_ADMIN_HASH, password) or 
        (password.lower() == expected_pass.lower())
    )

    if valid_id and valid_pass:
        session.clear()
        session['admin_authenticated'] = True
        session['admin_user'] = ADMIN_ID
        session['logged_in_at'] = datetime.now(timezone.utc).isoformat()
        session.permanent = True
        # Reset rate limiting
        LOGIN_ATTEMPTS.pop(client_ip, None)
        return jsonify({
            'success': True,
            'message': 'Login successful.',
            'user': ADMIN_ID
        })
    else:
        # Record failed attempt
        attempts.append(now)
        LOGIN_ATTEMPTS[client_ip] = attempts
        return jsonify({'error': 'Invalid Admin ID or Password. (ID: Sabnam@AVM1)'}), 401

@app.route('/api/admin/logout', methods=['POST'])
def admin_logout():
    """Logs out the admin and clears session."""
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out successfully.'})

@app.route('/api/admin/check-auth', methods=['GET'])
def admin_check_auth():
    """Checks if current session is authenticated as admin."""
    if session.get('admin_authenticated'):
        return jsonify({
            'authenticated': True,
            'user': session.get('admin_user', ADMIN_ID),
            'loggedInAt': session.get('logged_in_at')
        })
    return jsonify({'authenticated': False}), 401

# ─── Protected Admin Product Management API ───────────────────────
@app.route('/api/admin/products', methods=['GET'])
@require_admin
def admin_get_all_products():
    """Returns all products (including disabled) with statistics."""
    products = read_products()
    products.sort(key=lambda x: (x.get('displayOrder', 999), x.get('id', '')))
    
    total = len(products)
    active = sum(1 for p in products if p.get('available', True))
    disabled = total - active
    featured = sum(1 for p in products if p.get('featured', False))
    in_stock = sum(1 for p in products if p.get('stock', 'in_stock') == 'in_stock')
    custom_only = sum(1 for p in products if p.get('stock') == 'custom_only')
    out_of_stock = sum(1 for p in products if p.get('stock') == 'out_of_stock')

    return jsonify({
        'success': True,
        'stats': {
            'total': total,
            'active': active,
            'disabled': disabled,
            'featured': featured,
            'inStock': in_stock,
            'customOnly': custom_only,
            'outOfStock': out_of_stock
        },
        'products': products
    })

@app.route('/api/admin/products', methods=['POST'])
@require_admin
def admin_create_product():
    """Creates a new product with full server-side validation."""
    data = request.get_json() or {}
    
    name = str(data.get('name', '')).strip()
    if not name:
        return jsonify({'error': 'Product name is required.'}), 400

    category = str(data.get('category', 'Crochet')).strip() or 'Crochet'
    desc = str(data.get('desc', '')).strip()
    tagline = str(data.get('tagline', 'handmade with love ♡')).strip() or 'handmade with love ♡'
    badge = str(data.get('badge', '')).strip()
    
    # Parse & validate price
    price_val = data.get('priceRaw') or data.get('price')
    try:
        # Extract digits if string like ₹850
        if isinstance(price_val, str):
            clean_str = re.sub(r'[^\d.]', '', price_val)
            price_num = float(clean_str) if clean_str else 0.0
        else:
            price_num = float(price_val)
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid price format. Price must be a valid number.'}), 400

    if price_num < 0:
        return jsonify({'error': 'Price cannot be negative.'}), 400

    # Format price string
    is_custom_plus = '+' in str(data.get('price', ''))
    price_str = f"₹{int(price_num) if price_num.is_integer() else price_num}"
    if is_custom_plus or data.get('isCustomPrice'):
        price_str += "+"

    # Image handling
    image = str(data.get('image', '')).strip()
    if not image:
        image = 'images/hero_products_collage.jpg'
    
    images_list = data.get('images')
    if not isinstance(images_list, list) or not images_list:
        images_list = [image]

    # Flags
    available = bool(data.get('available', True))
    featured = bool(data.get('featured', False))
    stock = str(data.get('stock', 'in_stock')).strip().lower()
    if stock not in {'in_stock', 'out_of_stock', 'custom_only', 'pre_order'}:
        stock = 'in_stock'

    # Display Order
    products = read_products()
    try:
        display_order = int(data.get('displayOrder', len(products) + 1))
    except (ValueError, TypeError):
        display_order = len(products) + 1

    # Generate Unique ID
    new_id = f"prod-{int(time.time())}-{secrets.token_hex(2)}"

    now_iso = datetime.now(timezone.utc).isoformat()
    new_product = {
        'id': new_id,
        'name': name,
        'category': category,
        'price': price_str,
        'priceRaw': price_num,
        'badge': badge,
        'tagline': tagline,
        'desc': desc,
        'image': image,
        'images': images_list,
        'available': available,
        'stock': stock,
        'featured': featured,
        'displayOrder': display_order,
        'createdAt': now_iso,
        'updatedAt': now_iso
    }

    products.append(new_product)
    if write_products(products):
        return jsonify({'success': True, 'message': 'Product created successfully!', 'product': new_product}), 201
    return jsonify({'error': 'Failed to save product to persistent storage.'}), 500

@app.route('/api/admin/products/<product_id>', methods=['PUT'])
@require_admin
def admin_update_product(product_id):
    """Updates an existing product by ID."""
    data = request.get_json() or {}
    products = read_products()
    
    idx = next((i for i, p in enumerate(products) if str(p.get('id')) == str(product_id)), -1)
    if idx == -1:
        return jsonify({'error': 'Product not found.'}), 404

    prod = products[idx]

    # Name
    if 'name' in data:
        name = str(data['name']).strip()
        if not name:
            return jsonify({'error': 'Product name cannot be empty.'}), 400
        prod['name'] = name

    # Category
    if 'category' in data:
        prod['category'] = str(data['category']).strip() or 'Crochet'

    # Description & Tagline & Badge
    if 'desc' in data:
        prod['desc'] = str(data['desc']).strip()
    if 'tagline' in data:
        prod['tagline'] = str(data['tagline']).strip()
    if 'badge' in data:
        prod['badge'] = str(data['badge']).strip()

    # Price
    if 'price' in data or 'priceRaw' in data:
        price_val = data.get('priceRaw') if 'priceRaw' in data else data.get('price')
        try:
            if isinstance(price_val, str):
                clean_str = re.sub(r'[^\d.]', '', price_val)
                price_num = float(clean_str) if clean_str else prod.get('priceRaw', 0.0)
            else:
                price_num = float(price_val)
            
            if price_num < 0:
                return jsonify({'error': 'Price cannot be negative.'}), 400

            is_custom_plus = '+' in str(data.get('price', ''))
            price_str = f"₹{int(price_num) if price_num.is_integer() else price_num}"
            if is_custom_plus:
                price_str += "+"
            
            prod['priceRaw'] = price_num
            prod['price'] = price_str
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid price format.'}), 400

    # Image
    if 'image' in data and str(data['image']).strip():
        prod['image'] = str(data['image']).strip()
    if 'images' in data and isinstance(data['images'], list) and data['images']:
        prod['images'] = data['images']

    # Toggles & stock
    if 'available' in data:
        prod['available'] = bool(data['available'])
    if 'featured' in data:
        prod['featured'] = bool(data['featured'])
    if 'stock' in data:
        stock = str(data['stock']).strip().lower()
        if stock in {'in_stock', 'out_of_stock', 'custom_only', 'pre_order'}:
            prod['stock'] = stock
    if 'displayOrder' in data:
        try:
            prod['displayOrder'] = int(data['displayOrder'])
        except (ValueError, TypeError):
            pass

    prod['updatedAt'] = datetime.now(timezone.utc).isoformat()
    products[idx] = prod

    if write_products(products):
        return jsonify({'success': True, 'message': 'Product updated successfully!', 'product': prod})
    return jsonify({'error': 'Failed to save product changes.'}), 500

@app.route('/api/admin/products/<product_id>', methods=['DELETE'])
@require_admin
def admin_delete_product(product_id):
    """Deletes a product by ID."""
    products = read_products()
    idx = next((i for i, p in enumerate(products) if str(p.get('id')) == str(product_id)), -1)
    if idx == -1:
        return jsonify({'error': 'Product not found.'}), 404

    deleted = products.pop(idx)
    
    # Safe cleanup of uploaded image if it exists in uploads/ and is not used by other products
    img_path = deleted.get('image', '')
    if img_path.startswith('/uploads/') or img_path.startswith('uploads/'):
        rel_name = img_path.replace('/uploads/', '').replace('uploads/', '')
        target_file = UPLOADS_DIR / secure_filename(rel_name)
        
        # Check if other products reference the same image
        other_uses = any(
            p.get('image', '').endswith(rel_name) or
            any(im.endswith(rel_name) for im in p.get('images', []))
            for p in products
        )
        if not other_uses and target_file.is_file():
            try:
                target_file.unlink()
            except Exception as e:
                print(f"[WARN] Could not remove deleted product image: {e}")

    if write_products(products):
        return jsonify({'success': True, 'message': f"Product '{deleted.get('name')}' deleted successfully."})
    return jsonify({'error': 'Failed to delete product from storage.'}), 500

@app.route('/api/admin/toggle-status/<product_id>', methods=['POST'])
@require_admin
def admin_toggle_status(product_id):
    """Quick toggle product availability on/off."""
    products = read_products()
    idx = next((i for i, p in enumerate(products) if str(p.get('id')) == str(product_id)), -1)
    if idx == -1:
        return jsonify({'error': 'Product not found.'}), 404

    products[idx]['available'] = not products[idx].get('available', True)
    products[idx]['updatedAt'] = datetime.now(timezone.utc).isoformat()

    if write_products(products):
        return jsonify({
            'success': True,
            'available': products[idx]['available'],
            'message': f"Product is now {'Active' if products[idx]['available'] else 'Disabled'}."
        })
    return jsonify({'error': 'Failed to update status.'}), 500

@app.route('/api/admin/reorder', methods=['POST'])
@require_admin
def admin_reorder_products():
    """Bulk update display order of products."""
    data = request.get_json() or {}
    order_map = data.get('orderMap')  # { 'prod-1': 1, 'prod-2': 2, ... }
    
    if not isinstance(order_map, dict):
        return jsonify({'error': 'Invalid order map provided.'}), 400

    products = read_products()
    for prod in products:
        pid = str(prod.get('id'))
        if pid in order_map:
            try:
                prod['displayOrder'] = int(order_map[pid])
            except (ValueError, TypeError):
                pass
    
    # Sort by new displayOrder
    products.sort(key=lambda x: (x.get('displayOrder', 999), x.get('id', '')))

    if write_products(products):
        return jsonify({'success': True, 'message': 'Display order updated successfully!'})
    return jsonify({'error': 'Failed to save new order.'}), 500

# ─── Secure Image Upload API ──────────────────────────────────────
@app.route('/api/admin/upload', methods=['POST'])
@require_admin
def admin_upload_image():
    """Handles secure image uploads with extension check, size check, and PIL verification."""
    if 'image' not in request.files:
        return jsonify({'error': 'No image file uploaded.'}), 400

    file = request.files['image']
    if not file or file.filename == '':
        return jsonify({'error': 'Empty filename.'}), 400

    orig_name = secure_filename(file.filename)
    ext = Path(orig_name).suffix.lower()

    if ext not in ALLOWED_EXTENSIONS:
        return jsonify({'error': f'Unsupported file type: {ext}. Allowed: JPG, PNG, WEBP, GIF.'}), 400

    # Generate safe unique filename
    unique_name = f"upload_{int(time.time())}_{secrets.token_hex(4)}{ext}"
    dest_path = UPLOADS_DIR / unique_name

    # Save to disk
    file.save(dest_path)

    # Validate image integrity with Pillow to prevent polyglot / script upload attacks
    try:
        with Image.open(dest_path) as img:
            img.verify()
    except Exception as e:
        if dest_path.is_file():
            dest_path.unlink()
        return jsonify({'error': 'Invalid image file. File verification failed.'}), 400

    url_path = f"/uploads/{unique_name}"
    return jsonify({
        'success': True,
        'message': 'Image uploaded successfully!',
        'url': url_path,
        'filename': unique_name
    }), 201

# ─── Static File & View Serving ──────────────────────────────────
@app.route('/')
def serve_public_home():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/index.html')
def serve_index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/styles.css')
def serve_styles():
    return send_from_directory(BASE_DIR, 'styles.css')

@app.route('/script.js')
def serve_script():
    return send_from_directory(BASE_DIR, 'script.js')

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(IMAGES_DIR, filename)

@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(UPLOADS_DIR, filename)

# Admin routing
@app.route('/admin')
@app.route('/admin/')
def serve_admin():
    return send_from_directory(ADMIN_DIR, 'index.html')

@app.route('/admin/<path:filename>')
def serve_admin_assets(filename):
    return send_from_directory(ADMIN_DIR, filename)

@app.route('/admin.css')
def serve_root_admin_css():
    return send_from_directory(ADMIN_DIR, 'admin.css')

@app.route('/admin.js')
def serve_root_admin_js():
    return send_from_directory(ADMIN_DIR, 'admin.js')

# ─── Application Startup ──────────────────────────────────────────
if __name__ == '__main__':
    print("=" * 60)
    print(" [SERVER] Sabnam Handlooms & Arts Server Starting...")
    print(f" [URL] Public Storefront: http://localhost:{PORT}")
    print(f" [URL] Admin Panel:       http://localhost:{PORT}/admin")
    print(f" [AUTH] Admin ID:         {ADMIN_ID}")
    print(f" [DATA] Products Storage: {PRODUCTS_FILE}")
    print(f" [UPLOADS] Uploads Dir:   {UPLOADS_DIR}")
    print("=" * 60)
    app.run(host=HOST, port=PORT, debug=False)
