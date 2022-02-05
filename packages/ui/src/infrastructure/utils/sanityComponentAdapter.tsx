import { utils } from '@raulmelo/core';
interface IComponentProps {
  value: {
    _type: string;
  };
}

const propsToOmit = ['_type', '_key', 'markDefs', 'style'];

export function sanityToUiAdapter(Component: React.ElementType) {
  return function Comp({ value }: IComponentProps) {
    const props = utils.omit(propsToOmit, value);
    return <Component {...props} />;
  };
}
