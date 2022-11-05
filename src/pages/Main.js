import { appUrl, cdnUrl } from '../Config';
import '../styles/App.css';

function Main() {
  return (
    <center>
      <br/> <img src={"//"+cdnUrl+'/cdn-1/favicon.ico'} height='75' width='75' alt="alyocord logo"/> <br/>
      <h1>Alyocord</h1>
      <button class='button' onClick={() => window.location.href = "//"+appUrl+"/app/"}>I'm sold! Give me the app already!</button> <br/>
      <br/><br/>
      <section>
        <h1>Great community</h1>
        <p>Our community is super kind and helpful!</p>
      </section><br/>
      <section>
        <h1>Helpful staff</h1>
        <p>Feel free to contact our staff if you have any issues.</p>
      </section><br/>
      <section >
        <h1>Little to no lag</h1>
        <p>Read your messages the second they are sent!</p>
      </section><br/>
      <section>
        <h1>Clean UI</h1>
        <p>Super clean and responsive UI.</p>
      </section>
   </center>
  );
}

export default Main;