let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: 'Krem do twarzy 1',
        tag: 'krem1',
        price: 15,
        inCart: 0
    },
    {
        name: 'Krem do twarzy 2',
        tag: 'krem2',
        price: 20,
        inCart: 0
    },
    {
        name: 'Krem do twarzy 3',
        tag: 'krem3',
        price: 10,
        inCart: 0
    },
    {
        name: 'Krem do twarzy 4',
        tag: 'krem4',
        price: 25,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else localStorage.setItem("totalCost", product.price);
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <img src="../img/${item.tag}.jpg">
                    <span>${item.name}</span>
                </div>
                <div class="price">
                    ${item.price},00 zł
                </div>
                <div class="quantity">
                    <input class="cart-quantity-input" type="number" value="${item.inCart}">
                </div>
                <div class="total">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h5 class="basketTotalTitle">
                    Łącznie
                </h5>
                <h5 class="basketTotal">
                    ${cartCost},00 zł
                </h5>
            </div>
        `;

    }

    var removeCart = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCart.length; i++) {
        var button = removeCart[i]
        button.addEventListener('click',function(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
        })
    }

}




onLoadCartNumbers();
displayCart();

// REGISTER

$('.message a').click(function() {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});



