import React, {useRef, useState} from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBSOd8tuoKqaC9z3Qrmw8zqAm0_HVLYwiw",
  authDomain: "jibber-jabber-3e686.firebaseapp.com",
  projectId: "jibber-jabber-3e686",
  storageBucket: "jibber-jabber-3e686.appspot.com",
  messagingSenderId: "145479449441",
  appId: "1:145479449441:web:c29b4c2498e5618201e320"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth); 

  return (
    <div className="App">
      <header>
        <h1>Jabber Jibber</h1>
        <SignOut/>
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
    return (
      <button onClick={signInWithGoogle}>Sign in with google</button>
    )
  }

  function SignOut() {
    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

  function ChatRoom() {

    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('create At').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
      e.preventDefault();
      
      const { uid, photoURL } = auth.currentUser;

      await messageRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      
      setFormValue('');
    }

    return (
      <>
        <div>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>
        <form onSubmit={sendMessage}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

          <button type="submit">▶▶</button>

        </form>
      </>
    )
  }

  function ChatMessage(props) {
    const {text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
      <div className={`message ${messageClass}`}>
        <img alt='profile pic' src={photoURL} />
        <p>{ text }</p>
      </div>
    )
  }
}

export default App;
