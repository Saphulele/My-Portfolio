// Text Animation
document.querySelectorAll(".word").forEach(word => {
    const letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.appendChild(span);
    });
});

let currentWordIndex = 0;
const words = document.querySelectorAll(".word");
const maxWordIndex = words.length - 1;

const changeText = () => {
    const currentWord = words[currentWordIndex];
    const nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => letter.classList.replace("letter", "letter out"), i * 80);
    });
    
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => letter.classList.replace("letter behind", "letter in"), 340 + i * 80);
    });

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

// Circular Skill Indicators
document.querySelectorAll('.circle').forEach(elem => {
    const dots = Number(elem.getAttribute("data-dots"));
    const marked = Number(elem.getAttribute("data-percent"));
    const percent = Math.floor(dots * marked / 100);
    const rotate = 360 / dots;
    let points = "";

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    pointsMarked.forEach((point, i) => {
        if (i < percent) point.classList.add('marked');
    });
});

// MixItUp Portfolio
const mixer = mixitup('.portfolio-gallery');

// Active Menu
const menuLi = document.querySelectorAll('header ul li a');
const sections = document.querySelectorAll('section');

const activeMenu = () => {
    let len = sections.length;
    while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
};

activeMenu();
window.addEventListener("scroll", () => {
    requestAnimationFrame(activeMenu);
});

// Sticky Navbar
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
});

// Toggle Icon Navbar
const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
});

window.addEventListener("scroll", () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
});

// Parallax
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show-items", entry.isIntersecting);
    });
});

document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top").forEach(el => observer.observe(el));
