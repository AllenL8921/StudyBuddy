import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import Navbar from '../components/GeneralComponents/Navbar';

const SignUp = () => {

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ClerkSignUp
        />
      </div>
    </>
  );
};

export default SignUp;
