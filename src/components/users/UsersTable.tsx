'use client';
import { changeUserRole } from '@/actions/users/change-user-role';
import type { User } from '@/interfaces/users.interface'
import React from 'react'
import { IoImages } from 'react-icons/io5';

interface Props {
    users: User[];
}

export const UsersTable = ({users}:Props) => {
  return (
    <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Rol
              </th> 
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
              <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.image ? user.image : <IoImages/>}
                </td>
            
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <select 
                  value={user.role}
                  onChange={e => changeUserRole(user.id, e.target.value)}
                  className="text-sm text-gray-900 w-full p-2 text-center select-none outline-none">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>

              </tr>
              ))
            }

          </tbody>
        </table>
  )
}
