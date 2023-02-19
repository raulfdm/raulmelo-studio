import { Image } from './Image';
import { ImageAdapter } from './ImageAdapter';
import { ImageSliderAdapter } from './ImageSliderAdapter';

export const portableComponents = {
  hardBreak: false,
  types: {
    youtubeVideo: sanityToUiAdapter(YouTubeIframe),
    tweet: sanityToUiAdapter(Tweet),
  },
  // block: {
  //   blockquote: ({ children }: { children: string[] }) => {
  //     const updatedChildren = children
  //       .filter((c) => c !== '')
  //       .reduce((accumulator, current) => {
  //         if (current.length === 0) {
  //           return accumulator;
  //         }

  //         if (current === '\n') {
  //           accumulator.push(<br />);
  //           return accumulator;
  //         }

  //         accumulator.push(current);
  //         return accumulator;
  //       }, [] as (React.ReactNode | string)[]);

  //     return <blockquote>{updatedChildren}</blockquote>;
  //   },
  // },
  // marks: {
  //   link: ({
  //     children,
  //     value,
  //   }: {
  //     children: React.ReactNode;
  //     value: { href: string; blank: boolean };
  //   }) => {
  //     const { href, blank } = value;
  //     const props = {
  //       href,
  //       children,
  //     } as React.AnchorHTMLAttributes<HTMLAnchorElement>;

  //     if (blank === true) {
  //       props.target = '_blank';
  //       props.rel = 'noopener noreferrer';
  //     }

  //     return <a {...props} />;
  //   },
  //   internalLink: ({
  //     children,
  //     value,
  //   }: {
  //     children: React.ReactNode;
  //     value: {
  //       itemMeta: {
  //         slug: string;
  //         _type: 'post' | 'til';
  //       };
  //     };
  //   }) => {
  //     const { slug, _type } = value.itemMeta;
  //     let href = '';

  //     if (_type === 'post') {
  //       href = '/blog/';
  //     } else if (_type === 'til') {
  //       href = '/til/';
  //     }

  //     href += slug;

  //     return <a href={href}>{children}</a>;
  //   },
  // },
};
