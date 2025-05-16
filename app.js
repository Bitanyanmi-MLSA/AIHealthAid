// app.js
// Handles form submission and dashboard update

document.addEventListener('DOMContentLoaded', function() {
    const mealForm = document.getElementById('mealForm');
    const dashboardBody = document.querySelector('#dashboard tbody');
    // Load submissions from localStorage or start with empty array
    let submissions = JSON.parse(localStorage.getItem('mealSubmissions') || '[]');

    // On page load, update dashboard
    updateDashboard();

    mealForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const arrivalDate = document.getElementById('arrival-date').value;
        const arrival = document.getElementById('arrival').value;

        // Get all checked breakfast options
        const breakfastChecked = Array.from(document.querySelectorAll('input[name="breakfast"]:checked')).map(cb => cb.value);
        // Get all checked lunch options
        const lunchChecked = Array.from(document.querySelectorAll('input[name="lunch"]:checked')).map(cb => cb.value);
        // Get all checked supper options
        const supperChecked = Array.from(document.querySelectorAll('input[name="supper"]:checked')).map(cb => cb.value);
        // Get all checked drinks options
        const drinksChecked = Array.from(document.querySelectorAll('input[name="drinks"]:checked')).map(cb => cb.value);

        if (name && arrivalDate && arrival && breakfastChecked.length && lunchChecked.length && supperChecked.length && drinksChecked.length) {
            const entry = {
                name,
                arrivalDate,
                arrival,
                breakfast: breakfastChecked.join(', '),
                lunch: lunchChecked.join(', '),
                supper: supperChecked.join(', '),
                drinks: drinksChecked.join(', ')
            };
            submissions.push(entry);
            // Save to localStorage
            localStorage.setItem('mealSubmissions', JSON.stringify(submissions));
            updateDashboard();
            mealForm.reset();
        } else {
            alert('Please enter your name, expected day and time of arrival, and select at least one option for each meal and drink.');
        }
    });

    function updateDashboard() {
        dashboardBody.innerHTML = '';
        submissions.forEach(sub => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sub.name}</td>
                <td>${sub.arrivalDate || ''} ${sub.arrival || ''}</td>
                <td>${sub.breakfast}</td>
                <td>${sub.lunch}</td>
                <td>${sub.supper}</td>
                <td>${sub.drinks || ''}</td>
            `;
            dashboardBody.appendChild(row);
        });
    }
    });
