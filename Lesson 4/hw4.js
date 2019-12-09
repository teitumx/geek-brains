
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


