// Signup Form Script (index2.html)
document.getElementById('addStudentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();
    const cnic = document.getElementById('cnic-input').value.trim();

    const errors = [];
    if (!username) errors.push("Name is required.");
    if (!validateEmail(email)) errors.push("Invalid email format.");
    if (!password || password.length < 6) errors.push("Password must be at least 6 characters long.");
    if (!cnic.match(/^\d{5}-\d{7}-\d{1}$/)) errors.push("Invalid CNIC format. Use #####-#######-#.");

    if (localStorage.getItem('student_' + cnic)) {
        errors.push("Student with this CNIC already exists.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    const student = { username, email, password, cnic };
    localStorage.setItem('student_' + cnic, JSON.stringify(student));
    alert("Signup successful!");
    this.reset();
});

// Login Form Script (index.html)
document.getElementById('addStudentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();

    let studentFound = null;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('student_')) {
            const student = JSON.parse(localStorage.getItem(key));
            if (student.email === email && student.password === password) {
                studentFound = student;
                break;
            }
        }
    }

    if (studentFound) {
        alert(`Welcome back, ${studentFound.username}!`);
        window.location.href = './index3.html';
        // Redirect or show dashboard
    } else {
        alert("Invalid email or password.");
    }
});

// Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
