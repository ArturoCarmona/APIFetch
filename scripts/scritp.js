url="https://reqres.in/api/users?delay=3";

//Verificar si ya existe LocalStorage:
//Se activa funcion Fetch para conseguir datos
function getUsers(){
    const localData = JSON.parse(localStorage.getItem("users"));
    if (localData && localData.time > Date.now()){
        showData(localData.dates);
    }
    else solicitudFetch()
}

//Solicitud Fetch
function solicitudFetch(){
    fetch(url)
    .then(response => response.json())
    .then(conversion => {
        showData(conversion.data)
        saveLocalStorage(conversion.data);
    })
    }
//Mostrar datos en pantalla
function showData(data){
    let category = `<tr><th>ID</th>
    <th>EMAIL</th>
    <th>FIRST NAME</th>
    <th>LAST NAME</th>
    <th>AVATAR</th></tr>`;
    let tab = "";
    for (i=0; i < data.length ; i++){
        tab += `<tr><td>${data[i].id}</td>
        <td>${data[i].email}</td>
        <td>${data[i].first_name}</td>
        <td>${data[i].last_name}</td>
        <td><img src=${data[i].avatar}></td></tr>`
    }
    document.getElementById("cab").innerHTML = category;
    document.getElementById("tabla").innerHTML = tab;
}

//Guardar datos localmente:
function saveLocalStorage(data){
    const users ={
        time: Date.now() + 60000,
        dates: data
    }
    localStorage.setItem("users",JSON.stringify(users));
}

