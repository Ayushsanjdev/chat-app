import React, {useRef, useState} from 'react';
import './App.css';
import firebase from 'firebase/app';
import './firebaseConfig';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

//app starts here
function App() {


  const [user] = useAuthState(auth); 

  return (
    <div className="App">
      <header>
        <h2>Jabber Jibber beta* <img src="https://img.icons8.com/cute-clipart/64/000000/chat.png" alt='icon' style={{verticalAlign: 'middle'}} /></h2>
        <SignOut/>
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }

    return (
      <>
        <h3 style={{color: '#eee'}}>Sign In With Google</h3>
        
        <button onClick={signInWithGoogle} className='googleBtn'>
          <img alt='' className='googleImg' src="https://img.icons8.com/cute-clipart/64/000000/google-logo.png" />
        </button>
        
        <p style={{textAlign: 'center', margin: '1rem auto', color: '#999', fontSize: 'smaller'}}>No rules violation and copyright !</p>
      
      </>
    )
  }

  function SignOut() {
    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>
        <img src="https://img.icons8.com/nolan/50/logout-rounded-left.png" alt='' />
      </button>
    )
  }

  function ChatRoom() {

    const dummy = useRef();

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
      e.preventDefault();
      
      const { uid, photoURL } = auth.currentUser;

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      
      setFormValue('');

      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
      <>
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}>

          </span>

        </main>
        <form onSubmit={sendMessage}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type something... " />

          <button type="submit" disabled={!formValue}>
          <img src="https://img.icons8.com/fluent/48/000000/filled-sent.png" alt='send-icon'/>
          </button>

        </form>
      </>
    )
  }

  function ChatMessage(props) {
    const {text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
      <div className={`message ${messageClass}`}>
        <img alt='profile pic' src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png' } />
        <p>{text}</p>
      </div>
    </>)
  }

export default App;
