const generateSubCatalog = () => {

  const subCatalogue = document.createElement('div');
  subCatalogue.classList.add('subcatalog');

  const closeSubMenu = e => {
    subCatalogue.classList.remove('subopen');
  };
  
  const updateHTML = (header, list) => {
    subCatalogue.textContent = '';
    const subCatalogueString = getSubCatalogueElements(list);

    const btnReturn = document.createElement('button');
    btnReturn.addEventListener('click', closeSubMenu);
    btnReturn.type='button';
    btnReturn.setAttribute('class', 'btn btn-return catalog-btn');
    btnReturn.setAttribute('aria-expanded', true);
    btnReturn.setAttribute('aria-label', 'Закрыть меню');
    btnReturn.setAttribute('title', 'Закрыть меню');
    btnReturn.innerHTML = `
      <svg focusable="false" class="svg-icon  hnf-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M4.70613 11.2927L3.99902 11.9997L4.70606 12.7069L11.999 20.0008L13.4133 18.5867L7.82744 13.0001H19.9999V11.0001H7.82729L13.4144 5.41328L12.0002 3.99902L4.70613 11.2927Z">
        </path>
      </svg>
    `;
  
    const subCatalogueHTML = `
      <h3 class="subcatalog-header"><a href="goods.html?cat=${header}">${header}</a></h3>
      <ul class="subcatalog-list">
        ${subCatalogueString}
      </ul>
    `;

    subCatalogue.appendChild(btnReturn);
    subCatalogue.insertAdjacentHTML('afterbegin', subCatalogueHTML);
  };

  document.body.insertAdjacentElement('beforeend', subCatalogue);

  return updateHTML;
};

const getSubCatalogueElements = data => {
  let s = '';
  data.forEach(el => s += `<li class="subcatalog-list__item"><a href="goods.html?subcat=${el}">${el}</a></li>`);
  return s;
};

export default generateSubCatalog;