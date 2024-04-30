export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table

import { getUsers } from '@/actions/users/get-users';
import Pagination from '@/components/ui/pagination/Pagination';
import Titlte from '@/components/ui/Title/Title';
import { UsersTable } from '@/components/users/UsersTable';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function UsersPage({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;


  const {users = [], ok, currentPage, totalPages} = await getUsers({page});

  if(!ok) {
    redirect('/auth/login');
  }
  return (
    <>
      <Titlte title="Todos los usuarios" />

      <div className="mb-10">
        <UsersTable users={users}/>
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}