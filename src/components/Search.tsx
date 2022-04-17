import React, { memo } from 'react';
import { Input, Form, Button } from 'antd'
import { ISubmitForm } from '../types';

type Props = {
    onSubmit: (values: ISubmitForm) => void,
}

const Search: React.FC<Props> = memo(({ onSubmit }) => {

    return (
        <Form onFinish={onSubmit} validateTrigger="onSubmit">
            <Form.Item
                name="searchText"
                rules={[{ required: true, message: 'Required' }]}
            >
                <Input placeholder="Login text" />
            </Form.Item>
            <Form.Item className="text-right">
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
});

Search.defaultProps = {
    onSubmit: () => {},
}

export default Search;