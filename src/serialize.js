const componentSerializer = require("./component-serializer");
const expressionSerializer = require("./expression-serializer");

function serialize(components) {
  if (components == null) {
    throw new Error("Components must be provided to serialize.");
  }

  if (!Array.isArray(components)) {
    throw new Error("Components to serialize must be an array.");
  }

  const componentsToSerialize = componentSerializer(components);

  if (componentsToSerialize == null) {
    return "";
  }

  return expressionSerializer(componentsToSerialize);
}

module.exports = serialize;
