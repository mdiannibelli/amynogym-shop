'use server';

import type { PaypalOrderStatus } from "@/interfaces/paypal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const checkPayment = async (paypalTransactionId: string) => {
    const authToken = await getPaypalBearerToken();
    //console.log({ authToken })

    if (!authToken) return { ok: false, message: "No se pudo obtener el token de verificación" }

    const paymentStatus = await verifyPaypalPayment(paypalTransactionId, authToken);
    if(!paymentStatus) return {ok:false, message:"Error al verificar el pago"}

    const {status, purchase_units} = paymentStatus;
    const {invoice_id:orderId} = purchase_units[0];
    //console.log({status, purchase_units})

    if(status !== 'COMPLETED') return {ok:false, message:"Aún no se ha pagado la transacción en paypal"}

    try {
        await prisma.orders.update({
            where: {
                id: orderId
            },
            data: {
                isPaid: true,
                paidAt: new Date()
            }
        })

        revalidatePath(`/orders/${orderId}`);
        return {
            ok:true
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message: "500 - El pago no se pudo realizar"
        }
    }
}


//? Petición post al endpoint de Paypal para obtener el authtoken para luego estar autentificados a la hora de hacer la petición GET al endpoint de orders de paypal
//? Y así verificar el estado de la transacción del usuario.
// Copy "Code Snippet" - (JavaScript - Fetch)
const getPaypalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const basic64token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        'utf-8'
    ).toString('base64');


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //myHeaders.append("Authorization", "Basic QVNtdFlqM2JhMG0tYTRGN2tiM0NfVHlfdDUydzdxUml5VXlmc1l4LVBQLTl2ZVA1TTVqVndmcGhZVXhQSzNYcXpnYjhVMU8yWHF6TzFncWg6RUlwQ2xZUmJabXFsQ2RPMFdJNmxsYXgtUGVtX2tFa3ZRWXVDVG1rd2FaQnNCWWpEYzFKdDVtVnlVelh0eHFwYnBmRU9laEF1N3o2T0M1eUU=");
    myHeaders.append("Authorization", `Basic ${basic64token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            ...requestOptions,
            cache: 'no-store'
        }).then(res => res.json());
        return result.access_token;

    } catch (error) {
        console.log(error)
        return null;
    }

}

const verifyPaypalPayment = async (paypalTransactionId: string, bearerToken: string):Promise<PaypalOrderStatus | null> => {
    const myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer A21AALZ9Jq7qd52jlOakxGTJ7gjtwjiimEo08LjXfv2Wp4M-CdQ-Qcdi2OTCnVDBfh_EXluLqFzN2Nv9atK9nhKO77-JgD1fw");
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const response = await fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${paypalTransactionId}`, {
            ...requestOptions,
            cache: 'no-store'
        }).then(res => res.json());
        return response
        
    } catch (error) {
        console.log(error);
        return null;
    }


}