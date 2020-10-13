import { getData } from './getData.js';
import userData from './userData.js';

const generateCartPage = () => {
  const cartList = document.querySelector('.cart-list');
  const cartTotalPrice = document.querySelector('.cart-total-price');
  const cartForm = document.querySelector('.cart-form');

  const renderCart = data => {
    cartList.textContent = '';
    let totalPrice = 0;

    data.forEach(el => {
      const {id, name, description, count, price, img} = el;

      let options = '';
      let countUser = userData.cartList.find(el => el.id === id).count;
      if (countUser > count) {
        countUser = count;
      }

      const sum = countUser * price;
      totalPrice += sum;

      for (let i = 1; i <= count; i++) {
        options += `<option value="${i}" ${countUser === i ? 'selected' : ''}>${i}</option>`;
      }

      const li = `
        <li class="cart-item" data-idd="${id}">
            <div class="product">
              <div class="product__image-container">
                <img src="${img[0]}" alt="${name} - ${description}" itemprop="image">
              </div>
              <div class="product__description">
                <h3 class="product__name">
                  <a href="card.html#${id}">${name}</a></h3>
                <p class="product_description-text">${description}</p>
              </div>
              <div class="product__prices">
                <div class="product__price-type product__price-type-regular">
                  <div>
                    <div class="product__total product__total-regular">${sum}-</div>
                    ${
                      countUser > 1 ?
                      `<div class="product__price-regular">${price}-</div>` : ''
                    }
                  </div>
                </div>
              </div>
              <div class="product__controls">
                <div class="product-controls__remove">
                  <button data-idd=${id} type="button" class="btn btn-remove">
                    <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                  </button>
                </div>
                <div class="product-controls__quantity">
                  <select data-idd=${id} title="Выберите количество" aria-label="Выберите количество">
                    ${options}
                  </select>
                </div>
              </div>
            </div>
          </li>
        `;
      
        cartList.insertAdjacentHTML('beforeend', li);
    });

    cartTotalPrice.textContent = totalPrice;
  };

  if (location.pathname.includes('cart')) {

    cartList.addEventListener('change', e => {
      userData.changeCount = {
        id: e.target.dataset.idd,
        count: +e.target.value,
      };
      getData.cart(userData.cartList, renderCart);
    });

    cartList.addEventListener('click', e => {
      const btnRemove = e.target.closest('.btn-remove');
      if (btnRemove) {
        userData.removeCartItem = btnRemove.dataset.idd;
        getData.cart(userData.cartList, renderCart);
      }
    });

    cartForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(cartForm);

      // if need to send formdata
      // formData.set('order', JSON.stringify(userData.cartList));

      // if need to send json
      const data = {};
      for (const [key, value] of formData) {
        data[key] = value;
      }
      data.order = userData.cartList;

      getData.sendData('https://jsonplaceholder.typicode.com/posts', data)
        .then(() => {
          cartForm.reset();
          userData.clearCartList = '';
          getData.cart(userData.cartList, renderCart);
          alert('Ваш заказ отправлен');
        }).catch(e => console.error(e));
    });

    getData.cart(userData.cartList, renderCart);
  }
};

export default generateCartPage;