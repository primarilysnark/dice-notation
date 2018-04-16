function serializeExpression(components) {
  return components.reduce((expression, component) => {
    if (expression.length === 0 && component.sign === "-") {
      return `-${component.value}`;
    } else if (expression.length === 0) {
      return component.value;
    } else {
      return `${expression} ${component.sign} ${component.value}`;
    }
  }, "");
}

module.exports = serializeExpression;
