import classNames from 'classnames';
import { ComponentPropsWithRef, forwardRef } from 'react';

export const MenuButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithRef<'button'>
>(function MenuButton({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={classNames('flex p-2 place-content-center', className)}
      {...props}
    />
  );
});
