const parseParams = params =>
  params.filter(arg => /^--[A-Za-z]*/.test(arg))
  .reduce((result, arg) => {
    const clear = arg.replace('--', '');

    if (clear.indexOf('=') === -1) {
      result[clear] = true;
      return result;
    }

    const [param, value] = clear.split('=');
    result[param] = value;

    return result;
  }, {});

const getThemePath = theme => `./themes/${theme}`;

module.exports = { parseParams, getThemePath };
