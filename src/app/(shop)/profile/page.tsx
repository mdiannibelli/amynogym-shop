import { auth } from '@/auth.config'
import Titlte from '@/components/ui/Title/Title'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
    const session = await auth()

    if(session === null) {
        redirect('/auth/login')
    }
  return (
    <div>
        <Titlte title='Perfil'/>
        <pre>
            {
                JSON.stringify(session.user, null, 2)
            }
        </pre>
    </div>
  )
}

