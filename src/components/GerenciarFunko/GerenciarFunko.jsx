import {
  Avatar,
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
  Switch
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useContext, useEffect, useState } from 'react';
import AuthenticateContext from '../../helpers/context/AuthenticateContext';
import { useAxiosPrivado } from '../../helpers/hooks/useAxiosPrivado';
import { ComponenteBreadcrumb } from '../ComponenteBreadcrumber';
import './style.css';

export const GerenciarFunko = () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/gerenciar-funkos', name: 'Gerenciar meus Funkos' }
  ];
  const breadcrumb = <ComponenteBreadcrumb breadcrumb={routes} />;
  const { authenticate } = useContext(AuthenticateContext);
  const [funkos, setFunkos] = useState();
  const axiosInstance = useAxiosPrivado();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    const getFunkos = async () => {
      try {
        const { data } = await axiosInstance.get(`/user/${authenticate._id}`);
        setFunkos(data.funkos);
      } catch (error) {
        console.error(error);
      }
    };
    getFunkos();
  }, []);

  const mostrarModal = (values) => {
    form.setFieldsValue({
      id: values._id,
      descricao: values.descricao,
      url: values.url,
      valor: values.valor,
      onSale: values.sale
    });
    setModalVisivel(true);
  };

  const handleCancel = () => {
    setModalVisivel(false);
  };

  const handleOk = async (values) => {
    const funkosCopy = Array.from(funkos);
    const index = funkosCopy
      .map((item) => {
        return item._id;
      })
      .indexOf(values.id);

    try {
      if (onSale === false) {
        values.valor = 0;
        console.log(values.valor);
      }

      const payload = { ...values, sale: onSale };
      const { data } = await axiosInstance.put(
        `/funko/${values.id}`,
        JSON.stringify(payload)
      );
      funkosCopy[index] = data;
      setFunkos(funkosCopy);
      form.resetFields();
      setModalVisivel(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const funkosCopy = Array.from(funkos);
    const index = funkosCopy
      .map((item) => {
        return item._id;
      })
      .indexOf(id);

    try {
      await axiosInstance.delete(`/funko/${id}`);
      funkosCopy.splice(index, 1);
      setFunkos(funkosCopy);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Row align="start">
          <PageHeader
            title="Lista com os seus Funkos!"
            subTitle="Informações dos seus Funkos. Você pode atualizar ou excluir qualquer Funko da lista."
            breadcrumb={breadcrumb}
          />
        </Row>
        <Row align="center">
          <Col span={12} offset={3}>
            <Card title="Lista de Funkos" className="card">
              <List
                size="large"
                dataSource={funkos}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button type="link" onClick={() => mostrarModal(item)}>
                        Editar
                      </Button>,
                      <Popconfirm
                        title="Você tem certeza que quer deletar esse Funko?"
                        onConfirm={() => handleDelete(item._id)}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <Button type="link" style={{ color: 'red' }}>
                          Excluir
                        </Button>
                      </Popconfirm>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.url} />}
                      title={item.descricao}
                      description={`Este produto ${
                        item.sale ? 'está' : 'não está'
                      } à venda. Seu valor é de: R$${item.valor.toFixed(2)}.`}
                    />
                  </List.Item>
                )}
              ></List>
            </Card>

            <Modal
              title="Editar informações do Funko."
              visible={modalVisivel}
              onCancel={handleCancel}
              onOk={form.submit}
            >
              <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 15 }}
                onFinish={handleOk}
              >
                <Form.Item name="id" label="Funko Id">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="descricao" label="Descrição">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="url"
                  label="URL"
                  rules={[
                    { type: 'url', warningOnly: true, message: 'URL inválida!' }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="valor" label="Valor">
                  <Input
                    min={0}
                    style={{ width: '100%' }}
                    prefix="R$"
                    disabled={onSale ? false : true}
                  />
                </Form.Item>
                <Form.Item
                  name="onSale"
                  label="À venda"
                  valuePropName="checked"
                >
                  <Switch
                    name="onSale"
                    onChange={() => setOnSale(!onSale)}
                    checkedChildren="True"
                    unCheckedChildren="False"
                  />
                </Form.Item>
              </Form>
            </Modal>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
