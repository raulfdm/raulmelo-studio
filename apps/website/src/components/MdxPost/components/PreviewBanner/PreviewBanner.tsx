import React from 'react';
import tw from 'twin.macro';

const styles = {
  wrapper: tw`col-span-full bg-yellow-300 dark:text-black px-6 py-4 text-lg flex justify-center`,
  link: tw`underline`,
};

export const PreviewBanner = () => {
  return (
    <div css={styles.wrapper}>
      <p>
        This is <strong>Preview Mode</strong>.
      </p>
      <p>
        You can turn it off by{' '}
        <a css={styles.link} href="/api/exit-preview">
          clicking here
        </a>
        .
      </p>
    </div>
  );
};
