import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { randomBytes } from "crypto";

let prod = process.env.NODE_ENV == "production";

function getCsp(nonce: string) {
  let csp = ``;
  csp += `base-uri 'self';`;
  csp += `form-action 'self';`;
  csp += `default-src 'self';`;
  csp += `script-src 'self' ${
    prod ? "https://ambience-kappa.vercel.app" : "'unsafe-eval'"
  };`; // NextJS requires 'unsafe-eval' in dev (faster source maps)
  csp += `style-src 'unsafe-inline' 'unsafe-eval' 'self' https://fonts.googleapis.com 'nonce-${nonce}' data:;`; // NextJS requires 'unsafe-inline'
  csp += `frame-src *;`; // TODO
  csp += `media-src *;`; // TODO
  csp += `connect-src *;`; // TODO
  return csp;
}

// require-trusted-types-for 'script';" TODO
let referrer = "strict-origin";

export default class Document extends NextDocument {
  render() {
    // Regenerated every render:
    const nonce = crypto.randomUUID();
    return (
      <Html prefix="og: http://ogp.me/ns#" lang="ru">
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={getCsp(nonce)} />
          <meta name="referrer" content={referrer} />
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
