import { domains } from '@raulmelo/core';

import previewRoute from '../preview.page';

jest.mock('@raulmelo/core', () => {
  const actualModule = jest.requireActual('@raulmelo/core');
  return {
    ...actualModule,
    domains: {
      preview: {
        queryPostOrTil: jest.fn(() => Promise.resolve(null)),
      },
    },
  };
});

const mockPreviewSecret = '123';

const mockQueryPostOrTil = domains.preview.queryPostOrTil as jest.Mock<any>;

const fakeData = {
  onlyTil: {
    _til: { id: 1, slug: 'my-til', language: 'en', _type: 'til' },
    get data() {
      return fakeData.onlyTil._til;
    },
  },
  onlyPost: {
    _post: { id: 2, slug: 'my-post', language: 'en', _type: 'post' },
    get data() {
      return fakeData.onlyPost._post;
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
      const { mockRes, mockJson, mockStatus } = createMockResponse();

      await previewRoute({ query: {} } as any, mockRes as any);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid token' });
    });

    it('slug is not present', async () => {
      const { mockRes, mockJson, mockStatus } = createMockResponse();
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

  it('fetches data with the slug value', async () => {
    const { mockRes } = createMockResponse();
    const slug = 'my-post';
    await previewRoute(
      { query: { secret: mockPreviewSecret, slug } } as any,
      mockRes as any,
    );

    expect(mockQueryPostOrTil).toHaveBeenCalledWith(slug);
  });

  it('returns 401 and invalid slug if content is null', async () => {
    const { mockRes, mockStatus, mockJson } = createMockResponse();
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
        const { mockRes, mockSetPreviewData } = createMockResponse();
        mockQueryPostOrTil.mockReturnValue(fakeData.onlyTil.data);
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
        const { mockRes, mockWriteHead } = createMockResponse();
        mockQueryPostOrTil.mockReturnValue(fakeData.onlyTil.data);
        await previewRoute(
          { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
          mockRes as any,
        );

        expect(mockWriteHead).toHaveBeenCalledTimes(1);
        expect(mockWriteHead).toHaveBeenCalledWith(307, expect.any(Object));
      });

      describe('with correct location', () => {
        it('generate til slug without locale', async () => {
          const { mockRes, mockWriteHead } = createMockResponse();
          mockQueryPostOrTil.mockReturnValue(fakeData.onlyTil.data);
          await previewRoute(
            { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
            mockRes as any,
          );

          expect(mockWriteHead).toHaveBeenCalledWith(expect.any(Number), {
            Location: '/til/my-til',
          });
        });

        it('generate til slug with locale', async () => {
          const { mockRes, mockWriteHead } = createMockResponse();
          mockQueryPostOrTil.mockResolvedValue({
            ...fakeData.onlyTil._til,
            language: 'pt',
            _type: 'til',
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
          const { mockRes, mockWriteHead } = createMockResponse();
          mockQueryPostOrTil.mockReturnValue(fakeData.onlyPost.data);
          await previewRoute(
            { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
            mockRes as any,
          );

          expect(mockWriteHead).toHaveBeenCalledWith(expect.any(Number), {
            Location: '/blog/my-post',
          });
        });

        it('generate post slug with locale', async () => {
          const { mockRes, mockWriteHead } = createMockResponse();
          mockQueryPostOrTil.mockResolvedValue({
            ...fakeData.onlyPost._post,
            language: 'pt',
            _type: 'post',
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
      const { mockRes, mockEnd } = createMockResponse();
      mockQueryPostOrTil.mockReturnValue(fakeData.onlyTil.data);
      await previewRoute(
        { query: { secret: mockPreviewSecret, slug: 'my-post' } } as any,
        mockRes as any,
      );

      expect(mockEnd).toHaveBeenCalledTimes(1);
    });
  });
});

function createMockResponse() {
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
