import React from 'react';

declare global {
  interface Window {
    gtag: any;
  }
}

const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default function GoogleAnalytics() {
  if (typeof trackingId !== 'string') return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      ></script>
      <script id="ga">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${trackingId}');`}
      </script>
    </>
  );
}
