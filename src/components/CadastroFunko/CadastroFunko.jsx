import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  PageHeader,
  Row,
  Switch
} from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Alerta } from '../Alerta';
import { ComponenteBreadcrumb } from '../ComponenteBreadcrumber';
import './style.css';
import { useState } from 'react';
import { useAxiosPrivado } from '../../helpers/hooks/useAxiosPrivado';
import { useContext } from 'react';
import AuthenticateContext from '../../helpers/context/AuthenticateContext';
import { useEffect } from 'react';

export const CadastroFunko = () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/cadastro-funko', name: 'Cadastro de funko' }
  ];
  const breadcrumb = <ComponenteBreadcrumb breadcrumb={routes} />;
  const [form] = Form.useForm();
  const [onSale, setOnSale] = useState(true);
  const axiosInstance = useAxiosPrivado();
  const { authenticate } = useContext(AuthenticateContext);
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (status === 201) {
      form.resetFields();
    }
  }, [data, status]);

  const onFinish = async (values) => {
    const payload = { ...values, sale: onSale };
    try {
      const { status, data } = await axiosInstance.post(
        `/funko/${authenticate._id}`,
        JSON.stringify(payload)
      );
      setData(data);
      setStatus(status);
    } catch (error) {
      setStatus(error.request.status);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Row align="start">
          <Col>
            <PageHeader
              title="Cadastrar Funko"
              subTitle="Preencha os campos abaixo para cadastrar um novo funko."
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
                label="Descrição"
                name="descricao"
                rules={[
                  { required: true, message: 'Informe a descrição do Funko.' }
                ]}
                hasFeedback
              >
                <Input placeholder="Homem de Ferro" />
              </Form.Item>
              <Form.Item
                label="URL"
                name="url"
                rules={[
                  { type: 'url', warningOnly: true, message: 'URL inválida!' }
                ]}
                hasFeedback
              >
                <Input placeholder="https://cdn.iset.io/assets/54268/produtos/1850/funko_pop_-_vingadores_ultimato_-_homem_de_ferro_467_maniapop.jpg" />
              </Form.Item>
              <Form.Item
                label="Valor"
                name="valor"
                rules={[
                  {
                    required: onSale ? true : false,
                    message: 'Informe o valor!'
                  }
                ]}
              >
                <InputNumber
                  placeholder="0.00"
                  min={0}
                  style={{ width: '100%' }}
                  prefix="R$"
                  disabled={onSale ? false : true}
                />
              </Form.Item>
              <Form.Item label="À venda" name="sale" valuePropName="checked">
                <Switch
                  onChange={() => setOnSale(!onSale)}
                  checkedChildren="True"
                  unCheckedChildren="False"
                  defaultChecked
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 10 }}>
                <Button
                  icon={<SendOutlined />}
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  Cadastrar Funko
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
