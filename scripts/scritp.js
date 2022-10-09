url="https://reqres.in/api/users?delay=3";

//Progreso
function progress(){
    p = `<div class="text-center">
            <div class="spinner-border" role="status">
                <span class="sr-only"></span>
            </div>
        </div>`
    document.getElementById("cab").innerHTML = p;
}

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
    progress()
    fetch(url)
    .then(response => response.json())
    .then(conversion => {
        showData(conversion.data)
        saveLocalStorage(conversion.data);
    })
    }
//Mostrar datos en pantalla
function showData(data){
    showCategory(Object.keys(data[0]));
    showUsers(data);
}

function showCategory(data){
    let category =""; 
    for(i=0; i<data.length; i++){
        category +=`<div class="col-lg-2 col-xs-12 text-uppercase">
                        ${data[i]}
                    </div>`;
    }
    category = `<div class="row" style="background-color: black; color:white;">
                        ${category}
                    </div>`;
    document.getElementById("cab").innerHTML = category;
}

let color="";
function showUsers(data){
    let body ="";
    for(i = 0; i < data.length; i++){
        let cyan="cyan";
        let white="white";
        color = (i === 0 ? cyan :( i=== 1 ? white :(i === 2 ? cyan :(i ===3 ? white :(i=== 4 ? cyan : white)))));
        console.log(color)
        body += `<div class="row justify-content-center text-center" style="background-color:${color};">
                    <div class="col-lg-2 col-xs-12">
                        <p class="text-center">${data[i].id}</p>
                    </div>
                    <div class="col-lg-2 col-xs-12 justify-content-center">
                        <p class="text-center">${data[i].email}</p>
                    </div>
                    <div class="col-lg-2 col-xs-12">
                        <p class="text-center">${data[i].first_name}</p>
                    </div>
                    <div class="col-lg-2 col-xs-12">
                        <p class="text-center">${data[i].last_name}</p>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <img class="rounded-circle" src=${data[i].avatar}>
                    </div>
                </div>`
    }
    document.getElementById("body").innerHTML = body;
}

//Guardar datos localmente:
function saveLocalStorage(data){
    const users ={
        time: Date.now() + 60000,
        dates: data
    }
    localStorage.setItem("users",JSON.stringify(users));
}

