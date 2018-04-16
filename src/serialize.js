const serializeComponent = require("./serialize-component");
const serializeExpression = require("./serialize-expression");

function serialize(components) {
  if (components == null) {
    throw new Error("Components must be provided to serialize.");
  }

  if (!Array.isArray(components)) {
    throw new Error("Components to serialize must be an array.");
  }

  const componentsToSerialize = components.map(component => serializeComponent(component));

  if (componentsToSerialize == null) {
    return "";
  }

  return serializeExpression(componentsToSerialize);
}

module.exports = serialize;
