// import { PortableText } from '@portabletext/react';
// import { ProseContainer } from '@raulmelo/ui';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import type { NextSeoProps } from 'next-seo';
// import { ArticleJsonLd, NextSeo } from 'next-seo';
// import { useMemo } from 'react';

import type { domains } from '@raulmelo/core';

// import { ShareContent } from '~/components/ShareContent';
// import { Tag, Tags } from '~/components/Tags';
// import { useLocalization } from '~/hooks/useLocalization';
// import siteData from '~/site-data';
// import { getTagUrl } from '~/utils/url';

// import { Header } from './components/Header';
// import { portableComponents } from './components/portableComponents';
// import { PreviewBanner } from './components/PreviewBanner/PreviewBanner';

type Post = Awaited<ReturnType<typeof domains.posts.queryPostBySlug>>;

type PortableTextPostProps = {
  post: Post;
  // content: any;
  // title: string;
  // subtitle?: string;
  // publishedAt: string;
  // estimatedReadingTime: number;
  // nextSeo?: NextSeoProps;
  // preview?: boolean;
  // unsplash?: {
  //   authorName: string;
  //   url: string;
  // };
  // description?: string;
  // seriesSection?: {
  //   top: JSX.Element | null;
  //   bottom: JSX.Element | null;
  // };
  // tags?: {
  //   _id: string;
  //   name: string;
  //   slug: string;
  // }[];
};

export const PortableTextPost = ({ post }: PortableTextPostProps) => {
  // const { formatDate } = useLocalization();
  // const { asPath } = useRouter();

  // return (
  //   <>
  //       {seriesSection?.top}
  //       <ProseContainer className="mt-8">
  //         <PortableText
  //           value={content}
  //           components={portableComponents as never}
  //         />
  //       </ProseContainer>
  //       {seriesSection?.bottom}
  //       <hr className="mt-10 mb-6" />
  //       <footer className="flex flex-wrap justify-between">
  //         {tags ? (
  //           <div className="mb-4 mr-4">
  //             <span className="block mb-4 font-extrabold text-md md:text-lg lg:text-xl md:mb-6">
  //               Tags
  //             </span>
  //             <Tags>
  //               {tags.map((tag) => (
  //                 <Tag key={tag._id} className="text-base lg:text-lg">
  //                   <Link
  //                     href={getTagUrl(tag.slug)}
  //                     className="underline text-secondary"
  //                   >
  //                     #{tag.name}
  //                   </Link>
  //                 </Tag>
  //               ))}
  //             </Tags>
  //           </div>
  //         ) : null}
  //         {description ? (
  //           <ShareContent
  //             twitter={{ text: description }}
  //             linkedIn={{ title, summary: description }}
  //           />
  //         ) : null}
  //       </footer>
  //     </section>
  //   </>
  // );
  return null;
};
