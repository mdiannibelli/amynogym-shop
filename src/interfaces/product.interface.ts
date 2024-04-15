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
