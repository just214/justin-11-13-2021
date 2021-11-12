import { render } from "@testing-library/react";
import { Emoji } from "components/Emoji";

describe("Emoji", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<Emoji label="To the moon!" symbol="🚀" />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <span
    aria-label="To the moon!"
    role="img"
    title="To the moon!"
  >
    🚀
  </span>
</DocumentFragment>
`);
  });
});
