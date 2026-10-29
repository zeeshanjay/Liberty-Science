"use client";

import Script from "next/script";

export function AffirmScript() {
  const publicKey =
    process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY || "ITFCDUPSNUKREKNE";

  return (
    <Script
      id="affirm-sdk-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          _affirm_config = {
            public_api_key: "${publicKey}",
            script: "https://cdn1.affirm.com/js/v2/affirm.js",
            locale: "en_US",
            country_code: "USA"
          };
          (function(m,g,e,d,k,z,y){
            var h=m[k]=m[k]||function(){(h.q=h.q||[]).push(arguments)},
            f=g.createElement(e),s=g.getElementsByTagName(e)[0];
            f.async=1;f.src=d;s.parentNode.insertBefore(f,s);
          })(window,document,"script",_affirm_config.script,"affirm");
        `,
      }}
    />
  );
}
