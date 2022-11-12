import { useNavigate } from "react-router-dom";
import { cdnUrl } from "../Config";

function Main() {
    const style = `
        body {
            background: #947373 !important;
        }
    `;

    const navigate = useNavigate();

    function nav(route) {
        navigate(route);
    }

    return (
        <center>
            <style>{style}</style>
            <title>404 Not Found - Alyocord</title>
            <img src={"//"+cdnUrl+'/cdn-1/favicon.ico'} height='150' width='150' alt="alyocord logo"/> <br/>
            <h2>We searched everywhere but we can't find what you're looking for.</h2>
            <button className='button' onClick={() => nav('/')}>Home</button> <br/> <br/>
            <img src={"//"+cdnUrl+"/cdn-1/404.png"} alt="404 art by TehBlake"/>
        </center>
    );
}

export default Main;