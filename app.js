const carousel = document.querySelector(".carousel"),
  firstImg = document.querySelectorAll("img")[0],
  arrowIcon = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  prevPageX,
  prevScrollLeft;

const disableClick = (element, delay) => {
  element.classList.add("disabled");
  setTimeout(() => {
    element.classList.remove("disabled");
  }, delay);
};

const handleArrowClick = (icon) => {
  if (icon.classList.contains("disabled")) return;
  let firstImgWidth = firstImg.clientWidth + 3;
  carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth ;
  showHideIcon();
  // Disable click for 500ms
  disableClick(icon, 500);
};

const showHideIcon = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcon[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcon[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";

};

arrowIcon.forEach((icon) => {
  icon.addEventListener("click", () => handleArrowClick(icon));
});

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
  
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  let positionDiff = e.pageX - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcon();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
