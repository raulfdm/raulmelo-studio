import classNames, { type ClassArray } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergeClasses(...classes: ClassArray): string {
  return twMerge(classNames(...classes));
}
