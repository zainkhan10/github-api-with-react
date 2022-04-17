
import React, { memo } from 'react';
import { Avatar, Table, Tag } from 'antd';
import { IResultItem } from '../types';
import { IColumn } from '../types/table-column';

type Props = {
    totalRecords: number,
    page: number,
    pageSize: number,
    results: IResultItem[],
    loading: boolean,
    onPaginationChange: (page: number, pageSize: number) => void
}

const columns: IColumn[] = [
    {
        title: 'Avatar',
        dataIndex: 'avatar_url',
        width: 30,
        render: (value: string) => <Avatar src={value} />
    },
    {
        title: 'Login',
        dataIndex: 'login',
        sorter: (a, b) => a.login.localeCompare(b.login),
        sortDirections: ['descend', 'ascend'],
        showSorterTooltip: false
    },
    {
        title: 'Type',
        dataIndex: 'type',
        render: (value: string) => <Tag>{value}</Tag>
    }
];

const Results: React.FC<Props> = memo(({ page, pageSize, results, loading, totalRecords, onPaginationChange }) => {
    return (
        <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={results}
            className="results-table"
            pagination={{
                current: page,
                pageSize: pageSize,
                onChange: onPaginationChange,
                total: totalRecords
            }}
        />
    )
});

Results.defaultProps = {
    page: 1,
    pageSize: 9,
    totalRecords: 100,
    results: [],
    loading: false,
    onPaginationChange: () => { }
}

export default Results;