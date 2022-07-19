import React from 'react';
import { Link } from 'react-router-dom';
import { objectToQueryString } from '../objectToQueryString';

export const ToggleRouterButton = ({
  queryParams,
  pathname,
  children,
  toggled,
}) => {
  let className = 'button';
  if (toggled) {
    className += ' toggled';
  }
  return (
    <Link
      className={className}
      to={{
        pathname,
        search: objectToQueryString(queryParams),
      }}>
      {children}
    </Link>
  );
};
