const navLinks = document.querySelectorAll(".header__nav-link");
const navDropdown = document.querySelectorAll(".header__nav-dropdown");
const headerProp = document.querySelector(".header").getBoundingClientRect();
const header = document.querySelector(".header");
const nav = document.querySelector(".header__wrapper");
const banner = document.querySelector(".header__banner");
const section = document.querySelectorAll("section");
const harmburger = document.querySelector(".header-hamburger");
const headerWrapper = document.querySelector(".header__wrapper");

//active nav first solution
// window.addEventListener("scroll", function () {
//   if (window.scrollY > 0) {
//     nav.classList.add("active");
//   } else {
//     nav.classList.remove("active");
//   }
// }):

harmburger.addEventListener("click", (e) => {
  headerWrapper.classList.toggle("active");
  harmburger.classList.toggle("active");
});

//modern way to insert a active class by observing with intersection observer
const observerFunc = function (entries, _) {
  entries.forEach((entry) => {
    // if (entry.intersectionRatio < 1) {
    //   banner.classList.add("active");
    //   nav.classList.add("active");
    //   ///// to give each section a margin apart
    //   section.forEach((section) => {
    //     section.classList.add("active");
    //   });
    // } else {
    //   nav.classList.remove("active");
    //   banner.classList.remove("active");
    // }
  });
};

const observerOption = {
  root: null,
  threshold: 1,
};

const observer = new IntersectionObserver(observerFunc, observerOption);
observer.observe(header);

navDropdown.forEach((dropdown) => {
  dropdown.addEventListener("mouseover", function (e) {
    dropdown.previousElementSibling.classList.add("navLink-active");
  });
});

navDropdown.forEach((dropdown) => {
  dropdown.addEventListener("mouseout", function (e) {
    dropdown.previousElementSibling.classList.remove("navLink-active");
  });
});

const courasels = document.querySelectorAll(".section__container");
const dotContainer = document.querySelector(".dot__container");
const btnLeft = document.querySelector(".button--left");
const btnRight = document.querySelector(".button--right");

let curSlide = 0;
let maxSlide = courasels.length;

const createDots = function () {
  courasels.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<span class="dot" data-dot="${i}"></span>`
    );
  });
};

const activeDots = function (slide) {
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.remove("active");
  });

  document.querySelector(`.dot[data-dot="${slide}"]`).classList.add("active");
};

const goToSlide = function (slide) {
  courasels.forEach((courasel) => {
    courasel.classList.remove("section__courasel--active");
  });

  document
    .querySelector(`.section__container--${slide + 1}`)
    .classList.add("fade");

  document
    .querySelector(`.section__container--${slide + 1}`)
    .classList.add("section__courasel--active");
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  activeDots(curSlide);
  goToSlide(curSlide);
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  activeDots(curSlide);
  goToSlide(curSlide);
};

btnLeft.addEventListener("click", prevSlide);

btnRight.addEventListener("click", nextSlide);

function init() {
  createDots();
  activeDots(curSlide);
  goToSlide(curSlide);
}

init();
//// Keycode events on arrow on the keyboard
document.addEventListener("keydown", function (e) {
  console.log(e);
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

////// active dots
//const dots = document.querySelectorAll(".dot");
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const clicked = +e.target.dataset.dot;

    goToSlide(clicked);
    activeDots(clicked);
  }
});
