/* eslint-disable @typescript-eslint/no-explicit-any */

type IComponentProps = {
  value: {
    [key: string]: any;
  };
  children: React.ReactNode;
} & {
  [key: string]: any;
};

interface AdapterOptions {
  propsToOmit?: string[];
}

const sanityBlockPropsToIgnore = [
  '_type',
  '_key',
  'markDefs',
  'style',
  'sanityStyle',
];

export function sanityToUiAdapter(
  Component: React.ElementType,
  options: AdapterOptions = { propsToOmit: [] },
) {
  return function Comp({ value, children }: IComponentProps) {
    const { propsToOmit } = options;

    const allProps = { ...value, children } as IComponentProps;

    const allPropsToOmit = sanityBlockPropsToIgnore;

    if (propsToOmit) {
      allPropsToOmit.push(...propsToOmit);
    }

    allPropsToOmit.forEach((prop) => {
      delete allProps[prop];
    });

    return <Component {...allProps} />;
  };
}
