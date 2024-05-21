let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [
    // Example product data
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

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = ''; // Clear existing products

    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">₱${product.price}</div>
                <button class="addCart" style="cursor: pointer;">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{ product_id: product_id, quantity: 1 }];
    } else if (positionThisProductInCart < 0) {
        cart.push({ product_id: product_id, quantity: 1 });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    console.log("product_id",product_id)
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            
            if (info) {
                totalQuantity += item.quantity;
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;

                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                    <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">₱${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `;
                totalPrice += info.price * item.quantity;
            }
        });
    }
    iconCartSpan.innerText = totalQuantity;

    let totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.innerHTML = `Total: ₱${totalPrice}`;
    listCartHTML.appendChild(totalElement);

    let cartDetailsModal = document.querySelector('.cart-details .listCart');
    cartDetailsModal.innerHTML = '';
    
    if (cart.length > 0) {
        let rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
    
        cart.forEach(item => {
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            if (info) {
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;
                newItem.innerHTML = `
                    <div class="card">
                        <div class="image">
                            <img src="${info.image}" alt="${info.name}" class="product-image">
                        </div>
                        <div class="info">
                            <div class="name">${info.name} (Qty: ${item.quantity})</div>
                            <div class="totalPrice">₱${info.price * item.quantity}</div>
                        </div>
                    </div>
                `;
                rowContainer.appendChild(newItem);
            }
        });
    
        cartDetailsModal.appendChild(rowContainer);
        let totalElementModal = document.createElement('div');
        totalElementModal.classList.add('total');
        totalElementModal.innerHTML = `Total: ₱${totalPrice}`;
        cartDetailsModal.appendChild(totalElementModal);
    }
};


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const initApp = () => {
    addDataToHTML();

    // get data cart from memory
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
};

initApp();
