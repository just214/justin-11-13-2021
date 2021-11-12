import Document, { Html, Head, Main, NextScript } from "next/document";

// eslint-disable-next-line functional/no-class
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="text1 surface1">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
