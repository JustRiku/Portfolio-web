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

let Swtich = document.querySelector('#switch');

Swtich.addEventListener('click', () => {
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
    Swtich.classList.toggle('active');
});

let getTheme = JSON.parse(localStorage.getItem("pageTheme"));
// console.log(getTheme);

if(getTheme === "bright"){
    document.body.classList.remove('dark');
    document.body.classList.add('bright');
    Swtich.classList.add('active');
}

// FETCH JSON DATA AND OPEN PROYECTS

let obtainParam = (url) => {
    let urlParam = String(url.match(/\?+.+/));
    urlParam = urlParam.replace("?id=", "");
    return urlParam;
};
let openProyect = (e) => {
    window.open(`proyect.html?id=${e.currentTarget.id}`, '_self');

};

let param = obtainParam(document.URL);
// console.log(param);
let dynamic = document.querySelector("#dynamic");

fetch('assets/apps/json/data.json')
.then(res => res.json())
.then(data =>{
    let workDynamic = data[Number(param)];
    // console.log(workDynamic);
    dynamic.innerHTML= `
          <h1 class="work-title">${workDynamic.category}</h1>
          <div class="work-grid"></div>`;
    let grid = document.querySelector(".work-grid");
    // console.log(workDynamic.proyects);
    let i = 0;
    do{
        let push = `<div class="proyect" id="${workDynamic.proyects[i].number}">
            <img class="proyect-img" src ="${workDynamic.proyects[i].img}" alt="${workDynamic.proyects[i].name}"/>
            <div class="proyect-overlay">
                <div class="proyect-name">${workDynamic.proyects[i].name}</div>
            </div>
            
        </div>`;
        grid.innerHTML += push;
        i++;
    }while(workDynamic.proyects[i] != null);
    return workDynamic;
})
.then(() => {
    let proyects = document.querySelectorAll('.proyect');
    proyects.forEach((item) => {
        if(item.id == "undefined"){
            let proyectOverlays = document.querySelectorAll('.proyect-overlay');
            proyectOverlays.forEach((element) => {
                element.style.zindex = -1;
                element.style.pointerEvents = "none";
            })
            let proyectImgs = document.querySelectorAll('.proyect-img');
            proyectImgs.forEach((element) => {
                element.addEventListener('click', () => {
                    document.querySelector('.popup-img').style.display = 'block';
                    document.querySelector('.popup-img img').src = element.getAttribute('src');
                })
            })
            return false;
        }else{
        item.addEventListener('click', openProyect, true)
        }
    })
});


document.querySelector('.popup-img span').onclick = () => {
    document.querySelector('.popup-img').style.display = 'none';
}

// CURSOR CHANGE COLOR
let workContainer = document.querySelector(".work-container");

workContainer.addEventListener("mouseenter", (e) => {
    cursor.classList.add('cursor-black');
})
workContainer.addEventListener("mouseleave", (e) => {
    cursor.classList.remove('cursor-black');
})

//WORK CONTROLLS

let goNext = document.querySelector(".go-next");
let goBack = document.querySelector(".go-back");

let id = Number(param);

goBack.addEventListener('click', () => {
    if(id === 0){
    window.open(`index.html#work`, '_self');
    }else{
        id--;
        window.open(`work.html?id=${id}`, '_self');
    }
})

goNext.addEventListener('click', () => {
    id++;
    window.open(`work.html?id=${id}`, '_self');
})
window.onload = () => {
    if(id >= 5){
        goNext.classList.add('hide');
    }else{
        goNext.classList.remove('hide');
    }
}


let hamburger = document.querySelector(".hamburger");
let navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener('click', () =>{
    hamburger.classList.toggle("on")
    navMenu.classList.toggle("on");
})