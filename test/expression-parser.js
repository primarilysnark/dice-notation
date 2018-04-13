const expect = require("expect");
const parseExpression = require("../src/expression-parser");

describe("#parseExpression", function() {
  it("should parse an expression", function() {
    expect(parseExpression("first + second")).toEqual([
      {
        sign: "+",
        value: "first"
      },
      {
        sign: "+",
        value: "second"
      }
    ]);
  });

  it("should parse an expression with a negative separator", function() {
    expect(parseExpression("- first")).toEqual([
      {
        sign: "-",
        value: "first"
      }
    ]);
  });

  it("should parse an expression with mixed separator", function() {
    expect(parseExpression("first - second")).toEqual([
      {
        sign: "+",
        value: "first"
      },
      {
        sign: "-",
        value: "second"
      }
    ]);
  });

  it("should parse an expression with multiple separators", function() {
    expect(parseExpression("first - second + third")).toEqual([
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
    ]);
  });

  it("should parse an empty expression", function () {
    expect(parseExpression("")).toEqual([]);
  });

  it("should normalize whitespace from expression components", function () {
    expect(parseExpression("first-second +third")).toEqual([
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
    ]);
  });
});
