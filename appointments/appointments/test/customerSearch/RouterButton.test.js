import React from 'react';
import { Link, Router } from 'react-router-dom';
import { createShallowRenderer } from '../shallowHelpers';
import { RouterButton } from '../../src/CustomerSearch/RouterButton';

describe('RouterButton', () => {
    const pathname = '/path';
    const queryParams = { a: '123', b: '234' };
    let render, elementMatching, root;

    beforeEach(() => {
        ({render, elementMatching, root} = createShallowRenderer())
    });

    it('renders a Link', () => {
        render(
            <RouterButton
                pathname={pathname}
                queryParams={queryParams}
            />
        )
        expect(root().type).toEqual(Link);
        expect(root().props.className).toEqual('button');
        expect(root().props.to).toEqual({
            pathname: '/path',
            search: '?a=123&b=234'
        })
    });
});