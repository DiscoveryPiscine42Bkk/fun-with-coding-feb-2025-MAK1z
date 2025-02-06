function setCookie(cookid, cookvalue) {
    var d = new Date();
    d.setMonth(d.getFullYear() + 1000);
    document.cookie = cookid + '=' + cookvalue + '; expires=' + d.toUTCString() + '; path=/';
}

function deleteList(cookid) {
    document.cookie = cookid + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}

function addTask() {
    var data = prompt("input-something");
    let id = Date.now();
    if (data && data.trim() !== "") {
        addList(data, id);
        setCookie(id, data);
    }
}

function addList(value, id = "None") {
    var list = document.getElementById("to_list");
    var div = document.createElement("div");
    div.textContent = value;
    div.id = id;

    if (value === '' && id === 'None') {
        alert('Plsssssssssssssss input');
    } else {
        list.prepend(div);
    }

    div.onclick = function(e) {
        if (confirm(`${this.id}, Are you sure you want to delete this task?`)) {
            deleteList(this.id);
            div.remove();
        }
    };
}

function checkList() {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie) {
            let parts = cookie.split('=');
            let id = parts[0].trim();
            let value = parts[1];
            if(value){
                addList(value, id);
            }
        }
    }
}

window.onload = checkList;