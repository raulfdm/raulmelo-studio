import React from 'react';
import { useStaticQuery } from 'gatsby';
import { mergeDeepRight } from 'ramda';

import { render } from '@utils/test';
import AuthorPresentation, { QueryProps } from './AuthorPresentation';

jest.mock('gatsby');
jest.mock(
  'gatsby-image',
  () =>
    function MockedImage() {
      return <div />;
    },
);

function mockApiResult(custom?: Partial<QueryProps>): Partial<QueryProps> {
  const defaultMockedQueryResponse = {
    strapiPersonalInformation: {
      full_name: 'Raul Melo',
      profile_pic: {
        childImageSharp: {
          fixed: {
            url:
              'https://miro.medium.com/fit/c/256/256/1*6jtMoNvX_MHslzBLP4aM9g.jpeg',
          },
        },
      },
    },
    strapiSocial: {},
  };

  const mergedProps = mergeDeepRight(
    defaultMockedQueryResponse,
    custom || {},
  ) as QueryProps;

  (useStaticQuery as jest.Mock<typeof useStaticQuery>).mockReturnValue(
    mergedProps as any,
  );

  return mergedProps;
}

describe('<AuthorPresentation />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders author name', () => {
    const siteInfo = mockApiResult();

    const { getByTestId } = render(<AuthorPresentation />);

    expect(getByTestId('author__name').textContent).toBe(
      siteInfo.strapiPersonalInformation?.full_name,
    );
  });

  it('renders site description from locale', () => {
    mockApiResult();

    const { getByTestId } = render(<AuthorPresentation />);

    expect(
      getByTestId('author__description').textContent,
    ).toMatchInlineSnapshot(
      `"Developer, writer in my spare time, tech addicted, open-source lover who believes the only way to transform lives is through education."`,
    );
  });

  it('renders github if received', () => {
    const github = 'https://github.com/raulfdm';

    mockApiResult({
      strapiSocial: {
        github: {
          url: github,
        },
      },
    });

    const { getByTestId } = render(<AuthorPresentation />);

    expect((getByTestId('author__githubUrl') as HTMLAnchorElement).href).toBe(
      github,
    );
  });

  it('renders twitter if received', () => {
    const twitter = 'https://twitter.com/raul_fdm';

    mockApiResult({
      strapiSocial: {
        twitter: {
          url: twitter,
        },
      },
    });

    const { getByTestId } = render(<AuthorPresentation />);

    expect((getByTestId('author__twitterUrl') as HTMLAnchorElement).href).toBe(
      twitter,
    );
  });

  it('renders linkedIn if received', () => {
    const linkedIn = 'https://www.linkedin.com/in/raulfdm/';

    mockApiResult({
      strapiSocial: {
        linkedIn: {
          url: linkedIn,
        },
      },
    });

    const { getByTestId } = render(<AuthorPresentation />);

    expect((getByTestId('author__linkedInUrl') as HTMLAnchorElement).href).toBe(
      linkedIn,
    );
  });
});
