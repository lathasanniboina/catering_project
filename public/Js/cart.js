document.addEventListener("DOMContentLoaded", function () {
    fetchCartItems();
});

function fetchCartItems() {
    const user = firebase.auth().currentUser;
    if (user) {
        const cartList = document.getElementById("cart-list");
        db.collection("carts").where("userId", "==", user.uid).onSnapshot((snapshot) => {
            cartList.innerHTML = "";
            snapshot.docs.forEach((doc) => {
                const cartItem = doc.data();
                db.collection("products").doc(cartItem.productId).get().then((productDoc) => {
                    if (productDoc.exists) {
                        const product = productDoc.data();
                        const cartEntry = document.createElement("div");
                        cartEntry.classList.add("cart-item");
                        cartEntry.innerHTML = `
                            <h3>${product.name}</h3>
                            <p>Price: $${product.price}</p>
                            <button onclick="removeFromCart('${doc.id}')">Remove</button>
                        `;
                        cartList.appendChild(cartEntry);
                    }
                });
            });
        });
    } else {
        alert("Please log in to view your cart.");
    }
}

function removeFromCart(cartItemId) {
    db.collection("carts").doc(cartItemId).delete().then(() => {
        alert("Item removed from cart");
    }).catch((error) => {
        console.error("Error removing item:", error);
    });
}
