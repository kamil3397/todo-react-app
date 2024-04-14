import { Box, Button, Card, Container, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  if (!userId) {
    return (
      <Container style={{
        padding: 0,
        margin: 0,
        position: 'relative',
        backgroundColor: '#fff',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Card style={{
          paddingTop: 50,
          paddingBottom: 50,
          paddingLeft: 200,
          paddingRight: 200,
          textAlign: 'center',
          position: 'absolute',
          zIndex: 1,
          top: '80px'
        }}>
          <FontAwesomeIcon icon={faRectangleXmark} size='7x' style={{ paddingBottom: 5 }} color="rgb(32,33,66)" />
          <Typography variant="h3" sx={{ p: 2 }} color="rgb(32,33,66)" >
            503 | Service Unavailable
          </Typography>
          <Typography variant="body1" sx={{ pt: 2, pb: 2, fontSize: '1.3rem' }} color="rgb(32,33,66)">
            Something went wrong
          </Typography>
          <Typography variant="body1" sx={{ pb: 4, fontSize: '1.3rem' }} color="rgb(32,33,66)">
            Try refreshing your page or...
          </Typography>
          <Button variant="contained" color="primary" size='large' onClick={() => navigate('/')} >
            Try to LogIn
          </Button>
        </Card>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '200px',
            bgcolor: 'rgb(32,33,66)',
            borderTopLeftRadius: '70%',
            borderTopRightRadius: '70%'
          }} />
      </Container >
    );
  }

  return <>{children}</>;
}
export default ProtectedRoute

/* zrobic stylowana strone, ktora pokaze, np: error 503 i jakis tekst oraz przycisk zaloguj sie, ktory przekieruje do loginu https://dribbble.com/shots/18405822-Error-state-page-Service-unavailable-503 */
