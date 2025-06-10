const holidays = {
    "2024-01-01": "New Year Day",
    "2024-03-29": "Good Friday",
    "2024-04-01": "Easter Monday",
    "2024-05-09": "Ascension Day",
    "2024-05-20": "Whit Monday",
    "2024-06-05": "Constitution Day",
    "2024-12-25": "Christmas Day",
    "2024-12-26": "Boxing Day"
};

let currentDate = new Date();

function renderCalendar(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = (firstDay === 0) ? 6 : firstDay - 1; // Adjust for Monday start

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    document.getElementById("monthYear").textContent =
        date.toLocaleString('default', { month: 'long' }) + " " + year;

    const calendarBody = document.getElementById("calendarBody");
    calendarBody.innerHTML = "";

    let row = document.createElement("tr");
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("td");
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        cell.textContent = day;

        if (holidays[dateStr]) {
            cell.classList.add("holiday");
            cell.title = holidays[dateStr];
        }

        row.appendChild(cell);

        if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }
}

document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);
