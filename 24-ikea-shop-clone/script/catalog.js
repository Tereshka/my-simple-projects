import generateSubCatalog from './generateSubCatalog.js';
import { getData } from './getData.js';

export const catalog = () => {
  const updateSubCatalogue = generateSubCatalog();
  const btnBurger = document.querySelector('.btn-burger');
  const btnClose = document.querySelector('.btn-close');
  
  const catalog = document.querySelector('.catalog');
  const catalogList = document.querySelector('.catalog-list');
  const subCatalog = document.querySelector('.subcatalog');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.insertAdjacentElement('beforeend', overlay);

  const openMenu = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  };

  const closeMenu = () => {
    closeSubMenu();
    catalog.classList.remove('open');
    overlay.classList.remove('active');
  };

  let selectedMenu = '';
  const openSubMenu = e => {
    e.preventDefault();
    if (selectedMenu) selectedMenu.classList.remove('active');

    const target = e.target;
    const listItem = e.target.closest('.catalog-list__item');
    
    if (listItem) {
      listItem.classList.add('active');
      getData.subCatalog(target.textContent, data => {
        updateSubCatalogue(target.textContent, data);
        subCatalog.classList.add('subopen');
        selectedMenu = listItem;
      });
    }
  };

  const closeSubMenu = e => {
    subCatalog.classList.remove('subopen');
  };

  btnBurger.addEventListener('click', openMenu);
  btnClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.keyCode === 27 || e.key === 'Escape') {
      closeMenu();
    }
  });

  catalog.addEventListener('click', openSubMenu);
}