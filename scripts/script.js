$(document).ready(function(){
    $("#hidenBtn").click(function(){
        $("#form").toggle();
    });
});
$(document).ready(function(){
    $("#btn-completed").click(function(){
        $("#completedTasks").toggle();
    });
});
$(document).ready(function(){
    $("#btn-progress").click(function(){
        $("#progressTasks").toggle();
    });
});
$(document).ready(function(){
    $("#btn-pending").click(function(){
        $("#tasks").toggle();
    });
});
class Task{
    constructor(title, description, color,date,budget, status,important,user,category){
        this.title = title;
        this.description = description;
        this.date = date;
        this.color = color;
        this.budeget = budget;
        this.status = status;
        this.important = important;
        this.name = user;
        this.category = category;
    }

}

function testRequest(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        dataType: "json",
        success: function(response){
            console.log(response);
        },
        errorr: function(error){
            console.log(error);
        }
    });
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
    let category = $("#category").val();
    let user = JSON.parse(sessionStorage.getItem("user"));
    let task = new Task(title,description,color,date,budeget,status,important,user.email,category);
    
    saveArray(task, "tasks");
    
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(response){
            console.log(response);
            displayTasks();
            displayProgressTasks();
            displayCompletedTasks();
        },
        error: function(error){
            console.log(error);
        }
    });

    $("#form")[0].reset();
})
$("#tasks,#progressTasks,#completedTasks").on("click", ".fa-star", function(){
    let taskId = $(this).closest('.card').data('task');
    let important = $(this).closest('.card').data('important');
    console.log(taskId);
    $.ajax({
        type:"Patch",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${taskId}/`,
        data: JSON.stringify({important: !important}),
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            displayTasks();
            displayProgressTasks();
            displayCompletedTasks();
        },
        error: function(error){
            console.log(error);
        }

    })
    // tasks[index].important = !tasks[index].important; 
    displayTasks();
});
function deleteAllTasks(){
    let user = JSON.parse(sessionStorage.getItem("user"));
    $.ajax({
        type: "DELETE",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/clear/${user.email}`,
        success: function(response){
            console.log(response);
            displayTasks();
            displayProgressTasks();
            displayCompletedTasks();
        },
        error: function(error){
            console.log(error);
        }
    });
}
function deleteTask(button){
    let taskId = $(button).closest('.card').data('task');
    console.log(taskId);
    $.ajax({
        type: "DELETE",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${taskId}`,
        success: function(response){
            console.log(response);
            displayTasks();
            displayProgressTasks();
            displayCompletedTasks();
        },
        error: function(error){
            console.log(error);
        }
    });
}
function changeStatus(button,i){
    let taskId = $(button).closest('.card').data('task');
    let status = $('#selectStatus' + i).val();
    console.log(taskId);
    console.log(status);
    $.ajax({
        type:"Patch",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${taskId}/`, 
        data: JSON.stringify({status: status}),
        contentType: "application/json",
        dataType: "json",
        success: function(response){
            console.log(response);
            displayTasks();
            displayProgressTasks();
            displayCompletedTasks();
        },
        error: function(error){
            console.log(error);
        }

    })
    // tasks[index].important = !tasks[index].important; 
    displayTasks();
}
function displayTasks(){
    let user = JSON.parse(sessionStorage.getItem("user"));
    $.ajax({
        type: "GET",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${user.email}`,
        dataType: "json",
        success: function(response){
            let tasks = response;
            tasks.sort(function(a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            let html = "";
            for(let i = 0; i < tasks.length; i++){
                let task = tasks[i];
                if(task.status === "Pending") {
                    let starIcon = task.important ? '<i class="fas fa-star" style="color: #f39708;"></i>' : '<i class="far fa-star" style="color: #f39708;"></i>';;
                    html += `<div class="card" style="border: 3px solid ${task.color};" data-task="${task._id}" data-important="${task.important}">
                                <div class="card-body">
                                    <h5 class="card-title">${task.title} ${starIcon}</h5>
                                    <p class="card-text">${task.description}</p>
                                    <p class="card-text"><span class="bold">Category:</span> ${task.category}</p>
                                    <p class="card-text"><span class="bold">Date:</span> ${task.date}</p>
                                    <p class="card-text"><span class="bold">Budget:</span> ${task.budeget}</p>
                                    <p class="card-text"><span class="bold">Status:</span> ${task.status}</p>
                                    <div class="status-container">
                                        <select id="selectStatus${i}" class="form-control">
                                            <option value="" selected disabled>-- Status --</option>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        <button class="btn btn-success" onclick="changeStatus(this,${i})">Save</button>
                                    </div>
                                </div>
                            </div>`;
                }
            }
            $("#tasks").html(html);
        },
        error: function(error){
            console.log(error);
        }
    });
}
function displayProgressTasks(){
    let user = JSON.parse(sessionStorage.getItem("user"));
    $.ajax({
        type: "GET",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${user.email}`,
        dataType: "json",
        success: function(response){
            let tasks = response;
            tasks.sort(function(a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            let html = "";
            for(let i = 0; i < tasks.length; i++){
                let task = tasks[i];
                if(task.status === "In Progress") {
                    let starIcon = task.important ? '<i class="fas fa-star" style="color: #f39708;"></i>' : '<i class="far fa-star" style="color: #f39708;"></i>';;
                    html += `<div class="card" style="border: 3px solid ${task.color};" data-task="${task._id}" data-important="${task.important}">
                                <div class="card-body">
                                    <h5 class="card-title">${task.title} ${starIcon}</h5>
                                    <p class="card-text">${task.description}</p>
                                    <p class="card-text"><span class="bold">Category:</span> ${task.category}</p>
                                    <p class="card-text"><span class="bold">Date:</span> ${task.date}</p>
                                    <p class="card-text"><span class="bold">Budget:</span> ${task.budeget}</p>
                                    <p class="card-text"><span class="bold">Status:</span> ${task.status}</p>
                                    <div class="status-container">
                                        <select id="selectStatus${i}" class="form-control">
                                            <option value="" selected disabled>-- Status --</option>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        <button class="btn btn-success" onclick="changeStatus(this,${i})">Save</button>
                                    </div>
                                </div>
                            </div>`;
                }
            }
            $("#progressTasks").html(html);
        },
        error: function(error){
            console.log(error);
        }
    });
}


function displayCompletedTasks(){
    let user = JSON.parse(sessionStorage.getItem("user"));
    $.ajax({
        type: "GET",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${user.email}`,
        dataType: "json",
        success: function(response){
            let tasks = response;
            tasks.sort(function(a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            let html = "";
            for(let i = 0; i < tasks.length; i++){
                let task = tasks[i];
                if(task.status === "Completed") {
                    let starIcon = task.important ? '<i class="fas fa-star" style="color: #f39708;"></i>' : '<i class="far fa-star" style="color: #f39708;"></i>';;
                    html += `<div class="card" style="border: 3px solid ${task.color};" data-task="${task._id}" data-important="${task.important}">
                                <div class="card-body">
                                    <h5 class="card-title">${task.title} ${starIcon}</h5>
                                    <p class="card-text">${task.description}</p>
                                    <p class="card-text"><span class="bold">Category:</span> ${task.category}</p>
                                    <p class="card-text"><span class="bold">Date:</span> ${task.date}</p>
                                    <p class="card-text"><span class="bold">Budget:</span> ${task.budeget}</p>
                                    <p class="card-text"><span class="bold">Status:</span> ${task.status}</p>
                                    <div class="status-container">
                                        <select id="selectStatus${i}" class="form-control">
                                            <option value="" selected disabled>-- Status --</option>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        <button class="btn btn-success" onclick="changeStatus(this,${i})">Save</button>
                                    </div>
                                </div>
                            </div>`;
                }
            }
            $("#completedTasks").html(html);
        },
        error: function(error){
            console.log(error);
        }
    });
}




function init(){
    displayTasks();
    displayProgressTasks();
    displayCompletedTasks();
}
window.onload = init;