import { renderHook, act } from '@testing-library/react-hooks';

import { useBlogPostFilters } from './useBlogPostFilters';
import { mockedPosts } from './__mocks__/mockedPosts';

function renderUseBlogPostFiltersHook() {
  return renderHook(() => useBlogPostFilters(mockedPosts as any));
}

describe('Filter', () => {
  it('default filter is all', () => {
    const { result } = renderUseBlogPostFiltersHook();

    expect(result.current.activeFilter).toBe('all');
  });
  it('changes filter', () => {
    const { result } = renderUseBlogPostFiltersHook();

    expect(result.current.activeFilter).toBe('all');

    act(() => {
      result.current.changeFilter('series');
    });

    expect(result.current.activeFilter).toBe('series');

    act(() => {
      result.current.changeFilter('single');
    });

    expect(result.current.activeFilter).toBe('single');
  });
});

describe('fn: loadMore', () => {
  it('load more 5 posts to render', () => {
    const { result } = renderUseBlogPostFiltersHook();

    expect(result.current.postsToRender('pt')).toHaveLength(5);

    act(() => {
      result.current.loadMorePosts();
    });

    expect(result.current.postsToRender('pt')).toHaveLength(10);
  });

  it('load more all posts to render', () => {
    const { result } = renderUseBlogPostFiltersHook();

    expect(result.current.postsToRender('pt')).toHaveLength(5);

    act(() => {
      result.current.loadMorePosts();
    });

    act(() => {
      result.current.loadMorePosts();
    });

    expect(result.current.postsToRender('pt')).toHaveLength(11);
  });
});

describe('fn: postsToRender', () => {
  it('initial number is 5 or less', () => {
    const { result } = renderUseBlogPostFiltersHook();

    expect(result.current.postsToRender('pt')).toHaveLength(5);
    expect(result.current.postsToRender('pt')).toMatchSnapshot();
  });

  it('return all posts with it has less then 5 posts', () => {
    const { result } = renderUseBlogPostFiltersHook();

    expect(result.current.postsToRender('en')).toHaveLength(4);
    expect(result.current.postsToRender('en')).toMatchSnapshot();
  });
});
