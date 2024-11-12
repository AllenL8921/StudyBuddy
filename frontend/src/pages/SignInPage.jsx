// pages/SignIn.js
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';

const SignInPage = () => {

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ClerkSignIn
        />
      </div>
    </>
  );
};

export default SignInPage;
