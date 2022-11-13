import { useState } from "react";
import { cdnUrl } from "../Config";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate, Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

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
            auth.signOut();
            setStatusCode(true);
            setStatus("Succesfully logged out!");
        }

        return (
            <Button variant='contained' onClick={() => logout()}>Logout</Button>
        );
    }

    function LoginForm() {
        return (
            <div className='login'>
                <Box
                    component="form"
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
                <Button variant="contained" onClick={() => login()}>Login</Button> <br/> <br/>
                <Button variant="contained" onClick={() => loginGoogle()}>Sign in with Google</Button> <br/> <br/>
                <Link to='/signup' style={{color: "cyan"}}>Don't have an account</Link>
                </Box>
            </div>
        );
    }

    const statusStyles = {
        color: statusCode === true ? 'green' : 'red'
    };

    const loginGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            //const credential = GoogleAuthProvider.credentialFromResult(result);
            //const token = credential.accessToken;
            const user = result.user;
            getDoc(doc(db, "users", user.uid)).then(docSnap => {
                if (docSnap.exists()) {
                    setStatusCode(true);
                    setStatus("Successfully logged in as "+docSnap.data().username+"!");
                } else {
                    setDoc(doc(db, "users", user.uid), {
                        username: user.displayName,
                        email: user.email,
                        turbolast: 0,
                        timesturbo: 0,
                        pfp: "default.png",
                        nameid: 1,
                        id: user.uid
                    });
                    setStatusCode(true);
                    setStatus("Successfully logged in as "+user.displayName+"!");
                }
            });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setStatusCode(false);
            setStatus("ERROR "+errorCode+": "+errorMessage);
        });
    };

    function login() {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            setStatusCode(true);

            getDoc(doc(db, "users", uid)).then(docSnap => {
                if (docSnap.exists()) {
                    setStatusCode(true);
                    setStatus("Successfully logged in as "+docSnap.data().username+"!");
                } else {
                    setStatusCode(false);
                    setStatus("There was an error: Document not found");
                }
            });
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
            <Button variant="contained" onClick={() => nav('/app')}>Home</Button> <br/> <br/>
            <Button variant="contained" onClick={() => nav(-1)}>Back</Button> <br/> <br/> <br/> <br/>
            {user ? <Logout /> : <LoginForm />}
            <br/>
            <p style={statusStyles}>{status}</p>
        </center>
    );

}

export default Login;