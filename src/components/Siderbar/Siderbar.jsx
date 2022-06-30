import {
  UserAddOutlined,
  UsbOutlined,
  SettingOutlined,
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthenticateContext from '../../helpers/context/AuthenticateContext';

export const Siderbar = () => {
  const { pathname } = useLocation();
  const { authenticate } = useContext(AuthenticateContext);
  const itens = [
    {
      label: !authenticate ? <Link to="/login">Login</Link> : authenticate.nome,
      key: '/login-logout',
      icon: !authenticate ? <LoginOutlined /> : <UserOutlined />,
      children: authenticate
        ? [
            {
              label: <Link to="gerenciar-conta">Informações pessoais</Link>,
              key: 'gerenciar-conta',
              icon: <IdcardOutlined />
            },
            {
              label: <Link to="gerenciar-funkos">Gerenciar funkos</Link>,
              key: 'gerenciar-funkos',
              icon: <SettingOutlined />
            },
            {
              label: <Link to="logout">Logout</Link>,
              key: 'logout',
              icon: <LogoutOutlined />
            }
          ]
        : null
    },
    { label: <Link to="/">Loja</Link>, key: '/', icon: <HomeOutlined /> },
    {
      label: <Link to="cadastro-usuario">Cadastrar Usuário</Link>,
      key: '/cadastro-usuario',
      icon: <UserAddOutlined />,
      disabled: authenticate ? true : false
    },
    {
      label: <Link to="cadastro-funko">Cadastrar Funko</Link>,
      key: '/cadastro-funko',
      icon: <UsbOutlined />
    }
  ];

  return <Menu defaultSelectedKeys={[pathname]} mode="inline" items={itens} />;
};
