import React, { memo, useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { Alert, Col, Row } from 'antd';
import { Header, Search, Results } from './components'
import { fetchResults } from './shared/services';
import { IResultItem, ISubmitForm, IResponse, Pagination } from './types';
import './App.css';

const App: React.FC = memo(() => {
    const [loader, setLoader] = useState<boolean>(false);
    const [results, setResults] = useState<IResultItem[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 9 })

    const getResults = useCallback(async (searchText: string, page: number, pageSize: number) => {
        try {
            setLoader(true);
            const results: IResponse = await fetchResults(searchText, page, pageSize);
            setResults([...results.items]);
            setTotalRecords(results.total_count);
            setPagination({ page, pageSize });
            setLoader(false);
            setErrorMessage('');
        } catch (error: AxiosError | any) {
            setLoader(false);
            setErrorMessage(error.response.data.message);
        }
    }, [results]);

    const onSubmitHandler = useCallback((values: ISubmitForm): void => {
        const { searchText } = values;
        setSearchText(searchText);
        getResults(searchText, 1, 9);
    }, [results]);

    const onPaginationChange = useCallback((page: number, pageSize: number) => {
        getResults(searchText, page, pageSize)
    }, [results]);

    return (
        <>
            <Header />
            <div className="container">
                <Row gutter={20}>
                    <Col span={8}>
                        <Search onSubmit={onSubmitHandler} />
                    </Col>
                    <Col span={16}>
                        <Results
                            {...pagination}
                            totalRecords={totalRecords}
                            loading={loader}
                            results={results}
                            onPaginationChange={onPaginationChange}
                        />
                        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
                    </Col>
                </Row>
            </div>
        </>
    );
});

export default App;
