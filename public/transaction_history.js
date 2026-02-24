document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to view your transaction history.');
    window.location.href = 'login.html';
    return;
  }

  fetchTransactionHistory();
});

async function fetchTransactionHistory() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('/api/orders', {
      headers: {
        'Authorization': token
      }
    });

    if (response.ok) {
      const orders = await response.json();
      displayOrders(orders);
    } else {
      document.getElementById('history-content').innerHTML = '<p>Error loading transaction history.</p>';
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    document.getElementById('history-content').innerHTML = '<p>Error loading transaction history.</p>';
  }
}

function displayOrders(orders) {
  const content = document.getElementById('history-content');
  if (orders.length === 0) {
    content.innerHTML = '<p>No transactions found.</p>';
    return;
  }

  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Products</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
  `;

  orders.forEach(order => {
    const products = order.products.map(p => `${p.product.name} (x${p.quantity})`).join(', ');
    const date = new Date(order.createdAt).toLocaleDateString();
    tableHTML += `
      <tr>
        <td>${order._id}</td>
        <td>${products}</td>
        <td>$${order.total.toFixed(2)}</td>
        <td>${order.status}</td>
        <td>${date}</td>
      </tr>
    `;
  });

  tableHTML += '</tbody></table>';
  content.innerHTML = tableHTML;
}

function exportToExcel() {
  const table = document.querySelector('table');
  if (!table) {
    alert('No data to export.');
    return;
  }

  const wb = XLSX.utils.table_to_book(table, { sheet: 'Transaction History' });
  XLSX.writeFile(wb, 'transaction_history.xlsx');
}

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text('Transaction History', 20, 20);

  const table = document.querySelector('table');
  if (!table) {
    alert('No data to export.');
    return;
  }

  // Simple PDF export - convert table to text
  let y = 40;
  const rows = table.querySelectorAll('tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('th, td');
    let x = 20;
    cells.forEach(cell => {
      doc.text(cell.textContent, x, y);
      x += 50; // Adjust spacing
    });
    y += 10;
  });

  doc.save('transaction_history.pdf');
}
