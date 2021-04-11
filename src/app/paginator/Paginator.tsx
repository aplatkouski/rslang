import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { NavLink, Route } from 'react-router-dom';

interface Props {
  baseUrl: string;
  count: number;
  group: number;
  page: number;
}

const Paginator = ({ baseUrl, count, group, page }: Props): JSX.Element => (
  <Route>
    <Pagination
      count={count}
      page={page + 1}
      renderItem={(item) => {
        return (
          <PaginationItem
            component={NavLink}
            to={`/${baseUrl}/${group}/${item.page - 1}/`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
          />
        );
      }}
    />
  </Route>
);

export default Paginator;
