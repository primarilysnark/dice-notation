const expect = require("expect");
const serializeExpression = require("../src/serialize-expression");

describe("#serializeExpression", function() {
  it("should serialize components into an expression", function() {
    expect(serializeExpression([
      {
        sign: "+",
        value: "first"
      },
      {
        sign: "+",
        value: "second"
      }
    ])).toEqual("first + second");
  });

  it("should serialize an expression with a negative sign", function() {
    expect(serializeExpression([
      {
        sign: "-",
        value: "first"
      }
    ])).toEqual("-first");
  });

  it("should serialize an expression with mixed signs", function() {
    expect(serializeExpression([
      {
        sign: "+",
        value: "first"
      },
      {
        sign: "-",
        value: "second"
      }
    ])).toEqual("first - second");
  });

  it("should serialize an expression with multiple components", function() {
    expect(serializeExpression([
      {
        sign: "+",
        value: "first"
      },
      {
        sign: "-",
        value: "second"
      },
      {
        sign: "+",
        value: "third"
      }
    ])).toEqual("first - second + third");
  });

  it("should serialize an empty component set", function() {
    expect(serializeExpression([])).toEqual("");
  });
});
