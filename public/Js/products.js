document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});

function fetchProducts() {
  const productList = document.getElementById("product-list");
  db.collection("products").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      productList.innerHTML = "";
      snapshot.docs.forEach((doc) => {
          const product = doc.data();
          const productItem = document.createElement("div");
          productItem.classList.add("product-item");
          productItem.innerHTML = `
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              <button onclick="addToCart('${doc.id}')">Add to Cart</button>
          `;
          productList.appendChild(productItem);
      });
  });
}

function addToCart(productId) {
  const user = firebase.auth().currentUser;
  if (user) {
      db.collection("carts").add({
          userId: user.uid,
          productId: productId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
          alert("Product added to cart!");
      }).catch((error) => {
          console.error("Error adding to cart:", error);
      });
  } else {
      alert("Please log in to add items to your cart.");
  }
}
