import { useRouter } from 'next/router';
import React from 'react';

export function usePageQueryReset({
  pageNumber,
  numberOfPages,
}: {
  pageNumber: number;
  numberOfPages: number;
}) {
  const router = useRouter();

  React.useEffect(() => {
    if (pageNumber > numberOfPages) {
      router.push(`${router.pathname}?page=1`);
    }
  }, [pageNumber, numberOfPages]);
}
