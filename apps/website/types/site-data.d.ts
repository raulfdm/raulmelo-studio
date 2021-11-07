import sideData from '../site-data.json';

declare module '~/site-data' {
  export default typeof sideData;
}
