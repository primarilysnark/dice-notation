const expect = require("expect");
const td = require("testdouble");

describe("#serialize", function() {
  let componentSerializer;
  let expressionSerializer;
  let serialize;

  beforeEach(function() {
    componentSerializer = td.replace("../src/component-serializer");
    expressionSerializer = td.replace("../src/expression-serializer");
    serialize = require("../src/serialize");
  });

  afterEach(function() {
    td.reset();
  });

  it("should serialize a notation into serialized components", function() {
    serialize(["notation"]);

    td.verify(componentSerializer("notation"));
  });

  it("should serialize all serialized components into an expression", function() {
    td.when(componentSerializer("notation")).thenReturn("serialized-component");

    serialize(["notation"]);

    td.verify(expressionSerializer(["serialized-component"]));
  });

  it("should return the serialized expression", function() {
    td.when(componentSerializer("notation")).thenReturn("serialized-component");
    td.when(expressionSerializer(["serialized-component"])).thenReturn("expression");

    expect(serialize(["notation"])).toEqual("expression");
  });

  it("should throw if no expression is provided", function() {
    expect(() => serialize()).toThrow(/must be provided/);
  });

  it("should throw if expression provided is not a string", function() {
    expect(() => serialize(123)).toThrow(/must be an array/);

    expect(() => serialize("test")).toThrow(/must be an array/);

    expect(() => serialize({})).toThrow(/must be an array/);
  });
});
