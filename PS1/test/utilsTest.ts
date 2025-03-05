import assert from "assert";
import { add } from "../src/utils"; // Import your utility functions

describe("Utils Test Suite", () => {
  describe("add()", () => {
    it("should add two positive numbers correctly", () => {
      assert.strictEqual(add(2, 3), 5);
    });

    it("should add a positive and a negative number correctly", () => {
      assert.strictEqual(add(5, -2), 3);
    });

    it("should add zero to a number correctly", () => {
      assert.strictEqual(add(7, 0), 7);
    });
  });
});
