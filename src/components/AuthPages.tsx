import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPages() {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

  return (
    <>
      {currentView === 'login' ? (
        <LoginForm onRegisterClick={() => setCurrentView('register')} />
      ) : (
        <RegisterForm
          onClose={() => setCurrentView('login')}
          onLoginClick={() => setCurrentView('login')}
        />
      )}
    </>
  );
}