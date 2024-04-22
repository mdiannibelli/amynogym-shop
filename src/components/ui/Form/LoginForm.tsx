'use client';
import { authenticate } from '@/actions/auth/login';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationCircle } from 'react-icons/io5';

export const Loginform = () => {
    const [state, dispatch] = useFormState(authenticate, undefined);
    console.log(state)

  return (
    <form action={dispatch} className="flex flex-col">

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name='email' />


        <label htmlFor="password">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name='password' />

        {/* Failed Credentials */}
        <div className='flex h-8 items-end space-x-1 mb-2' aria-live='polite' aria-atomic= 'true'>
          {state === "Invalid credentials." && (
            <>
              <IoInformationCircle className='h-5 w-5 text-red-500'/>
              <p className='text-sm text-red-500'>Correo y contraseña no válidas.</p>
            </>
          )}
        </div>

        
        <LoginButton/>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="rounded hover:bg-gray-400 duration-300 bg-gray-300 text-center py-2 text-black">
          Crear una nueva cuenta
        </Link>

      </form>
  )
}

function LoginButton() {
  const {pending} = useFormStatus();
  return (
    <button type='submit'
          className={
            clsx(
              {
                "rounded hover:bg-blue-800 duration-300 bg-blue-700 py-2 text-white" : !pending,
                "rounded  duration-300 bg-gray-700 py-2 text-white": pending
              }
            )
          }
          disabled={pending}>
          Ingresar
        </button>
  )
}