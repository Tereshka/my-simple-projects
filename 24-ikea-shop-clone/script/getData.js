const PARAMETER = {
  cat: 'category',
  subcat: 'subcategory',
  search: ['name', 'description', 'category', 'subcategory'],
};

export const getData = {
  // url: 'database/dataBase.json',
  url: 'https://raw.githubusercontent.com/tereshka/ikea-shop/main/database/dataBase.json',

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ошибка по адресу ${url} со  статусом ${res.status}`);
    }
    return await res.json();
  },

  async sendData(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      body: data,
    });

    if (!res.ok) {
      throw new Error(`Ошибка по адресу ${url} со  статусом ${res.status}`);
    }
    return await res.json();
  },

  get(process) {
    // without async
    // fetch(this.url)
    //   .then(res => res.json())
    //   .then(process);

    this.getResource(this.url)
      .then(process)
      .catch(err => console.log(err));
  },

  post(postUrl, data, process) {
    this.sendData(this.url + postUrl, data)
      .then(process)
      .catch(err => console.log(err));
  },

  wishList(list, callback) {
    this.get(data => {
      const result = data.filter(el => list.includes(el.id));
      callback(result);
    });
  },
  item(id, callback) {
    this.get(data => {
      const result = data.find(el => el.id === id);
      callback(result);
    });
  },
  cart(list, callback) {
    this.get(data => {
      const result = data.filter(el => list.some(obj => obj.id === el.id));
      callback(result);
    });
  },
  category(prop, value, callback) {
    this.get(data => {
      const result = data.filter(el => el[PARAMETER[prop]].toLowerCase() === value.toLowerCase());
      callback(result);
    });
  },
  search(value, callback) {
    this.get(data => {
      const result = data.filter(el => {
        for(const prop in el) {
          if (PARAMETER.search.includes(prop) && el[prop].toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
        }
      });
      callback(result);
    });
  },
  catalog(callback) {
    this.get(data => {
      const result = [...new Set(data.map(el => el.category))];
      // getting categories from workshop
      // const result = data.reduce((arr, item) => {
      //   if (!arr.includes(item.category)) {
      //     arr.push(item.category);
      //   }
      //   return arr;
      // }, []);
      callback(result);
    });
  },
  subCatalog(category, callback) {
    this.get(data => {
      const result = [...new Set(data
        .filter(el => el.category.toLowerCase() === category.toLowerCase())
        .map(el => el.subcategory)
      )];
      callback(result);
    });
  },
};