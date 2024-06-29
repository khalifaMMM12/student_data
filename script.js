document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');
    const searchBar = document.getElementById('searchBar');

    let students = JSON.parse(localStorage.getItem('students')) || [];
    let editIndex = null;

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const regNo = document.getElementById('regNo').value;
        const grade = document.getElementById('grade').value;

        const student = { name, regNo, grade };

        if (editIndex !== null) {
            students[editIndex] = student;
            editIndex = null;
        } else {
            students.push(student);
        }

        localStorage.setItem('students', JSON.stringify(students));
        studentForm.reset();
        displayStudents();
    });

    // studentList.addEventListener('click', (e) => {
    //     if (e.target.tagName === 'BUTTON') {
    //         const index = e.target.parentElement.dataset.index;
    //         if (e.target.textContent === 'Edit') {
    //             editIndex = index;
    //             const student = students[index];
    //             document.getElementById('name').value = student.name;
    //             document.getElementById('regNo').value = student.regNo;
    //             document.getElementById('grade').value = student.grade;
    //         } else if (e.target.textContent === 'Delete') {
    //             students.splice(index, 1);
    //             localStorage.setItem('students', JSON.stringify(students));
    //             displayStudents();
    //         }
    //     }
    // });

    searchBar.addEventListener('input', () => {
        const searchText = searchBar.value.toLowerCase();
        const filteredStudents = students.filter(student => 
            student.name.toLowerCase().includes(searchText)
        );
        displayStudents(filteredStudents);
    });

    function displayStudents(filteredStudents = students) {
        studentList.innerHTML = '';
        filteredStudents.forEach((student, index) => {
            const studentItem = document.createElement('li');
            studentItem.className = 'student-item';
            studentItem.dataset.index = index;
            studentItem.innerHTML = `
                ${student.name} (${student.regNo} Reg No., Grade: ${student.grade})
                <button>Edit</button>
                <button>Delete</button>
            `;
            studentList.appendChild(studentItem);
        });
    }

    displayStudents();
});
