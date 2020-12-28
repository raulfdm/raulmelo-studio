import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

export const Button = ({ className, ...props }: ButtonProps) => (
  <button className={classNames(['bg-purple-600', className])} {...props} />
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
