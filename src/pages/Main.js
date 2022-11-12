import { cdnUrl } from '../Config';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function Main() {
  const navigate = useNavigate();

  function nav(route) {
    navigate(route);
  }

  return (
    <center>
      <br/> <img src={"//"+cdnUrl+'/cdn-1/favicon.ico'} height='75' width='75' alt="alyocord logo"/> <br/>
      <h1>Alyocord</h1>
      <Button variant="contained" onClick={() => nav('/app')}>Sign me up!</Button> <br/>
      <br/><br/>
      <Container>
        <h1>Great community</h1>
        <p>Our community is super kind and helpful!</p>
      </Container><br/>
      <Container>
        <h1>Helpful staff</h1>
        <p>Feel free to contact our staff if you have any issues.</p>
      </Container><br/>
      <Container>
        <h1>Little to no lag</h1>
        <p>Read your messages the second they are sent!</p>
      </Container><br/>
      <Container>
        <h1>Clean UI</h1>
        <p>Super clean and responsive UI.</p>
      </Container>
   </center>
  );
}

export default Main;
