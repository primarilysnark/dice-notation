function serializeComponent({ sign, ...component }) {
  switch (component.type) {
    case "rollable":
      return {
        sign,
        value: `${component.rollable.count}d${component.rollable.size}${component.rollable.modifier || ""}`
      };

    case "constant":
      return {
        sign,
        value: component.constant.value.toString(10)
      };

    default:
      throw new Error("Component must be a valid serializable type");
  }
}

module.exports = serializeComponent;
