import { render } from '@testing-library/react';
import { Header } from '.';

describe('Header Component', () => {
    test('test logo name', () => {
        const { container } = render(<Header />);
        const elements = container.getElementsByTagName('h4');
        expect(elements[0].textContent).toEqual('ReactJS Test Assignment')
    });
});