import { useCallback, useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';
import Input from '@/components/Input';

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currenVariant) =>
      currenVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const dummyLogin = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: process.env.NEXT_PUBLIC_DUMMY_USER,
        password: process.env.NEXT_PUBLIC_DUMMY_PASSWORD,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const dummyLogin = () => {
  //   setEmail('dummy@dummy.com');
  //   setPassword('2234r234rfadsfvvcasdfg');
  //   dummyCallback();
  // };

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'>
      <div className='bg-black w-full h-full bg-opacity-50'>
        <nav className='px-12 py-5'>
          {/* <img src='/images/logo.png' alt='logo' className='h-12' />*/}
          <h1 className='h-12 text-red-600 text-5xl font-bold'>FLIXNET</h1>
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 md:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Register '}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  label='Username'
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  id='name'
                  value={name}
                />
              )}
              <Input
                label='Email'
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id='email'
                type='email'
                value={email}
              />{' '}
              <Input
                label='Password'
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className='
                bg-red-600
                py-3
                text-white
                rounded-md
                w-full
                mt-10
                hover:bg-red-700
                transition'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </button>
            <p className='text-neutral-500 text-center mt-12'>
              Can't be bothered?
              <br />
              Just login as a dummy user:
            </p>
            <button
              onClick={dummyLogin}
              className='
                bg-green-600
                py-3
                text-white
                rounded-md
                w-full
                mt-10
                hover:bg-green-700
                transition'>
              Dummy User
            </button>

            {/* <div
              className='
                flex
                flex-row
                items-center
                gap-4
                mt-8
                justify-center
              '>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  justify-center
                  items-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                '>
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  justify-center
                  items-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                '>
                <FaGithub size={30} />
              </div>
            </div> */}

            <p className='text-neutral-500 mt-12'>
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='
              text-white
              ml-1
              hover:underline
              cursor-pointer
              '>
                {variant === 'login' ? 'Register' : 'Sign in'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
