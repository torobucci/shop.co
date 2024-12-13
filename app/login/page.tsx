import { Metadata } from 'next';
import LoginForm from '@ui/login/login_form';

const metadata:Metadata ={
  title:'login'
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className='w-full max-w-[450px]'>
        <LoginForm />
        </div>
    </div>
  );
}
