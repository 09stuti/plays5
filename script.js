let cart = [];

const cartCount = document.getElementById("cartCount");
const cartPopup = document.getElementById("cartPopup");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function addToCart(name, price) {

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}

function updateCart() {

    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            "<p style='color:#888'>Your cart is empty.</p>";
    }

    cart.forEach((item, index) => {

        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p style="color:#888">
                    ₹${item.price.toLocaleString()} × ${item.quantity}
                </p>
            </div>

            <button class="remove"
                    onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = totalPrice.toLocaleString();
}

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

document.querySelector(".cart").addEventListener("click", () => {

    cartPopup.style.display = "flex";

    updateCart();
});

function closeCart() {
    cartPopup.style.display = "none";
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Thank you for shopping with GameStation!\n\n" +
        "Checkout demo completed."
    );

    cart = [];

    updateCart();

    closeCart();
}

/* Product Filter */

const filterButtons = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.category;

        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });

});

/* Contact Form */

function sendMessage(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(
        "Thank you, " + name +
        "! Your message has been submitted."
    );

    event.target.reset();
}

/* Close popup when clicking outside */

cartPopup.addEventListener("click", function(event) {

    if (event.target === cartPopup) {
        closeCart();
    }

});

updateCart();