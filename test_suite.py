"""
Automated Verification Suite for Sabnam Handlooms & Arts Admin System
Runs all tests against Flask test client directly.
"""

import sys
import os
import io
import json
from PIL import Image

# Ensure utf-8 output encoding for windows console
sys.stdout.reconfigure(encoding='utf-8')

# Import the server application
from server import app, read_products, write_products

def run_tests():
    print("=" * 60)
    print("[TEST] Running Sabnam Handlooms Admin & API Test Suite")
    print("=" * 60)

    client = app.test_client()
    passed = 0
    total = 0

    def assert_test(name, condition, details=""):
        nonlocal passed, total
        total += 1
        if condition:
            passed += 1
            print(f"  ✅ [PASS] {name}")
        else:
            print(f"  ❌ [FAIL] {name} - {details}")

    # 1. Public API check
    res = client.get('/api/products')
    data = res.get_json()
    assert_test("Public GET /api/products returns 200", res.status_code == 200)
    assert_test("Public products list is non-empty", len(data.get('products', [])) >= 25)

    # 2. Unauthenticated Admin API check
    res = client.get('/api/admin/products')
    assert_test("Unauthenticated GET /api/admin/products is rejected (401)", res.status_code == 401)

    res = client.post('/api/admin/products', json={"name": "Hacked"})
    assert_test("Unauthenticated POST /api/admin/products is rejected (401)", res.status_code == 401)

    # 3. Failed Login Check
    res = client.post('/api/admin/login', json={"id": "WrongUser", "password": "WrongPassword"})
    assert_test("Invalid credentials rejected (401)", res.status_code == 401)

    # 4. Successful Admin Login
    res = client.post('/api/admin/login', json={"id": "Sabnam@AVM1", "password": "Sabnam@Handloom"})
    assert_test("Valid Admin login succeeds (200)", res.status_code == 200)

    # 5. Check Auth endpoint
    res = client.get('/api/admin/check-auth')
    assert_test("Authenticated GET /api/admin/check-auth returns 200", res.status_code == 200)
    auth_data = res.get_json()
    assert_test("User verified as Sabnam@AVM1", auth_data.get('user') == "Sabnam@AVM1")

    # 6. Admin Get All Products
    res = client.get('/api/admin/products')
    assert_test("Authenticated GET /api/admin/products returns 200", res.status_code == 200)
    admin_data = res.get_json()
    assert_test("Stats dictionary included in response", 'stats' in admin_data)

    # 7. Admin Create Product
    new_prod_payload = {
        "name": "Test Lavender Bow Scrunchie 🎀",
        "category": "Hair Accessories",
        "price": "₹199",
        "priceRaw": 199,
        "stock": "in_stock",
        "badge": "new release ♡",
        "tagline": "aesthetic purple vibes",
        "desc": "A soft handmade purple scrunchie with satin ribbon bow.",
        "image": "images/hero_products_collage.jpg",
        "available": True,
        "featured": True,
        "displayOrder": 99
    }
    res = client.post('/api/admin/products', json=new_prod_payload)
    assert_test("Admin POST /api/admin/products creates product (201)", res.status_code == 201)
    created_prod = res.get_json().get('product', {})
    created_id = created_prod.get('id')
    assert_test("Created product has valid generated ID", bool(created_id))

    # Verify persistent storage updated
    stored_products = read_products()
    found = any(p.get('id') == created_id for p in stored_products)
    assert_test("New product persists in data/products.json", found)

    # 8. Admin Update Product (Price & Name Change)
    update_payload = {
        "name": "Updated Lavender Bow Scrunchie ✨",
        "price": "₹249",
        "priceRaw": 249,
        "desc": "Updated description with extra fluffy yarn."
    }
    res = client.put(f'/api/admin/products/{created_id}', json=update_payload)
    assert_test("Admin PUT /api/admin/products/<id> updates product (200)", res.status_code == 200)
    updated_prod = res.get_json().get('product', {})
    assert_test("Updated price is ₹249", updated_prod.get('price') == "₹249")
    assert_test("Updated name is correct", updated_prod.get('name') == "Updated Lavender Bow Scrunchie ✨")

    # 9. Toggle Availability Status
    res = client.post(f'/api/admin/toggle-status/{created_id}')
    assert_test("Admin toggle status succeeds (200)", res.status_code == 200)
    assert_test("Product is now disabled (available=False)", res.get_json().get('available') is False)

    # Verify disabled product is hidden from public API
    res = client.get('/api/products')
    public_prods = res.get_json().get('products', [])
    assert_test("Disabled product is excluded from public storefront", not any(p.get('id') == created_id for p in public_prods))

    # Toggle back to active
    res = client.post(f'/api/admin/toggle-status/{created_id}')
    assert_test("Product toggled back to active", res.get_json().get('available') is True)

    # 10. Image Upload Testing
    # Create test image in memory
    img_byte_arr = io.BytesIO()
    test_img = Image.new('RGB', (100, 100), color='pink')
    test_img.save(img_byte_arr, format='JPEG')
    img_byte_arr.seek(0)

    res = client.post('/api/admin/upload', data={
        'image': (img_byte_arr, 'test_sample.jpg')
    }, content_type='multipart/form-data')
    assert_test("Valid image upload returns 201", res.status_code == 201)
    upload_url = res.get_json().get('url')
    assert_test("Upload URL path returned (/uploads/...)", upload_url and upload_url.startswith('/uploads/'))

    # Test invalid file rejection (executable / text payload)
    bad_file = io.BytesIO(b"malicious script payload")
    res = client.post('/api/admin/upload', data={
        'image': (bad_file, 'test.exe')
    }, content_type='multipart/form-data')
    assert_test("Invalid file extension rejected (400)", res.status_code == 400)

    # 11. Delete Product
    res = client.delete(f'/api/admin/products/{created_id}')
    assert_test("Admin DELETE /api/admin/products/<id> succeeds (200)", res.status_code == 200)
    stored_products = read_products()
    assert_test("Deleted product removed from data/products.json", not any(p.get('id') == created_id for p in stored_products))

    # 12. Logout Testing
    res = client.post('/api/admin/logout')
    assert_test("Admin logout succeeds (200)", res.status_code == 200)
    res = client.get('/api/admin/products')
    assert_test("Session invalidated after logout (401)", res.status_code == 401)

    print("-" * 60)
    print(f"🎯 Test Results: {passed}/{total} tests PASSED ({int((passed/total)*100)}%)")
    print("=" * 60)

if __name__ == '__main__':
    run_tests()
