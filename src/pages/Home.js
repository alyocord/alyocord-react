import { cdnUrl } from '../Config';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
  },
});


function Home() {
  const navigate = useNavigate();

  function nav(route) {
    navigate(route);
  }

  return (
    <center>
      <ThemeProvider theme={darkTheme}>
        <br/> <img src={"//"+cdnUrl+"/cdn-1/favicon.ico"} height='75' width='75' alt='Alyocord logo'/> <br/>
        <h1>Alyocord</h1>
        <br/><br/><br/><br/>
        <Button variant="contained" className='button' onClick={() => nav('/signup')}>Signup</Button> <br/> <br/>
        <Button variant="contained" className='button' onClick={() => nav('/login')}>Login</Button>
      </ThemeProvider>
    </center>
  );
}

export default Home;