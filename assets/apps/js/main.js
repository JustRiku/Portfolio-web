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
window.onload = () => {
    if(window.innerWidth <= 768){
    cursor.style.display = 'none';
    cursor2.style.display = 'none';
}
}

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

// THEME PERSIST RELOAD
// let themeActive = document.querySelector()
// window.addEventListener("DOMContentLoaded", () => {
//     let theme = localStorage.getItem("theme");
//     if (theme === "bright") {
//         document.body.classList.remove('dark');
//         document.body.classList.add('bright');
//         localStorage.removeItem("theme");
//         localStorage.setItem("theme", "bright");
//         Swtich.classList.toggle('active');
//     }else {
//         document.body.classList.remove('bright');
//         document.body.classList.add('dark');
//         localStorage.removeItem("theme");
//         localStorage.setItem("theme", "dark");
//     };
// })



// SCROLL SECTIONS ACTIVE LINK

let sectionsActive = document.querySelectorAll('section[id]');

function scrollActive(){
    let scrollYExe = scrollY;

    sectionsActive.forEach(current =>{
        let sectionHeight = current.offsetHeight
        let sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if(scrollYExe > sectionTop && scrollYExe <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive);

// window.addEventListener('scroll', ()=>{
//     console.log(scrollY);
// })
// HIDE OR SHOW HEADER ON SCROLL

// let lastScrollTop = 0;
// let navbar = document.getElementById('navbar');
// window.addEventListener('scroll', function() {
//     let scrollTop = window.scrollY || document.documentElement.scrollTop;
//     if (scrollTop > lastScrollTop){
//         navbar.style.top="-100px"
//     }else{
//         navbar.style.top="0"
//     }
//     lastScrollTop = scrollTop;
// });


//INTERSECTION OBSERVER

let sections = document.querySelectorAll(".section");

let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(window.innerWidth <= 768){
            return false
        }else{
            entry.target.classList.toggle("show", entry.isIntersecting)
        }
    })
}, {
    threshold: .5
})

sections.forEach(section => {
    observer.observe(section)
});

// PROGRESS SCROLL BAR

let updateProgressBar = () =>{
    let {scrollTop, scrollHeight} = document.documentElement;
    let scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 +'%';
    document.getElementById('progress-bar').style.setProperty('--progress', scrollPercent);
}
document.addEventListener('scroll', updateProgressBar)

// EMAIL SEND SMTPJS.COM

let sendButton = document.getElementsByClassName('contact-btn');
let sendMail = () => {
    (function(){
        emailjs.init("He8JYOdb1J_2nfOPX"); // ACCOUNT PUBLIC KEY
    })();

    let params = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        subject: document.querySelector('#subject').value,
        message: document.querySelector('#message').value,
    };
    let serviceID = "service_xo07p6z"; // EMAIL SERVICE ID
    let templateID = "template_9bfps5b"; // EMAIL TEMPLATE ID
    if(params.name == "" || params.email == ""){
        alert("Please, type a Name and an email before pressing send");
    }else{
    emailjs.send(serviceID, templateID, params)
    .then( res => {
        alert("Email sent succesfully. Thanks!")
    })
    .catch();
    }
}

// SHOW SCROLL TOP

function scrollTop(){
    let scrollTop = document.querySelector('#scroll-up');
    // When the scroll is higher than 560 viewport innerHeight, add the show-scroll class to the a tag with the scroll
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop);

// OPEN CATEGORY
let openCategory = (e) => {
    window.open(`work.html?id=${e.currentTarget.id}`, '_self');
}

let categories = document.querySelectorAll('.categories-list');
categories.forEach((item) => {
    item.addEventListener('click', openCategory, true)
})

//HIDE MENU ON WORK SECTION


let hamburger = document.querySelector(".hamburger");
let navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener('click', () =>{
    // console.log(window.innerWidth);
    hamburger.classList.toggle("on")
    navMenu.classList.toggle("on");
})

let hideMenu = () => {
    let navbar = document.querySelector('#navbar');
    if(window.innerWidth <= 950){
        return false;
    }else if(this.scrollY >= 1370 && this.scrollY < 2070){
        navbar.classList.add('hide-menu');
    }else if(this.scrollY >= 2100){
        navbar.classList.remove('hide-menu'); 
    }else navbar.classList.remove('hide-menu');
}

window.addEventListener('scroll', hideMenu);
