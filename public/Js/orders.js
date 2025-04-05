document.addEventListener("DOMContentLoaded", function () {
    fetchOrders();
});

function fetchOrders() {
    const user = firebase.auth().currentUser;
    if (user) {
        const ordersList = document.getElementById("orders-list");
        db.collection("orders").where("userId", "==", user.uid).orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            ordersList.innerHTML = "";
            snapshot.docs.forEach((doc) => {
                const order = doc.data();
                const orderItem = document.createElement("div");
                orderItem.classList.add("order-item");
                orderItem.innerHTML = `
                    <h3>Order ID: ${doc.id}</h3>
                    <p>Status: ${order.status}</p>
                    <p>Placed on: ${new Date(order.timestamp.toDate()).toLocaleString()}</p>
                `;
                ordersList.appendChild(orderItem);
            });
        });
    } else {
        alert("Please log in to view your orders.");
    }
}

function placeOrder() {
    const user = firebase.auth().currentUser;
    if (user) {
        db.collection("orders").add({
            userId: user.uid,
            status: "Pending",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("Order placed successfully!");
        }).catch((error) => {
            console.error("Error placing order:", error);
        });
    } else {
        alert("Please log in to place an order.");
    }
}
