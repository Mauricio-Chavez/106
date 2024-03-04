console.log("login.js loaded");

$("#login").click(function(event){
    event.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();
    let users = readItems("users");
    console.log(email,password)
    let user = users.find(user => user.email === email && user.password === password);
    if(user){
        sessionStorage.setItem("user",JSON.stringify(user));
        window.location.href = "task.html";
    }else{
        alert("Invalid credentials");
    }
})