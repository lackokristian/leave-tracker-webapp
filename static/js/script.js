const API_URL = 'http://localhost:5000/employees'; // Change this if deployed

async function fetchEmployees() {
  const res = await fetch(API_URL);
  return res.json();
}

async function addEmployeeToServer(name) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return res.json();
}

async function deleteEmployeeFromServer(name) {
  await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
    method: 'DELETE'
  });
}

function renderEmployees(employees) {
  const list = document.getElementById('employeeList');
  const dropdown = document.getElementById('employee');
  list.innerHTML = '';
  dropdown.innerHTML = '';

  employees.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = async () => {
      await deleteEmployeeFromServer(name);
      const updated = await fetchEmployees();
      renderEmployees(updated);
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);

    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    dropdown.appendChild(option);
  });
}

document.getElementById('addEmployeeBtn').addEventListener('click', async () => {
  const input = document.getElementById('newEmployee');
  const name = input.value.trim();
  if (!name) return;

  await addEmployeeToServer(name);
  const employees = await fetchEmployees();
  renderEmployees(employees);
  input.value = '';
});

window.addEventListener('DOMContentLoaded', async () => {
  const employees = await fetchEmployees();
  renderEmployees(employees);
});
