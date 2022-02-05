import 'twin.macro';

import NextImage from 'next/image';

type ImageProps = {
  width: string | number;
  height: string | number;
  src: string;
  alt?: string;
};

export const Image: React.FC<ImageProps> = (props) => {
  if (!props.width || !props.height) {
    throw new Error(
      'MdxComponents (<Image />): "width" and "height" are required',
    );
  }

  if (!props.src) {
    throw new Error('MdxComponents (<Image />): "src" is required');
  }

  return (
    <div tw="flex items-center justify-center">
      <figure>
        <NextImage {...props} />
      </figure>
    </div>
  );
};
