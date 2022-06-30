import {
  Button,
  Card,
  Col,
  Dropdown,
  Empty,
  List,
  Menu,
  PageHeader,
  Row,
  Space
} from 'antd';
import {
  TagOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined
} from '@ant-design/icons';
import { ComponenteBreadcrumb } from '../ComponenteBreadcrumber';
import { useAxios } from '../../helpers/hooks/useAxios';
import { useEffect, useState } from 'react';
import './style.css';

export const Loja = () => {
  const routes = [{ path: '/', name: 'Loja' }];
  const breadcrumb = <ComponenteBreadcrumb breadcrumb={routes} />;
  const { data, fetchData } = useAxios();
  const [funkos, setFunkos] = useState([]);

  useEffect(() => {
    if (data) {
      setFunkos(data);
    }
    console.log('teste');
  }, [data]);

  useEffect(() => {
    const getFunkos = async () => {
      await fetchData({
        metodo: 'get',
        endpoint: '/funko'
      });
    };
    getFunkos();
  }, []);

  const filtrarNome = () => {
    setFunkos((funkos) =>
      [...funkos].sort((a, b) => {
        if (a.descricao < b.descricao) {
          return -1;
        }
        if (a.descricao > b.descricao) {
          return 1;
        }
        return 0;
      })
    );
  };

  const filtrarValor = () => {
    setFunkos((funkos) =>
      [...funkos].sort((a, b) => {
        if (a.valor < b.valor) {
          return -1;
        }
        if (a.valor > b.valor) {
          return 1;
        }
        return 0;
      })
    );
  };

  const filtrarOnSale = () => {
    setFunkos((funkos) => [...funkos].filter((item) => item.sale));
  };

  const menu = (
    <Menu
      items={[
        {
          key: 1,
          label: (
            <Button type="link" onClick={filtrarNome}>
              Nome
            </Button>
          )
        },
        {
          key: 2,
          label: (
            <Button type="link" onClick={filtrarValor}>
              Preço
            </Button>
          )
        },
        {
          key: 3,
          label: (
            <Button type="link" onClick={filtrarOnSale}>
              On Sale
            </Button>
          )
        }
      ]}
    />
  );

  return (
    <Row>
      <Col span={24}>
        <Row align="start">
          <Col>
            <PageHeader
              title="Loja"
              subTitle={'Funkos cadastrados.'}
              breadcrumb={breadcrumb}
            />
            <div className="filtros">
              <Dropdown overlay={menu}>
                <Space>
                  Filtros <DownOutlined />
                </Space>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row align="center">
          <Col span={22} xl={16}>
            <List
              pagination={{
                total: funkos.length,
                pageSize: 12,
                hideOnSinglePage: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
              }}
              grid={{ gutter: 24, column: 6 }}
              dataSource={funkos}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    extra={
                      <>
                        <div>
                          Sale:{'  '}
                          {item.sale ? (
                            <CheckCircleOutlined style={{ color: '#52c41a' }} />
                          ) : (
                            <CloseCircleOutlined style={{ color: '#f5222d' }} />
                          )}
                        </div>
                      </>
                    }
                    title={item.descricao}
                    hoverable
                    cover={
                      item.url ? (
                        <div
                          style={{
                            background: `url(${item.url})`,
                            height: '195px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                      ) : (
                        <Empty style={{ height: '195px', paddingTop: 50 }} />
                      )
                    }
                  >
                    <Card.Meta
                      description={`Vendido por: ${item.user.nome}`}
                      title={
                        <>
                          <TagOutlined style={{ color: '#597ef7' }} /> {'R$'}
                          {item.valor.toFixed(2)}
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
