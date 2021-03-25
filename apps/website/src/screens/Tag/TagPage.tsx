import { MenuBar } from '@components/MenuBar';
import { SEO, titleWithNameAndJobTitle } from '@components/SEO';
import { Container } from '@components/Ui';
import { useLocalization } from '@hooks/useLocalization';
import { AuthorPresentation } from '@screens/Home/components/AuthorPresentation';
import { Posts } from '@screens/Home/components/Posts';
import { getTagUrl } from '@utils/url';
import { defineMessages } from 'react-intl';
import { TagPageProps } from './types';

const messages = defineMessages({
  description: {
    id: 'tag.description',
  },
  title: {
    id: 'tag.title',
  },
});

export const TagPage: React.FC<TagPageProps> = ({
  tag,
  personalInformation,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <>
      <SEO
        description={titleWithNameAndJobTitle(
          formatMessage(messages.description, { tag: tag.name }),
        )}
        title={formatMessage(messages.title, { tag: tag.name })}
        withDefaultTitle
        url={getTagUrl(tag.slug)}
      />

      <MenuBar />
      <Container as="main">
        <AuthorPresentation
          fullName={personalInformation.full_name}
          profilePic={personalInformation.profile_pic.url}
        />
        <Posts
          //TODO: need to fix that when I start moving those UI components to components package
          posts={tag.blog_posts as any}
          title={formatMessage(messages.title, { tag: tag.name })}
        />
      </Container>
    </>
  );
};
