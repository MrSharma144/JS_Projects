document.addEventListener('DOMContentLoaded', () => {
  const products= [
    { id: 1, name: 'Laptop', price: 999.99,photo : 'laptop.jpeg'},
    { id: 2, name: 'Mobile', price: 499.99,photo : 'mobile.jpeg' },
    { id: 3, name: 'Tablet', price: 299.99 ,photo : 'tablet.jpeg' },
  ];

  const cart = [];
  const productList = document.getElementById('product-list');
  const cartItems = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart');
  const cartTotalMessage = document.getElementById('cart-total');
  const totalPriceDisplay = document.getElementById('total-price');
  const checkoutButton = document.getElementById('checkout-btn');

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
   
    productDiv.innerHTML = `
    <img src="${product.photo}" alt="${product.name}" class="product-image">
    <span> ${product.name} - $${product.price.toFixed(2)}</span>
    <button  data-id="${product.id}">Add to Cart </button>`;
    productList.appendChild(productDiv);

  })
  productList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const productId = parseInt(event.target.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    console.log(cart);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = '';
    let totalPrice=0;
    if(cart.length>0){
      emptyCartMessage.classList.add('hidden');
      cartTotalMessage.classList.remove('hidden');
      cart.forEach((item) => {
        totalPrice += item.price;
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
        <img src="${item.photo}" alt="${item.name}" class="cart-image">
          ${item.name} - $${item.price.toFixed(2)} `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        
      })

    }
    else{
      emptyCartMessage.classList.remove('hidden');
      totalPriceDisplay.textContent = `$0.00`;
      
    }
    
  }

  checkoutButton.addEventListener('click', () => {
    cart.length=0;
    alert("Thank you for your purchase!");
    renderCart();
  })
    

})