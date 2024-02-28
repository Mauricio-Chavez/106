$(document).ready(function(){
    $("#hidenBtn").click(function(){
        $("#form").toggle();
    });
});

class Task{
    constructor(title, description, color,date,budget, status,important){
        this.title = title;
        this.description = description;
        this.date = date;
        this.color = color;
        this.budeget = budget;
        this.status = status;
        this.important = important;
    }

}

$("#saveTask").click(function(event){
    event.preventDefault();
    let title = $("#title").val();
    let description = $("#description").val();
    let date = $("#date").val();
    let color = $("#color").val();
    let budeget = $("#budget").val();
    let status = $("#status").val();
    let important = $("#important").is(":checked"); 
    let task = new Task(title,description,color,date,budeget,status,important);
    
    saveArray(task, "tasks");
    displayTasks();
    $("#form")[0].reset();
})
$("#list").on("click", ".fa-star", function(){
    let index = $(this).closest(".card").index();
    let tasks = readItems("tasks");
    tasks[index].important = !tasks[index].important; 
    updateStorage(tasks, "tasks");
    displayTasks();
});

function displayTasks(){
    let tasks = readItems("tasks");
    let html = "";
    for(let task of tasks){
        let starIcon = task.important ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';;
        html += `<div class="card" style="background-color:${task.color}">
                    <div class="card-body">
                        <h5 class="card-title">${task.title} ${starIcon}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text">Date: ${task.date}</p>
                        <p class="card-text">Budget: ${task.budeget}</p>
                        <p class="card-text">Status: ${task.status}</p>
                    </div>
                </div>`;
    }
    $("#list").html(html);
}

displayTasks();