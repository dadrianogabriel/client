import {
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  Modal,
  PageHeader,
  Popconfirm,
  Row,
  Tag
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import AuthenticateContext from '../../helpers/context/AuthenticateContext';
import { ComponenteBreadcrumb } from '../ComponenteBreadcrumber';
import './style.css';
import { useForm } from 'antd/lib/form/Form';
import { useAxiosPrivado } from '../../helpers/hooks/useAxiosPrivado';

export const GerenciarConta = () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/gerenciar-conta/', name: 'Informações pessoais' }
  ];
  const breadcrumb = <ComponenteBreadcrumb breadcrumb={routes} />;
  const [modalVisivel, setModalVisivel] = useState(false);
  const [form] = useForm();
  const axiosInstance = useAxiosPrivado();
  const { authenticate, setAuthenticate } = useContext(AuthenticateContext);

  useEffect(() => {
    form.setFieldsValue({
      id: authenticate._id,
      nome: authenticate.nome,
      username: authenticate.username,
      email: authenticate.email
    });
  }, []);

  const mostrarModal = () => {
    setModalVisivel(true);
  };

  const handleOk = async (values) => {
    try {
      const { data } = await axiosInstance.put(`/user/${values.id}`, values);
      setAuthenticate({
        ...authenticate,
        username: data.username,
        email: data.email
      });
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
    setModalVisivel(false);
  };

  const handleCancel = () => {
    setModalVisivel(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/user/${authenticate._id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Row align="start">
          <PageHeader
            title="Informações do seu perfil"
            subTitle="Informações pessoais e opções de gerenciamento. Você pode atualizar o username, senha e email quando sentir necessidade."
            breadcrumb={breadcrumb}
          />
        </Row>
        <Row align="center">
          <Col span={12} offset={3}>
            <Card
              className="card"
              title="Informações básicas"
              extra={[
                <Button type="link" onClick={mostrarModal}>
                  Editar informações
                </Button>,
                <Popconfirm
                  title="Você tem certeza que quer deletar sua conta? Essa opção é irreversível."
                  onConfirm={() => handleDelete(authenticate._id)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button type="link" style={{ color: 'red' }}>
                    Excluir conta
                  </Button>
                </Popconfirm>
              ]}
            >
              <List size="large">
                <List.Item>
                  <List.Item.Meta title="Id" />
                  <div>{authenticate._id}</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Nome" />
                  <div>{authenticate.nome}</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Username" />
                  <div>{authenticate.username}</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Email" />
                  <div>{authenticate.email}</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Email" />
                  <div>
                    <Tag icon={<ExclamationCircleOutlined />} color="warning">
                      Campo secreto!
                    </Tag>
                  </div>
                </List.Item>
              </List>
            </Card>

            <Modal
              title="Editar dados pessoais"
              visible={modalVisivel}
              onOk={form.submit}
              onCancel={handleCancel}
            >
              <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 15 }}
                onFinish={handleOk}
              >
                <Form.Item name="id" label="Id">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="nome" label="Nome">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="username" label="Username" hasFeedback>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      message: 'Favor informar um email válido!'
                    }
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Form.Item name="senha" label="Senha" hasFeedback>
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirmar"
                  label="Confirmar senha"
                  dependencies={['senha']}
                  rules={[
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
                  <Input.Password />
                </Form.Item>
              </Form>
            </Modal>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
