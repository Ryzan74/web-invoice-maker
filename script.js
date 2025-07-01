
function addRow() {
    const tbody = document.getElementById("item-body");
    const tr = document.createElement("tr");
    tr.innerHTML = \`
        <td><input type="text" class="item-name" placeholder="Nama item"/></td>
        <td><input type="number" class="item-qty" value="1"/></td>
        <td><input type="number" class="item-price" value="0"/></td>
        <td class="item-total">0</td>
    \`;
    tbody.appendChild(tr);
    updateListeners();
}

function updateListeners() {
    document.querySelectorAll(".item-qty, .item-price").forEach(el => {
        el.addEventListener("input", calculateTotal);
    });
}

function calculateTotal() {
    let grand = 0;
    document.querySelectorAll("#item-body tr").forEach(row => {
        const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
        const price = parseFloat(row.querySelector(".item-price").value) || 0;
        const total = qty * price;
        row.querySelector(".item-total").textContent = total.toFixed(2);
        grand += total;
    });
    document.getElementById("grand-total").textContent = grand.toFixed(2);
}

async function downloadInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;

    const sender = document.getElementById("sender").value;
    const client = document.getElementById("client").value;
    const note = document.getElementById("note").value;
    const dueDate = document.getElementById("due-date").value;

    doc.text("Invoice Generator Pro", 20, y);
    y += 10;
    doc.text("Pengirim: " + sender, 20, y);
    y += 10;
    doc.text("Klien: " + client, 20, y);
    y += 10;
    doc.text("Jatuh Tempo: " + dueDate, 20, y);
    y += 10;
    doc.text("Item        Qty     Harga     Total", 20, y);
    y += 10;

    document.querySelectorAll("#item-body tr").forEach(row => {
        const item = row.querySelector(".item-name").value;
        const qty = row.querySelector(".item-qty").value;
        const price = row.querySelector(".item-price").value;
        const total = (qty * price).toFixed(2);
        doc.text(\`\${item}    \${qty}    \${price}    \${total}\`, 20, y);
        y += 10;
    });

    doc.text("Total Harga: " + document.getElementById("grand-total").textContent, 20, y);
    y += 10;
    doc.text("Catatan: " + note, 20, y + 10);
    doc.save("invoice_pro.pdf");
}

updateListeners();
calculateTotal();
