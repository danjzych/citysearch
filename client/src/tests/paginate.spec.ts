import { describe, expect, it } from "vitest";
import paginate from "../utils/paginate";

const mockData = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

describe("paginate", () => {
  it("returns the first portion of items when current page is 1", () => {
    expect(paginate(mockData, 1, 10)).toEqual(mockData.slice(0, 10));
  });

  it("returns the next chunk of data when current page is 2, non-inclusive", () => {
    expect(paginate(mockData, 2, 10)).toEqual(mockData.slice(10, 20));
  });
});
