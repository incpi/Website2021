function getId(id) { return document.getElementById(id) }

function displayn(a) { getId(a).style.display = 'none' } //hidden on hover

// navigation bar code and active
function pid(Page_id, nav_id) {
    var x = getId('c-c').getElementsByTagName('section');
    var y = getId("h_nav").getElementsByTagName("a");
    for (i = 0; i < x.length; i++) {
        (y[i].id === nav_id) ? ((!getId(nav_id).classList.contains("active")) ? getId(nav_id).classList.add("active") : '') : getId(y[i].id).classList.remove("active");
        x[i].style.display = (x[i].id === Page_id) ? "flex" : "none";
    }
}

//display class and open nav in mobile view
function show(Page_id, nav_id) {
    pid(Page_id, nav_id);
    openNav("close", "open", "100%");
    localStorage.setItem("page", Page_id + " " + nav_id)
}
// night dark and light mode preferance
function cool(y, mode) {
    for (i = 0; i < y.length; i++) {
        y[i].id === mode ? getId(y[i].id).style.display = "block" : getId(y[i].id).style.display = "none";
    }
}

//scroll active setting up 
// const links = document.querySelectorAll('.links');
// const sections = document.querySelectorAll('section');
// function changeLinkState() {
// let index = sections.length;
// while (--index && window.scrollY + 50 < sections[index].offsetTop) { }
// links.forEach((link) => link.classList.remove('active'));
// links[index].classList.add('active');
// }
// changeLinkState();
// window.addEventListener('scroll', changeLinkState);

//^mode switcher
var toggle = getId("dark_link");
const y = getId("dark_link").getElementsByTagName("svg");
var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

//default 
if (storedTheme) {
    storedTheme === "dark" ? cool(y, "moon") : cool(y, "sun")
}

//toggle
document.documentElement.setAttribute('data-theme', storedTheme)
toggle.onclick = function () {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";
    if (currentTheme === "light") {
        targetTheme = "dark";
        cool(y, "moon")
    } else {
        cool(y, "sun")
    }
    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
}

//new dynamic padding  height while scrolling
// const navht = document.querySelector('nav').offsetHeight;
// try {
//     documentElement.style.setProperty('--scrolltm', navht);
// }
// catch (Reference) { console.error() }


//mobile navigation for menu
function openNav(open, close, _) {
    getId("h_nav").style.left = _;
    getId(open).style.display = "none";
    getId(close).style.display = "flex";
}

//time-Project -- section
function time(id1,cl='clcode') {
    getId(id1).classList.toggle('active');
    var z = getId(cl).getElementsByTagName('span');
    var v = 0;
    var list = [];
    for (i = 0; i < z.length; i++) {
        (getId(z[i].id).classList.contains('active')) ? list.push(z[i].id) : '';
    }
    const element = getId('time1').getElementsByClassName('container');
    for (j = 0; j < element.length; j++) {
        (element[j].classList.contains("right")) ? element[j].classList.remove('right') : '';
        (element[j].classList.contains("left")) ? element[j].classList.remove('left') : '';
        var flag = "F";
        const x = element[j].getElementsByClassName('content')[0].getAttribute("class").toString();
        for (i = 0; i < list.length; i++) {
            (x.includes(list[i])) ? flag = "T" : '';
        }
        if (flag === "T") {
            (element[j].style.display = "block");
            v += 1;
            (v % 2 == 0) ? element[j].classList.add("right") : element[j].classList.add("left");
        } else {
            (element[j].style.display = "none");
        }
    }
}

function expand(s, x) {
    const setbtn = document.querySelectorAll(".expand")[x]
    const links = document.querySelectorAll(s);
    if (x === '0' || x === '1') {
        links.forEach((link) => link.children[1].style.display = (setbtn.getAttribute('atr') === "e") ? "block" : "none");
        setbtn.setAttribute('atr', (setbtn.getAttribute('atr') === "e") ? "c" : "e");
        setbtn.innerHTML = (setbtn.getAttribute('atr') === "e") ? "Expand All" : "Collapse All";
    } else {
        links.forEach((link) => link.children[1].style.display = "none");
        links[x].children[1].style.display = "block";
    }
}

function ready(a = 3500) {
    onreadycolor()
    if (localStorage['agr'] === 'true') {
        p = localStorage.getItem('page')
        if (p == null) {
            show("home", "_home_link")
        } else {
            p = p.split(" ");
            show(p[0], p[1]);
            sleep(a).then(() => {
                loaderh("none", "flex");
            });
        }
    } else {
        getId('consentc').style.display = "block";
        getId('btnhome').style.display = 'none';
    }
}

function loaderh(a, b) {
    getId('loader').style.display = a;
    getId('c-c').style.display = b;
    getId('loader').classList.toggle('fade');
    getId('c-c').classList.toggle('fade');
}
document.getElementById('btn').addEventListener('click', (evt) => {
    localStorage.setItem('agr', true);
    ready(0)
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const output = getId("input")
getId("myfile").addEventListener("input", () => outputFileContents(getId("myfile").files[0]))

function outputFileContents(file) {
    getId('myfile_btn').innerHTML = `<span>${file.name}</span><span>${Math.floor(file.size / 1024)} KB </span>`
    d = new Date()
    if (file.size <= 2098000) {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.addEventListener("load", () => (output.value = reader.result))
        getId('Time').style = "color:var(--dgreen)";
        getId('myfile_btn').style = "border-color: var(--dgreen);";
        getId('Time').innerHTML = `File loaded in ${(new Date().getTime() - d.getTime())} ms`;
        error(false, 'xmlput', "", "Data Loaded")
    } else {
        getId('Time').style = "color:var(--dred)";
        getId('myfile_btn').style = "border-color: var(--dred);";
        getId('Time').innerHTML = "2 MB or smaller files..";
        error(true, 'xmlput', "Can not load it", "");
    }
}