'use client';
import { registerAuthenticate } from '@/actions/auth/login';
import { registerUser } from '@/actions/auth/register';
import Link from 'next/link';
import { useState } from 'react';
import {useForm} from 'react-hook-form'

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormInputs>()
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async(data: FormInputs) => {
        const {name, email, password} = data;
        //console.log({name,email,password})

        // Server action para crear el usuario + autenticación
        const response = await registerUser(name, email, password);

        //! Si no se ha podido crear el usuario:
        if(!response.ok) {
            setErrorMessage(response.message)
            return;
        }

        //? Si se ha podido crear el usuario autenticar
        await registerAuthenticate(email.toLowerCase(), password);
        window.location.replace('/')
       
      
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-3"
                type="text" 
                {...register('name', {required: true})}
                />
                {
                    errors.name?.type === 'required' && (
                        <span className='text-red-500 text-xs mb-3'>*El nombre es obligatorio</span>
                    )
                }

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-2"
                type="email"
                {...register('email', {required: true, pattern: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/})}
                />
                {
                    errors.email?.type === 'required' || errors.email?.type === 'pattern' ? (
                        <span className='text-red-500 text-xs mb-3'>*Ingrese un correo válido</span>
                    ) : ''
                }

            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-2"
                type="password" 
                {...register('password', {required: true, minLength: 8})}
                />
                {
                    errors.password?.type === 'required' || errors.password?.type === 'minLength' ? (
                        <span className='text-red-500 text-xs mb-3'>*Ingrese una contraseña válida</span>
                    ) : ''
                }

            <button

                className="rounded hover:bg-blue-800 duration-300 bg-blue-700 py-2 text-white">
                Crear cuenta
            </button>

            <span className='text-red-500 mt-2'>{errorMessage}</span>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="rounded hover:bg-gray-400 duration-300 bg-gray-300 text-center py-2 text-black">
                Ingresar
            </Link>

        </form>
    )
}
