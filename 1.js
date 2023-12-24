//закрыть
document.getElementById('close').addEventListener("click", function () { document.getElementById('my').classList.remove("active") })

//открыть
function openWindow() {
    this.getUsers();
    document.getElementById('my').classList.add("active");
}

function openWindow2(btn_id) {
    console.log('_______')
    document.getElementById('my').classList.add("active");
    const input1 = document.getElementById('userId');
    const input2 = document.getElementById('title');

    input1.value = list[btn_id].id;
    input2.value = list[btn_id].name;

    console.log(btn_id);
    console.log('+++++');
}


let list = [];
let users = [];
let count = 100;// id=i+count для сервера

async function getUsers() {
    if (users.length == 0) {
        await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    const user = {};
                    user.id = json[i].id;
                    user.name = json[i].name;
                    users.push(user);
                }
                var options = '';

                for (var i = 0; i < users.length; i++) {
                    options += '<option value="' + users[i].id + '">' + users[i].name + '</option>';
                }
                document.getElementById('userId').innerHTML = options;
            });
    } else {
        var options = '';

        for (var i = 0; i < users.length; i++) {
            options += '<option value="' + users[i].id + '">' + users[i].name + '</option>';
        }
        document.getElementById('userId').innerHTML = options;
    }
}

//async
async function add() {
    let jsonResponse;
    console.log('--add start');
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;
    let userId = document.getElementById('userId').value;
    if (parseInt(userId)) {
        let tmp = {};
        tmp.id = userId;
        tmp.name = title;
        tmp.check = false;
        list.push(tmp);


        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => { jsonResponse = JSON.stringify(json) });

        let user = JSON.parse(jsonResponse);
        console.log(user);
        out();
        console.log('add end');
    }
}


function out() {
    console.log('out start');
    document.getElementById('out').innerHTML = '';
    let mylist = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].check == false) {
            mylist += '<div class="content" id=' + i + '><input type="checkbox" id=' + i + ' class="checkFalse"><span>' + list[i].id + " " + list[i].name + '</span>' + '<button onclick="del(this.id)" class ="dell" id=' + i + '>удалить</button>' + '<button onclick="openWindow2(this.id)" class ="edit" id=' + i + '>Редактировать</button>' + '<br></div>';
            console.log(list[i]);
        }
    }

    document.getElementById('out').innerHTML = mylist;
    console.log('out end');
}

async function del(btn_id) {
    console.log('del start');
    console.log(btn_id);
    let index = '';
    console.log('удалено');
    console.log(list[btn_id]);
    list.splice(parseInt(btn_id), 1);
    out();
    console.log('del end');

    await fetch(`https://jsonplaceholder.typicode.com/posts/${100 + btn_id}`, {
        method: 'DELETE',
    });
}

async function edit(btn_id) {

    let tmp2 = {};

    console.log('edit start');
    let input1edit = document.getElementById('userId').value;
    let input2edit = document.getElementById('title').value;
    let input3edit = document.getElementById('body').value;

    tmp2.id = input1edit;
    tmp2.name = input2edit;
    tmp2.check = false;
    //list[btn_id] = tmp2;
    list.splice(btn_id, 1, tmp2);
    console.log(tmp2)
    console.log('edit end');
    out();

}