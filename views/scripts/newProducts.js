const newCarouselLeftBtn = document.querySelector('#new-left');
const newCarouselRightBtn = document.querySelector('#new-right');

const newCarouselDOM = document.querySelector('.new-products-container');
const newCarouselContainerDOM = document.querySelector('.new-products-carousel');
const newCardWidth = 316; //card with plus padding
let newCarouselScrollDist = 0;
let newStartAutoScroll;
const newScrollInterval = 4000;

const newAutoScroll = () => {
  newCarouselScrollDist += 1
  newScrollCarousel(newCarouselScrollDist);
}

newCarouselLeftBtn.addEventListener('click', () => {
  clearInterval(newStartAutoScroll);
  newCarouselScrollDist -= 1;
  newScrollCarousel(newCarouselScrollDist)

  setTimeout(() => {
    clearInterval(newStartAutoScroll);
    newStartAutoScroll = setInterval(newAutoScroll, newScrollInterval)
  }, 5000)
})
newCarouselRightBtn.addEventListener('click', () => {
  clearInterval(newStartAutoScroll);
  newCarouselScrollDist += 1
  newScrollCarousel(newCarouselScrollDist);

  setTimeout(() => {
    clearInterval(newStartAutoScroll);
    newStartAutoScroll = setInterval(newAutoScroll, newScrollInterval)
  }, 5000)
})

const newScrollCarousel = () => {
  if (newCarouselScrollDist < 0) {
    newCarouselScrollDist = newCarouselDOM.childElementCount - Math.round(newCarouselContainerDOM.offsetWidth / newCardWidth);
  } else if (newCarouselScrollDist > newCarouselDOM.childElementCount - Math.round(newCarouselContainerDOM.offsetWidth / newCardWidth)) {
    newCarouselScrollDist = 0
  }
  
  newCarouselDOM.scrollTo({
    top: 0,
    left: newCarouselScrollDist * newCardWidth,
    behavior: 'smooth'
  });
}


newStartAutoScroll = setInterval(newAutoScroll, newScrollInterval)