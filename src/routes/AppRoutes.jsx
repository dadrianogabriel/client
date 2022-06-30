import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CadastroFunko } from '../components/CadastroFunko/CadastroFunko';
import { CadastroUsuario } from '../components/CadastroUsuario';
import { GerenciarConta } from '../components/GerenciarConta/GerenciarConta';
import { GerenciarFunko } from '../components/GerenciarFunko/GerenciarFunko';
import { LayoutBase } from '../components/LayoutBase';
import { Login } from '../components/Login';
import { Logout } from '../components/Logout/Logout';
import { Loja } from '../components/Loja';
import { PaginaNaoEncontrada } from '../components/PaginaNaoEncontrada';
import { VerificarLogin } from '../components/VerificarLogin';
import AuthenticateContext from '../helpers/context/AuthenticateContext';
import { useRefresh } from '../helpers/hooks/useRefresh';

export const AppRoutes = () => {
  const { authenticate, setAuthenticate } = useContext(AuthenticateContext);
  const refresh = useRefresh();

  useEffect(() => {
    if (!authenticate) {
      const verificarRefreshToken = async () => {
        const { data } = await refresh();
        if (data) {
          setAuthenticate(data);
        }
      };
      verificarRefreshToken();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PaginaNaoEncontrada />} />
        <Route element={<LayoutBase />}>
          <Route path={'/'} element={<Loja />} />
          <Route path={'/login'} element={<Login />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<VerificarLogin />}>
            <Route path="/cadastro-funko" element={<CadastroFunko />} />
            <Route path="/gerenciar-conta" element={<GerenciarConta />} />
            <Route path="/gerenciar-funkos" element={<GerenciarFunko />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
