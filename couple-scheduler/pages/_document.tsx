import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="dark">
        <Head />
        <body className="bg-transparent">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
