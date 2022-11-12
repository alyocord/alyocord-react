import { useState } from "react";
import { cdnUrl } from "../Config";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [statusCode, setStatusCode] = useState(true);

    const [user] = useAuthState(auth);

    function Logout() {
        function logout() {
            signOut(auth).then(() => {
                setStatusCode(true);
                setStatus("Succesfully logged out!");
            }).catch((error) => {
                setStatusCode(false);
                setStatus("ERROR "+error.code+": "+error.message);
            });
        }

        return (
            <Button variant='contained' onClick={() => logout()}>Logout</Button>
        );
    }

    function NotSigned() {
        return (
            <p>We are waiting for you to login :-{")"}</p>
        );
    }

    const statusStyles = {
        color: statusCode === true ? 'green' : 'red'
    };

    function login() {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            setStatusCode(true);

            const docRef = doc(db, "users", uid);
            const docSnap = getDoc(docRef);

            if (docSnap.exists()) {
                setStatusCode(true);
                setStatus("Document data:", docSnap.data());
            } else {
                setStatusCode(false);
                setStatus("Error: Not your fault!");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setStatusCode(false);
            if (errorCode === "auth/user-not-found") {
                setStatus("Invalid email");
            } else if (errorCode === "auth/wrong-password") {
                setStatus("Invalid password!");
            } else {
                setStatus("ERROR "+errorCode+": "+errorMessage);
            }
        });
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
                <Button variant="contained" onClick={() => login()}>{auth ? "Logout" : "Login"}</Button>
                </Box>
            </div>
            <br/>
            <p style={statusStyles}>{status}</p> <br/> <br/> <br/>
            {user ? <Logout /> : <NotSigned />}
        </center>
    );
}

export default Login;