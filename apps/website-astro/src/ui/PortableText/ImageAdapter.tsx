import { Image } from './Image';

type ImageAdapterProps = {
  value: {
    caption: string;
    image: {
      height: number;
      url: string;
      width: number;
    };
  };
};

export function ImageAdapter({ value }: ImageAdapterProps) {
  const { image, caption } = value;

  return <Image caption={caption} image={image} />;
}
