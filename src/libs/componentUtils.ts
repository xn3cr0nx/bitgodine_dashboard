const moment = require("moment");

/**
 * function that returns true if value is email, false otherwise
 * @param {string} value - String that need to be evaluated
 * @return {bool} Result of check, true if match, false otherwise
 */
export const verifyEmail = (value: string): boolean => {
	const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRex.test(value);
};

/**
 * function that returns true if value is a correct phone number, false otherwise
 * @param {string} value - String that need to be evaluated
 * @return {bool} Result of check, true if match, false otherwise
 */
export const verifyPhone = (value: string): boolean => {
	// let phoneRex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
	const phoneRex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
	return phoneRex.test(value);
};

/**
 * function that verifies if value contains only numbers
 * @param {string} value - String that need to be evaluated
 * @return {bool} Result of check, true if match, false otherwise
 */
export const verifyNumber = (value: string): boolean => {
	// let numberRex = new RegExp("^[0-9]+$");
	const numberRex = new RegExp(/^\d*\.?\d*$/);
	return numberRex.test(value);
};

/**
 * function that returns true if name is admitted, false otherwise
 * @param {string} value - String that need to be evaluated
 * @return {bool} Result of check, true if match, false otherwise
 */
export const verifyName = (value: string): boolean => {
	// let nameRex = /^[^<\"@{}()*$%!?=>:|;#]+$/i;
	const nameRex = /^[^<\"()*$%=>:|;#]+$/i; // removed @{}?!
	return nameRex.test(value) && value.length >= 3;
};

// TODO Gianluca 2020-02-14
// sync with backend for password requirements
export const verifyPassword = (value: string): boolean => {
	const passwordRegex = /^[^<\"()*$%=>:|;#]+$/i;
	return passwordRegex.test(value) && value.length >= 3;
};

/**
 * function to set a key in component's state to true for half a second
 * @param {string} activation - useState function setter
 * @param {number} time - trigger time
 * @param {any} value - value to set for the specified time
 * @param {any} end - final value to set after time
 */
export const trigger = (activation: any, time = 3000, value: any, end: any) => {
	activation(value ? value : true);
	setTimeout(() => {
		activation(end ? end : false);
	}, time);
};

/**
 * function to wait a certain amount of time before resolve the promise and proceed
 * @param {int} ms - Number of milliseconds to wait for
 */
export const wait = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const dateWeekDay = (date: string): any => {
	return moment.unix(date).format("dddd");
};
export const dateFullMonth = (date: string): any => {
	return moment.unix(date).format("MMMM");
};
export const dateMonth = (date: string): any => {
	return moment.unix(date).format("MM");
};
export const dateDayNumber = (date: string): any => {
	return moment.unix(date).format("D");
};
export const dateYear = (date: string): any => {
	return moment.unix(date).format("YYYY");
};
export const dateHour = (date: string): any => {
	return moment.unix(date).format("HH");
};
export const dateFullHour = (date: string): any => {
	return moment.unix(date).format("HH:mm");
};
export const date = (date: string): any => {
	return moment.unix(date).format("DD/MM/YYYY");
};
export const fullDate = (date: string): any => {
	return moment.unix(date).format("dddd, MMMM D YYYY, H:mm:ss");
};

export const withinLastDay = (date: string): any => {
	const weekAgo = moment().subtract(1, "days");
	const d = moment.unix(date);
	return weekAgo.isBefore(d);
};
export const withinLastWeek = (date: string): any => {
	const weekAgo = moment().subtract(1, "weeks");
	const d = moment.unix(date);
	return weekAgo.isBefore(d);
};
export const withinLastMonth = (date: string): any => {
	const weekAgo = moment().subtract(1, "months");
	const d = moment.unix(date);
	return weekAgo.isBefore(d);
};

export const alphabeticOrder = (a: any, b: any, name: any): number => {
	if (a[name] < b[name]) {
		return -1;
	}
	if (a[name] > b[name]) {
		return 1;
	}
	return 0;
};

export const satToBtc = (value: number): number => {
	return value * Math.pow(10, -8);
};

export const btcToSat = (value: number): number => {
	return value * Math.pow(10, 8);
};
