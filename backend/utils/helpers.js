const e = require("express");

//From: https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
const escapeRegExp = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
/**
* Helper function to filter array by given field/value parameters.
* Will match text by regular expression, and will match text anywhere in a string
*/
const filterByField = (array, field, value) => {
	return array.filter(el => {
		const matchString = new RegExp('.*?' + escapeRegExp(value.toLowerCase().replace(/\s+/m, '')) + '.*?', 'm');
		return (el[field].toLowerCase().replace(/\s+/m, '').match(matchString) !== null);
	})
}
const checkDates = (available, filters) => {
	//test if filter dates are between the available.start_date and available.end_date
	if (filters.end_date) {
		if (available.end_date && available.end_date <= filters.end_date) return false;
		if (available.start_date && filters.end_date < available.start_date) return false;
	}
	if (filters.start_date) {
		if (available.start_date > filters.start_date) return false;
		if (available.end_date && available.end_date < filters.start_date) return false;
	}
	return true;
}


module.exports = {
	escapeRegExp, filterByField, checkDates
}