'use strict';

// Ipone smooth scroll
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
window.__forceSmoothScrollPolyfill__ = true;

// 이벤트에 등록하는 콜백함수는 최대한 간단하고 무겁지 않게 
// => 이벤트는 중복 실행이 안되기 때문

// Make Navbar transparent when it is on top
const navbar = document.querySelector('#navbar');
const navbar_height = navbar.getBoundingClientRect().height;
// offsetHeight = 원래 지정된 사이즈 (height), transform 무시
// getBoundingClientRect() = 사용자가 보는 사이즈, transform 적용
// clientHeight = css상 높이 + css상 내부 여백 - 수평 스크롤바의 높이(존재하는 경우에만)
// scrollHeight = scroll 없이 요소의 콘텐츠를 모두 나타낼 때 필요한 최소 높이 값. 반올림

document.addEventListener('scroll',() => {
    if(window.scrollY > navbar_height) {
        navbar_toggle_btn.classList.add('navbar--dark');
        navbar.classList.add('navbar--dark');
    } else {
        navbar_toggle_btn.classList.remove('navbar--dark');
        navbar.classList.remove('navbar--dark');
    } 
    // navar--dark는 BEM의 Modifier 사용
})

// Handle toggle button for small screen
const navbar_toggle_btn = document.querySelector('.navbar__toggle-btn');

navbar_toggle_btn.addEventListener('click', () => {
    navbar_menu.classList.toggle('open');
})

// Handle scroll when tapping on navbar menu
const navbar_menu = document.querySelector('.navbar__menu');
const navbar_menu_btn = document.querySelectorAll('.navbar__menu__item');

navbar_menu.addEventListener('click',(e) => {
    const target = e.target;
    const link = target.dataset.link;


    if(link === null) {
        return;
    }

    navbar_menu.classList.remove('open');

    // Method 1
    // const scroll_to = document.querySelector(link);
    // scroll_to.scrollIntoView({behavior : 'smooth'});

    // Mehtod 2
    const scroll_to = document.querySelector(link).offsetTop;
    // navbar_height = navbar.getBoundingClientRect().height;
    window.scrollTo({top : scroll_to - navbar_height, behavior : 'smooth'});
    select_nav_item(target);
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
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    // BUTTON 대문자로 해야 인식됨
    // nodeName 중요!
    const filter = target.dataset.filter;

    if(filter === null){
        return;
    }

    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    target.classList.add('selected');
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

// 

function scroll_into_view(selector) {
    const scroll_to = document.querySelector(selector);

    scroll_to.scrollIntoView({behavior : 'smooth'});
    select_nav_item(nav_items[section_id.indexOf(selector)]);
}

// 매우 중요
// 1. 모든 섹션 요소들과 모든 아이템들을 가지고 온다
// 2/ intersectionObserver를 이용해서 모든 섹션들을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const section_id = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];

// map API는 forEach와 다르게 배열로 다시 만들어줌\
// const sections = section_id.map(function(id){
//     return document.querySelector(id);
//     return 필수!!
// })

const sections = section_id.map(id => document.querySelector(id));
const nav_items = section_id.map(id => document.querySelector(`[data-link="${id}"]`));

const observer_options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}

let selected_nav_index = 0;
let selected_nav_item = nav_items[0]; 
// let selected_sections = sections[0];

function select_nav_item(selected) {
    selected_nav_item.classList.remove('selected');
    selected_nav_item = selected;
    selected_nav_item.classList.add('selected');
}

// function select_section(selected) {
//     console.log(selected)
//     selected_sections.classList.remove('test');
//     selected_sections = selected
//     selected_sections.classList.add('test');
// }

const observer_callback = (entries, observer) => {
    entries.forEach((entry) => {
        console.log(entry.target)
        console.log(!entry.isIntersecting)
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = section_id.indexOf(`#${entry.target.id}`);

            if(entry.boundingClientRect.y < 0) {
                selected_nav_index = index + 1;
                console.log('down')
            } else {
                selected_nav_index = index - 1;
            }
        }
    })
}

const observer = new IntersectionObserver(observer_callback, observer_options);

sections.forEach((section) => {
    observer.observe(section);
})

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selected_nav_index = 0;
    } else if (
        // window.scrollY + window.innerHeight의 값이 정확하게 일치하지 않는 경우 존재
        window.scrollY + window.innerHeight >= 
        document.body.clientHeight
        ) {
            selected_nav_index = nav_items.length - 1;
    }

    select_nav_item(nav_items[selected_nav_index]);
    // select_section(sections[selected_nav_index]);
})