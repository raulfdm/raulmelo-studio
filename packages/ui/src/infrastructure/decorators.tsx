import { ProseContainer } from '../components/ProseContainer';

export const proseDecorator = (Story) => (
  <ProseContainer>{<Story />}</ProseContainer>
);
