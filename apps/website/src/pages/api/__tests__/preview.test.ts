import previewRoute from '../preview';

const mockPreviewSecret = '123';

describe('Preview Route', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, {
      STRAPI_PREVIEW_SECRET: mockPreviewSecret,
    });
  });

  describe('returns with status 401 and invalid token when...', () => {
    it('token is invalid', async () => {
      const mockStatus = jest.fn();
      const mockJson = jest.fn();
      const mockRes = {
        status: mockStatus.mockImplementation(() => ({ json: mockJson })),
      };

      await previewRoute({ query: {} } as any, mockRes as any);

      expect(mockStatus).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid token' });
    });

    it('slug is not present', async () => {
      const mockStatus = jest.fn();
      const mockJson = jest.fn();
      const mockRes = {
        status: mockStatus.mockImplementation(() => ({ json: mockJson })),
      };

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
});
