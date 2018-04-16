const expect = require("expect");
const serializeComponent = require("../src/serialize-component");

describe("#serializeComponent", function() {
  it("should serialize a component", function() {
    expect(
      serializeComponent({
        sign: "+",
        type: "constant",
        constant: {
          value: 10
        }
      })
    ).toEqual({
      sign: "+",
      value: "10"
    });
  });

  it("should throw on an unclassified component", function() {
    expect(() =>
      serializeComponent({
        sign: "+",
        value: "10a"
      })
    ).toThrow(/must be a valid serializable type/);
  });

  describe("Rollables", function() {
    it("should serialize a rollable", function() {
      expect(
        serializeComponent({
          sign: "+",
          type: "rollable",
          rollable: {
            count: 2,
            size: 20,
            modifier: false
          }
        })
      ).toEqual({
        sign: "+",
        value: "2d20"
      });
    });

    it("should serialize a negative rollable", function() {
      expect(
        serializeComponent({
          sign: "-",
          type: "rollable",
          rollable: {
            count: 1,
            size: 10,
            modifier: false
          }
        })
      ).toEqual({
        sign: "-",
        value: "1d10"
      });
    });

    it("should serialize a rollable with a modifier", function() {
      expect(
        serializeComponent({
          sign: "+",
          type: "rollable",
          rollable: {
            count: 3,
            size: 6,
            modifier: "kH"
          }
        })
      ).toEqual({
        sign: "+",
        value: "3d6kH"
      });
    });
  });

  describe("Constants", function() {
    it("should parse a constant", function() {
      expect(
        serializeComponent({
          sign: "+",
          type: "constant",
          constant: {
            value: 112
          }
        })
      ).toEqual({
        sign: "+",
        value: "112"
      });
    });

    it("should parse a negative constant", function() {
      expect(
        serializeComponent({
          sign: "-",
          type: "constant",
          constant: {
            value: 9
          }
        })
      ).toEqual({
        sign: "-",
        value: "9"
      });
    });
  });
});
