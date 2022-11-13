import { cdnUrl } from '../Config';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBG950hkNvpC-RXmG9CvPb4FnXZL2E4sHA",
  authDomain: "alyocord.firebaseapp.com",
  projectId: "alyocord",
  storageBucket: "alyocord.appspot.com",
  messagingSenderId: "57673324869",
  appId: "1:57673324869:web:658371e87f105dc591062c",
  measurementId: "G-NFYH2Q1FW0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Home() {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const nav = (route) => {
    navigate(route);
  }

  function Auth() {
    return (
      <div id='authStuff'>
        <Button variant="contained" onClick={() => nav('/signup')}>Signup</Button> <br/> <br/>
        <Button variant="contained" onClick={() => nav('/login')}>Login</Button>
      </div>
    );
  }

  function LoggedIn() {
    return (
      <div id='loggedIn'>
        <Button variant="contained" onClick={() => nav('/chat')}>Open Alyocord</Button> <br/> <br/>
        <Button variant="contained" onClick={() => auth.signOut()}>Logout</Button>
      </div>
    );
  }

  return (
    <center>
      <br/> <img src={"//"+cdnUrl+"/cdn-1/favicon.ico"} height='75' width='75' alt='Alyocord logo'/> <br/>
      <h1>Alyocord</h1>
      <br/><br/><br/><br/>
      {user ? <LoggedIn /> : <Auth />}
    </center>
  );
}

export default Home;