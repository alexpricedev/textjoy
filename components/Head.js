import Head from 'next/head';

export default () => (
  <Head>
    <title>
      ThoughtfulSMS - Lovely Messages Delivered to Your Loved Ones Each Week
    </title>
    <meta
      name="description"
      content="ThoughtfulSMS is a unique gift where you can buy a friend a year of delightful SMS messages sent directly to them, once per week."
    />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />

    {/* Facebook pixel */}
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '359356424636659'); fbq('track', 'PageView');`,
      }}
    />
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=359356424636659&ev=PageView&noscript=1" />`,
      }}
    />

    {/* Crisp chat */}
    <script
      dangerouslySetInnerHTML={{
        __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="a391735a-3c01-4152-b6dd-c87b85af0a5e";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
      }}
    />
  </Head>
);
