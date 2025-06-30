const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((exp, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
      ${exp.amount} - ${exp.description} - ${exp.category}
      <div>
        <button class="btn btn-sm btn-danger me-2" onclick="deleteExpense(${index})">Delete</button>
        <button class="btn btn-sm btn-warning" onclick="editExpense(${index})">Edit</button>
      </div>
    `;
    expenseList.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  expenses.push({ amount, description, category });
  saveExpenses();
  renderExpenses();
  form.reset();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

function editExpense(index) {
  const exp = expenses[index];
  document.getElementById('amount').value = exp.amount;
  document.getElementById('description').value = exp.description;
  document.getElementById('category').value = exp.category;

  // Remove old entry
  deleteExpense(index);
}

renderExpenses();
