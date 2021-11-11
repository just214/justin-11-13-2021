import { render } from "@testing-library/react";
import { Box } from "components/Box";

describe("Box", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<Box>Children</Box>);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    Children
  </div>
</DocumentFragment>
`);
  });
});
