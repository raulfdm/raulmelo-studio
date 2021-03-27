import React from 'react';

/**
 * This component aims to solves `next/link usage without compromise
 * the flexibility of the component library.
 */

export type ConfiguredLinkProps = React.HTMLProps<HTMLAnchorElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkProps?: any;
};

export function configureLink(
  Link?: React.ElementType,
): React.FC<ConfiguredLinkProps> {
  return function ConfiguredLink({ linkProps, ...props }) {
    if (Link) {
      const { href, ...filteredProps } = props;
      return (
        <Link href={href} {...linkProps}>
          <a {...filteredProps} />
        </Link>
      );
    }

    return <a {...props} />;
  };
}
