import previewRoute from '../preview';
import { Backend } from '@services/Backend';

jest.mock('@services/Backend', () => {
  const actualModule = jest.requireActual('@services/Backend');
  return {
    ...actualModule,
    Backend: {
      graphql: jest.fn(() => Promise.resolve({ tils: [], posts: [] })),
    },
  };
});

const mockPreviewSecret = '123';

const mockBackendGraphql = Backend.graphql as jest.Mock<any>;

const fakeData = {
  onlyTil: {
    _til: { id: 1, slug: 'my-til', locale: 'en' },
    get data() {
      return {
        tils: [fakeData.onlyTil._til],
        posts: [],
      };
    },
  },
  onlyPost: {
    _post: { id: 2, slug: 'my-post', locale: 'en' },
    get data() {
      return {
        tils: [],
        posts: [fakeData.onlyPost._post],
      };
    },
  },
};

describe('Preview Route', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, {
      STRAPI_PREVIEW_SECRET: mockPreviewSecret,
    });
  });

  describe('returns with status 401 and invalid token when...', () => {
    it('token is invalid', async () => {
      const { mockRes, mockJson, mockStatus } = createMockResponde();

      await previewRoute({ query: {} } as any, mockRes as any);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid token' });
    });

    it('slug is not present', async () => {
      const { mockRes, mockJson, mockStatus } = createMockResponde();
      await previewRoute(
        { query: { secret: mockPreviewSecret } } as any,
        mockRes as any,
      );

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid token' });
    });
  });

  it('calls graphql with the query and preview params expected', async () => {
    const { mockRes } = createMockResponde();
    await previewRoute(
      { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
      mockRes as any,
    );

    const [firstCall] = mockBackendGraphql.mock.calls;

    expect(firstCall).toMatchInlineSnapshot(`
      Array [
        "
          query Tils($where: JSON) {
            tils(locale: \\"all\\", where: $where) {
              slug
              locale
            }
            posts(locale: \\"all\\", where: $where){
              slug
              locale
            }
          }
        ",
        Object {
          "where": Object {
            "_publicationState": "preview",
            "published_at_null": true,
            "slug": "my-post",
          },
        },
      ]
    `);
  });

  it('returns 401 and invalid slug if both post and til is nil', async () => {
    const { mockRes, mockStatus, mockJson } = createMockResponde();
    await previewRoute(
      { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
      mockRes as any,
    );

    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid slug' });
  });

  describe('pass validations', () => {
    describe('sets setPreviewData', () => {
      it('define max age to preview', async () => {
        const { mockRes, mockSetPreviewData } = createMockResponde();
        mockBackendGraphql.mockReturnValue(fakeData.onlyTil.data);
        await previewRoute(
          { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
          mockRes as any,
        );

        expect(mockSetPreviewData).toHaveBeenCalledTimes(1);
        expect(mockSetPreviewData).toHaveBeenCalledWith({
          maxAge: 3600,
        });
      });
    });

    describe('calls writeHead', () => {
      it('with 307', async () => {
        const { mockRes, mockWriteHead } = createMockResponde();
        mockBackendGraphql.mockReturnValue(fakeData.onlyTil.data);
        await previewRoute(
          { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
          mockRes as any,
        );

        expect(mockWriteHead).toHaveBeenCalledTimes(1);
        expect(mockWriteHead).toHaveBeenCalledWith(307, expect.any(Object));
      });

      describe('with correct location', () => {
        it('generate til slug without locale', async () => {
          const { mockRes, mockWriteHead } = createMockResponde();
          mockBackendGraphql.mockReturnValue(fakeData.onlyTil.data);
          await previewRoute(
            { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
            mockRes as any,
          );

          expect(mockWriteHead).toHaveBeenCalledWith(expect.any(Number), {
            Location: '/til/my-til',
          });
        });

        it('generate til slug with locale', async () => {
          const { mockRes, mockWriteHead } = createMockResponde();
          mockBackendGraphql.mockResolvedValue({
            tils: [{ ...fakeData.onlyTil._til, locale: 'pt' }],
            posts: [],
          });

          await previewRoute(
            { query: { secret: mockPreviewSecret, slug: 'my-til' } } as any,
            mockRes as any,
          );

          expect(mockWriteHead).toHaveBeenCalledWith(expect.any(Number), {
            Location: '/pt/til/my-til',
          });
        });

        it('generate post slug without locale', async () => {
          const { mockRes, mockWriteHead } = createMockResponde();
          mockBackendGraphql.mockReturnValue(fakeData.onlyPost.data);
          await previewRoute(
            { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
            mockRes as any,
          );

          expect(mockWriteHead).toHaveBeenCalledWith(expect.any(Number), {
            Location: '/blog/my-post',
          });
        });

        it('generate post slug with locale', async () => {
          const { mockRes, mockWriteHead } = createMockResponde();
          mockBackendGraphql.mockResolvedValue({
            tils: [],
            posts: [{ ...fakeData.onlyPost._post, locale: 'pt' }],
          });

          await previewRoute(
            { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
            mockRes as any,
          );

          expect(mockWriteHead).toHaveBeenCalledWith(expect.any(Number), {
            Location: '/pt/blog/my-post',
          });
        });
      });
    });

    it('calls end at the end of execution', async () => {
      const { mockRes, mockEnd } = createMockResponde();
      mockBackendGraphql.mockReturnValue(fakeData.onlyTil.data);
      await previewRoute(
        { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
        mockRes as any,
      );

      expect(mockEnd).toHaveBeenCalledTimes(1);
    });
  });
});

function createMockResponde() {
  const mockStatus = jest.fn();
  const mockJson = jest.fn();
  const mockSetPreviewData = jest.fn();
  const mockWriteHead = jest.fn();
  const mockEnd = jest.fn();

  const mockRes = {
    status: mockStatus.mockImplementation(() => ({ json: mockJson })),
    setPreviewData: mockSetPreviewData,
    writeHead: mockWriteHead,
    end: mockEnd,
  };

  return {
    mockRes,
    mockStatus,
    mockJson,
    mockSetPreviewData,
    mockEnd,
    mockWriteHead,
  };
}
