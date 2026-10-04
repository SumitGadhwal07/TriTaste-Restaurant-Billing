let cart = [];

function addItem(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateBill();
}

function updateBill() {
    let billItems = document.getElementById("billItems");
    billItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${itemTotal.toFixed(2)}</td>
            <td>
                <button class="delete-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </td>
        `;

        billItems.appendChild(row);
    });

    let gst = subtotal * 0.05;
    let total = subtotal + gst;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("gst").innerText = gst.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);

    let customer = document.getElementById("customerName").value;
    let table = document.getElementById("tableNumber").value;

    document.getElementById("billCustomer").innerText = customer || "---";
    document.getElementById("billTable").innerText = table || "---";
}

function removeItem(index) {
    cart.splice(index, 1);
    updateBill();
}

function clearBill() {
    cart = [];
    document.getElementById("customerName").value = "";
    document.getElementById("tableNumber").value = "";
    updateBill();
}

function generateBill() {
    if (cart.length === 0) {
        alert("Please add items to the order.");
        return;
    }

    let customer = document.getElementById("customerName").value;

    if (customer === "") {
        alert("Please enter customer name.");
        return;
    }

    alert("Bill Generated Successfully!\n\nThank you for visiting TriTaste!");
}

document.getElementById("customerName").addEventListener("input", updateBill);
document.getElementById("tableNumber").addEventListener("input", updateBill);
