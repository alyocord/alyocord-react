import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { cdnUrl } from '../Config';
import Button from '@mui/material/Button';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [username, setUsername] = useState('');
    const [statColor, setStatColor] = useState(true);

    const nav = useNavigate();

    const statyles = {
        color: statColor ? 'green' : 'red'
    }

    const auth = getAuth(app);
    const [user] = useAuthState(auth);

    const signupGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            //const credential = GoogleAuthProvider.credentialFromResult(result);
            //const token = credential.accessToken;
            const user = result.user;
            getDoc(doc(db, "users", user.uid)).then(docSnap => {
                if (docSnap.exists()) {
                    setStatColor(true);
                    setStatus("Successfully signed up as "+docSnap.data().username+"!");
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
                    setStatColor(true);
                    setStatus("Successfully signed up as "+user.displayName+"!");
                }
            });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setStatColor(false);
            setStatus("ERROR "+errorCode+": "+errorMessage);
        });
    };

    function signUp() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email,
                    turbolast: 0,
                    timesturbo: 0,
                    pfp: "default.png",
                    nameid: 1,
                    id: user.uid
                });
                setStatColor(true);
                setStatus("Successfully signed up!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setStatColor(false);
                if (errorCode === 'auth/email-already-in-use') {
                    setStatus("Email already exists");
                } else {
                    setStatus("ERROR "+errorCode+": "+errorMessage);
                }
            });
    }

    const gotoApp = () => {
        nav('/app');
    }

    const gotoBack = () => {
        nav(-1);
    }

    const signupform = () => {
        return (
            <div className='signup'>
                <TextField
                    variant="outlined"
                    label='Username'
                    type='text'
                    onChange={e => setUsername(e.target.value)}
                /> <br/> <br/>
                <TextField
                    variant="outlined"
                    label='Email'
                    type='email'
                    onChange={e => setEmail(e.target.value)}
                /> <br/> <br/>
                <TextField
                    variant="outlined"
                    label='Password'
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                /> <br/> <br/>
                <Button variant="contained" onClick={() => signUp()}>Signup</Button> <br/> <br/>
                <Button variant="contained" onClick={() => signupGoogle()}>Signup with Google</Button>
                <p style={statyles}>{status}</p>
            </div>
        );
    }

    function Logout() {
        function logout() {
            auth.signOut();
            setStatColor(true);
            setStatus("Succesfully logged out!");
        }

        return (
            <Button variant='contained' onClick={() => logout()}>Logout</Button>
        );
    }

    return (
        <center>
            <br/> <img src={'//'+cdnUrl+'/cdn-1/favicon.ico'} height='75' width='75' alt="Alyocord logo" /> <br/>
            <h1>Alyocord</h1>
            <br/><br/>
            <Button variant="contained" onClick={() => gotoApp()}>Home</Button> <br/> <br/>
            <Button variant="contained" onClick={() => gotoBack()}>Back</Button> <br/> <br/> <br/> <br/>
            {user ? <Logout /> : signupform()}
        </center>
    );
}

export default Signup;