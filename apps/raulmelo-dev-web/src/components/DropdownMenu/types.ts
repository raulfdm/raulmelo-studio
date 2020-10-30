type ToggleDropdown = () => void;

type RenderPropsChildren = (args: {
  isVisible: boolean;
  toggleDropdown: ToggleDropdown;
}) =>
  | (Element & React.ReactHTMLElement<HTMLElement>)
  | React.ReactElement<HTMLElement>;

export type DropdownMenuProps = {
  items: React.ReactNode;
  children: RenderPropsChildren;
};
