import { Alert } from 'antd';
import './style.css';

export const Alerta = (props) => {
  return (
    <div className="div">
      {props.status === 409 || props.status === 401 ? (
        <Alert
          className="alerta"
          message="Erro"
          description={props.description}
          type="error"
          showIcon
          closable
        />
      ) : props.status === 201 ? (
        <Alert
          className="alerta"
          message="Sucesso!"
          description={props.description}
          type="success"
          showIcon
          closable
        />
      ) : null}
    </div>
  );
};
