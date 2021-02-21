'use strict';

// Make Navbar transparent when it is on top
const navbar = document.querySelector('#navbar');
const navbar_height = navbar.getBoundingClientRect().height;
// offsetHeight = 원래 지정된 사이즈 (height), transform 무시
// getBoundingClientRect() = 사용자가 보는 사이즈, transform 적용
// clientHeight = css상 높이 + css상 내부 여백 - 수평 스크롤바의 높이(존재하는 경우에만)
// scrollHeight = scroll 없이 요소의 콘텐츠를 모두 나타낼 때 필요한 최소 높이 값. 반올림

document.addEventListener('scroll',() => {
    (window.pageYOffset > navbar_height) ? navbar.classList.add('navbar--dark') : navbar.classList.remove('navbar--dark');
    // navar--dark는 BEM의 Modifier 사용
})