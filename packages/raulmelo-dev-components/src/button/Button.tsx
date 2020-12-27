import React, { ButtonHTMLAttributes } from 'react';

export const Button = (props: ButtonProps) => <button {...props} />;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
