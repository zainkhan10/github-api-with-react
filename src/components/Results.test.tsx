import { render } from '@testing-library/react';
import { Results } from '.';
import { IResultItem } from '../types';

const mockData: IResultItem[] = [
    {
        avatar_url: "https://avatars.githubusercontent.com/u/35623?v=4",
        events_url: "https://api.github.com/users/ad/events{/privacy}",
        followers_url: "https://api.github.com/users/ad/followers",
        following_url: "https://api.github.com/users/ad/following{/other_user}",
        gists_url: "https://api.github.com/users/ad/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/ad",
        id: 35623,
        login: "foo",
        node_id: "MDQ6VXNlcjM1NjIz",
        organizations_url: "https://api.github.com/users/ad/orgs",
        received_events_url: "https://api.github.com/users/ad/received_events",
        repos_url: "https://api.github.com/users/ad/repos",
        score: 1,
        site_admin: false,
        starred_url: "https://api.github.com/users/ad/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/ad/subscriptions",
        type: "User",
        url: "https://api.github.com/users/ad",
    }
];

let props = {
    results: [],
    loading: true,
    onPaginationChange: jest.fn,
    page: 1,
    pageSize: 9,
    totalRecords: 0,
};

describe('Results Component', () => {
    test('test table is rendered with empty data', () => {
        const { container, getByText } = render(<Results {...props} />);
        const table = container.querySelector('.ant-table-container');
        const emptyTable = getByText("No Data");
        expect(table).toBeInTheDocument();
        expect(emptyTable).toBeInTheDocument();
    });

    test('test table is rendered with results data props', () => {
        const _props = {
            ...props,
            results: mockData,
        };
        const { container, getByText } = render(<Results {..._props} />);
        const table = container.querySelector('.ant-table-container');
        const login = getByText(mockData[0].login);
        expect(login).toBeInTheDocument();
        expect(login.textContent).toEqual('foo');
        expect(table).toBeInTheDocument();
    });

    test('test table column headings', () => {
        const { container } = render(<Results {...props} />);
        const tableHeader = container.getElementsByClassName('ant-table-cell');
        expect(tableHeader[0].textContent).toEqual('Avatar');
        expect(tableHeader[1].textContent).toEqual('Login');
        expect(tableHeader[2].textContent).toEqual('Type');
    });

    test('test table loader is working', () => {
        const _props = {
            ...props,
            loading: true,
        };
        const { container, getByText } = render(<Results {..._props} />);
        const emptyTable = getByText("No Data");
        const loader = container.querySelector('.ant-spin-spinning');
        expect(loader).toBeInTheDocument();
        expect(emptyTable).toBeInTheDocument();
    });
});