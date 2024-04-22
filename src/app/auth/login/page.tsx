import { Loginform } from '@/components/ui/Form/LoginForm';
import { sairaFont } from '@/config/font';

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ sairaFont.className } text-4xl mb-5` }>Ingresar</h1>

      <Loginform/>
    </main>
  );
}