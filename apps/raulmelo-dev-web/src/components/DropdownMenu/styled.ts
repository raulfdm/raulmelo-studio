import { styled } from '@styles/styled';

export const DropdownMenuWrapper = styled.div`
  color: ${(props) => props.theme.color.font};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DropdownMenu = styled.div`
  position: relative;
`;

export const DropdownMenuList = styled.ul`
  background-color: ${(props) => props.theme.color.background};
  border-radius: 3px;
  box-shadow: ${(props) => props.theme.color.shadowLight} 0 1px 2px,
    ${(props) => props.theme.color.shadow} 0 0 1px;
  max-width: 280px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  flex-direction: column;
`;

export const ArrowUp = styled.div`
  clip: rect(0, 18px, 14px, -4px);
  left: 50%;
  margin-left: -7px;
  position: absolute;
  bottom: -8px;

  &::after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    background: ${(props) => props.theme.color.background};
    box-shadow: -1px -1px 1px -1px ${(props) => props.theme.color.shadow};
    transform: rotate(45deg) translate(6px, 6px);
  }
`;

export const DropdownMenuItem = styled.li`
  background-color: transparent;
  margin: 0;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  font-family: ${(props) => props.theme.font.contentSans};
  font-size: 16px;
  line-height: 1.4;
  padding: 7px 25px;
  position: relative;
  transition: background-color 0.1s, border-color 0.1s, color 0.1s, fill 0.1s;
  white-space: nowrap;
  flex: 1;

  &:not(:first-of-type) {
    border-top: 1px solid ${(props) => props.theme.color.border};
  }
`;

export const DropdownSeparator = styled.li`
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: block;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.4;
  list-style: none;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 0 15px;
  text-align: left;
  white-space: nowrap;
  height: 1px;
`;
