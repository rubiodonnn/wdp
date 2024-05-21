// Example product data
let products = [
    {
        "id": 1,
        "name": "LD01 LOUNGE CHAIR",
        "price": 3250,
        "image": "image/1.png"
    },
    {
        "id": 2,
        "name": "LD02 LOUNGE CHAIR",
        "price": 3450,
        "image": "image/2.png"
    },
    {
        "id": 3,
        "name": "LD03 LOUNGE CHAIR",
        "price": 1090,
        "image": "image/3.png"
    },
    {
        "id": 4,
        "name": "LD04 LOUNGE CHAIR",
        "price": 4090,
        "image": "image/4.png"
    },
    {
        "id": 5,
        "name": "LD05 LOUNGE CHAIR",
        "price": 6590,
        "image": "image/5.png"
    },
    {
        "id": 6,
        "name": "LD06 LOUNGE CHAIR",
        "price": 2390,
        "image": "image/6.png"
    },
    {
        "id": 7,
        "name": "LD07 LOUNGE CHAIR",
        "price": 1349,
        "image": "image/7.png"
    },
    {
        "id": 8,
        "name": "LD08 LOUNGE CHAIR",
        "price": 2190,
        "image": "image/8.png"
    }
];

// Function to create product HTML
function createProductHTML(product) {
  
    return `
        <div class="banner-item">
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p>₱ ${product.price.toFixed(2)}</p>
        </div>
    `;
}

// Get the product banner container
const productBanner = document.getElementById('product-banner');

// Generate and insert the product HTML, duplicating the items to ensure a smooth loop
productBanner.innerHTML = products.map(createProductHTML).join('') + products.map(createProductHTML).join('');
