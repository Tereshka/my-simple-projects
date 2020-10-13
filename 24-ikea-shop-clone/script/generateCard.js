import { getData } from './getData.js';
import userData from './userData.js';

const MAX_COUNT = 7;

const generateCard = () => {

  const renderCard = ({category, subcategory, id, name, description, img, price, count}) => {

    const breadcrumbLinks = document.querySelectorAll('.breadcrumb__link');
    const goodImages = document.querySelector('.good-images');
    const goodItemNew = document.querySelector('.good-item__new');
    const goodItemHeader = document.querySelector('.good-item__header');
    const goodItemDescription = document.querySelector('.good-item__description');
    const goodItemEmpty = document.querySelector('.good-item__empty');
    const goodItemPriceValue = document.querySelector('.good-item__price-value');
    const btnGood = document.querySelector('.btn-good');
    const btnAddWishlist = document.querySelector('.btn-add-wishlist');

    breadcrumbLinks[0].textContent = category;
    breadcrumbLinks[0].href = `goods.html?cat=${category}`;
    breadcrumbLinks[1].textContent = subcategory;
    breadcrumbLinks[1].href = `goods.html?subcat=${subcategory}`;
    breadcrumbLinks[2].textContent = name;

    goodImages.textContent = '';
    goodItemHeader.textContent = name;
    goodItemDescription.textContent = description;
    goodItemPriceValue.textContent = price;
    btnGood.dataset.idd = id;
    btnAddWishlist.dataset.idd = id;

    img.forEach(el => {
      goodImages.insertAdjacentHTML('afterbegin', 
        `<div class="good-image__item">
          <img src="${el}" alt="${name} - ${description}">
        </div>`
      )
    });

    if (count >= MAX_COUNT) {
      goodItemNew.style.display = 'block';
    }
    if (!count) {
      goodItemEmpty.style.display = 'block';
      btnGood.style.display = 'none';
    }

    const checkWishList = () => {
      if (userData.wishList.includes(id)) {
        btnAddWishlist.classList.add('contains-wishlist');
      } else {
        btnAddWishlist.classList.remove('contains-wishlist');
      }
    };
  
    btnAddWishlist.addEventListener('click', () => {
      userData.wishList = id;
      checkWishList();
    });

    btnGood.addEventListener('click', () => {
      userData.cartList = id;
      checkWishList();
    });

    checkWishList();
  };

  if (location.hash && location.pathname.includes('card')) {
    getData.item(location.hash.substring(1), renderCard);
  }
};

export default generateCard;