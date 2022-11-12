import { useState } from "react";
import { cdnUrl } from "../Config";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('you logging in..');
    const [statusCode, setStatusCode] = useState(false);

    const statusStyles = {
        color: statusCode === true ? 'green' : 'red'
    };

    function login() {
        setStatusCode(true);
        setStatus("you logged in!");
    }

    function nav(route) {
        navigate(route);
    }

    return (
        <center>
            <br/> <img src={'//'+cdnUrl+'/cdn-1/favicon.ico'} height='75' width='75' alt="Alyocord logo"/> <br/>
            <h1>Alyocord</h1>
            <br/><br/>
            <Button variant="contained" onClick={() => nav('/')}>Home</Button> <br/> <br/>
            <Button variant="contained" onClick={() => nav(-1)}>Back</Button> <br/> <br/> <br/> <br/>
            <div className='signup'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                >
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    onChange={event => setEmail(event.target.value)}
                /> <br/> <br/>
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={event => setPassword(event.target.value)}
                /> <br/> <br/>
                <Button variant="contained" onClick={() => login()}>Login</Button>
                </Box>
            </div>
            <br/>
            <p style={statusStyles}>{status}</p> <br/>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
        </center>
    );
}

export default Login;