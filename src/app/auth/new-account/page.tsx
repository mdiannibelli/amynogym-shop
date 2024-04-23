import { RegisterForm } from '@/components/ui/Form/RegisterForm';
import { sairaFont } from '@/config/font';

export default function NewAccount() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={ `${ sairaFont.className } text-4xl mb-5` }>Nueva cuenta</h1>
      <RegisterForm/>
    </main>
  );
}