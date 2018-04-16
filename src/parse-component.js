const rollableVerifier = /(\d+)d(\d+)([a-zA-Z0-9]*)$/;
const constantVerifier = /\d+$/;

const validRollableModifiers = ["kH", "kL", "kB", "kW", "a", "d"];

function parseConstant({ sign, value }) {
  return {
    sign,
    type: "constant",
    constant: {
      value: parseInt(value, 10)
    }
  };
}

function parseRollable({ sign, value }) {
  const rollable = rollableVerifier.exec(value);

  const modifier = rollable[3];
  if (modifier && !validRollableModifiers.includes(modifier)) {
    throw new Error("Component value contains an invalid rollable modifier");
  }

  return {
    sign,
    type: "rollable",
    rollable: {
      count: parseInt(rollable[1], 10),
      size: parseInt(rollable[2], 10),
      modifier: modifier || false
    }
  };
}

function parseComponent(component) {
  if (rollableVerifier.test(component.value)) {
    return parseRollable(component);
  }

  if (constantVerifier.test(component.value)) {
    return parseConstant(component);
  }

  throw new Error("Component value is not a valid constant or rollable");
}

module.exports = parseComponent;
