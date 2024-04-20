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

/* zrobic stylowana strone, ktora pokaze, np: error 503 i jakis tekst oraz przycisk zaloguj sie, ktory przekieruje do loginu https://dribbble.com/shots/18405822-Error-state-page-Service-unavailable-503 */
