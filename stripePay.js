// create an array of products
let products = [
  {
    id: 1,
    name: 'Macadamia Nut',
    sku: 'sku_GvIynTdb0kVfWD',
    company: 'Oh Nuts!',
    price: 11.99,
    stock: 15,
    img:
      'https://images-na.ssl-images-amazon.com/images/I/81SlBjnLRTL._SL1500_.jpg',
  },
  {
    id: 2,
    name: 'Smoked Almonds',
    company: 'Diamond',
    sku: 'sku_GvJfJ4Rb8s32sM',
    price: 8.99,
    stock: 15,
    img: 'https://i.ebayimg.com/images/g/A30AAOSwqJReTaej/s-l640.jpg',
  },
];

// 1. create an array of products
// 2. select the container for the products
// 3. loop through products
// 4. create piece of html an insert product information
// 5. append piece of html to product container


window.onload = () => {
  var stripe = Stripe('pk_test_AJl3M91EcB8hQCmZWkzdOcMl');

  // 2. select the container for the products
  let cards = document.querySelector('#cards');
  let div;


  // ***** Same Thing *****
  // for (let i = 0; i < products.length; i++) {
  //   products[i].img
  // }

  // 3. loop through products
  products.forEach(a => {

    // create a piece of html to insert the product information
    div = document.createElement('div');
    
    // add css class to inherit card styling
    div.classList.add('card');

    // insert html into created div element ${a.name} accesses keys off of product object
    div.innerHTML = `
        <div class="image">
          <img src=${a.img}> 
        </div>
        <div class="content">
          <div class="header">${a.name}</div>
          <div class="meta">
            <a>$${a.price}</a>
          </div>
          <div class="description">
            ${a.company}
          </div>
        </div>
        <div class="extra content">
          <span>
            <i class="user icon"></i>
            Stock ${a.stock}
          </span>
        </div>
    `;


    // addEventListener for each product
    div.addEventListener('click', () => {
      stripe
        .redirectToCheckout({
          items: [
            // Replace with the ID of your SKU
            { sku: a.sku, quantity: 1 },
          ],
          successUrl: 'https://localhost:8000/success.html',
          cancelUrl: 'https://localhost:8000/cancel.html',
        })
        .then(function(result) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
          console.log(result.error.message);
        });
    });
    
    // append card to cards container
    cards.appendChild(div);
  });
};
