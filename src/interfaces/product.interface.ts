export interface Product {
    id:string; //! Cuando usemos DB lo usamos
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    //todo type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats'|'oversizes';
//export type ValidTypes = '2d947c61-4b77-478f-b990-4b08dd95c96e'|'b39718ff-cc88-41fb-80a4-ebffa420987b'|'dc6f5275-1905-4d97-99c0-043525f7f171'|'b7652955-fa67-4860-9a2e-e54f5bbccbeb'|'43ea6dec-35c0-49de-80c3-d12343e0b30f';
