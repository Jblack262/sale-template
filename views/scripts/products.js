const carouselLeftBtn = document.querySelector('#left');
const carouselRightBtn = document.querySelector('#right');

const carouselDOM = document.querySelector('.products-container');
const carouselContainerDOM = document.querySelector('.products-carousel');
const cardWidth = 316; //card with plus padding
let carouselScrollDist = 0;
let startAutoScroll;
const scrollInterval = 4000;


const showProducts = async () => {
  const { data: {products},} = await axios.get(productsUrl)
  if (products.length < 1) {
    carouselDOM.style.display = 'none';
    carouselDOM.style.visibility = 'hidden';
    carouselContainerDOM.innerHTML = '<h5 class="empty-list">No Products Listed...</h5>';
    return;
  }
  const allProducts = products.map((product) => {
    const {_id: id, image, name, price, rating} = product;
    return `
      <div class="product">
        <div class="product-image">
          <img src="${image}" alt="${name}">
        </div>
        <div class="product-content">
          <p class="product-name">${name}</p>
          <p class="product-price">$${price}</p>
          <div class="product-rating">
            ${
              Array.from({length: Math.floor(rating)}, () => '<i class="fas fa-star"></i>').join('')
            }
            ${
              Math.round(rating) != rating ? '<i class="fas fa-star-half-alt"></i>' : ''
            }
            ${
              Array.from({length: 5 - (Math.floor(rating) + (Math.floor(rating) !== rating ? 1 : 0))}, () => 
              `<i class="far fa-star"></i>`
              ).join('')
            }
          </div>
          
          <a href="/edit/${id}" id="product-purchase">Buy Now</a>
        </div>
      </div>
    `
  }).join('')
  carouselDOM.innerHTML = allProducts;
}
showProducts();








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