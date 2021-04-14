import { Pagination, PaginationItem } from '@material-ui/lab';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { WORDS_PER_PAGE } from '../../constants';

interface Props {
  baseUrl: string;
  count: number;
  group: number;
  page: number;
  countDeletedWordByPages?: {
    [page: string]: number;
  };
}

const Paginator = ({
  baseUrl,
  count,
  group,
  page,
  countDeletedWordByPages,
}: Props): JSX.Element => {
  const pages =
    countDeletedWordByPages || Object.fromEntries(Object.entries(Array(29).fill(0)));
  // @ts-ignore
  const renderItem = ({ disabled, ...item }) => {
    const isDisabled =
      // не учтено, что все страницы перед текущей могут быть недоступны
      (item.type === 'page' && pages[item.page - 1] === WORDS_PER_PAGE) ||
      (item.type === 'previous' && item.page === 0) ||
      // не учтено, что все страницы после текущей могут быть недоступны
      (item.type === 'next' && item.page - 1 === count);

    return (
      <PaginationItem
        component={NavLink}
        disabled={isDisabled}
        selected={item.selected}
        to={`/${baseUrl}/${group}/${item.page - 1}/`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...item}
      />
    );
  };
  return <Pagination count={count} page={page + 1} renderItem={renderItem} />;
};

export default Paginator;
