import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export const PaginaNaoEncontrada = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você está tentando acessar não existe."
      extra={
        <Link to="/" replace>
          <Button type="primary">Voltar para a página inicial</Button>
        </Link>
      }
    />
  );
};
