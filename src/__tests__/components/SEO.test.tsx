import { render } from "@testing-library/react";
import { SEO } from "components/SEO";

describe("SEO", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <SEO
        title="My app"
        description="Description of my awesome app!"
        icon="apple-touch-icon.png"
      />
    );
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
  });
});
