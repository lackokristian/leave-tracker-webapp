function addEmployee(name) {
    const li = document.createElement('li');
    li.textContent = name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
        li.remove();
        // Remove from dropdown
        const options = document.querySelectorAll('#employee option');
        options.forEach(opt => {
            if (opt.value === name) opt.remove();
        });
    };

    li.appendChild(deleteBtn);
    document.getElementById('employeeList').appendChild(li);

    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    document.getElementById('employee').appendChild(option);
}

document.getElementById('addEmployeeBtn').addEventListener('click', () => {
    const input = document.getElementById('newEmployee');
    const name = input.value.trim();
    if (name) {
        addEmployee(name);
        input.value = '';
    }
});


function attachDeleteButtons() {
    const listItems = document.querySelectorAll('#employeeList li');
    listItems.forEach(li => {
        const name = li.textContent.trim();
        li.textContent = name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            li.remove();
            const options = document.querySelectorAll('#employee option');
            options.forEach(opt => {
                if (opt.value === name) opt.remove();
            });
        };

        li.appendChild(deleteBtn);
    });
}

// Call this after the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    attachDeleteButtons();
});
