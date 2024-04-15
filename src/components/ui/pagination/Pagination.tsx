'use client';
import { generatePagination } from "@/utils/generatePagination";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    totalPages: number;
}
export default function Pagination({totalPages}: Props) {
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageToString = searchParams.get('page') ?? 1; // string | 1
    const currentPage = isNaN(+pageToString) ? 1 : +pageToString; // Si introducimos ?page=asd nos devolverá 1, si no devolvera el pageToString
    
    //console.log({pathName, searchParams, currentPage})

    const allPages = generatePagination(currentPage, totalPages)

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)

        if(pageNumber === '...') {
            return `${pathName}?${params.toString()}` // ruta donde nos encontramos
        }

        if(+pageNumber <= 0) { // puede ser un string por lo tanto lo convierto a numero con "+"
            return `${pathName}`; // href= '/pathName'
        }

        if(+pageNumber > totalPages) {
            return `${pathName}?${params.toString()}` // ruta donde nos encontramos
        }

        // Si no es ninguna condición establecemos el parametro a la url
        params.set('page', pageNumber.toString());
        return `${pathName}?${params.toString()}`
    }


    return (
        <div className="flex text-center mt-10 mb-12 justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none gap-x-2">
                    <li className="page-item">
                        <Link
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href={createPageUrl(currentPage - 1)} aria-disabled="true">
                            <IoChevronBackOutline size={30}/>
                        </Link>
                    </li>

                    {
                        allPages.map((page, index) => (
                            <li key={page + '-' + index} className="page-item"><Link
                            className={
                                clsx(
                                    'page-link text-2xl relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800  focus:shadow-none',
                                    {
                                        'bg-blue-700 text-white' : currentPage === page
                                    },
                                    {
                                        'hover:text-gray-800 hover:bg-gray-200' : currentPage !== page
                                    }
                                )
                            }
                            href={createPageUrl(page)}>{page}</Link></li>
                        ))
                    }
                    

                    <li className="page-item">
                        <Link
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={30}/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
