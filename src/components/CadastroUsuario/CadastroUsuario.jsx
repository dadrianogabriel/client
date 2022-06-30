import { Button, Col, Form, Input, PageHeader, Row } from 'antd';
import { Alerta } from '../Alerta';
import { ComponenteBreadcrumb } from '../ComponenteBreadcrumber';
import { SendOutlined } from '@ant-design/icons';
import { useAxios } from '../../helpers/hooks/useAxios';
import { useEffect } from 'react';

import './style.css';

export const CadastroUsuario = () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/cadastro-usuario', name: 'Cadastro de usuário' }
  ];
  const breadcrumb = <ComponenteBreadcrumb breadcrumb={routes} />;
  const [form] = Form.useForm();
  const { data, status, fetchData } = useAxios();

  useEffect(() => {
    if (status === 409) {
      form.resetFields(['email', 'username']);
    } else if (status === 201) {
      form.resetFields();
    }
  }, [data, status]);

  const onFinish = async (values) => {
    await fetchData({
      metodo: 'post',
      endpoint: '/user',
      payload: JSON.stringify(values)
    });
  };

  return (
    <Row>
      <Col span={24}>
        <Row align="start">
          <Col>
            <PageHeader
              title="Cadastrar usuário"
              subTitle="Preencha os campos abaixo para cadastrar um novo usuário."
              breadcrumb={breadcrumb}
            />
          </Col>
        </Row>
        <Row align="center">
          <Col span={12}>
            <Alerta status={status} description={data?.message} />
            <Form
              className="formulario"
              onFinish={onFinish}
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Form.Item
                label="Nome"
                name="nome"
                rules={[{ required: true, message: 'Informe seu nome!' }]}
                hasFeedback
              >
                <Input placeholder="Ex: Maria dos Santos" />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Informe um username!' }]}
                hasFeedback
              >
                <Input placeholder="Ex: mariazinha" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Informe seu email!' },
                  { type: 'email', message: 'Favor informar um email válido!' }
                ]}
                hasFeedback
              >
                <Input placeholder="Ex: maria@gmail.com" />
              </Form.Item>
              <Form.Item
                label="Senha"
                name="senha"
                rules={[{ required: true, message: 'Informe sua senha!' }]}
                hasFeedback
              >
                <Input.Password placeholder="Ex: 123" />
              </Form.Item>
              <Form.Item
                label="Confirmar senha"
                name="confirmar"
                dependencies={['senha']}
                rules={[
                  { required: true, message: 'Confirme sua senha!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('senha') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('As duas senhas são diferentes!')
                      );
                    }
                  })
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Ex: 123" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 11 }}>
                <Button
                  icon={<SendOutlined />}
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
