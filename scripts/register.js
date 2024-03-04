
class User {
    constructor(name,email,password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.categories = [];
    }
}

$("#register").click(function (event) {
    event.preventDefault();
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let user = new User(name,email,password);
    saveArray(user,"users");
    window.location.href = "index.html";
});

