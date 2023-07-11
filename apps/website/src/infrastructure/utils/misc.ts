import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function mergeClasses(...classes: classNames.ArgumentArray): string {
  return twMerge(classNames(...classes));
}
