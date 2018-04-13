const expect = require("expect");
const td = require("testdouble");

describe("#parse", function() {
  let componentParser;
  let expressionParser;
  let parse;

  beforeEach(function() {
    componentParser = td.replace("../src/component-parser");
    expressionParser = td.replace("../src/expression-parser");
    parse = require("../src/parse");
  });

  afterEach(function() {
    td.reset();
  });

  it("should parse an expression into its component parts", function() {
    parse("expression");

    td.verify(expressionParser("expression"));
  });

  it("should evaluate an expression's component parts", function() {
    td.when(expressionParser("expression")).thenReturn(["component"]);

    parse("expression");

    td.verify(componentParser("component"));
  });

  it("should return those component parts", function() {
    td.when(expressionParser("expression")).thenReturn(["component"]);
    td.when(componentParser("component")).thenReturn("parsed-component");

    expect(parse("expression")).toEqual(["parsed-component"]);
  });

  it("should throw if no expression is provided", function() {
    expect(() => parse()).toThrow(/must be provided/);
  });

  it("should throw if expression provided is not a string", function() {
    expect(() => parse(123)).toThrow(/must be a string/);

    expect(() => parse({})).toThrow(/must be a string/);
  });
});
