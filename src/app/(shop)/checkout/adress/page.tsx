
import { getUserAdress } from '@/actions/adress/get-user-adress';
import { getCountries } from '@/actions/country/getCountries';
import { auth } from '@/auth.config';
import { AdressForm } from '@/components/ui/Form/AdressForm';
import Titlte from '@/components/ui/Title/Title';

export default async function AdressPage() {
  // Obtenemos los países
  const countries = await getCountries();

  const session = await auth()
  if(!session?.user) return (<h3>No hay sesión de usuario</h3>)
  const userAdress = await getUserAdress(session!.user.id) ?? undefined
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Titlte title="Dirección" subtitle="Dirección de entrega" className='pl-0' classNameTitle='text-4xl font-[600]'/>

        <AdressForm countries={countries} userStoredAdress={userAdress}/>
      </div>




    </div>
  );
}