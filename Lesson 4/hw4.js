
//ЗАДАНИЕ №1

	var number = prompt('Введите число от 0 до 999');


	function numbersAll(x) {

		var y = {};
		if (x>=0 && x<=999) {

			y.ones = x % 10;
			y.tens = ((x - y.ones) / 10) % 10;
			y.hundreds = (x - y.tens * 10 - y.ones) / 100;
		}

		else {
			console.log('Ошибка! Введите число от 0 до 999');	
		};

		return y;

	}

	console.log(numbersAll(number));



// ЗАДАНИЕ №2

  const basket = [
      {
        product_name: 'пальто',
        price: 200,
        quantity: 1
      },
      {
        product_name: 'шуба',
        price: 400,
        quantity: 2
      },
      {
        product_name: 'куртка',
        price: 300,
        quantity: 1
      }
  ];

  function countBasketPrice(basket) {
    let totalPrice = 0;
    for (let i = 0; i < basket.length; i++) {
      totalPrice += basket[i].price * basket[i].quantity;
    }
    return totalPrice;
  }

      console.log(countBasketPrice(basket));
