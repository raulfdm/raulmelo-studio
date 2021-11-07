import exitPreview from '../exit-preview.page';

describe('Preview Route', () => {
  const mocks = createMockResponse();

  beforeEach(async () => {
    await exitPreview({} as any, mocks.mockRes as any);
  });

  it('calls clearPreviewData', async () => {
    expect(mocks.mockClearPreviewData).toHaveBeenCalledTimes(1);
  });

  it('calls writeHead with 307 and root location', () => {
    expect(mocks.mockWriteHead).toHaveBeenCalledTimes(1);
    expect(mocks.mockWriteHead).toBeCalledWith(307, { Location: '/' });
  });

  it('calls end', () => {
    expect(mocks.mockEnd).toHaveBeenCalledTimes(1);
  });
});

function createMockResponse() {
  const mockClearPreviewData = jest.fn();
  const mockWriteHead = jest.fn();
  const mockEnd = jest.fn();

  const mockRes = {
    clearPreviewData: mockClearPreviewData,
    writeHead: mockWriteHead,
    end: mockEnd,
  };

  return {
    mockClearPreviewData,
    mockRes,
    mockEnd,
    mockWriteHead,
  };
}
