const newCarouselLeftBtn = document.querySelector('#new-left');
const newCarouselRightBtn = document.querySelector('#new-right');

const newCarouselDOM = document.querySelector('.new-products-container');
const newCarouselContainerDOM = document.querySelector('.new-products-carousel');
const newCardWidth = 316; //card with plus padding
let newCarouselScrollDist = 0;
let newStartAutoScroll;
const newScrollInterval = 4000;




const showNewProducts = async () => {
  const { data: {products},} = await axios.get(newProductsUrl)
  if (products.length < 1) {
    newCarouselDOM.style.display = 'none';
    newCarouselDOM.style.visibility = 'hidden';
    newCarouselContainerDOM.innerHTML = '<h5 class="empty-list">No Products Listed...</h5>';
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
  newCarouselDOM.innerHTML = allProducts;
}
showNewProducts();

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