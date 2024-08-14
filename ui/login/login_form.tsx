'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../../lib/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUser } from '../../lib/redux/features/UsersSlice';
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const [email, setEmail] = useState('john@gmail.com')
  const [password, setPassword] = useState('123456')
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      const formData = new FormData(event.currentTarget);

      const result = await authenticate(undefined, formData);
    }



  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex-1 rounded-lg bg-slate-300 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          {isLogin ? 'Login' : 'SignUp'}
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder={isLogin ? 'password' : 'Create Password'}
                required
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

          </div>
          {!isLogin &&
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder='Confirm Password'
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>}
        </div>
        {isLogin && <div className='my-2 flex justify-center'><a href='#' className='text-blue-600 active:text-purple-500'>Forgot Password ?</a></div>}
        <LoginButton isLogin={isLogin} />

        <div className='my-2 flex justify-center'>{isLogin ? <p>Don't have an account? <span onClick={() => setIsLogin(!isLogin)} className='text-blue-600 cursor-pointer'>Sign Up</span></p> : <p>Already have an account? <span onClick={() => setIsLogin(!isLogin)} className='text-blue-600 cursor-pointer'>Login</span></p>}</div>
        <div className='flex items-center my-2'>
          <div className='flex-1 border-[0.5px] border-gray-200'></div>
          <p className='mx-2'>Or</p>
          <div className='flex-1 border-[0.5px] border-gray-200'></div>
        </div>
        <button className="relative w-full flex items-center bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition border border-gray-300">
          <FcGoogle className="text-xl" />
          <p className="absolute left-1/2 transform -translate-x-1/2 text-base font-medium text-gray-700">{isLogin? 'Log In':'Sign Up'} with Google</p>
        </button>


        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton({isLogin}:{isLogin:boolean}) {
  const { pending } = useFormStatus();
  return (
    <button className="mt-4 p-2 rounded-md w-full mx-auto bg-green-500 text-white md:text-xl flex gap-2 justify-center items-center" aria-disabled={pending}>
      <p>{isLogin ? 'Log In': 'Sign Up'}</p> <ArrowRightIcon className="h-5 w-5" />
    </button>
  );
}
