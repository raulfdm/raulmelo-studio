import { useEffect, useRef, cloneElement } from 'react';

type ClickOutsideProps = {
  handleClickOutside?: (event: Event) => void;
  children:
    | (Element & React.ReactHTMLElement<HTMLElement>)
    | React.ReactElement<HTMLElement>;
};

export const ClickOutside: React.FC<ClickOutsideProps> = ({
  handleClickOutside,
  children,
}) => {
  const childRef = useRef<HTMLElement>(null);

  const onClickOutside = (event: MouseEvent): void => {
    if (childRef.current && !childRef.current.contains(event.target as Node)) {
      if (handleClickOutside) {
        handleClickOutside(event);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutside);

    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  return cloneElement(children, { ref: childRef });
};
