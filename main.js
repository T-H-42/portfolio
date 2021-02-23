'use strict';

// Make Navbar transparent when it is on top
const navbar = document.querySelector('#navbar');
const navbar_height_large = navbar.getBoundingClientRect().height;
// offsetHeight = 원래 지정된 사이즈 (height), transform 무시
// getBoundingClientRect() = 사용자가 보는 사이즈, transform 적용
// clientHeight = css상 높이 + css상 내부 여백 - 수평 스크롤바의 높이(존재하는 경우에만)
// scrollHeight = scroll 없이 요소의 콘텐츠를 모두 나타낼 때 필요한 최소 높이 값. 반올림

document.addEventListener('scroll',() => {
    (window.scrollY > navbar_height_large) ? navbar.classList.add('navbar--dark') : navbar.classList.remove('navbar--dark');
    // navar--dark는 BEM의 Modifier 사용
})

// Handle scroll when tapping on navbar menu
const navbar_menu = document.querySelector('.navbar__menu');

navbar_menu.addEventListener('click',(e) => {
    const dataset = e.target.dataset;
    const link = dataset.link;

    if(link === null) {
        return;
    }

    // Method 1
    // const scroll_to = document.querySelector(link);
    // scroll_to.scrollIntoView({behavior : 'smooth'});

    // Mehtod 2
    // navbar height가 바뀌니 새로운 값을 받아와야함
    const navbar_height_small = navbar.getBoundingClientRect().height;
    const scroll_to = document.querySelector(link).offsetTop;
    window.scrollTo({top : scroll_to - navbar_height_small, behavior : 'smooth'});
})

// Handle click on 'Contact Me' button on home
const home_contact_btn = document.querySelector('.home__contact');

home_contact_btn.addEventListener('click', () => {
    scroll_into_view("#contact");
})

// Make home slowly fade to transparent as the window scroll down
const home_container = document.querySelector('.home__container');
const home_container_height = home_container.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // console.log(1 - window.scrollY / home_container_height);
    // 알고리즘이나 공식을 할 때는 실제 간단한 숫자를 대입해서 증명하는것이 중요

    home_container.style.opacity = 1-window.scrollY / (home_container_height)
})

// Show "arrow up" button when scrolling down
const arrow_up = document.querySelector('.arrow-up');

document.addEventListener('scroll', () =>{
    if(window.scrollY > home_container_height / 2) {
        arrow_up.classList.add('visible');
    } else {
        arrow_up.classList.remove('visible');
    }
    })

    // Handle click on the "arrow up" button
arrow_up.addEventListener('click', () => {
    scroll_into_view("#home");
})

// Handle click on the proejct category button 
// Weekness part!!!
const work_btn_container = document.querySelector('.work__categories');
const projects_container = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

work_btn_container.addEventListener('click', (e) => {
    const target = e.target;
    const filter = target.dataset.filter || target.parentNode.dataset.filter;

    if(filter === null){
        return;
    }

    projects_container.classList.add('anim--out');

    projects.forEach((project) => {
        const type = project.dataset.type;

        if(filter === '*' || filter === type) {
            project.classList.remove('invisible');
        } else {
            project.classList.add('invisible');
        }
    }) 

    setTimeout(() => {
        projects_container.classList.remove('anim--out');
    },300)
})



function scroll_into_view(selector) {
    const scroll_to = document.querySelector(selector);
    
    scroll_to.scrollIntoView({behavior : 'smooth'});
}