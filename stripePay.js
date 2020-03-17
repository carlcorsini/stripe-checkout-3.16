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

window.onload = () => {
  let cards = document.querySelector('#cards');
  let div;
  products.forEach(a => {
    div = document.createElement('div');
    div.classList.add('card');
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
          <span class="right floated">
            Joined in 2013
          </span>
          <span>
            <i class="user icon"></i>
            75 Friends
          </span>
        </div>
    `;

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

    cards.appendChild(div);
  });

  var stripe = Stripe('pk_test_AJl3M91EcB8hQCmZWkzdOcMl');

  const buy1 = document.querySelector('#buy1');
};
