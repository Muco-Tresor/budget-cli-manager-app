const colors = require('colors/safe');


const theme = (themeName, data) => {
    // set theme
    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    });

    if(themeName === 'info') {
        return colors.info(data);
    }
}

const getColor = () => colors
module.exports = {
    theme,
    getColor,
}