import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the auth function

const firebaseConfig = {
  apiKey: "AIzaSyBt2wuCmPQv0kEnui6Nen6CyjuoCLgpPc4",
  authDomain: "echo-chat-847a0.firebaseapp.com",
  projectId: "echo-chat-847a0",
  storageBucket: "echo-chat-847a0.appspot.com",
  messagingSenderId: "1010173829592",
  appId: "1:1010173829592:web:beb6007b66df92fe8092ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);