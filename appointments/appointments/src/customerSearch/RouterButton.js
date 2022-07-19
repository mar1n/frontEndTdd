import React from 'react';
import { Link } from 'react-router-dom';
import { objectToQueryString } from '../objectToQueryString';

export const RouterButton = ({ pathname, queryParams, disabled }) => {
    let className = 'button';
    if(disabled) {
        className += ' disabled'
    }
    return(
        <Link
            className='button'
            to={{
                pathname: pathname,
                search: objectToQueryString(queryParams)
            }}
        >
        </Link>
    )
};

