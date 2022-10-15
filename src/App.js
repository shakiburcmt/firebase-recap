import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState({});

  const handleGoogleSigIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error => {
        console.log('error: ', error);
      })
  }

  const handleGoogleSigOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        console.log('error: ', error);
      })

  }

  return (
    <div className="App">
      {
        user.uid ?
          <button onClick={handleGoogleSigOut}>Sign Out</button>
          :
          <button onClick={handleGoogleSigIn}>Google Sign In</button>
      }
      {
        user.uid && <div>
          <h2>{user.displayName}</h2>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
