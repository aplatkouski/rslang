import { Pagination, PaginationItem, PaginationRenderItemParams } from '@material-ui/lab';
import { useAppParams } from 'common/hooks';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IWordCountByPages } from 'types';

interface Props {
  baseUrl: string;
  pageCount: number;
  // eslint-disable-next-line react/no-unused-prop-types
  wordCountByPages?: IWordCountByPages;
}

const Paginator = ({ baseUrl, pageCount, wordCountByPages }: Props): JSX.Element => {
  const { group, page } = useAppParams();
  const [minMaxPages, setMinMaxPages] = useState({ min: '0', max: `${pageCount - 1}` });

  useEffect(() => {
    if (wordCountByPages) {
      const pagesWithWords = Object.entries(wordCountByPages)
        .filter(([, wordCount]) => wordCount)
        .map(([pageIndex]) => +pageIndex);
      setMinMaxPages({
        min: Math.min(...pagesWithWords).toString(),
        max: Math.max(...pagesWithWords).toString(),
      });
    }
  }, [wordCountByPages]);

  const renderItem = (item: PaginationRenderItemParams) => {
    const isFirstPage =
      item.type === 'previous' &&
      (item.page === 0 || (wordCountByPages && page === minMaxPages.min));

    const isLastPage =
      item.type === 'next' &&
      (item.page > pageCount || (wordCountByPages && page === minMaxPages.max));

    const isEmptyPage =
      item.type === 'page' && wordCountByPages && !wordCountByPages[item.page - 1];

    const isDisabled = isFirstPage || isLastPage || isEmptyPage;

    let to = `${baseUrl}/${group}/${item.page - 1}/`;
    if (wordCountByPages) {
      if (item.type === 'previous') {
        let checkedPage = +page - 1;
        while (checkedPage >= 0 && !wordCountByPages[checkedPage]) {
          checkedPage -= 1;
        }
        to = `${baseUrl}/${group}/${checkedPage}/`;
      } else if (item.type === 'next') {
        let checkedPage = +page + 1;
        while (checkedPage < pageCount && !wordCountByPages[checkedPage]) {
          checkedPage += 1;
        }
        to = `${baseUrl}/${group}/${checkedPage}/`;
      }
    }

    return (
      <PaginationItem
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...item}
        component={NavLink}
        disabled={isDisabled}
        selected={item.selected}
        to={to}
      />
    );
  };

  return <Pagination count={pageCount} page={+page + 1} renderItem={renderItem} />;
};

export default Paginator;
