import { defineMessages } from 'react-intl';

import { Container } from '@components/Ui';
import { getTagUrl } from '@utils/url';
import { MenuBar } from '@components/MenuBar';
import { PersonalInformationApiData, PostTagApiData } from '@types-api';
import { Posts } from '@screens/Home/components/Posts';
import { SEO, titleWithNameAndJobTitle } from '@components/SEO';
import { useLocalization } from '@hooks/useLocalization';
import { AuthorPresentation } from '@screens/Home/components/AuthorPresentation';

const messages = defineMessages({
  description: {
    id: 'tag.description',
  },
  title: {
    id: 'tag.title',
  },
});

export type TagPageProps = {
  tag: PostTagApiData;
  personalInfo: PersonalInformationApiData;
};

export const TagPage: React.FC<TagPageProps> = ({ tag, personalInfo }) => {
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
          fullName={personalInfo.full_name}
          profilePic={personalInfo.profile_pic.url}
        />
        <Posts
          // TODO: fix that
          posts={tag.blog_posts as any}
          title={formatMessage(messages.title, { tag: tag.name })}
        />
      </Container>
    </>
  );
};
