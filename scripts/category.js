
$("#btn-category").click(function(event){
    event.preventDefault();
    let category = $("#categoryName").val();
    $("#categoryName").val("");
    let user = JSON.parse(sessionStorage.getItem("user"));
    user.categories.push(category);
    sessionStorage.setItem("user",JSON.stringify(user));
    let users = readItems("users");
    let index = users.findIndex(u => u.email === user.email);
    users[index].categories.push(category);
    updateStorage(users,"users");
    displayCategories();
    displayCounterCategories();
});

function displayCategories() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let categories = user.categories;
    console.log(categories);
    let table = "";
    categories.forEach((category,index) => {
        table += `
        <tr>
            <td>${category}</td>
            <td><button class="btn btn-danger" onclick="deleteCategory(${index})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
    });
    $("#categories").html(table);

}


function deleteCategory(index) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    user.categories.splice(index,1);
    sessionStorage.setItem("user",JSON.stringify(user));
    let users = readItems("users");
    let userIndex = users.findIndex(u => u.email === user.email);
    users[userIndex].categories.splice(index,1);
    updateStorage(users,"users");
    displayCategories();
    displayCounterCategories();
}


function displayCounterCategories() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    $("#counter").html(user.categories.length);
}
displayCategories();
displayCounterCategories();