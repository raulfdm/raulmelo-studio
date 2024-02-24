import type { QuerySiteDataReturnType } from '@raulmelo/core/domains';

type Social = QuerySiteDataReturnType[`socials`][0];

/**
 * TODO: enhance this
 */
export function getSocial(
  name: string,
  siteData: QuerySiteDataReturnType,
): Social {
  const data = siteData.socials.find((social) =>
    social.name.toLowerCase().includes(name.toLowerCase()),
  );

  if (!data) {
    throw new Error(`GetSocial: cannot find social data for "${name}"`);
  }

  return data;
}

type GraphOptions = {
  title: string;
  description?: string;
  type: `article` | `website`;
  url?: string;
  noIndex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    tags?: string[];
  };
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

type GenerateOpenGraphResult = {
  property: string;
  content: string;
}[];

function generateOpenGraph({
  description,
  title,
  type,
  url,
  image,
}: GraphOptions): GenerateOpenGraphResult {
  const result: GenerateOpenGraphResult = [
    {
      content: `Raul Melo - Website and Blog`,
      property: `og:site_name`,
    },
  ];

  if (title) {
    result.push({
      property: `og:title`,
      content: title,
    });
  }

  if (description) {
    result.push({
      property: `og:description`,
      content: description,
    });
  }

  if (type) {
    result.push({
      property: `og:type`,
      content: type,
    });
  }

  if (url) {
    result.push({
      property: `og:url`,
      content: url,
    });
  }

  if (image) {
    result.push({
      property: `og:image`,
      content: image.url,
    });

    result.push({
      property: `og:image:alt`,
      content: image.alt,
    });

    result.push({
      property: `og:image:width`,
      content: image.width.toString(),
    });

    result.push({
      property: `og:image:height`,
      content: image.height.toString(),
    });
  }

  return result;
}

function generateTwitterCard(): GenerateOpenGraphResult {
  const result: GenerateOpenGraphResult = [
    {
      property: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      property: `twitter:creator`,
      content: `@raul_fdm`,
    },
    {
      property: `twitter:site`,
      content: `@raul_fdm`,
    },
  ];

  return result;
}

function getArticleTags({
  modifiedTime,
  publishedTime,
  tags,
}: NonNullable<GraphOptions[`article`]>): GenerateOpenGraphResult {
  const result: GenerateOpenGraphResult = [];

  if (publishedTime) {
    result.push({
      property: `article:published_time`,
      content: new Date(publishedTime).toISOString(),
    });
  }

  if (modifiedTime) {
    result.push({
      property: `article:modified_time`,
      content: new Date(modifiedTime).toISOString(),
    });
  }

  if (tags) {
    tags.forEach((tag) => {
      result.push({
        property: `article:tag`,
        content: tag,
      });
    });
  }

  return result;
}

export function getSEOTags(info: GraphOptions): Record<string, string> {
  const openGraph = generateOpenGraph(info);
  const twitterCard = generateTwitterCard();
  const articleData = info.article ? getArticleTags(info.article) : [];

  const allOptions = [...openGraph, ...twitterCard, ...articleData];

  const result: Record<string, string> = {
    title: info.title,
  };

  if (info.noIndex) {
    result.robots = `noindex`;
  }

  if (info.description) {
    result.description = info.description;
  }

  if (info.url) {
    result.canonical = info.url;
  }

  for (const option of allOptions) {
    result[option.property] = option.content;
  }

  return result;
}
