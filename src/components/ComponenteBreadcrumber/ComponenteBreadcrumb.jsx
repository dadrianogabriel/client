import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

export const ComponenteBreadcrumb = (props) => {
  return (
    <Breadcrumb>
      {props.breadcrumb.map(({ path, name }) => (
        <Breadcrumb.Item key={v4()}>
          <Link to={path}>{name}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
