const componentParser = require("./component-parser");
const expressionParser = require("./expression-parser");

function parse(expression) {
  if (expression == null) {
    throw new Error("Expression must be provided to parse.");
  }

  if (typeof expression !== "string") {
    throw new Error("Expression to parse must be a string.");
  }

  const componentsToParse = expressionParser(expression);

  if (componentsToParse == null) {
    return [];
  }

  return componentsToParse.map(component => componentParser(component));
}

module.exports = parse;
