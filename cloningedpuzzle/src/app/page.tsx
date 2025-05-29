'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [view, setView] = useState<'main' | 'student' | 'teacher'>('main');

  const renderHeader = () => (
    <div className="flex justify-between w-[1400px] mt-[22px] mr-[0px] ml-[0px] items-center">
      <div className="flex cursor-pointer box-border space-x-[0.3px] w-[175px] items-center">
        <img src= "https://edpuzzle.imgix.net/edpuzzle-logos/isolated-logo.png" alt="Logo" className="w-[64px] h-[64px] align-middle space-x-[0.3px]" />
        <span className="text-start inline box-border w-auto font-stretch-100% text-[13px] ">Back to Edpuzzle</span>
      </div>
      <div className="text-[#333] font-light w-[250px] text-start box-border block text-[14px]">
        Don’t have an account?{' '}
        <span className="cursor-pointer font-bold inline-block items-start text-[#333] text-[14px]">Sign up</span>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="block text-[14px] text-center w-[1415px] box-border mb-8 mt-[100px]">
      
      <Link href="#">Terms of Service</Link> and <Link href="#"> Privacy Policy </Link>
      
    </div>
  );

  const renderMain = () => (
    <div className='flex flex-col w-full min-w-[350px] box-border items-center justify-center bg-[rgb(250,250,250)]'>
      {renderHeader()}
      <div className="box-border mx-auto w-[650px] items-center flex flex-col justify-center h-[580px]">
      <h1 className="text-[35px] font-normal w-auto text-center">
        Welcome back! Ready for class?
      </h1>
      <div className="flex items-center justify-start box-border text-center w-[650px] mt-10">
        <button
          onClick={() => setView('teacher')}
          className="bg-[#0c70eb] hover:bg-[#0a4388] text-white w-[350px] items-center text-center pr-6 pl-6 relative mr-6 h-[56px] cursor-pointer block justify-center align-middle rounded"
        >
          I’m a Teacher
        </button>
        <button
          onClick={() => setView('student')}
         className="bg-[#0c70eb] hover:bg-[#0a4388] text-white w-[350px] items-center text-center pr-6 pl-6 relative mr-6 h-[56px] cursor-pointer block justify-center align-middle rounded"
        >
          I’m a Student
        </button>
      </div>
      </div>
      {renderFooter()}
      </div>
    
  );

  const renderLoginForm = (role: 'teacher' | 'student') => {
    const headline =
      role === 'teacher'
        ? 'Welcome, teacher! Your students are waiting for some magic...'
        : 'It’s Edpuzzle time! Class just got a lot more interesting.';

    return (
      <div className="flex flex-col items-center justify-center w-full">
        {renderHeader()}
        <div className='justify-center text-[16px] text-center box-border block mx-auto mt-[40px] w-[300px]'>
        <button
            onClick={() => setView('main')}
            className="cursor-pointer inline-block h-[16px] w-[20px] relative top-7 right-[600px]"
          >
            <svg className="svg-inline--fa fa-arrow-left fa-w-14 fa-fw" aria-hidden="true" data-prefix="fal" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>
          </button>
          <h2 className="text-center text-[20px] font-normal flex-start">
            {headline}
          </h2>
        </div>
      
        <input
          type="text"
          placeholder="Email"
          className="border border-[#c0c4c8] hover:border-[#333] w-72 px-4 py-2 rounded mt-10 h-[56px] "
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-[#c0c4c8] hover:border-[#333] w-72 px-4 py-2 rounded mt-4 h-[56px] mb-4"
        />

        <div className="text-[14px] mb-4">Forgot your password?</div>
        <button
          className="bg-gray-200 text-gray-400 w-72 py-2 rounded mb-4 mt-4"
          
        >
          Log in with Edpuzzle
        </button>
        <div className="w-72 border-t my-4 relative">
          <span className="absolute top-[-10px] left-1/2 bg-white text-xs text-gray-500 px-2 transform -translate-x-1/2">
            or
          </span>
        </div>
        
        <button className="w-72 py-2 rounded flex items-center justify-center space-x-2 h-[38px] text-[14px] mb-4 mt-6 border border-[#c0c4c8] hover:border-[#333]">
          <img src="/google-icon.svg" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
        <button className="w-72 py-2 rounded flex items-center justify-center space-x-2 h-[38px] text-[14px] border border-[#c0c4c8] hover:border-[#333]">
          <img src="/microsoft-icon.svg" className="w-5 h-5" />
          <span>Continue with Microsoft</span>
        </button>
        {renderFooter()}
      </div>
    );
  };

  return (
    <>
      {view === 'main' && renderMain()}
      {view === 'student' && renderLoginForm('student')}
      {view === 'teacher' && renderLoginForm('teacher')}
    </>
  );
}
