const GA_TRACKING_ID = 'G-HY7TYWWEKD';

export const analyticsConfig = {
  scriptUrl: `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`,
  gtagLoadScript: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_path: window.location.pathname,
    });
  `,
};
