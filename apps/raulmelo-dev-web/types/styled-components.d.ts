// import original module declarations
import 'styled-components';
import { SiteTheme } from '@styles/styled';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends SiteTheme {}
}
