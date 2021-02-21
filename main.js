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
    const contact = document.querySelector('#contact');
    contact.scrollIntoView({behavior:'smooth'});
})