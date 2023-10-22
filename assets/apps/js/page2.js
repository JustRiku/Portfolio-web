//CURSOR

let cursor = document.querySelector(".cursor");
let cursor2 = document.querySelector(".cursor2");
document.addEventListener("mousemove", (e) =>{
    cursor.style.cssText = cursor2.style.cssText = "left: " + (e.clientX - 12) + "px; top: " + (e.clientY - 12) + "px;"
})

document.addEventListener('click', () =>{
    cursor.classList.add('expand');

    setTimeout(() => {
        cursor.classList.remove("expand")
    }, 500);
});

// PAGE THEMES

let Swtich = document.querySelectorAll('.switch');

Swtich.forEach(Element => {
    Element.addEventListener('click', () => {
        document.body.classList.add('bright');
        if(document.body.classList.contains('dark')){
            document.body.classList.remove('dark');
            document.body.classList.add('bright');
        }else if(document.body.classList.contains('bright')){
            document.body.classList.remove('bright');
            document.body.classList.add('dark');
        };
        let theme;
        if(document.body.classList.contains("dark")){
            // console.log("Dark theme");
            theme = "dark";
        }else{
            // console.log("Bright theme");
            theme = "bright";
        }
        
        localStorage.setItem("pageTheme", JSON.stringify(theme));
        Element.classList.toggle('active');
    });
    
});

// CHANGE PAGE TITLE

let newTitle = (string) => {
    let title = string;
    document.title = title;
}

let getTheme = JSON.parse(localStorage.getItem("pageTheme"));
// console.log(getTheme);

let switch1 = document.querySelector("#switch");
let switch2 = document.querySelector('#switch2');
if(getTheme === "bright"){
    document.body.classList.remove('dark');
    document.body.classList.add('bright');
    switch1.classList.add('active');
    switch2.classList.add('active');
}

// FETCH JSON DATA

let obtainParam = (url) => {
    let urlParam = String(url.match(/\?+.+/));
    urlParam = urlParam.replace("?id=", "");
    return urlParam;
};

let param = obtainParam(document.URL);

let proyectsFlex = document.querySelector(".proyects-flex");

fetch('assets/apps/json/proyects.json')
.then(res => res.json())
.then(data =>{
    let proyectDynamic = data[Number(param)];
    // console.log(proyectDynamic);
    proyectsFlex.innerHTML= `
            <div class="flex-name">
                <div>
                    <h1 class="proyect-name">${proyectDynamic.name}</h1>
                    <h3 class="category-name">${proyectDynamic.category}</h3>
                </div>
                <div class="proyect-resume">
                    <p class="resume">${proyectDynamic.resume}</p>
                </div>
            </div>
            <div class="proyect-video">
                <video class="video" src="" controls></video>
            </div>
            <div class="first-image"><img src="${proyectDynamic.images[0].img}"></img></div>
            <div class="proyect-flex-container">
                <div class="proyects-img-container"></div>
                <div class="proyects-info">${proyectDynamic.text}</div>
            </div>
            <div class="proyect-grid"></div>`;
    let proyectVideo = document.querySelector(".video");
    let proyectsInfo = document.querySelector(".proyects-info");
    if(proyectDynamic.text == ""){
        proyectsInfo.style.display = "none";
        document.querySelector(".proyects-img-container").style.width = "100%";
    }
    if(proyectDynamic.video != ""){
        proyectVideo.src = proyectDynamic.video;
    }else{
        proyectVideo.classList.add("hide-video");
    }
    let i = 1;
    let proyectsImg = document.querySelector(".proyects-img-container");
    do{
        let push = `<div class="proyect-img"><img src ="${proyectDynamic.images[i].img}"/></div>`;
        proyectsImg.innerHTML += push;
        i++;
        if(i >= 5){
            let gridImg = document.querySelector('.proyect-grid');
            do{
                let push = `<div class="proyect-img"><img src ="${proyectDynamic.images[i].img}"/></div>`;
                gridImg.innerHTML += push;
                i++;
            }while(proyectDynamic.images[i]!= null);
        }
    }while(proyectDynamic.images[i] != null);
    newTitle(proyectDynamic.name);
    return proyectDynamic;
});

//SHOW MENU END PAGE

let proyectsMenu = document.querySelector('.menu-2');

let showMenu = () =>{
    let {scrollTop, scrollHeight} = document.documentElement;
    let scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 +'%';
    if(window.innerWidth <= 950){
        return false;
    }else if((scrollTop / (scrollHeight - window.innerHeight) * 100) >= 90){
        proyectsMenu.classList.add('fixed');
    }else proyectsMenu.classList.remove('fixed');
}
document.addEventListener('scroll', showMenu)

//PROYECT CONTROLLS

let previous = document.querySelector(".previous");
let nextProyect = document.querySelector(".next-proyect");

let id = Number(param);

previous.addEventListener('click', () => {
    id--;
    window.open(`proyect.html?id=${id}`, '_self');
})

nextProyect.addEventListener('click', () => {
    id++;
    window.open(`proyect.html?id=${id}`, '_self');
})
window.onload = () => {
    if(id >= 14){
        nextProyect.classList.add('invisible');
    }else if(id <=0){
        previous.classList.add('invisible');
    }else{
        nextProyect.classList.remove('invisible');
        previous.classList.remove('invisible');
    }
}


let hamburger = document.querySelector(".hamburger");
let navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener('click', () =>{
    hamburger.classList.toggle("on")
    navMenu.classList.toggle("on");
})