'use client';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions} from '@paypal/paypal-js'
import React from 'react'
import { setTransactionId } from '@/actions/payments/set-transaction-id';
import { checkPayment } from '@/actions/payments/paypal-check-payment';

interface Props {
    orderId: string;
    amount: number;
}

export const PaypalButton = ({orderId, amount}: Props) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const amountToString = amount.toFixed(2).toString();

    const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        // Generar transaction id
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: amountToString,
                        currency_code: 'USD'
                    }
                }
            ]
        })
        await setTransactionId(orderId, transactionId);

        if(!transactionId) throw new Error("No se ha podido realizar la transacción");
        //console.log({transactionId});

        return transactionId;
    };

    const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
        const details = await actions.order?.capture();
        if(!details) return ;

        await checkPayment(details.id!);
        return ;
    }

  return (
    <>
        {isPending ? 
        <div className="animate-pulse mb-16"><div className='h-10 bg-gray-300 rounded'/>
        <div className='mt-2 h-10 bg-gray-300 rounded'/></div> 
        : null}
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    </>
  )
}
