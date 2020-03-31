import React from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import request from '../utils/request';

const FormItem = Form.Item;

const formLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};

class UserEditor extends React.Component {
  componentDidMount () {
    // 在componentWillMount里使用form.setFieldsValue无法设置表单的值
    // 所以在componentDidMount里进行赋值
    // see: https://github.com/ant-design/ant-design/issues/4802
    const {editTarget, form} = this.props;
    if (editTarget) {
      form.setFieldsValue(editTarget);
    }
  }

  handleSubmit (e) {
    e.preventDefault();

    const {form, editTarget} = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        let editType = '添加';
        let apiUrl = 'http://localhost:3000/user';
        let method = 'post';
        if (editTarget) {
          editType = '编辑';
          apiUrl += '/' + editTarget.id;
          method = 'put';
        }

        request(method, apiUrl, values)
          .then((res) => {
            if (res.id) {
              message.success(editType + '用户成功');
              this.context.router.push('/user/list');
            } else {
              message.error(editType + '失败');
            }
          })
          .catch((err) => console.error(err));

      } else {
        message.warn('请填写正确的信息');
        return
      }
    });
  }

  render () {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div style={{width: '400px'}}>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <FormItem label="用户名：" {...formLayout}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名'
                },
                {
                  pattern: /^.{1,4}$/,
                  message: '用户名最多4个字符'
                }
              ]
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem label="手机号" {...formLayout}>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '请输入正确的手机号'
                }
              ]
            })(
              <Input type="number"/>
            )}
          </FormItem>
          <FormItem label="年龄：" {...formLayout}>
            {getFieldDecorator('age', {
              rules: [
                {
                  required: true,
                  message: '请输入年龄',
                  type: 'number'
                },
                {
                  min: 1,
                  max: 100,
                  message: '请输入1~100的年龄',
                  type: 'number'
                }
              ]
            })(
              <InputNumber/>
            )}
          </FormItem>
          <FormItem label="性别：" {...formLayout}>
            {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: '请选择性别'
                }
              ]
            })(
              <Select placeholder="请选择">
                <Select.Option value="male">男</Select.Option>
                <Select.Option value="female">女</Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="院系：" {...formLayout}>
            {getFieldDecorator('college', {
              rules: [
                {
                  required: true,
                  message: '请选择院系'
                }
              ]
            })(
              <Select placeholder="请选择">
                <Select.Option value="大数据与计算机学院">大数据与计算机学院</Select.Option>
                <Select.Option value="电子信息工程学院">电子信息工程学院</Select.Option>
                <Select.Option value="智能制造工程学院">智能制造工程学院</Select.Option>
                <Select.Option value="新能源与环境工程学院">新能源与环境工程学院</Select.Option>
                <Select.Option value="会计与金融学院">会计与金融学院</Select.Option>
                <Select.Option value="互联网+工商管理学院">互联网+工商管理学院</Select.Option>
                <Select.Option value="电子商务学院">电子商务学院</Select.Option>
                <Select.Option value="抱石艺术学院">抱石艺术学院</Select.Option>
                <Select.Option value="外语外贸学院">外语外贸学院</Select.Option>
                <Select.Option value="人工智能学院">人工智能学院</Select.Option>
                <Select.Option value="健康管理与传播学院">健康管理与传播学院</Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem wrapperCol={{...formLayout.wrapperCol, offset: formLayout.labelCol.span}}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

UserEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

UserEditor = Form.create()(UserEditor);

export default UserEditor;
