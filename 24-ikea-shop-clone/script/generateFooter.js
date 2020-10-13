import { getData } from './getData.js';

const generateFooter = () => {

  getData.catalog(data => {
    const catalogueString = getCatalogueElements(data);
    const footerHTML = `
      <footer>
        <div class="container">
          <div class="footer">
            <div class="footer-catalog">
              <h2 class="footer-header">Каталог</h2>
              <ul>
                ${catalogueString}
              </ul>
            </div>
            <div class="footer-about">
              <h2 class="footer-header">Все о нас</h2>
              <ul>
                <li class="footer-list"><a href="#">О компании</a></li>
                <li class="footer-list"><a href="#">Демократичный дизайн</a></li>
                <li class="footer-list"><a href="#">Работа у нас</a></li>
                <li class="footer-list"><a href="#">Люди и планета</a></li>
              </ul>
            </div>
            <div class="footer-connection">
              <h2 class="footer-header">Свяжитесь с нами</h2>
              <ul>
                <li class="footer-list"><a href="#">Обратная связь</a></li>
                <li class="footer-list"><a href="#">Контакты</a></li>
                <li class="footer-list"><a href="#">Магазины и студии</a></li>
                <li class="footer-list"><a href="#">Землевладельцам</a></li>
                <li class="footer-list"><a href="#">Поставщикам</a></li>
                <li class="footer-list"><a href="#">Пресс-служба</a></li>
                <li class="footer-list"><a href="#">Вопросы и ответы</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
  });
};

const getCatalogueElements = data => {
  let s = '';
  data.forEach(el => s += `<li class="footer-list"><a href="goods.html?cat=${el}">${el}</a></li>`);
  return s;
};

export default generateFooter;