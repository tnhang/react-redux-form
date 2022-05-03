import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postConsent, clearBehavior } from '../redux/actions';

import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import Button from 'antd/lib/button';
import Popover from 'antd/lib/popover';
import notification from 'antd/lib/notification';

import Layout from './layout';

const checkboxOptions = [
  'Receive newsletter',
  'Be shown targeted ads',
  'Contribute to anonymous visit statistics'
];
const MyForm = props => {
  const { dispatch, fetching, error, message } = props;
  const [ check, setCheck ] = useState([]);
  const [ form ] = Form.useForm();

  useEffect(() => {
    if (error) {
      notification.error({
        message: 'An error occured',
        description: message,
        duration: 0
      });
    } else if (message) {
      notification.success({ message })
      form.resetFields();
      setCheck([]);
    }
    dispatch(clearBehavior());
  }, [ dispatch, form, error, message ]);

  const onFinish = values => {
    dispatch(postConsent(JSON.stringify({ ...values, givenfor: check })));
  };
  
  return (
    <Layout>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name='basic'
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={16} md={8} offset={1}>
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={16} md={8} offset={1}>
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input type='email'/>
            </Form.Item>
          </Col>
          <Col span={16} offset={1}>
            <Form.Item 
              labelCol={{ xs: { offset: 6 }, sm: { offset: 12 } }}
              wrapperCol={{ xs: { offset: 0, span: 16 }, sm: { offset: 8, span: 16 } }}
              label='I agree to:'
            >
              <Checkbox.Group className='dp-checkbox'
                options={checkboxOptions.map(label => ({ label, value: label }))}
                onChange={setCheck}
                value={check}
              />
            </Form.Item>
          </Col>
          <Col span={16} offset={1}>
            <Form.Item wrapperCol={{ xs: { offset: 6 }, sm: { offset: 12 } }}>
              {check.length ?
                <Button type='primary' htmlType='submit' loading={fetching}>
                  Give consent
                </Button> :
                <Popover content='Select atleast 1 option above to submit'>
                  <Button type='primary' disabled>
                    Give consent
                  </Button>
                </Popover>
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Layout>
  )
}

const mapStateToProps = state => state.formReducer;

export default connect(mapStateToProps)(MyForm);
