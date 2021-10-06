
const stageData = require('../data/stage_data.json');
const helpers = require('../utils/helpers')

//handles all the stage data manipulation 
const studios = {
	//shows data filtered by the given "filter" parameters
	filter: (filters) => {
		let results = [...stageData];

		//check our allowable filters and alter our results if the user-supplied values match the values in our dataset
		for (const checkFilter of ['city', 'state', 'country']) {
			if (filters[checkFilter]) results = helpers.filterByField(results, checkFilter, filters[checkFilter])
		}
		//eliminate sound stages that are not valid based on dates
		if (filters.start_date || filters.end_date) {
			results = results.filter((studio) => {
				const validSoundStages = studio.sound_stages.filter((stage) => stage.available_dates.some(available => helpers.checkDates(available, filters)));
				if (validSoundStages.length) {
					//alter valid stages
					studio.sound_stages = validSoundStages;
					return true;
				}
				return false;
			});
		}
		// console.log('Filter Parameters: ', filters);
		// console.log('Filtered Results: ');
		//console.dir(results, { depth: null });
		return results;
	}
}
module.exports = studios;
