import { Metadata } from 'next';
import LoginForm from '../../ui/login/login_form';

const metadata:Metadata ={
  title:'login'
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
      </div>
    </div>
  );
}
