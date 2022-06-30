import { Button, Col, Form, Input, PageHeader, Row } from 'antd';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAxios } from '../../helpers/hooks/useAxios';
import { Alerta } from '../Alerta';
import { ComponenteBreadcrumb } from '../ComponenteBreadcrumber';
import AuthenticateContext from '../../helpers/context/AuthenticateContext';
import './style.css';

export const Login = () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/login', name: 'Login' }
  ];
  const breadcrumb = <ComponenteBreadcrumb breadcrumb={routes} />;
  const [form] = Form.useForm();
  const { data, status, fetchData } = useAxios();
  const { authenticate, setAuthenticate } = useContext(AuthenticateContext);

  useEffect(() => {
    if (status === 409) {
      form.resetFields(['username', 'senha']);
    } else if (status === 200) {
      setAuthenticate(data);
    }
  }, [data, status]);

  const onFinish = async (values) => {
    await fetchData({
      metodo: 'post',
      endpoint: '/auth/login',
      payload: JSON.stringify(values)
    });
  };

  return (
    <Row>
      {authenticate && <Navigate to="/" replace />}
      <Col span={24}>
        <Row align="start">
          <Col>
            <PageHeader
              title="Logar"
              subTitle="Preencha os campos abaixo para se autenticar."
              breadcrumb={breadcrumb}
            />
          </Col>
        </Row>
        <Row align="center">
          <Col span={12}>
            <Alerta status={status} description={data?.message} />
            <Form
              className="formulario"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Informe seu username!' }]}
                hasFeedback
              >
                <Input placeholder="Ex: mariazinha" />
              </Form.Item>
              <Form.Item
                label="Senha"
                name="senha"
                rules={[{ required: true, message: 'Informe sua senha!' }]}
                hasFeedback
              >
                <Input.Password placeholder="123" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="botao"
                >
                  Logar
                </Button>
                Ou <Link to="/cadastro-usuario">registre-se agora!</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
