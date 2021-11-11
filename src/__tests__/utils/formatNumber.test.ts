import { formatNumber } from "utils";

test("Integars and floating point numbers get correctly formatted for display.", () => {
  expect(formatNumber(23.12345, 4)).toEqual("23.1235");
  expect(formatNumber(1, 2)).toEqual("1.00");
  expect(formatNumber(999999, 3)).toEqual("999,999.000");
  expect(formatNumber(123456789, 0)).toEqual("123,456,789");
  expect(formatNumber(null, 0)).toEqual(0);
});
