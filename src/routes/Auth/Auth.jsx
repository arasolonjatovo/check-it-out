import React, { useState } from 'react';
import './auth.css';
import InputText from '../../components/InputText/InputText';
import Button from '../../components/Button/Button';

const Auth = () => {
  const myIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/></svg>`;
  const myIconPass = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"> <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/> </svg>`;
  const [showSignup, setShowSignup] = useState(false);

  const handleAlreadyMemberClick = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="mainContainer">
      <div className="containerTitle">
        <h1 className="titleAuth">CHECK-IT-OUT</h1>
        <p>
          Notre todolist est votre meilleur allié pour vous aider à gérer votre
          temps, à rester organisé et à accomplir tout ce que vous souhaitez
        </p>
        <p>
          Essayez-le dès aujourd'hui et découvrez comment vous pouvez
          transformer vos rêves en réalisations.
        </p>
      </div>
      <div className="containerLogin">
        <h1>{showSignup ? 'USER SIGNUP' : 'USER SIGNIN'}</h1>
        <InputText type="text" desc="email" icon={myIcon} />
        <InputText type="password" desc="password" icon={myIconPass} />
        <p className="text-login" onClick={handleAlreadyMemberClick}>
          {showSignup ? 'Not a member yet?' : 'Already a member?'}
        </p>
        <Button variant="primary" label={showSignup ? 'SIGN UP' : 'SIGN IN'} />
      </div>
    </div>
  );
};

export default Auth;
