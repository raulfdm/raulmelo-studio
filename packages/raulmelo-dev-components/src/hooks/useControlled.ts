import React from 'react';

export default function useControlled<T = unknown>({
  controlled,
  default: defaultProp,
}: UseControlledProps<T>): [T, (newValue: T | null) => void] {
  const { current: isControlled } = React.useRef(controlled !== undefined);
  const [valueState, setValue] = React.useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = React.useCallback(newValue => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);

  return [value, setValueIfUncontrolled] as [T, (newValue: T | null) => void];
}

export interface UseControlledProps<T = unknown> {
  /**
   * This prop contains the component value when it's controlled.
   */
  controlled: T | undefined;
  /**
   * The default value when uncontrolled.
   */
  default: T | undefined;
}
