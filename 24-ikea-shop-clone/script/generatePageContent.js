import { getData } from './getData.js';
import userData from './userData.js';

const MAX_COUNT = 7;

const generatePageContent = () => {

  const mainHeader = document.querySelector('.main-header');
  

  if (location.pathname.includes('goods') && location.search) {
    const search = decodeURI(location.search);
    const prop = search.split('=')[0].substring(1);
    const value = search.split('=')[1];

    if (prop === 's') {
      getData.search(value, generateCards);
      mainHeader.textContent = `Поиск: ${value}`;
    } else if (prop === 'wishlist') {
      getData.wishList(userData.wishList, generateCards);
      mainHeader.textContent = 'Список желаний';
    } else if (prop === 'cat' || prop === 'subcat'){
      getData.category(prop, value, generateCards);
      mainHeader.textContent = value;
    }
  }
};

const generateCards = data => {
  const goodsList = document.querySelector('.goods-list');
  goodsList.textContent = '';

  if (data.length === 0) {
    document.querySelector('.goods').textContent =
      location.search === '?wishlist' ?
      'Ваш список желаний пуст' :
      'К сожалению, по вашему запросу ничего не найдено';
    return;
  }
  
  data.forEach(el => {
    const {id, name, description, img, price, count} = el;
    goodsList.insertAdjacentHTML('afterbegin', `
      <li class="goods-list__item">
        <a class="goods-item__link" href="card.html#${id}">
          <article class="goods-item">
            <div class="goods-item__img">
              <img src="${img[0]}"
                ${img[1] ? `data-second-image="${img[1]}" alt="${name}"` : ''}
              >
            </div>
            ${count >= MAX_COUNT ? '<p class="goods-item__new">Новинка</p>' : ''}
            ${!count ? '<p class="goods-item__empty">Нет в наличии</p>' : ''}
            <h3 class="goods-item__header">${name}</h3>
            <p class="goods-item__description">${description}</p>
            <p class="goods-item__price">
              <span class="goods-item__price-value">${price}</span>
              <span class="goods-item__currency"> ₽</span>
            </p>
            ${!count ? '' : `<button class="btn btn-add-card" aria-label="Добавить в корзину" data-idd="${id}"></button>`}
          </article>
        </a>
      </li>
    `);
  });

  goodsList.addEventListener('click', e => {
    const btnAddCart = e.target.closest('.btn-add-card');
    if (btnAddCart) {
      e.preventDefault();
      userData.cartList = btnAddCart.dataset.idd;
    }
  });
};

export default generatePageContent;