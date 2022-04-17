import { render, fireEvent, waitFor } from '@testing-library/react';
import { Search } from '.';

const props = {
    onSubmit: jest.fn(),
};

describe('Search Component', () => {
    test('test fields are rendered', () => {
        const { container, getByText } = render(<Search {...props} />);
        const searchField = container.querySelector('#searchText');
        const button = getByText("Submit");
        expect(searchField).toBeTruthy();
        expect(button).toBeTruthy();
    });

    test('test search field by entering text', () => {
        const { container } = render(<Search {...props} />);
        const inputs = container.querySelectorAll('#searchText');
        const searchField = inputs[0];
        fireEvent.change(searchField, { target: { value: "foo" } });
        expect(searchField).toHaveValue('foo');
    });

    test('test search field should throw error', async () => {
        const { container, getByText } = render(<Search {...props} />);
        const button = getByText("Submit");
        fireEvent.click(button);
        waitFor(() => expect(container.getElementsByClassName('ant-input-status-error').length).toBe(1));
    });

    test('test search field should not throw error', async () => {
        const { container, getByText } = render(<Search {...props} />);
        const inputs = container.querySelectorAll('#searchText');
        const searchField = inputs[0];
        const button = getByText("Submit");
        fireEvent.change(searchField, { target: { value: "foo" } });
        fireEvent.click(button);
        expect(searchField).toHaveValue('foo');
        expect(container.getElementsByClassName('ant-input-status-error').length).toBe(0);
    });
})