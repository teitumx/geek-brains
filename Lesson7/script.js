"use strict";

/**
 *  Объект каталога товаров
 */
const catalog = {
  catalogBlock: null,
  cart: null,
  list: [
    {
      id_product: 123,
      product_name: 'Пальто',
      price: 2400,
      quantity: 1,
    },
    {
      id_product: 456,
      product_name: 'Куртка',
      price: 2700,
      quantity: 1,
    },
    {
      id_product: 245,
      product_name: 'Пуховик',
      price: 2300,
      quantity: 1,
    }
  ],

  /**
   * Инициальзация каталога.
   * @param catalogBlockClass - класс блока каталога
   * @param cart - корзина
   */
  init(catalogBlockClass, cart) {
    this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
    this.cart = cart;

    this.render();
    this.addEventHandlers();
  },

  /**
   * Рендер каталога
   */
  render() {
    if (this.getCatalogListLength() > 0) {
      this.renderCatalogList();
    } else {
      this.renderEmptyCatalog();
    }
  },

  /**
   * Добавляем обработку событий
   */
  addEventHandlers() {
    this.catalogBlock.addEventListener('click', event => this.addToCart(event));
  },

  /**
   * Метод добавления товара в корзину
   */
  addToCart(event) {
    if (!event.target.classList.contains('buy')) return;
    this.cart.addToCart(catalog.getCatalogItemByID(event.target.id));
  },

  /**
   * Метод получения количества товаров в каталоге
   * @returns {number}
   */
  getCatalogListLength() {
    return this.list.length;
  },

  /**
   * Рендер списка товаров
   */
  renderCatalogList() {
    this.catalogBlock.innerHTML = '';
    this.list.forEach(item => {
      this.catalogBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
    });
  },

  /**
   * Рендер отдельного товара из списка
   * @param item - товар
   * @returns {string} - сгенерированая строка разметки
   */
  renderCatalogItem(item) {
    return `<div>
                <h3>${item.product_name}</h3>
                <p>${item.price} руб.</p>
                <button class="buy" id="${item.id_product}">Купить</button>
            </div>`;
  },

  /**
   * Рендер пустого каталога
   */
  renderEmptyCatalog() {
    this.catalogBlock.innerHTML = '';
    this.catalogBlock.insertAdjacentHTML('beforeend', `Каталог товаров пуст.`);
  },

  getCatalogItemByID(id) {
    return this.list.find(product => product.id_product == id);
  }

};

/**
 *  Объект корзины
 */
const cart = {
  cartBlock: null,
  catalogList: null,
  clrCartButton: null,
  goods: [],
  total: 0,

  /**
   * Метод инициальзации корзины
   * @param cartBlockClass - класс блока корзины
   * @param clrCartButton - класс кнопки очистки корзины
   * @param catalogList - список товаров в каталоге
   */
  init(cartBlockClass, clrCartButton, catalogList) {
    this.cartBlock = document.querySelector(`.${cartBlockClass}`);
    this.clrCartButton = document.querySelector(`.${clrCartButton}`);
    this.catalogList = catalogList;

    this.addEventHandlers();
    this.render();
  },

  /**
   * Метод установки обработчиков событий
   */
  addEventHandlers() {
    this.clrCartButton.addEventListener('click', this.dropCart.bind(this));
    this.cartBlock.addEventListener('click', event => this.deleteFromCart(event));
  },

  /**
   * Метод очистки корзины
   */
  dropCart() {
    this.goods = [];
    this.total = 0;
    this.render();
  },

  /**
   * Метод удаления товара из корзины
   */
  deleteFromCart(event) {
    if (!event.target.classList.contains('delete')) return;
    const pos = parseInt(event.target.id);
    this.total -= this.goods[pos].price;
    this.goods.splice(pos, 1);
    this.render();
  },

  /**
   * Метод добавления товара в корзину
   */
  addToCart(product) {
    this.goods.push(product);
    this.total += product.price;
    this.render();
  },

  /**
   * Рендер корзины
   */
  render() {
    if (this.getCartGoodsLength() > 0) {
      this.renderCartList();
    } else {
      this.renderEmptyCart();
    }
  },

  /**
   * Получение количества товаров в корзине
   * @returns {number}
   */
  getCartGoodsLength() {
    return this.goods.length;
  },

  /**
   * Рендер пустой корзины
   */
  renderEmptyCart() {
    this.cartBlock.innerHTML = '';
    this.cartBlock.insertAdjacentHTML('beforeend', 'Корзина пуста.');
  },


  /**
   * Рендер списка товаров в корзине
   */
  renderCartList() {
    this.cartBlock.innerHTML = '';

    this.goods.forEach((item, pos) => {
      this.cartBlock.insertAdjacentHTML('beforeend', this.renderCartItem(item, pos));
    });
    this.cartBlock.insertAdjacentHTML('beforeend', this.renderTotal(this.total));
  },

  renderTotal(total) {
    return `<h2>Итого: ${total}</h2>`;
  },

  /**
   * Рендер отдельного товара в корзине
   * @param item - товар
   * @returns {string} - сгененрированая строка разметки
   */
  renderCartItem(item, pos) {
    return `<div>
                <h3>${item.product_name}</h3>
                <p>${item.price} руб.</p>
                <p>${item.quantity} шт.</p>
                <button class="delete" id="${pos}">Удалить</button>                
            </div>`;
  },
};

/**
 * Подключение каталога и корзины
 */
catalog.init('catalog', cart);
cart.init('cart', 'clr-cart', catalog.list);





