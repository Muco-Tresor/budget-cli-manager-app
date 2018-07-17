
// built in modules
const fs = require('fs');

//thirdy party modules
const yargs = require('yargs')
.command('add', 'add a budget manager', {
	type: {
		demand: true,
		describe: 'type of your budget option',
		alias: 't'
	},

	description: {
		describe: 'a description of your option',
		demand: true,
		alias: 'd'
	},

	amout: {
		describe: 'how much of your option',
		demand: true,
		alias: 'a'
	}

}).help('h').argv;


// own modules
// const commands = require('./commands/commands');
const budgetManager = require('./modules/budget_manager');
const colors = require('./modules/colors');

switch (yargs._[0]) {
	/**
	 * Add command
	 */
	case 'add':
		budgetManager.add(yargs)
		break;

	default:
		console.log(colors.theme('info', 'No command specified'));
		break;
}