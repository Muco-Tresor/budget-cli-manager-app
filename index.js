#!/home/mucort/.nvm/versions/node/v10.5.0/bin/node
// built in modules
const fs = require('fs');


//thirdy party modules
const typeOptions = {
	demand: true,
	describe: 'type of your budget option',
	alias: 't'
}
const yargs = require('yargs')
.command('add', 'add a budget manager', {
	type: typeOptions,

	description: {
		describe: 'a description of your option',
		demand: true,
		alias: 'd'
	},

	amount: {
		describe: 'how much of your option',
		demand: true,
		alias: 'a'
	}

})
.command('list', 'show all budget options', {
	type: typeOptions,
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
		const addedOption = budgetManager.add(yargs);
		if(addedOption) {
			console.log(colors.theme('info', 'Option Added'));
			budgetManager.log(addedOption, colors);
		}
		break;

		case 'listIncome':
			const income = budgetManager.getIncome();
			if(income) {
				console.log(
					colors.getColor().bold.red(`Printing ${income.incomeNumber}`)
				);
				income.income.forEach( (income) => {
					budgetManager.log(income, colors);
				});
			}
		break;

		case 'listExpenses':
			const expenses = budgetManager.getExpenses();
			if(expenses) {
				console.log(
					colors.getColor().bold.red(`Printing ${expenses.expensesNumber}`)
				);
				expenses.expenses.forEach( (expense) => {
					budgetManager.log(expense, colors);
				});
			}
			break;
		default:
			console.log(colors.theme('info', 'No command specified'));
			break;
}