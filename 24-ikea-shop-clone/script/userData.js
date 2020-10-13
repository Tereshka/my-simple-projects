import { getLocalStorage, setLocalStorage } from './storage.js';

const userData = {
  wishListData: getLocalStorage('wishlist'),
  get wishList() {
    return this.wishListData;
  },
  set wishList(id) {
    if (this.wishListData.includes(id)) {
      // this.wishListData = this.wishListData.filter(el => el !== id);
      const index = this.wishListData.indexOf(id);
      this.wishListData.splice(index, 1);
    } else {
      this.wishListData.push(id);
    }
    setLocalStorage('wishlist', this.wishListData);
  },

  cartListData: getLocalStorage('cartlist'), // {id: string, count: number}
  get cartList() {
    return this.cartListData;
  },
  set clearCartList(p) {
    this.cartListData = [];
    setLocalStorage('cartlist', this.cartListData);
  },
  set cartList(id) {
    let object = this.cartListData.find(el => el.id === id);
    if (object) {
      object.count++;
    } else {
      object = {
        id,
        count: 1,
      };
      this.cartListData.push(object);
    }
    setLocalStorage('cartlist', this.cartListData);
  },
  set removeCartItem(id) {
    this.cartListData = this.cartListData.filter(el => el.id !== id);
    setLocalStorage('cartlist', this.cartListData);
  },
  set changeCount({id, count}) {
    let obj = this.cartListData.find(el => el.id === id);
    obj.count = +count;
    setLocalStorage('cartlist', this.cartListData);
  },
};

export default userData;