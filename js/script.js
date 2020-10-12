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
                
                    <div class="price">
                        ${item.price},00 zł
                    </div>
                    <div class="quantity">
                        <input class="cart-quantity-input" type="number" value="${item.inCart}">
                    </div>
                    <div class="total">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>
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

    let removeCart = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCart.length; i++) {
        let button = removeCart[i]
        button.addEventListener('click',function(event) {
            let buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
        })

        let quantityProducts = document.getElementsByClassName('cart-quantity-input')
        for (let i = 0; i < quantityProducts.length; i++) {
            let input = quantityProducts[i]
            input.addEventListener('change', quantityChanged)
        }
    }

    function quantityChanged(event) {
        let input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal
    }

    function updateCartTotal() {
        let cartItemContainer = document.getElementsByClassName('products')[0]
        let cartProducts = cartItemContainer.getElementsByClassName('product')
        let total = 0
        for (let i = 0; i < cartProducts.length; i++) {
            let cartProduct = cartProducts[i]
            let priceProduct = cartProduct.getElementsByClassName('price')[0]
            let quantityProduct = cartProduct.getElementsByClassName('cart-quantity-input')[0]
            console.log(priceProduct, quantityProduct)
            let price = parseFloat(priceProduct.innerText.replace('zł', ''))
            let quantity = quantityProduct.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('basketTotal')[0].innerText = total + ',00 zł'
    }

}




onLoadCartNumbers();
displayCart();

// REGISTER

$('.message a').click(function() {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});



