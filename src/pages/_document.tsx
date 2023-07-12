import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '@stitches';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* eslint-disable-next-line react/no-danger */}
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
