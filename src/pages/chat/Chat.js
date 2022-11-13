import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, query, where, limit, getDoc, doc } from "firebase/firestore";
import { cdnUrl } from '../../Config';
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import $ from 'jquery';

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
const db = getFirestore(app)

function Chat() {
    const [user] = useAuthState(auth);
    const nav = useNavigate();

    if (!user) {
        nav("/login");
    }

    const style = `
        body {
            background: #36393F;
            color: white;
        }
        
        a {
        text-decoration: none;
        }
        
        a:hover {
        text-decoration: underline;
        }

        input, select {
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        }
        
        input[type=submit] {
        display: inline-block;
        background-color: #0158f9;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        }
        
        input[type=submit]:hover {
        background-color: #2e77ff;
        }
        
        .c-g {
        color: green;
        }
        
        .c-r {
        color: red;
        }
        
        .message-content {
        position: fixed;
        width: 99%;
        bottom: 8px;
        left: 4px;
        background: #40444B;
        border: none;
        border-radius: 10px;
        color: white;
        }
        
        .send-message {
        position: fixed;
        width: 9%;
        bottom: 20px;
        right: 5px;
        transition: background .2s ease-in;
        }
        
        .send-message:hover {
        background-color: #1c1c1c;
        }
        
        .gc-text {
        position: absolute;
        top: 4px;
        left: 8px;
        }
        
        #messages {
        position: fixed;
        left: 10px;
        top: 1cm;
        overflow-x:hidden;
        overflow-y:auto;
        height: 88%;
        width: 98%;
        }
        
        ::-webkit-scrollbar {
        width: 10px;
        }
        
        ::-webkit-scrollbar-track {
        background: #2E3338;
        }
        
        ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #202225;
        }
        
        *:focus {
        outline: none;
        }
        
        #logout {
        position: fixed;
        top: 15px;
        right: 30px;
        transition: background .2s ease-in;
        }
        
        #settings {
        position: fixed;
        top: 15px;
        right: 80px;
        transition: 0.2s all;
        }
        
        #theme-trigger {
        position: fixed;
        top: 15px;
        right: 130px;
        transition: 0.2s all;
        }
        
        #turbo-man {
        position: fixed;
        top: 15px;
        right: 130px;
        transition: 0.2s all;
        }
        
        .light-mode {
        background: rgb(255,255,255);
        color: black;
        }
        
        .pfp {
        border-radius: 50%
        }
        
        .close {
        color: #aaa;
        float: right;
        font-size: 28px !important;
        font-weight: bold !important;
        }
        
        .close:hover,
        .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
        }
        
        #pink {
        color: pink; 
        }
        
        #AlyocordTurboFont {
        font-family: sans-serif !important;
        }
        
        .delm {
        display: none;
        }
        
        .msg:hover .delm {
        display: inline;
        }
        
        .msg:hover {
        background: #2E3338;
        }
        
        .msg {
        border: transparent;
        }
        
        #dms {
        position: fixed;
        left: 0%;
        height: 100%;
        backgrond: #202225;
        width: 1.5cm;
        z-index: 5;
        }
    `;

    function logout() {
        auth.signOut();
    };

    function theme() {
        console.log("theme doesnt work yet");
    }

    function chat() {
        console.log("test");
    }

    return (
        <>
            <style>{style}</style>
            <div id='alert' style={{display: "none"}}><nav style={{background: "#0f0645"}}><center><button style={{borderStyle:"solid",borderColor:"white",background:"none",borderRadius:"5%",color:"white"}} onClick={() => nav('/chat/turbo/claim')}>Claim Turbo </button>&nbsp &nbsp &nbsp<button onClick={() => $("#alert").empty()} style={{background:"none",border:"none",color:"red"}}>X</button></center></nav></div>

            <div className='dms'>

            </div>
            <div id='channel-name'>
            <h4 className='gc-text'><b>Global Chat</b> <span style={{color: "#636060"}}>(messages: next update)</span></h4></div>
            <ChatRoom room="global" />
            <input type='text' name='message' className='message-content' placeholder = 'Message #global' id='message' autoComplete="off" />
            <button onClick={() => chat()} className='button send-message' id='chat' style={{display: "none"}}>Send</button>

            <button className="button" style={{background: "none", border: "none"}} onClick={() => logout()}><img src='//cdn0.iconfinder.com/data/icons/thin-line-color-2/21/05_1-512.png' alt="logout icon" height='25' width='25' id='logout'/></button>

            <button className="button" style={{background: "transparent", border: "none"}} onClick={() => theme()} id='theme-trigger'><img alt="change theme" src='//cdn1.iconfinder.com/data/icons/user-interface-16x16-vol-1/16/contrast-circle-512.png' height='20' width='20' style={{display: "none"}}/></button>

            <button className="button" style={{background: "transparent", border: "none"}} onClick={() => nav('/chat/settings')}><img alt="settings icon" src='//media.discordapp.net/attachments/1027560810962235392/1029375797825380362/unknown.png' height='25' width='25' id='settings'/></button>

            <button className="button" style={{background: "transparent", border: "none"}} onClick={() => nav('/chat/turbo')}><img alt="turbo icon" src='//media.discordapp.net/attachments/1028244276590686218/1030940228514480228/turbo.png' height='25' width='25' id='turbo-man'/></button>
        </>
    );
}

var lastId = "0";

function ChatRoom(props) {
    const { room } = props;

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, limit(50), where("channel", "==", room));

    const [messages] = useCollection(q, {idField: "id"});

    return (
        <div id="messages">
            <br/>
            {messages && messages.docs.map(msg => <ChatMessage key={msg.id} message={msg.data()} />)}
        </div>
    );
}

function ChatMessage(props) {
    const { content, sender, id } = props.message;

    var msguser;
    var avatar;
    var nameid;
    var turbo;  
    
    function setVar(a, v) {
        if (a === "msu") {
            msguser = v;
        }
    }

    getDoc(doc(db, "users", sender)).then(docSnap => {
        if (docSnap.exists()) {
            var data = docSnap.data();

            setVar("msu", data.username);
            avatar = data.pfp;
            nameid = data.nameid;
            turbo = false;
        } else {
            msguser = "Deleted User";
            avatar = "default.png";
            nameid = "0000";
            turbo = false;
        }
    });

    return (
        <>
            <div id={"message-content-" + id } className='msg' style={{position: "relative"}}>
                <img
                    className='pfp'
                    src={'//'+cdnUrl+'/cdn-2/pfp/'+avatar}
                    height='50'
                    width='50'
                    alt="user avatar"
                /> &nbsp; <span>&nbsp; <span style={{position: "absolute"}}>{msguser}</span>
                &nbsp;  &nbsp;
                <span style={{color: "#747678"}}>#{nameid}</span>
                {turbo ? <img
                    alt="turbo logo"
                    src='//media.discordapp.net/attachments/1028244276590686218/1030940228514480228/turbo.png'
                    height='20'
                    width='20'
                /> : ''} <br/>
                <p style={{display: "inline"}}><span className='msg'>{content}</span></p>
                </span>
            </div> <br/>
        </>
    );
}

export default Chat;