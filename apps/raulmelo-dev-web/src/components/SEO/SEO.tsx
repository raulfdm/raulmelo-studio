import React from 'react';
import Head from 'next/head';

import { siteData } from '@data/siteData';

type SEOProps = {
  title: string;
  imageUrl?: string;
  description: string;
  url: string;
  isBlogPost?: boolean;
  setCanonical?: boolean;
  withDefaultTitle?: boolean;
};

export const SEO: React.FC<SEOProps> = (props) => {
  const {
    title,
    description,
    url,
    imageUrl = siteData.seoImage.url,
    isBlogPost = false,
    setCanonical = true,
    withDefaultTitle = false,
    children,
  } = props;

  const metaUrl = getCanonicalLink({ siteUrl: siteData.url, uri: url });

  return (
    <Head>
      {/* General tags */}
      <title>
        {withDefaultTitle ? titleWithNameAndJobTitle(title) : title}
      </title>
      <meta name="description" content={description} />
      <meta name="image" content={imageUrl} />
      {setCanonical && <link rel="canonical" href={metaUrl} />}

      {/* OpenGraph tags */}
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteData.social.twitter.url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Fav Icon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="theme-color" content="#ffffff" />

      {/* Monetize my content */}
      <meta name="monetization" content="$ilp.uphold.com/Aa8j4MXjnPHg" />
      {children}
    </Head>
  );
};

function getCanonicalLink({
  uri,
  siteUrl,
}: {
  uri: string;
  siteUrl: string;
}): string {
  const origin = new URL(siteUrl);
  origin.pathname = uri;
  return origin.href;
}

function titleWithNameAndJobTitle(title: string): string {
  return `${title} | Raul Melo Software Developer`;
}
