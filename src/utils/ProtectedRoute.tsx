import { PropsWithChildren } from 'react';
import { Drawer } from 'components/drawer/Drawer';
import ServiceUnavailable from 'pages/ServiceUnavailable';

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const userId = localStorage.getItem('userId');

  if (!userId) {
    return <ServiceUnavailable />;
  }

  return <Drawer>{children}</Drawer>;
}
export default ProtectedRoute
