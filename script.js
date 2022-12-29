import { months, weekdays } from './data.js';

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-time');

let futureDate = new Date(2022, 12, 1, 12, 0, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();

let weekday = weekdays[futureDate.getDay()];

window.addEventListener('DOMContentLoaded', () => {
	const format = (item) => {
		if (item < 10) return `0${item}`;
		return item;
	};

	giveaway.innerHTML = `Giveaway ends on ${weekday} ${date} ${month} ${year} ${hours}:${format(
		minutes
	)}am`;

	// future time in ms
	const futureTime = futureDate.getTime();

	const getRemainingTime = () => {
		const today = new Date().getTime();
		const t = futureTime - today;
		// 1s = 1000ms
		// 1m = 60s
		// 1hr = 24min
		// 1d = 24h
		const oneDay = 24 * 60 * 60 * 1000;
		const oneHour = 60 * 60 * 1000;
		const oneMinute = 60 * 1000;

		const days = Math.floor(t / oneDay);
		const hours = Math.floor((t % oneDay) / oneHour);
		const minutes = Math.floor((t % oneHour) / oneMinute);
		const seconds = Math.floor((t % oneMinute) / 1000);

		const values = [days, hours, minutes, seconds];

		items.forEach((item, index) => {
			item.innerHTML = format(values[index]);
		});

		if (t < 0) {
			clearInterval(countdown);
			deadline.innerHTML = `<h4>Sorry, this giveaway has expired</h4>`;
		}
	};

	let countdown = setInterval(getRemainingTime, 1000);
	getRemainingTime();
});
