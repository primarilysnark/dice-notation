const separators = ["+", "-"];

const separatorSplitter = new RegExp(`(?=[${separators.join()}])`);

function parseExpression(expression) {
  return expression.split(separatorSplitter)
    .filter(component => component.length !== 0)
    .map(component => {
      if (!separators.includes(component.charAt(0))) {
        return {
          sign: "+",
          value: component.trim()
        };
      }

      return {
        sign: component.charAt(0),
        value: component.substring(1).trim()
      };
    });
}

module.exports = parseExpression;
