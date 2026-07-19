// ==========================================
// STUDY PLANNER
// ==========================================

function addTask() {

    let task = document.getElementById("taskInput").value.trim();

    if (task === "") {

        alert("Please enter a task.");

        return;

    }

    let li = document.createElement("li");

    li.textContent = task;

    let deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.onclick = function () {

        li.remove();

        saveTasks();

    };

    li.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(li);

    document.getElementById("taskInput").value = "";

    saveTasks();

}


// ==========================================
// LOCAL STORAGE - STUDY PLANNER
// ==========================================

function saveTasks() {

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(function(item) {

        tasks.push(item.firstChild.textContent);

    });

    localStorage.setItem("studyTasks", JSON.stringify(tasks));

}

function loadTasks() {

    let taskList = document.getElementById("taskList");

    if (!taskList) return;

    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

    tasks.forEach(function(task) {

        let li = document.createElement("li");

        li.textContent = task;

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {

            li.remove();

            saveTasks();

        };

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

}

// ==========================================
// ASSIGNMENT TRACKER
// ==========================================


function addAssignment() {


    let assignment =
        document.getElementById("assignmentInput").value;


    let dueDate =
        document.getElementById("dueDate").value;



    if (assignment === "" || dueDate === "") {


        alert("Please fill in all fields.");


        return;


    }



    let row = document.createElement("tr");



    let assignmentCell = document.createElement("td");

    assignmentCell.textContent = assignment;



    let dueDateCell = document.createElement("td");

    dueDateCell.textContent = dueDate;



    let actionCell = document.createElement("td");



    let deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";



    deleteButton.onclick = function () {

    row.remove();

    saveAssignments();

};



    actionCell.appendChild(deleteButton);



    row.appendChild(assignmentCell);

    row.appendChild(dueDateCell);

    row.appendChild(actionCell);



    document.getElementById("assignmentTable").appendChild(row);



    document.getElementById("assignmentInput").value = "";

    document.getElementById("dueDate").value = "";

    saveAssignments();


}

// ==========================================
// LOCAL STORAGE - ASSIGNMENT TRACKER
// ==========================================

function saveAssignments() {

    let assignments = [];

    document.querySelectorAll("#assignmentTable tr").forEach(function(row) {

        let assignment = row.cells[0].textContent;
        let dueDate = row.cells[1].textContent;

        assignments.push({
            assignment: assignment,
            dueDate: dueDate
        });

    });

    localStorage.setItem("assignments", JSON.stringify(assignments));

}

function loadAssignments() {

    let table = document.getElementById("assignmentTable");

    if (!table) return;

    table.innerHTML = "";

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    assignments.forEach(function(item) {

        let row = document.createElement("tr");

        let assignmentCell = document.createElement("td");
        assignmentCell.textContent = item.assignment;

        let dueDateCell = document.createElement("td");
        dueDateCell.textContent = item.dueDate;

        let actionCell = document.createElement("td");

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {

            row.remove();
            saveAssignments();

        };

        actionCell.appendChild(deleteButton);

        row.appendChild(assignmentCell);
        row.appendChild(dueDateCell);
        row.appendChild(actionCell);

        table.appendChild(row);

    });

}


// ==========================================
// WELLNESS CHECK
// ==========================================


function checkStress() {


    let level = document.getElementById("stressLevel").value;


    let advice = document.getElementById("advice");



    if (level === "") {


        advice.textContent = 
        "Please select your stress level.";


    }


    else if (level === "Low") {


        advice.textContent =
        "Great! Keep maintaining your healthy study habits.";


    }


    else if (level === "Medium") {


        advice.textContent =
        "Take short breaks, stay hydrated, and avoid long study sessions without resting.";


    }


    else if (level === "High") {


        advice.textContent =
        "Take a break, talk to a friend or lecturer, get enough sleep, and consider reducing your workload for today.";


    }


}



// ==========================================
// CONTACT FORM VALIDATION
// ==========================================


function validateForm() {


    let name = document.getElementById("name").value.trim();


    let email = document.getElementById("email").value.trim();


    let message = document.getElementById("message").value.trim();



    if (name === "") {


        alert("Please enter your name.");

        return false;


    }



    if (email === "") {


        alert("Please enter your email.");

        return false;


    }



    if (!email.includes("@")) {


        alert("Please enter a valid email.");

        return false;


    }



    if (message === "") {


        alert("Please enter your message.");

        return false;


    }



    alert("Message sent successfully!");


    return false;


}


// ==========================================
// VUE COMMUNITY FORUM + LOCAL STORAGE
// ==========================================

if (document.getElementById("app")) {

    const { createApp } = Vue;

    createApp({

        data() {

            return {

                newComment: "",

                comments: JSON.parse(localStorage.getItem("communityComments")) || []

            };

        },

        methods: {

            addComment() {

                if (this.newComment.trim() === "") {

                    alert("Please enter a comment.");

                    return;

                }

                this.comments.push(this.newComment);

                localStorage.setItem(
                    "communityComments",
                    JSON.stringify(this.comments)
                );

                this.newComment = "";

            },

            deleteComment(index) {

                this.comments.splice(index, 1);

                localStorage.setItem(
                    "communityComments",
                    JSON.stringify(this.comments)
                );

            }

        }

    }).mount("#app");

}




// ==========================================
// DARK MODE
// ==========================================


const themeButton = document.getElementById("themeToggle");



if(themeButton) {


    themeButton.addEventListener("click", function() {



        document.body.classList.toggle("dark-mode");



        if(document.body.classList.contains("dark-mode")) {



            localStorage.setItem("theme","dark");


            themeButton.textContent = "☀️";



        }

        else {



            localStorage.setItem("theme","light");


            themeButton.textContent = "🌙";


        }



    });


}




// Load Saved Theme


if(localStorage.getItem("theme") === "dark") {


    document.body.classList.add("dark-mode");


}

// ==========================================
// LOAD SAVED DATA
// ==========================================

if (document.getElementById("taskList")) {

    loadTasks();

}

if (document.getElementById("assignmentTable")) {

    loadAssignments();

}

// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if(menuToggle && navMenu){

    menuToggle.addEventListener("click", function(){

        navMenu.classList.toggle("active");

    });

}