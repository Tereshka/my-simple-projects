const generateHeader = () => {
  const headerHTML = `
    <header>
      <div class="container">
        <div class="header">
          <button class="btn btn-burger" aria-label="открыть меню">
            <svg focusable="false" class="svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M20 8H4V6H20V8ZM20 13H4V11H20V13ZM20 18H4V16H20V18Z"></path>
            </svg>
          </button>
          <a href="index.html" class="logo">
            <img src="image/ikea-logo.svg" alt="Логотип">
          </a>
          <form class="search" method="get" action="goods.html">
            <input type="search" name="s" maxlength="150" class="search-input" spellcheck="false"
              aria-label="Искать товары, новинки и вдохновение"
              aria-placeholder="Искать товары, новинки и вдохновение" placeholder="Что вы ищете?"
              autocapitalize="off" autocomplete="off" autocorrect="off">
            <button type="submit" class="btn search-btn" aria-label="найти"></button>
          </form>
          <a href="goods.html?wishlist" class="btn btn-wishlist">
            <svg focusable="false" class="svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12.336 5.52055C14.2336 3.62376 17.3096 3.62401 19.2069 5.52129C20.2067 6.52115 20.6796 7.85005 20.6259 9.15761C20.6151 12.2138 18.4184 14.8654 16.4892 16.6366C15.4926 17.5517 14.5004 18.2923 13.7593 18.8036C13.3879 19.0598 13.0771 19.2601 12.8574 19.3973C12.7475 19.466 12.6601 19.519 12.5992 19.5555C12.5687 19.5737 12.5448 19.5879 12.5279 19.5978L12.5079 19.6094L12.502 19.6129L12.5001 19.614C12.5001 19.614 12.4989 19.6147 11.9999 18.748C11.501 19.6147 11.5005 19.6144 11.5005 19.6144L11.4979 19.6129L11.4919 19.6094L11.472 19.5978C11.4551 19.5879 11.4312 19.5737 11.4007 19.5555C11.3397 19.519 11.2524 19.466 11.1425 19.3973C10.9227 19.2601 10.612 19.0598 10.2405 18.8036C9.49947 18.2923 8.50726 17.5517 7.51063 16.6366C5.58146 14.8654 3.38477 12.2139 3.37399 9.15765C3.32024 7.85008 3.79314 6.52117 4.79301 5.52129C6.69054 3.62376 9.76704 3.62376 11.6646 5.52129L11.9993 5.856L12.3353 5.52129L12.336 5.52055ZM11.9999 18.748L11.5005 19.6144L11.9999 19.9019L12.4989 19.6147L11.9999 18.748ZM11.9999 17.573C12.1727 17.462 12.384 17.3226 12.6236 17.1573C13.3125 16.6821 14.2267 15.9988 15.1366 15.1634C17.0157 13.4381 18.6259 11.2919 18.6259 9.13506V9.11213L18.627 9.08922C18.6626 8.31221 18.3844 7.52727 17.7926 6.9355C16.6762 5.81903 14.866 5.81902 13.7495 6.9355L13.7481 6.93689L11.9965 8.68166L10.2504 6.9355C9.13387 5.81903 7.3237 5.81903 6.20722 6.9355C5.61546 7.52727 5.33724 8.31221 5.3729 9.08922L5.37395 9.11213V9.13507C5.37395 11.2919 6.98418 13.4381 8.86325 15.1634C9.77312 15.9988 10.6874 16.6821 11.3762 17.1573C11.6159 17.3226 11.8271 17.462 11.9999 17.573Z"></path>
            </svg>
          </a>
          <a href="cart.html" class="btn btn-cart">
            <svg focusable="false" class="svg-icon svg-cart" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg" style="display: block;">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10.9994 4H10.4373L10.1451 4.48017L6.78803 9.99716H3.00001H1.71924L2.02987 11.2397L3.65114 17.7248C3.98501 19.0603 5.18497 19.9972 6.56157 19.9972L17.4385 19.9972C18.8151 19.9972 20.015 19.0603 20.3489 17.7248L21.9702 11.2397L22.2808 9.99716H21H17.2113L13.8539 4.48014L13.5618 4H12.9997H12.0004H10.9994ZM14.8701 9.99716L12.4376 6H12.0004H11.5615L9.12921 9.99716H14.8701ZM5.59142 17.2397L4.28079 11.9972H19.7192L18.4086 17.2397C18.2973 17.6849 17.8973 17.9972 17.4385 17.9972L6.56157 17.9972C6.1027 17.9972 5.70272 17.6849 5.59142 17.2397Z"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
};

export default generateHeader;