import { auth } from "@/auth.config"
import { redirect } from "next/navigation"

export default async function CheckoutLayout({children}: {children:React.ReactNode}) {

    // Validación
    /* const session = await auth()
    if(!session?.user) {
        redirect('/auth/login')
    } */
    return (
        <>
            {children}
        </>
    )
}