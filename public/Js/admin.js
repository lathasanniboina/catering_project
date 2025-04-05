document.addEventListener("DOMContentLoaded", function () {
    fetchAllOrders();
});

function fetchAllOrders() {
    const ordersList = document.getElementById("admin-orders-list");
    db.collection("orders").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        ordersList.innerHTML = "";
        snapshot.docs.forEach((doc) => {
            const order = doc.data();
            const orderItem = document.createElement("div");
            orderItem.classList.add("order-item");
            orderItem.innerHTML = `
                <h3>Order ID: ${doc.id}</h3>
                <p>User: ${order.userId}</p>
                <p>Status: ${order.status}</p>
                <p>Placed on: ${new Date(order.timestamp.toDate()).toLocaleString()}</p>
                <select onchange="updateOrderStatus('${doc.id}', this.value)">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            `;
            ordersList.appendChild(orderItem);
        });
    });
}

function updateOrderStatus(orderId, newStatus) {
    db.collection("orders").doc(orderId).update({
        status: newStatus
    }).then(() => {
        alert("Order status updated!");
    }).catch((error) => {
        console.error("Error updating order:", error);
    });
}
