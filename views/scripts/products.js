const carouselLeftBtn = document.querySelector('#left');
const carouselRightBtn = document.querySelector('#right');

const carouselDOM = document.querySelector('.products-container');
const carouselContainerDOM = document.querySelector('.products-carousel');
const cardWidth = 316; //card with plus padding
let carouselScrollDist = 0;
let startAutoScroll;
const scrollInterval = 4000;

const autoScroll = () => {
  carouselScrollDist += 1
  scrollCarousel(carouselScrollDist);
}

carouselLeftBtn.addEventListener('click', () => {
  clearInterval(startAutoScroll);
  carouselScrollDist -= 1;
  scrollCarousel(carouselScrollDist)

  setTimeout(() => {
    clearInterval(startAutoScroll);
    startAutoScroll = setInterval(autoScroll, scrollInterval)
  }, 5000)
})
carouselRightBtn.addEventListener('click', () => {
  clearInterval(startAutoScroll);
  carouselScrollDist += 1
  scrollCarousel(carouselScrollDist);

  setTimeout(() => {
    clearInterval(startAutoScroll);
    startAutoScroll = setInterval(autoScroll, scrollInterval)
  }, 5000)
})

const scrollCarousel = () => {
  if (carouselScrollDist < 0) {
    carouselScrollDist = carouselDOM.childElementCount - Math.round(carouselContainerDOM.offsetWidth / cardWidth);
  } else if (carouselScrollDist > carouselDOM.childElementCount - Math.round(carouselContainerDOM.offsetWidth / cardWidth)) {
    carouselScrollDist = 0
  }
  
  carouselDOM.scrollTo({
    top: 0,
    left: carouselScrollDist * cardWidth,
    behavior: 'smooth'
  });
}


startAutoScroll = setInterval(autoScroll, scrollInterval)