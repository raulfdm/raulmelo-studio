interface IComponentProps {
  value: {
    _type: string;
  };
}

export function sanityToUiAdapter(Component: React.ElementType) {
  return function Comp({ value }: IComponentProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _type, ...props } = value;
    return <Component {...props} />;
  };
}
