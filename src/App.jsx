import '~antd/dist/antd.less';
import { AppRoutes } from './routes/AppRoutes';
import { AuthenticateProvider } from './helpers/context/AuthenticateContext';
import { FunkoProvider } from './helpers/context/FunkoContext';

function App() {
  return (
    <AuthenticateProvider>
      <FunkoProvider>
        <AppRoutes />
      </FunkoProvider>
    </AuthenticateProvider>
  );
}

export default App;
