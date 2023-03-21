// =========== All This Codes called Vanilla Js ===========
// all variables that will be processed
const sections = Array.from(document.querySelectorAll("section"));
const currentWin = document.querySelector(".currentWin");
const up = document.querySelector(".upButton");
const header = document.querySelector(".header");
const lastLi = document.querySelector(".mega-drop");
const megaMenu = document.querySelector(".mega-menu");
const megaLis = document.querySelectorAll(".mega-menu ul li");
const skills = document.querySelector(".ourSkills");

// variables of articles cards and animate cards in page
const cards = document.querySelectorAll(".cards .card");
const howCards = document.querySelectorAll(".howItem");

// variables of progrssBar and image
let allProgress = document.querySelectorAll(".common");
let imageProgress = document.querySelector(".slidePicture > img");

// loop structure for creating spans in currentWin
for (let i = 0; i < sections.length; i++) {
    let span = document.createElement("span");
    span.setAttribute("class", `sLine-${i + 1}`);
    currentWin.append(span);
}

window.onscroll = () => {
    // when current window show a short line on left
    sections.forEach((section, idx) => {
        if (
            section.getBoundingClientRect().top >=
                -(section.offsetHeight - 300) &&
            section.getBoundingClientRect().top <= 300
        ) {
            document
                .querySelectorAll(`.currentWin span`)
                [idx].classList.add("show");
        } else {
            document
                .querySelectorAll(`.currentWin span`)
                [idx].classList.remove("show");
        }
    });

    // setup scripting for show up-button and click on upButton
    if (window.scrollY >= 731) {
        up.style.bottom = "30px";
    } else {
        up.style.bottom = "-50px";
    }

    // MegaMenu when window scrolled
    if (megaMenu.classList.contains("active")) {
        megaMenu.classList.remove("active");
    }

    // script of articles cards when you reach to it {simple animation of cards}
    checkCard();

    // when reached to skills window
    if (
        window.scrollY >=
        skills.offsetTop - document.documentElement.clientHeight * 0.5
    ) {
        allProgress.forEach((el) => {
            el.classList.add("active");
        });
        imageProgress.classList.add("slide");
    } else {
        allProgress.forEach((el) => {
            el.classList.remove("active");
        });
        imageProgress.classList.remove("slide");
    }
};

up.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Setup Scripting when click on navBar for mega-menu
lastLi.onclick = () => {
    if (megaMenu.classList.contains("active")) {
        megaMenu.classList.remove("active");
    } else {
        megaMenu.classList.add("active");
    }
};

// ===== functions of project =====
function checkCard() {
    const trigger = window.innerHeight - 50;

    cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < trigger) {
            card.classList.add("show");
        } else {
            card.classList.remove("show");
        }
    });

    howCards.forEach((howCard) => {
        const howCardTop = howCard.getBoundingClientRect().top;

        if (howCardTop < trigger - 50) {
            setTimeout(() => {
                howCard.classList.add("show");
            }, 250);
        } else {
            howCard.classList.remove("show");
        }
    });
}
checkCard();

// function of countDown
const endPoint = new Date("Dec 31, 2023 24:00:00").getTime();

let count = setInterval(countDown, 1000);

function countDown() {
    let startPoint = new Date().getTime();
    let differTime = endPoint - startPoint;

    let days = Math.floor(differTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
        (differTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((differTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((differTime % (1000 * 60)) / 1000);

    document.querySelector("#days").innerHTML = days < 10 ? `0${days}` : days;
    document.querySelector("#hours").innerHTML =
        hours < 10 ? `0${hours}` : hours;
    document.querySelector("#minutes").innerHTML =
        minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector("#seconds").innerHTML =
        seconds < 10 ? `0${seconds}` : seconds;

    if (document.querySelector("#days").innerHTML === 0) {
        clearInterval(count);
    }
}

// here script of stats section
let nums = document.querySelectorAll(".stateNum");
let stateSection = document.querySelector(".stats");
let strated = false;
console.log(nums);

window.addEventListener("scroll", () => {
    if (window.scrollY >= stateSection.offsetTop - 400) {
        if (!strated) {
            nums.forEach((num) => {
                countUp(num);
            });
        }
        strated = true;
    }
});

function countUp(stateItem) {
    let counter = 0;
    let goal = stateItem.dataset.num;
    let shell = setInterval(() => {
        if (goal != 600) {
            stateItem.innerHTML = `${counter++}`
        } else {
            stateItem.innerHTML = `${counter++}K`
        }
        if (counter === parseInt(goal) + 1) {
            clearInterval(shell);
        }
    }, 2000 / goal);
}


