import { render } from "@testing-library/react";
import { Button } from "components/Button";

describe("Button", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<Button variant="info">Click Me!</Button>);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    class="px-8 py-2 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-800 undefined"
  >
    Click Me!
  </button>
</DocumentFragment>
`);
  });
});
