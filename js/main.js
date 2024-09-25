/**
* Template Name: Yummy
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  // Cart initialization
  let cart = [];

  // Function to clear the cart
function clearCart() {
  cart = []; // Clear the cart array
  updateCart(); // Update the cart display
}

// Attach event listener to "Clear Cart" button
const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', function () {
    clearCart(); // Call the clearCart function
  });
}


  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Cart Functionality
   */
  // Function to handle "Add to Cart" button click
// Function to add product to cart
function addToCart(productId, productName, productPrice, productImage) {
  const existingProduct = cart.find(item => item.id === productId);

  // If the product exists, update the quantity
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    // Add new product to the cart with its image
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
      image: productImage  // Add the image URL here
    });
  }

  updateCart();
}

// Function to update cart count and total price
function updateCart() {
  const cartCount = document.getElementById('cart-count');
  let totalItems = 0;

  // Calculate total number of items in the cart
  cart.forEach(item => {
    totalItems += item.quantity;
  });

  // Update cart icon with total items count
  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  // Save cart to localStorage so it persists across pages
  localStorage.setItem('cart', JSON.stringify(cart));
}
// Function to handle "Remove from Cart" button click
function handleRemoveFromCart() {
  document.querySelectorAll('.btn-remove-from-cart').forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.getAttribute('data-product-id');
      const productName = this.getAttribute('data-product-name');
      const productPrice = parseFloat(this.getAttribute('data-price'));
      const productImage = this.getAttribute('data-product-image');  // Get image URL

      removeFromCart(productId, productName, productPrice, productImage);
    });
  });
}

// Function to remove product from cart
function removeFromCart(productId, productName, productPrice, productImage) {
  const existingProduct = cart.find(item => item.id === productId);

  // If the product exists, update the quantity
  if (existingProduct) {
    existingProduct.quantity -= 1;

    // Remove product if quantity is zero
    if (existingProduct.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    }
  }

  updateCart();
}

// Initialize the remove buttons
window.addEventListener('load', handleRemoveFromCart);


// Load cart from localStorage on page load
window.onload = function () {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
};

document.querySelector('.mobile-nav-toggle').addEventListener('click', function () {
  document.querySelector('#navmenu ul').classList.toggle('active');
  document.body.classList.toggle('mobile-nav-active');
});


// Attach event listener to "Add to Cart" buttons
// Attach event listener to "Add to Cart" buttons
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const productId = this.getAttribute('data-product-id');
    const productName = this.getAttribute('data-product-name');
    const productPrice = parseFloat(this.getAttribute('data-price'));
    const productImage = this.getAttribute('data-product-image');  // Get image URL

    addToCart(productId, productName, productPrice, productImage);
  });
});

// Redirect to cart page when cart icon is clicked
const cartBtn = document.getElementById('cart-btn');
if (cartBtn) {
  cartBtn.addEventListener('click', function () {
    window.location.href = 'payment.html';  // Redirect to cart page
  });
}
 
})();