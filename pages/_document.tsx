import "../styles/globals.css";
import Document, { Html, Head, Main, NextScript } from "next/document";

import daisyuiThemes from "../styles/daisyui-themes.json";
const themes = Object.keys(daisyuiThemes) || [""];
export const defaultTheme = themes[0];

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html data-theme={defaultTheme}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Orbitron&family=Roboto+Mono:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
