function saveTask() {
    console.log("saveTask");
    const title = $("#inputTile").val();
    const description = $("#inputDescription").val();
    const date = $("#inputDate").val();
    const color = $("#inputColor").val();
    const budget = $("#inputBudget").val();
    const status = $("#inputStatus").val();
    const important = $("#inputImportant").is(":checked");
    console.log(title,description,date,color,budget,status,important)
    //create task
    let x =Task(title,description,date,color,budget,status,important)
}


function init(){
    console.log("This is the task manager app!");
    $("btnSave").click(saveTask);
    
}

window.onload = init();
