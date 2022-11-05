import { appUrl, cdnUrl } from '../Config';

function Main() {
  return (
    <center>
        <br/> <img src={"//"+cdnUrl+"/cdn-1/favicon.ico"} height='75' width='75' alt='Alyocord logo'/> <br/>
        <h1>Alyocord</h1>
        <br/><br/><br/><br/>
        <button className='button' onClick={() => window.location.href = "//"+appUrl+"/signup/"}>Signup</button> <br/> <br/>
        <button className='button' onClick={() => window.location.href = "//"+appUrl+"/login/"}>Login</button>
    </center>
  );
}

export default Main;