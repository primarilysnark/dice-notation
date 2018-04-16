const expect = require("expect");
const parseComponent = require("../src/parse-component");

describe("#parseComponent", function() {
  it("should parse a component", function() {
    expect(
      parseComponent({
        sign: "+",
        value: "10"
      })
    ).toEqual({
      sign: "+",
      type: "constant",
      constant: {
        value: 10
      }
    });
  });

  it("should throw on an unclassified component", function() {
    expect(() =>
      parseComponent({
        sign: "+",
        value: "10a"
      })
    ).toThrow(/not a valid constant/);
  });

  describe("Rollables", function() {
    it("should parse a rollable", function() {
      expect(
        parseComponent({
          sign: "+",
          value: "2d20"
        })
      ).toEqual({
        sign: "+",
        type: "rollable",
        rollable: {
          count: 2,
          size: 20,
          modifier: false
        }
      });
    });

    it("should parse a rollable with a modifier", function() {
      expect(
        parseComponent({
          sign: "+",
          value: "2d20kH"
        })
      ).toEqual({
        sign: "+",
        type: "rollable",
        rollable: {
          count: 2,
          size: 20,
          modifier: "kH"
        }
      });
    });

    it("should throw on a rollable with an invalid modifier", function() {
      expect(() =>
        parseComponent({
          sign: "+",
          value: "2d20fake"
        })
      ).toThrow(/invalid rollable modifier/);
    });
  });

  describe("Constants", function() {
    it("should parse a constant", function() {
      expect(
        parseComponent({
          sign: "+",
          value: "112"
        })
      ).toEqual({
        sign: "+",
        type: "constant",
        constant: {
          value: 112
        }
      });
    });
  });
});
