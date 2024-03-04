function saveArray(item,key) { 
    let itemsArray = readItems(key);
    itemsArray.push(item);
    let val = JSON.stringify(itemsArray);
    localStorage.setItem(key,val);
}

function readItems(key){
    let data = localStorage.getItem(key);
    if(!data){
        return [];
    }else{
        let list = JSON.parse(data);
        return list;
    }
}
function updateStorage(task, key) { 
    let val = JSON.stringify(task);
    localStorage.setItem(key,val);
}
function signOut() {
    sessionStorage.removeItem("user");
    window.location.href = "index.html";
}


function getCategories() {
    let categories = JSON.parse(sessionStorage.getItem("user")).categories;
    let options = "";
    categories.forEach(category => {
        options += `<option value="${category}">${category}</option>`;
    });
    $("#category").html(options);
}

getCategories();