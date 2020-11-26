const HeadingStyle: React.FC<{ tag: string }> = ({ tag, children }) => {
  return (
    <>
      {children}
      <style jsx global>
        {`
          .prose ${tag} {
            position: relative;
            display: table;

            --icon-visible: hidden;
          }

          .prose ${tag}:hover {
            --icon-visible: unset;
          }

          .prose .copy-title-icon {
            position: absolute;
            right: -0.1em;
            transform: translate(100%, 50%);
          }

          .prose .copy-title-icon .icon.icon-link {
            display: inline-block;
            display: block;
            width: 0.7em;
            height: 0.7em;
            mask: url(/icons/anchor.svg) no-repeat;
            transition: visibility 0.2s ease-in-out;
            visibility: var(--icon-visible);
            background-color: black;
          }

          .dark .prose .icon.icon-link {
            background-color: white;
          }
        `}
      </style>
    </>
  );
};

export const h1 = (props: React.ComponentPropsWithoutRef<'h1'>) => (
  <HeadingStyle tag="h1">
    <h1 {...props} />
  </HeadingStyle>
);

export const h2 = (props: React.ComponentPropsWithoutRef<'h2'>) => (
  <HeadingStyle tag="h2">
    <h2 {...props} />
  </HeadingStyle>
);

export const h3 = (props: React.ComponentPropsWithoutRef<'h3'>) => (
  <HeadingStyle tag="h3">
    <h3 {...props} />
  </HeadingStyle>
);

export const h4 = (props: React.ComponentPropsWithoutRef<'h4'>) => (
  <HeadingStyle tag="h4">
    <h4 {...props} />
  </HeadingStyle>
);

export const h5 = (props: React.ComponentPropsWithoutRef<'h5'>) => (
  <HeadingStyle tag="h5">
    <h5 {...props} />
  </HeadingStyle>
);

export const h6 = (props: React.ComponentPropsWithoutRef<'h6'>) => (
  <HeadingStyle tag="h6">
    <h6 {...props} />
  </HeadingStyle>
);
