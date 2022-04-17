import { AxiosError } from 'axios';
import { render, fireEvent } from '@testing-library/react';
import { fetchResults } from './shared/services';
import { IResponse, IResultItem } from './types';
import App from './App';

const isPropertyExist = (result: IResultItem, key: string): boolean => {
  return result.hasOwnProperty(key);
}

describe("Main Component", () => {
  test('submit form and table should render expected data', async () => {
    const { container, getByText } = render(<App />);
    const inputs = container.querySelectorAll('#searchText');
    const searchField = inputs[0];
    fireEvent.change(searchField, { target: { value: "foo" } });
    const button = getByText("Submit");
    fireEvent.click(button);
    const table = container.querySelector('.ant-table-container');
    expect(searchField).toHaveValue('foo');
    expect(table).toBeInTheDocument();
  });
  
  test('test container is rendered', () => {
    const { container } = render(<App />);
    const divContainer = container.querySelector('.container');
    expect(divContainer).toBeInTheDocument();
  });

  test('test results API should return expected data', async () => {
    const searchText = "foo";
    const results: IResponse = await fetchResults(searchText, 1, 9);
    expect(results.items.length > 0).toBe(true);
    expect(isPropertyExist(results.items[0], 'avatar_url')).toBe(true);
    expect(isPropertyExist(results.items[0], 'login')).toBe(true);
    expect(isPropertyExist(results.items[0], 'type')).toBe(true);
  });

  test('test results API should throw error', async () => {
    const searchText = "";
    try {
      await fetchResults(searchText, 1, 9);
    } catch (error: AxiosError | any) {
      expect(error.response.data.message).toEqual('Validation Failed');
    }
  });

  test('test header component is rendered', () => {
    const { container } = render(<App />);
    const header = container.querySelector('.header');
    expect(header).toBeInTheDocument();
  });

  test('test search component is rendered', () => {
    const { container } = render(<App />);
    const form = container.querySelector('.ant-form');
    expect(form).toBeInTheDocument();
  });
});
