import axios from 'axios';

import { api } from '../api';

jest.mock('axios');

const mockAxios = axios as unknown as jest.Mock<any>;

describe('api', () => {
  it('includes a "query" method', () => {
    expect(api).toHaveProperty('query');
  });

  describe('actual call', () => {
    const query = `query {posts{id}}`;

    const data = {
      foo: 'bar',
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      mockAxios.mockImplementation(() => {
        return new Promise((resolve) => {
          resolve({ data });
        });
      });
    });

    it('calls with the correct setup', async () => {
      await api.query(query);
      const [firstCall] = mockAxios.mock.calls[0];

      expect(firstCall).toMatchInlineSnapshot(`
        Object {
          "data": "{\\"query\\":\\"query {posts{id}}\\"}",
          "headers": Object {
            "Content-Type": "application/json",
          },
          "method": "POST",
          "url": "http://localhost:1337/graphql",
        }
      `);
    });

    it('returns expected data', async () => {
      const res = await api.query(query);
      expect(res).toBe(data);
    });
  });
});
