/* ═══════════════════════════════════════════════════════════════
   Sabnam Handlooms & Arts — script.js
   Cozy Whimsical Studio · Gen-Z Aesthetic
   All vanilla JavaScript — no dependencies required
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── PRODUCT DATA ─────────────────────────────────────────────── */
const PRODUCTS = {
  1: {
    name:     'Burgundy Crochet Tote',
    category: 'Bags',
    price:    '₹850',
    badge:    'bestseller ♡',
    img:      'images/product_tote_garden.jpg',
    imgAlt:   'Burgundy crochet tote bag with cream bow worn by model in garden',
    desc:     'Handcrafted burgundy crochet tote with an elegant cream bow detail. Sturdy, spacious & so dreamy. Styled in our blooming garden collection ♡ Made to last.',
  },
  2: {
    name:     'Watermelon Keychain 🍉',
    category: 'Keychains',
    price:    '₹180',
    badge:    'tiny joy ✦',
    img:      'images/product_watermelon_hand.jpg',
    imgAlt:   'Crochet watermelon keychain Viva la Vida in hand',
    desc:     'Fresh as summer sunshine! A handcrafted crochet watermelon slice keychain. Carry happiness wherever you go 🍉 Makes the cutest bag charm or gift for your bestie.',
  },
  3: {
    name:     'Pink Bow Hair Clips 🎀',
    category: 'Hair Accessories',
    price:    '₹220',
    badge:    'fan fav ♡',
    img:      'images/product_pink_bow_real.jpg',
    imgAlt:   'Pink crochet bow hair clips in two sizes on wooden table',
    desc:     'The cutest pink crochet bow hair clips! Available in two sizes — big statement bow or teeny tiny bow. Bows fix everything ♡ Perfect for everyday styling or gifting.',
  },
  4: {
    name:     'Floral Braid Parandi 🌸',
    category: 'Hair Accessories',
    price:    '₹380',
    badge:    'dreamy girl era ✦',
    img:      'images/product_floral_braid.jpg',
    imgAlt:   'Handmade crochet flower braid parandi accessory for long hair',
    desc:     'A dreamy cascading floral crochet braid accessory with delicate red & white blossoms and tassel finish 🌸 "Little moments, big memories." Makes traditional & modern hairstyles turn heads!',
  },
  5: {
    name:     'Mini Luffy Straw Hat ⚡',
    category: 'Anime',
    price:    '₹250',
    badge:    'anime collab ✦',
    img:      'images/product_luffy_doodles.jpg',
    imgAlt:   'Mini Luffy straw hat keychain with positive aesthetic doodle notes',
    desc:     'The iconic straw hat of the future King of the Pirates! "Tiny hat, big love 🏴‍☠️ Small things bring big happiness." The ultimate anime collectible.',
  },
  6: {
    name:     'Sunflower Desk Pot 🌻',
    category: 'Decor',
    price:    '₹320',
    badge:    'desk bestie ✦',
    img:      'images/product_sunflower_square.jpg',
    imgAlt:   'Crochet sunflower pot with mini hats and watermelon flatlay',
    desc:     'A vibrant handmade crochet sunflower sitting in a cozy pot! Spreads warm sunshine energy to your study table, work desk or bookshelf 🌻 Grow at your own pace.',
  },
  7: {
    name:     'Rose Bouquet Embroidery 🪡',
    category: 'Embroidery',
    price:    '₹450+',
    badge:    'custom ♡',
    img:      'images/product_embroidery_roses.jpg',
    imgAlt:   'Handcrafted floral embroidery hoop with satin ribbon and pearls',
    desc:     'Exquisite dimensional bullion rose embroidery framed in a wooden hoop with satin ribbons & genuine pearl bead accents 🪡 Custom lettering, dates & patterns available on request!',
  },
  8: {
    name:     'Chopper Hat 🐾',
    category: 'Anime',
    price:    '₹200',
    badge:    'One Piece ✦',
    img:      'images/product_chopper_hat.jpg',
    imgAlt:   'Tony Tony Chopper pink hat crochet',
    desc:     'Adorable pink hat inspired by everyone\'s favourite doctor reindeer, Tony Tony Chopper! Wear your anime love proudly 🦌 Each piece is handcrafted with love.',
  },
  9: {
    name:     'Rose Pearl Keychain 🌹',
    category: 'Keychains',
    price:    '₹280',
    badge:    'new arrival 🌹',
    img:      'images/product_rose_keychain.jpg',
    imgAlt:   'Crochet red rose pearl keychain with satin bow',
    desc:     'Delicate crocheted red rose buds paired with pearl bead loops and a satin bow — the most romantic keychain you will ever own 🌹 Makes the perfect gift for someone special!',
  },
  10: {
    name:     'Burgundy Crochet Tote 🎀',
    category: 'Bags',
    price:    '₹650',
    badge:    'bestseller ✦',
    img:      'images/product_tote_model.jpg',
    imgAlt:   'Burgundy crochet tote bag with cream bow worn by model',
    desc:     'A gorgeous burgundy crochet tote with a cream bow charm — styled to perfection. Handcrafted, structured, and absolutely stunning as a daily carry or a gift ♡',
  },
  11: {
    name:     'Nikkah Keepsake Mirror 💍',
    category: 'Embroidery',
    price:    '₹750+',
    badge:    'custom heirloom ✦',
    img:      'images/product_nikkah_plate.jpg',
    imgAlt:   'Personalized heart mirror wedding & Nikkah keepsake frame with red roses and pearls',
    desc:     'Luxury personalized velvet & heart mirror keepsake board inscribed with "And We Created You in Pairs", couple names, and Nikkah date. Embellished with handmade satin roses & pearl bead border 💍',
  },
  12: {
    name:     'Crochet Floral Bandana 🌿',
    category: 'Hair Accessories',
    price:    '₹340',
    badge:    'cottagecore ✦',
    img:      'images/product_bandanas_collage.jpg',
    imgAlt:   'Handmade crochet bandana kerchief hair accessories in multiple colors',
    desc:     'Aesthetic handcrafted crochet hair kerchiefs & bandanas! Available in daisy granny squares, sage mesh, lavender scallop, and sunflower patterns. The ultimate cottagecore statement 🌿',
  },
  13: {
    name:     'Pink Tulip Bell Keychain 🌷',
    category: 'Keychains',
    price:    '₹240',
    badge:    'spring vibes ♡',
    img:      'images/product_pink_tulips.jpg',
    imgAlt:   'Handmade pink crochet tulip bell flower bag charm on backpack',
    desc:     'Sweet double pink crochet tulip bell charms with leafy green stems! Looks adorable hanging on backpacks, handbags, or car mirrors 🌷 Handcrafted stitch by stitch.',
  },
  14: {
    name:     'Lippan Mirror Wall Art 🎨',
    category: 'Decor',
    price:    '₹590+',
    badge:    'traditional art ✦',
    img:      'images/product_lippan_art.jpg',
    imgAlt:   'Vibrant handcrafted Indian Lippan mud and mirror art wall decor plate',
    desc:     'Intricately crafted colorful Lippan mirror art on circular wooden base. Traditional clay relief work adorned with sparkling glass mirrors in joyful festive hues 🎨 Ready to hang.',
  },
  15: {
    name:     'Crochet Daisy Brooch 🌼',
    category: 'Decor',
    price:    '₹150',
    badge:    'handmade joy ♡',
    img:      'images/product_daisy_flower.jpg',
    imgAlt:   'Handcrafted white and yellow crochet daisy flower motif brooch',
    desc:     'Cheerful sunny daisy flower handcrafted in plush cotton yarn. Wear as a brooch, pin to your tote bag, or use as an applique to customize your favorite jackets and tops 🌼',
  },
  16: {
    name:     'Floral Crochet Phone Case 📱',
    category: 'Decor',
    price:    '₹360',
    badge:    'cozy tech ♡',
    img:      'images/product_phone_case.jpg',
    imgAlt:   'Navy blue crochet phone case cover with white flowers and pearl center',
    desc:     'Keep your phone cozy & scratch-free! Handcrafted in rich navy blue textured yarn with scalloped camera cutout border, white 3D floral appliques with pearl beads, and a sweet bow accent 📱',
  },
  17: {
    name:     'Holding Hands Embroidery 🪡',
    category: 'Embroidery',
    price:    '₹490+',
    badge:    'sentimental ♡',
    img:      'images/product_hands_embroidery.jpg',
    imgAlt:   'Fine hand embroidery on pink linen of holding hands with Arabic calligraphy',
    desc:     'Emotional, timeless minimalist line art embroidery of holding hands with wheat sprigs and Arabic calligraphy on soft pink linen 🪡 Personalized with dates and custom names upon request.',
  },
  18: {
    name:     'Purple Tulip Bell Keychain 💜',
    category: 'Keychains',
    price:    '₹240',
    badge:    'aesthetic charm ✦',
    img:      'images/product_purple_tulips.jpg',
    imgAlt:   'Handmade purple crochet tulip bell flower bag charm on backpack',
    desc:     'Vibrant lavender-purple crochet tulip bell flowers on a green leafy branch! Pairs with bags, keyrings, and backpacks for an instant pop of handcrafted charm 💜',
  },
  19: {
    name:     'Holy Kaaba Embroidery Hoop 🕋',
    category: 'Embroidery',
    price:    '₹850+',
    badge:    'spiritual heirloom ✦',
    img:      'images/product_kaaba_embroidery.jpg',
    imgAlt:   'Holy Kaaba hand embroidery hoop art with MashaAllah Alhamdulillah calligraphy and pearl border',
    desc:     'Breathtaking hand-embroidered Holy Kaaba masterpiece with gold Kiswa detail, "MashaAllah" & "Alhamdulillah" calligraphy, framed in pearls with a satin bow 🕋 A treasured Islamic heirloom.',
  },
  20: {
    name:     'Red Cherry Charm 🍒',
    category: 'Keychains',
    price:    '₹220',
    badge:    'juicy cute ♡',
    img:      'images/product_cherry_charm.jpg',
    imgAlt:   'Handmade red crochet cherries bag charm on green backpack',
    desc:     'Sweet double red crochet cherries with twin green leaves! A playful and cute statement piece to hang from your backpack, handbag, or keys 🍒 Handcrafted with love.',
  },
  21: {
    name:     'Rose Spiral Hair Clip 🌹',
    category: 'Hair Accessories',
    price:    '₹260',
    badge:    'romantic flair ✦',
    img:      'images/product_rose_hair_spiral.jpg',
    imgAlt:   'Handmade pink crochet blooming rose hair accessory with white spiral coils',
    desc:     'A blooming 3D pink crochet rose with dual cascading white spiral tendril coils 🌹 Adds effortless romance to ponytails, buns, and braids.',
  },
  22: {
    name:     'Boho Crochet Bandana Trio 🍂',
    category: 'Hair Accessories',
    price:    '₹360',
    badge:    'earthy vibes ✦',
    img:      'images/product_bandanas_trio.jpg',
    imgAlt:   'Handmade triangle crochet hair bandanas in burgundy, cream, and beige',
    desc:     'Triangle granny-stitch crochet head kerchiefs with braided ties in rich burgundy, warm beige, and natural cream 🍂 Lightweight, breathable, and so chic.',
  },
  23: {
    name:     'Nikkah Arabic Name Hoop 💍',
    category: 'Embroidery',
    price:    '₹790+',
    badge:    'wedding keepsake ✦',
    img:      'images/product_nikkah_hoop.jpg',
    imgAlt:   'Hand embroidered Nikkah wedding hoop art with couple names in Arabic calligraphy, date, and pearls',
    desc:     'Bespoke hand-embroidered Nikkah wedding hoop art featuring custom Arabic calligraphy of couple names, wedding date, twin rings, floral bouquet, satin ribbon, and pearl frame 💍',
  },
  24: {
    name:     'Personalized Name Heart Hoop 🌸',
    category: 'Embroidery',
    price:    '₹520+',
    badge:    'custom gift ♡',
    img:      'images/product_name_heart_hoop.jpg',
    imgAlt:   'Personalized custom name embroidery hoop with floral heart border and pearls',
    desc:     'A delicate handcrafted wooden embroidery hoop featuring your custom name centered inside a charming floral garland heart with pearls & french knots 🌸 Makes the sweetest gift!',
  },
  25: {
    name:     'Pink Ruffle Bow Pouch 🎀',
    category: 'Bags',
    price:    '₹420',
    badge:    'coquette aesthetic ✦',
    img:      'images/product_pink_ruffle_pouch.jpg',
    imgAlt:   'Cream and pink handcrafted ruffled crochet drawstring pouch with pink satin ribbons and bows',
    desc:     'The ultimate coquette dream! Handcrafted cream crochet mini bag featuring wide pink ruffled trims and delicate pink satin ribbon ties with dainty bows 🎀 Perfect for makeup, treasures, or a dreamy outing.',
  },
};

/* ─── WIZARD STATE ─────────────────────────────────────────────── */
const wizardState = {
  step:        1,
  productType: '',
  color:       '',
  size:        '',
  special:     '',
  budget:      '',
  name:        '',
  contact:     '',
  location:    '',
  urgency:     '',
};

/* ─── DOM READY ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initProductFilter();
  initProductWishlist();
  initProductModal();
  initWizard();
  initBackToTop();
  initHeartParticles();
  initHeroCardTilt();
  initScrollSpy();
  initTouchProductCards();
  initMobileFilterScroll();
  initModalSwipeClose();
  initFallingBows();
  initCustomCursor();
  fetchAndHydrateProducts();
});

/* ─── DYNAMIC BACKEND HYDRATION ────────────────────────────────── */
async function fetchAndHydrateProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success || !Array.isArray(data.products) || data.products.length === 0) return;

    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';

    data.products.forEach((prod, index) => {
      const numId = index + 1;
      const strId = prod.id || `prod-${numId}`;
      let imgPath = prod.image || 'images/hero_products_collage.jpg';
      if (imgPath.startsWith('/uploads/')) {
        imgPath = imgPath.substring(1); // relative path
      }

      const prodData = {
        name:     prod.name,
        category: prod.category || 'General',
        price:    prod.price || '₹0',
        badge:    prod.badge || '',
        tagline:  prod.tagline || 'handmade with love ♡',
        img:      imgPath,
        imgAlt:   prod.name,
        desc:     prod.desc || ''
      };

      PRODUCTS[numId] = prodData;
      PRODUCTS[strId] = prodData;

      // Category lowercase for data-category filter
      let catDataAttr = 'decor';
      const catLower = (prod.category || '').toLowerCase();
      if (catLower.includes('bag')) catDataAttr = 'bags';
      else if (catLower.includes('keychain')) catDataAttr = 'keychains';
      else if (catLower.includes('hair')) catDataAttr = 'hair';
      else if (catLower.includes('anime')) catDataAttr = 'anime';
      else if (catLower.includes('embroidery') || catLower.includes('keepsake') || catLower.includes('islamic')) catDataAttr = 'embroidery';
      else if (catLower.includes('decor') || catLower.includes('art')) catDataAttr = 'decor';

      const card = document.createElement('article');
      card.className = 'product-card';
      card.dataset.category = catDataAttr;
      card.dataset.name = prod.name;
      card.dataset.price = prod.price;
      card.dataset.desc = prod.desc || '';
      card.id = `product-card-${strId}`;

      const waMsg = encodeURIComponent(`Hi Sabnam! ♡ I'd love to order: ${prod.name} (${prod.price}). Please share the details! ✨`);

      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${imgPath}" alt="${prod.name}" loading="lazy" onerror="this.src='images/sn_logo.jpg'" />
          ${prod.badge ? `<div class="product-badge">${prod.badge}</div>` : ''}
          <button class="product-wishlist" aria-label="Add ${prod.name} to wishlist" data-id="${strId}">
            <i class="fa-regular fa-heart"></i>
          </button>
          <div class="product-hover-overlay">
            <button class="btn btn-quick-view" data-product-id="${strId}" id="quickview-btn-${strId}">Quick View ✨</button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category-tag">${prod.category}</span>
          <h3 class="product-name">${prod.name}</h3>
          <p class="product-tagline">${prod.tagline || 'handmade with love ♡'}</p>
          <div class="product-footer">
            <span class="product-price">${prod.price}</span>
            <a href="https://wa.me/917074669941?text=${waMsg}" target="_blank" rel="noopener" class="btn btn-order-sm" aria-label="Order ${prod.name} on WhatsApp">Order ♡</a>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Re-bind listeners for dynamic cards
    initProductWishlist();
    initProductModal();
    initTouchProductCards();

    // Re-apply active filter if set
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    if (activeFilterBtn && activeFilterBtn.dataset.filter !== 'all') {
      filterProducts(activeFilterBtn.dataset.filter);
    }
  } catch (e) {
    console.log('Using static catalog products.');
  }
}

/* ══════════════════════════════════════════════════════════════
   1. NAVBAR
   ══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('nav-hamburger');
  const navLinks   = document.getElementById('nav-links');
  const allNavLinks = navLinks.querySelectorAll('.nav-link, .nav-cta');
  const closeBtn   = document.getElementById('nav-close-btn');

  // Helper: open/close drawer
  function openDrawer() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Show the in-drawer close button on mobile
    const closeHint = navLinks.querySelector('.nav-close-hint');
    if (closeHint) closeHint.style.display = 'flex';
  }

  function closeDrawer() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    const closeHint = navLinks.querySelector('.nav-close-hint');
    if (closeHint) closeHint.style.display = 'none';
  }

  // Scroll: add glassmorphic class
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // In-drawer ✕ close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Close nav on link click
  allNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   2. SCROLL SPY (highlight active nav link)
   ══════════════════════════════════════════════════════════════ */
function initScrollSpy() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${entry.target.id}`) {
            link.style.color = 'var(--terracotta)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════════════════════════
   3. SCROLL REVEAL
   ══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  // Auto-add .reveal to key elements
  const revealTargets = [
    '.section-header',
    '.product-card',
    '.wizard-wrapper',
    '.story-image-col',
    '.story-text-col',
    '.insta-tile',
    '.footer-brand',
    '.footer-links-col',
    '.footer-social-col',
    '.highlight-item',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   4. PRODUCT FILTER
   ══════════════════════════════════════════════════════════════ */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid       = document.getElementById('product-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts(btn.dataset.filter);
    });
  });
}

/**
 * Filter products by category string. Exposed globally for footer links.
 * @param {string} category
 */
function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');
  let delay   = 0;

  cards.forEach(card => {
    const cardCat = card.dataset.category;
    const show    = (category === 'all') || (cardCat === category);

    if (show) {
      card.classList.remove('hidden');
      card.classList.remove('fade-in');
      // Force reflow for animation restart
      void card.offsetWidth;
      card.classList.add('fade-in');
      card.style.animationDelay = `${delay}s`;
      delay += 0.05;
    } else {
      card.classList.add('hidden');
      card.classList.remove('fade-in');
    }
  });

  // Sync filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  // Smooth scroll to products section
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ══════════════════════════════════════════════════════════════
   5. WISHLIST / HEART BUTTONS
   ══════════════════════════════════════════════════════════════ */
const wishlist = new Set();

function initProductWishlist() {
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const icon = btn.querySelector('i');

      if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.classList.remove('active');
        icon.className = 'fa-regular fa-heart';
        showToast(`Removed from wishlist`);
      } else {
        wishlist.add(id);
        btn.classList.add('active');
        icon.className = 'fa-solid fa-heart';
        showToast(`Added to wishlist ♡`);
        spawnHeartParticles(e.clientX, e.clientY, 6);
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   6. PRODUCT QUICK-VIEW MODAL
   ══════════════════════════════════════════════════════════════ */
function initProductModal() {
  const overlay   = document.getElementById('modal-overlay');
  const closeBtn  = document.getElementById('modal-close');
  const quickBtns = document.querySelectorAll('.btn-quick-view');

  // Open on quick-view click
  quickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      openModal(productId);
    });
  });

  // Open on card click (whole card)
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.product-wishlist') ||
          e.target.closest('.btn-order-sm') ||
          e.target.closest('.btn-quick-view')) return;
      const id = card.id.replace('product-card-', '');
      openModal(id);
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });
}

function openModal(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;

  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-img').src    = product.img;
  document.getElementById('modal-img').alt    = product.imgAlt;
  document.getElementById('modal-badge').textContent   = product.badge;
  document.getElementById('modal-category').textContent = product.category;
  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-desc').textContent    = product.desc;
  document.getElementById('modal-price').textContent   = product.price;

  // Update modal order buttons
  const waBtn    = document.getElementById('modal-wa-btn');
  const waMsg    = encodeURIComponent(`Hi Sabnam! ♡ I'd love to order: ${product.name} (${product.price}). Please share the details! ✨`);
  if (waBtn) waBtn.href = `https://wa.me/917074669941?text=${waMsg}`;

  const orderBtn = document.getElementById('modal-order-btn');
  if (orderBtn) orderBtn.href = `https://www.instagram.com/sn.hand.made`;

  overlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  // Focus trap on close button
  setTimeout(() => document.getElementById('modal-close').focus(), 100);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════════════
   7. CUSTOM ORDER WIZARD
   ══════════════════════════════════════════════════════════════ */
function initWizard() {
  // Pre-select product type radio buttons
  document.querySelectorAll('input[name="product-type"]').forEach(radio => {
    radio.addEventListener('change', () => {
      wizardState.productType = radio.value;
    });
  });
}

/**
 * Advance wizard to next step.
 * @param {number} currentStep
 */
function wizardNext(currentStep) {
  // Validation
  if (currentStep === 1) {
    const selectedType = document.querySelector('input[name="product-type"]:checked');
    if (!selectedType) {
      showToast('Please select a product type first ♡');
      // Wiggle the grid
      const grid = document.getElementById('product-type-grid');
      grid.style.animation = 'none';
      void grid.offsetWidth;
      grid.style.animation = 'stickerWiggle 0.4s ease';
      return;
    }
    wizardState.productType = selectedType.value;
  }

  if (currentStep === 2) {
    wizardState.color   = document.getElementById('color-preference').value.trim();
    wizardState.size    = document.getElementById('size-preference').value.trim();
    wizardState.special = document.getElementById('special-request').value.trim();
    wizardState.budget  = document.getElementById('budget-range').value;
  }

  goToStep(currentStep + 1);
}

/**
 * Go back to previous step.
 * @param {number} currentStep
 */
function wizardBack(currentStep) {
  goToStep(currentStep - 1);
}

/**
 * Navigate to a specific step.
 * @param {number} step
 */
function goToStep(step) {
  // Hide all panes
  document.querySelectorAll('.wizard-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  // Update step indicators
  document.querySelectorAll('.wizard-step').forEach((indicator, i) => {
    const stepNum = i + 1 > 4 ? 4 : Math.ceil((i + 1) / 1);
    const actualStep = parseInt(indicator.dataset.step);
    indicator.classList.remove('active', 'done');
    if (actualStep < step) indicator.classList.add('done');
    if (actualStep === step) indicator.classList.add('active');
  });

  // Update step connectors
  document.querySelectorAll('.step-connector').forEach((conn, i) => {
    conn.classList.toggle('done', (i + 1) < step);
  });

  // Show target pane
  const targetPane = document.getElementById(`wizard-step-${step}`);
  if (targetPane) {
    targetPane.classList.add('active');
    wizardState.step = step;

    // Smooth scroll to wizard
    targetPane.closest('.wizard-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Final send step — build WhatsApp message and show confirmation.
 */
function wizardSend() {
  // Collect contact info
  wizardState.name     = document.getElementById('customer-name').value.trim();
  wizardState.contact  = document.getElementById('contact-handle').value.trim();
  wizardState.location = document.getElementById('delivery-location').value.trim();
  wizardState.urgency  = document.getElementById('urgency').value;

  // Basic validation
  if (!wizardState.name) {
    showToast('Please enter your name ♡');
    document.getElementById('customer-name').focus();
    return;
  }

  // Build message
  const msg = buildOrderMessage();

  // Update preview
  document.getElementById('success-preview').textContent = msg;

  // Build WhatsApp link (replace with actual phone number)
  const phone     = '917074669941'; // Replace with actual WhatsApp number
  const waMsg     = encodeURIComponent(msg);
  const waLink    = `https://wa.me/${phone}?text=${waMsg}`;
  document.getElementById('whatsapp-send-btn').href = waLink;

  // Advance to step 4
  goToStep(4);
  spawnHeartParticles(window.innerWidth / 2, window.innerHeight / 2, 12);
}

/**
 * Build the formatted order message.
 * @returns {string}
 */
function buildOrderMessage() {
  const lines = [
    `🌸 Custom Order Request — Sabnam Handlooms & Arts`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `📦 Product: ${wizardState.productType || 'Not specified'}`,
    `🎨 Colour Preference: ${wizardState.color || 'Open to suggestions ♡'}`,
    `📐 Size / Quantity: ${wizardState.size || 'Not specified'}`,
    `💬 Special Request: ${wizardState.special || 'None'}`,
    `💸 Budget: ${wizardState.budget || 'Flexible ♡'}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 Name: ${wizardState.name}`,
    `📱 Contact: ${wizardState.contact || 'Via this chat'}`,
    `📍 Location: ${wizardState.location || 'Not specified'}`,
    `⏰ Timeline: ${wizardState.urgency || 'Flexible'}`,
    ``,
    `Made with love using the order wizard on sabnamhandlooms.com ♡`,
  ];

  return lines.join('\n');
}

/**
 * Reset wizard to step 1.
 */
function wizardReset() {
  // Clear all fields
  document.querySelectorAll('input[name="product-type"]').forEach(r => r.checked = false);
  ['color-preference','size-preference','special-request','budget-range',
   'customer-name','contact-handle','delivery-location','urgency'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Reset state
  Object.keys(wizardState).forEach(k => {
    wizardState[k] = k === 'step' ? 1 : '';
  });

  goToStep(1);
}

/* ══════════════════════════════════════════════════════════════
   8. TOAST NOTIFICATION
   ══════════════════════════════════════════════════════════════ */
let toastTimer = null;

/**
 * Show a brief toast notification message.
 * @param {string} message
 * @param {number} [duration=2800]
 */
function showToast(message, duration = 2800) {
  const toast   = document.getElementById('wishlist-toast');
  const toastMsg = document.getElementById('toast-msg');

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ══════════════════════════════════════════════════════════════
   9. BACK TO TOP BUTTON
   ══════════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════════════════════
   10. HEART PARTICLE ANIMATIONS
   ══════════════════════════════════════════════════════════════ */
const HEART_SYMBOLS = ['♡', '♥', '❤', '✦', '⋆'];

function initHeartParticles() {
  // Spawn hearts on click anywhere in the hero section
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('click', (e) => {
      if (!e.target.closest('.btn') && !e.target.closest('.floating-card')) {
        spawnHeartParticles(e.clientX, e.clientY, 5);
      }
    });
  }

  // Also spawn on wishlist button double-click anywhere
  document.addEventListener('dblclick', (e) => {
    if (!e.target.closest('.btn') && !e.target.closest('input') && !e.target.closest('select') && !e.target.closest('textarea')) {
      spawnHeartParticles(e.clientX, e.clientY, 4);
    }
  });
}

/**
 * Spawn animated heart particles at a given screen position.
 * @param {number} x    - clientX
 * @param {number} y    - clientY
 * @param {number} count - number of particles
 */
function spawnHeartParticles(x, y, count = 6) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.classList.add('heart-particle');

    // Random spread
    const angle  = (Math.random() * 360) * (Math.PI / 180);
    const dist   = 50 + Math.random() * 80;
    const tx     = Math.cos(angle) * dist;
    const ty     = -(60 + Math.random() * 60); // always goes upward
    const tr     = (Math.random() - 0.5) * 180; // degrees

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.setProperty('--tr', `${tr}deg`);
    particle.style.left   = `${x}px`;
    particle.style.top    = `${y}px`;
    particle.style.animationDelay = `${i * 0.06}s`;
    particle.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;

    particle.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];

    document.body.appendChild(particle);

    // Remove after animation completes
    particle.addEventListener('animationend', () => particle.remove());
  }
}

/* ══════════════════════════════════════════════════════════════
   11. HERO CARD TILT (Mouse parallax on desktop)
   ══════════════════════════════════════════════════════════════ */
function initHeroCardTilt() {
  const heroCards = document.getElementById('hero-cards');
  if (!heroCards) return;

  // Only apply on non-touch devices
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let rafId = null;

    heroCards.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect   = heroCards.getBoundingClientRect();
        const cx     = rect.left + rect.width / 2;
        const cy     = rect.top + rect.height / 2;
        const deltaX = (e.clientX - cx) / (rect.width / 2);
        const deltaY = (e.clientY - cy) / (rect.height / 2);

        const mainCard = document.getElementById('hero-card-main');
        const sec1     = document.getElementById('hero-card-sec1');
        const sec2     = document.getElementById('hero-card-sec2');

        if (mainCard) {
          mainCard.style.transform = `perspective(800px) rotateY(${deltaX * 4}deg) rotateX(${-deltaY * 4}deg) translateY(0)`;
        }
        if (sec1) {
          sec1.style.transform = `translateY(${-deltaY * 8}px) translateX(${deltaX * 6}px)`;
        }
        if (sec2) {
          sec2.style.transform = `translateY(${deltaY * 6}px) translateX(${-deltaX * 4}px)`;
        }
      });
    });

    heroCards.addEventListener('mouseleave', () => {
      ['hero-card-main','hero-card-sec1','hero-card-sec2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.transform = '';
      });
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   12. SMOOTH SCROLL FOR ANCHOR LINKS
   ══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ══════════════════════════════════════════════════════════════
   13. MARQUEE SPEED ON HOVER
   ══════════════════════════════════════════════════════════════ */
(function initMarquee() {
  const band  = document.querySelector('.marquee-band');
  const track = document.querySelector('.marquee-track');
  if (!band || !track) return;

  band.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  band.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();

/* ══════════════════════════════════════════════════════════════
   14. LAZY IMAGE LOADING FALLBACK
   ══════════════════════════════════════════════════════════════ */
(function initLazyImages() {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('error', () => {
      img.style.opacity = '0.3';
      img.style.filter  = 'grayscale(1)';
    });
  });
})();

/* ══════════════════════════════════════════════════════════════
   15. CUSTOM BOW CURSOR 🎀
   ══════════════════════════════════════════════════════════════ */
function initCustomCursor() {
  // Only activate on pointer:fine devices (mouse / trackpad)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  /* ── Build the cursor DOM element ── */
  const cursorEl = document.createElement('div');
  cursorEl.id = 'custom-cursor';

  // Pink pixel-art arrow SVG (tip at top-left 0,0) + bow on the RIGHT
  cursorEl.innerHTML = `
    <div class="cursor-arrow">
      <svg viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="2,2 2,26 8,20 14,32 18,30 12,18 20,18"
          fill="#FFD6E8" stroke="#D4669A" stroke-width="2.2"
          stroke-linejoin="round" stroke-linecap="round"/>
        <polygon points="4,4 4,20 9,15 14,27 16,26 11,14 18,14"
          fill="#FFF0F7" opacity="0.55"/>
      </svg>
    </div>
    <span class="cursor-bow" id="cursor-bow-icon">🎀</span>
  `;

  document.body.appendChild(cursorEl);
  const bowIcon = document.getElementById('cursor-bow-icon');

  /* ── Track mouse with rAF for butter-smooth movement ── */
  let mouseX = -300, mouseY = -300;
  let rafPending = false;
  let firstMove  = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!firstMove) {
      firstMove = true;
      cursorEl.style.display = 'block';
    }

    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        cursorEl.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      });
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => { cursorEl.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursorEl.style.opacity = '1'; });

  /* ── Hover detection: wobble bow over interactive elements ── */
  const INTERACTIVE = 'a,button,input,select,textarea,label,[role="button"],.product-card,.filter-btn,.insta-tile,.type-option,.nav-cta';

  document.addEventListener('mouseover', (e) => {
    cursorEl.classList.toggle('cursor-hover', !!e.target.closest(INTERACTIVE));
  }, { passive: true });

  /* ── Click: bow detaches and falls from cursor ── */
  let bowBusy = false;

  document.addEventListener('click', (e) => {
    if (bowBusy) return;
    const tag = e.target.tagName.toLowerCase();
    if (['input','textarea','select'].includes(tag)) return;

    bowBusy = true;

    // Screen coords of the bow (cursor pos + CSS offset: left:8 top:-6)
    const bowX = mouseX + 8;
    const bowY = mouseY - 6;

    // Detach animation on cursor's own bow
    bowIcon.classList.remove('bow-return');
    void bowIcon.offsetWidth;
    bowIcon.classList.add('bow-detach');

    // Physical bows fall from that screen position
    spawnBowFromCursor(bowX, bowY);

    // Snap bow back after fall
    setTimeout(() => {
      bowIcon.classList.remove('bow-detach');
      void bowIcon.offsetWidth;
      bowIcon.classList.add('bow-return');
      setTimeout(() => {
        bowIcon.classList.remove('bow-return');
        bowBusy = false;
      }, 380);
    }, 560);
  });
}

/**
 * Spawn a small cluster of falling bows that originate from
 * the exact screen position of the cursor's bow icon.
 */
function spawnBowFromCursor(originX, originY) {
  const VARIANTS = ['bow-a','bow-b','bow-c','bow-d'];
  const SYMBOLS  = ['🎀','🎀','🎀','🩷','💕','🌸'];
  const count = 4 + Math.floor(Math.random() * 4); // 4-7

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const bow = document.createElement('span');
      bow.classList.add('falling-bow', VARIANTS[Math.floor(Math.random() * 4)]);
      bow.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

      // Start from cursor bow position (not top of screen)
      bow.style.top    = `${originY}px`;
      bow.style.left   = `${originX + (Math.random() - 0.5) * 28}px`;
      bow.style.fontSize        = `${1.0 + Math.random() * 1.2}rem`;
      const dur = 1.8 + Math.random() * 1.8;
      bow.style.animationDuration = `${dur}s`;
      bow.style.animationDelay    = '0s';

      document.body.appendChild(bow);
      setTimeout(() => bow.remove(), (dur + 0.4) * 1000);
    }, i * 55);
  }
}



/* ══════════════════════════════════════════════════════════════
   16. INSTAGRAM TILES — staggered reveal animation
   ══════════════════════════════════════════════════════════════ */
(function initInstaTiles() {
  const tiles = document.querySelectorAll('.insta-tile');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.1}s`;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  tiles.forEach(tile => {
    tile.classList.add('reveal');
    observer.observe(tile);
  });
})();

/* ════════════════════════════════════════════════════════════
   UTILITY: Debounce
   ════════════════════════════════════════════════════════════ */
function debounce(fn, ms = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

/* ════════════════════════════════════════════════════════════
   MOBILE: Tap product card to show quick-view overlay
   ════════════════════════════════════════════════════════════ */
function initTouchProductCards() {
  // Only activate on true touch devices
  if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If tapping a button/link inside, let it through
      if (e.target.closest('.product-wishlist') ||
          e.target.closest('.btn-order-sm') ||
          e.target.closest('.btn-quick-view')) return;

      const alreadyTapped = card.classList.contains('tapped');

      // Remove tapped from all other cards
      cards.forEach(c => c.classList.remove('tapped'));

      if (!alreadyTapped) {
        // First tap: show overlay
        card.classList.add('tapped');
        e.preventDefault();
        e.stopPropagation();
      } else {
        // Second tap: open modal
        const id = card.id.replace('product-card-', '');
        openModal(id);
      }
    });
  });

  // Tap outside to clear all tapped states
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.product-card')) {
      cards.forEach(c => c.classList.remove('tapped'));
    }
  });
}

/* ════════════════════════════════════════════════════════════
   MOBILE: Auto-scroll filter bar to keep active button centred
   ════════════════════════════════════════════════════════════ */
function initMobileFilterScroll() {
  const filterBar = document.getElementById('filter-bar');
  if (!filterBar) return;

  /**
   * Scroll the filter bar so the active button is roughly centred.
   * @param {HTMLElement} activeBtn
   */
  function scrollToActive(activeBtn) {
    if (!activeBtn) return;
    const barRect    = filterBar.getBoundingClientRect();
    const btnRect    = activeBtn.getBoundingClientRect();
    const scrollLeft = filterBar.scrollLeft + (btnRect.left - barRect.left) -
                       (barRect.width / 2) + (btnRect.width / 2);
    filterBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }

  // Scroll to the initially-active button on load
  const initialActive = filterBar.querySelector('.filter-btn.active');
  scrollToActive(initialActive);

  // Scroll on click
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (btn) {
      // Give it a tick for the active class to update
      setTimeout(() => scrollToActive(btn), 50);
    }
  });
}

/* ════════════════════════════════════════════════════════════
   MOBILE: Swipe-down gesture to close the product modal
   ════════════════════════════════════════════════════════════ */
function initModalSwipeClose() {
  const modalCard = document.getElementById('modal-card');
  if (!modalCard) return;

  let startY       = 0;
  let currentY     = 0;
  let isDragging   = false;
  const THRESHOLD  = 80; // px to drag before dismissing

  modalCard.addEventListener('touchstart', (e) => {
    // Only initiate swipe from the modal card's top portion (handle / image area)
    if (e.touches.length !== 1) return;
    startY    = e.touches[0].clientY;
    isDragging = true;
    modalCard.style.transition = 'none';
  }, { passive: true });

  modalCard.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    if (deltaY > 0) {
      // Only allow dragging downward
      modalCard.style.transform = `translateY(${deltaY}px)`;
      // Fade overlay background proportionally
      const overlay = document.getElementById('modal-overlay');
      const opacity = Math.max(0.1, 1 - deltaY / 300);
      if (overlay) overlay.style.background = `rgba(61,44,46,${0.55 * opacity})`;
    }
  }, { passive: true });

  modalCard.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    modalCard.style.transition = '';

    const deltaY = currentY - startY;
    if (deltaY > THRESHOLD) {
      // Dismiss
      modalCard.style.transform = `translateY(100%)`;  
      setTimeout(() => {
        closeModal();
        modalCard.style.transform = '';
        const overlay = document.getElementById('modal-overlay');
        if (overlay) overlay.style.background = '';
      }, 300);
    } else {
      // Snap back
      modalCard.style.transform = '';
      const overlay = document.getElementById('modal-overlay');
      if (overlay) overlay.style.background = '';
    }

    startY = 0; currentY = 0;
  });
}

/* ══════════════════════════════════════════════════════════════
   FALLING BOWS ON CLICK 🎀
   ══════════════════════════════════════════════════════════════ */
function initFallingBows() {
  // Skip on touch-only devices (cursor is auto there anyway)
  // but keep the falling bows on touch too — feels magical on mobile
  const BOW_EMOJIS  = ['🎀', '🎀', '🎀', '🎀', '🩷', '💕', '🌸'];
  const BOW_VARIANTS = ['bow-a', 'bow-b', 'bow-c', 'bow-d'];

  let lastSpawn = 0;
  const THROTTLE_MS = 120; // max one burst per 120ms

  document.addEventListener('click', (e) => {
    const now = Date.now();
    if (now - lastSpawn < THROTTLE_MS) return;
    lastSpawn = now;

    // Don't spawn if clicking on inputs/selects/textareas (typing)
    const tag = e.target.tagName.toLowerCase();
    if (['input', 'textarea', 'select'].includes(tag)) return;

    // 1️⃣  Click ripple burst at cursor position
    spawnClickRipple(e.clientX, e.clientY);

    // 2️⃣  Spawn bows falling from the TOP of the screen
    const bowCount = 6 + Math.floor(Math.random() * 5); // 6–10 bows

    for (let i = 0; i < bowCount; i++) {
      setTimeout(() => {
        spawnFallingBow();
      }, i * 60); // stagger each bow by 60ms
    }
  });

  /**
   * Spawn one falling bow at a random position along the top edge.
   */
  function spawnFallingBow() {
    const bow = document.createElement('span');
    bow.classList.add('falling-bow');

    // Random variant (physics path)
    const variant = BOW_VARIANTS[Math.floor(Math.random() * BOW_VARIANTS.length)];
    bow.classList.add(variant);

    // Random bow emoji / symbol
    bow.textContent = BOW_EMOJIS[Math.floor(Math.random() * BOW_EMOJIS.length)];

    // Random horizontal starting position across the full viewport width
    const startX = 5 + Math.random() * 90; // 5% – 95% of screen width
    bow.style.left = `${startX}vw`;

    // Random size — range 1.2rem – 2.8rem
    const size = 1.2 + Math.random() * 1.6;
    bow.style.fontSize = `${size}rem`;

    // Random duration — 2.2s – 4.5s
    const duration = 2.2 + Math.random() * 2.3;
    bow.style.animationDuration = `${duration}s`;

    // Random slight delay so they don't all start at once
    const delay = Math.random() * 0.2;
    bow.style.animationDelay = `${delay}s`;

    document.body.appendChild(bow);

    // Clean up after animation finishes
    const totalTime = (duration + delay + 0.3) * 1000;
    setTimeout(() => bow.remove(), totalTime);
  }

  /**
   * Spawn a pink circle ripple at the click position.
   * @param {number} x clientX
   * @param {number} y clientY
   */
  function spawnClickRipple(x, y) {
    const ripple = document.createElement('span');
    ripple.classList.add('bow-click-ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top  = `${y}px`;
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
}
