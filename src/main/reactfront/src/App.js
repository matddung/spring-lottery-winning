import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState } from 'react';
import Login from './component/Login';
import SignUp from './component/SignUp';
import MainPage from './component/Main';
import AdditionalInfo from './component/AdditionalInfo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Login login={login} />} />
        <Route path='/signUp' element={<SignUp />}/>
        <Route path="/main" element={<MainPage />} />
        <Route path='/additional-info' element={<AdditionalInfo />} />
      </Routes>
    </Router>
  );
}

export default App;