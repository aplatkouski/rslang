import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { NavLink } from 'react-router-dom';
import { PAGES_PER_SECTOR } from '../../constants';

interface Props {
  baseUrl: string;
  count: number;
  group: number;
  page: number;
}

const Paginator = ({ baseUrl, count, group, page }: Props): JSX.Element => {
  const disabledPages: Array<number> = [];
  return (
    <Pagination
      count={count}
      page={page + 1}
      renderItem={({ disabled, ...item }) => {
        const isDisabled =
          (item.type === 'page' && disabledPages.includes(item.page)) ||
          (item.type === 'previous' && item.page === 0) ||
          (item.type === 'next' && item.page - 1 === PAGES_PER_SECTOR);

        const link =
          // eslint-disable-next-line no-nested-ternary
          item.type === 'previous' && disabledPages.includes(item.page)
            ? `/${baseUrl}/${group}/${item.page - 2}/`
            : item.type === 'next' && disabledPages.includes(item.page)
            ? `/${baseUrl}/${group}/${item.page}/`
            : `/${baseUrl}/${group}/${item.page - 1}/`;

        return (
          <PaginationItem
            component={NavLink}
            disabled={isDisabled}
            selected={item.selected}
            to={link}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
          />
        );
      }}
    />
  );
};

export default Paginator;
