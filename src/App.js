import React from 'react';

import { getAnalytics } from "firebase/analytics";
//import Scss
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';
import { app } from './firebase/config';
import { getFirestore } from "firebase/firestore";
import './App.css';

getAnalytics(app);
getFirestore(app);

function App() {
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
