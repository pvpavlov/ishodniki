window.addEventListener('DOMContentLoaded', () =>{

	const
		cartWraper = document.querySelector('.cart__wrapper'),
		cart = document.querySelector('.cart'),
		close = document.querySelector('.cart__close'),
		open = document.querySelector('#cart'),
		goodsBtn = document.querySelectorAll('.goods__btn'),
		products = document.querySelectorAll('.goods__item'),
		confirm = document.querySelector('.confirm'),
		badge = document.querySelector('.nav__badge'),
		totalCost = document.querySelector('.cart__total > span'),
		titles = document.querySelectorAll('.goods__title');

	function openCart() {
		cart.style.display = 'block';
		document.body.style.overflow = 'hidden'; 
	}

	function closeCart() {
		cart.style.display = 'none';
		document.body.style.overflow = ''; 
	}

	open.addEventListener('click', openCart);
	close.addEventListener('click', closeCart);
	goodsBtn.forEach(function(btn, i){
		btn.addEventListener('click', () => {
			let item = products[i].cloneNode(true),
				trigger = item.querySelector('button'),
				remuveBtn = document.createElement('div'),
				empty = cartWraper.querySelector('.empty');
			trigger.remove();

			showConfirm();
			calcGoods(1);

			remuveBtn.classList.add('goods__item-remove');
			remuveBtn.innerHTML = '&times';
			item.appendChild(remuveBtn);

			cartWraper.appendChild(item);
			if (empty){
				empty.style.display = 'none';	
			}
			calcTotal();
			removeFromCart();
		});
	});

	function sliceTitle() {
		titles.forEach(function(item){
			if (item.textContent.length < 80) {
				return;
			} else {
				const str = item.textContent.slice(0, 75) + '...';
				// const str = `${item.textContent.slice(0, 71)}...`;
				item.textContent = str;
			}
		});
	};
	sliceTitle();

	function showConfirm() {
		confirm.style.display = 'block';
		let counter =100;
		const id = setInterval(frame, 20);
		function frame() {
			if (counter == 10) {
				clearInterval(id);
				confirm.style.display = 'none';
			} else {
				counter--;
				confirm.style.transform = `translateY(-${counter}px`;
				confirm.style.opacity = '.' + counter;
			}	
		}
	};
	function calcGoods(i) {
		const items = cartWraper.querySelectorAll('.goods__item');
		badge.textContent =  items.length + i;
		
		if (items.length == 0) {
			let empty = cartWraper.querySelector('.empty');
			empty.style.display = 'block'; 
		}
	};

	function calcTotal() {
		const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
		let total = 0;
		prices.forEach(function(item){
			total += +item.textContent;
		});
		totalCost.textContent = total;
	};

	function removeFromCart() {
		const removeBtn = cartWraper.querySelectorAll('.goods__item-remove');
		removeBtn.forEach(function(btn){
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				calcGoods(0);
				calcTotal();

			});
		});
	};
});