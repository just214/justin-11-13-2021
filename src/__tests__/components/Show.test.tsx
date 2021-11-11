import { render } from "@testing-library/react";
import { Show } from "components/Show";

describe("Show", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<Show when={true}>{(v) => "show"}</Show>);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  show
</DocumentFragment>
`);
  });
});
