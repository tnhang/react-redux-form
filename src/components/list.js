import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { getConsents, clearBehavior } from '../redux/actions';

import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';

import Layout from './layout';

const limit = 2;
const List = props => {
  const { dispatch, list, meta, fetching, error } = props;
  const [ page, setPage ] = useState(0);
  
  const fetchList = useCallback(() => {
    dispatch(getConsents({ limit, offset: page * limit }));
  }, [ dispatch, page ])

  useEffect(() => {
    fetchList();
  }, [ fetchList ]);

  useEffect(() => {
    if (!error) return;
    notification.error({
      message: 'An error occured',
      description: error,
      duration: 0
    });
    dispatch(clearBehavior());
  }, [ dispatch, error ]);

  return (
    <Layout>
      <Button onClick={fetchList}>Reload</Button>
      <Table
        rowKey='_id'
        dataSource={list}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Consent given for',
            dataIndex: 'givenfor',
            key: 'givenfor',
            render: v => <ul>
              {v.map(i => <li key={i}>{i}</li>)}
            </ul>
          },
        ]}
        loading={fetching}
        pagination={ meta && {
          total: meta.total,
          pageSize: limit,
          onChange: p => setPage(p - 1)
        }}
      />
    </Layout>
  );
}

const mapStateToProps = state => state.listReducer;

export default connect(mapStateToProps)(List);
