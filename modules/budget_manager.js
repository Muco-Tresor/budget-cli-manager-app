
// built in modules
const fs = require('fs');

// third party modules
const _ = require('lodash');

/**
 * [get all options]
 * @return {[object]} [expenses and income]
 */
const fetchBudgetOptions = () => {
	try {
		return JSON.parse(
			fs.readFileSync('./budget_options_data.json')
		);

	} catch(error) {
		return {income: [], expenses: []};
	}
}

/**
 * [save budget options in a json file]
 * @param  {[object]} budget [expenses and income options]
 * @return {[undefined]}        [nothing to return]
 */
const saveBudgetOptions = (budget) => {
	try {
		fs.writeFileSync('./budget_options_data.json', JSON.stringify(budget));
	} catch(error) {
		console.log(`Can't write on fs ${error}`);
	}

}

/**
 * [custom output]
 * @param  {[object]} option [budget option]
 * @param  {[object]} colors [colors in cli]
 * @return {[undefined]}        [nothing to return]
 */
const log = (option, colors) => {
	console.log(`${colors.theme('info', '=========================')}`);
	console.log(
		`${colors.getColor().bold.blue('type: ')} ${colors.theme('info', option.type)}`
	);

	console.log(
		`${colors.getColor().bold.blue('description: ')} ${colors.theme('info', option.description)}`
	);

	console.log(
		`${colors.getColor().bold.blue('amount: ')} ${colors.theme('info', option.amount)}`
	);

}

/**
 * [add options]
 * @param  {[string]} options.type        [option type]
 * @param  {[string]} options.description [option description]
 * @param  {[number]} options.amount      [option amount]
 * @return {[object]}                     [option]
 */
const add = ({type, description, amount}) => {

	// initialize options arrays
	let budget = { income: [], expenses: [], }

	let option = { type, description, amount }


	budget = fetchBudgetOptions();


	const duplicatesIncome = budget.income.filter( (income) => {
		return _.isEqual(income, option);
	});

	const duplicatesExpenses = budget.expenses.filter( (expense) => {
		return _.isEqual(expense, option);
	});

	if(option.type === 'income' && _.isEmpty(duplicatesIncome)) {
		budget.income.push(option);
		saveBudgetOptions(budget);
		return option;

	} else if (option.type === 'expense' && _.isEmpty(duplicatesExpenses)) {
		budget.expenses.push(option);
		saveBudgetOptions(budget);
		return option;
	}

}

/**
 * [show all income options]
 * @return {[object]} [all income options and income number]
 */
const getIncome = () => {
	const options = fetchBudgetOptions();

	return {
		incomeNumber: options.income.length > 1
					  ? `( ${options.income.length} options)`
					  : `( ${options.income.length} option )`,
		income: options.income
	}
}

/**
 * [show all expenses]
 * @return {[array]} [show all expenses]
 */
const getExpenses = () => {
	const options = fetchBudgetOptions();

	return {
		expensesNumber: options.expenses.length > 1
					  ? `( ${options.expenses.length} options )`
					  : `( ${options.expenses.length} option )`,
		expenses: options.expenses
	}
}
module.exports = {
	add,
	log,
	getIncome,
	getExpenses,
}