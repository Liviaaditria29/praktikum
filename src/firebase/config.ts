import React, {useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCqgZfo801Ht1dehm5D5k29gzWsnb7SoDU',
  authDomain: 'journeyapp-6138c.firebaseapp.com',
  projectId: 'journeyapp-6138c',
  storageBucket: 'journeyapp-6138c.firebasestorage.app',
  messagingSenderId: '768875452590',
  appId: '1:768875452590:web:9a4356994257298b52353f',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage, app };
