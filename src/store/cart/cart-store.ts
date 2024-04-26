import type { ProductInCart } from "@/interfaces/product.interface";
import { Size } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: ProductInCart[];

    addProductToCart: (product:ProductInCart) => void;
    getTotalItems: () => number;
    updateProductQuantity: (product:ProductInCart,quantity:number) => void;
    removeProductInCart: (product:ProductInCart) => void;
    getSummaryTotalCart: () => {subTotal:number, tax:number, total:number, totalItems:number};
    clearCart: () => void;
}

export const useCartStore = create<State>()( 
    //? Envolvemos todo en un persist para persistir el estado en nuestro storage, este middleware mantendrá en sincronía el localStorage con el state global
    //? El persist dará un problema a la hora de rehidratar la aplicación debido a que cuando intente cargar toda la pnatalla del lado del servidor y luego implementemos
    //? el store por ejemplo en el ícono de cart para mostrar la cantidad va a generar una discrepancia entre lo que va a renderizar el server y el client porque se crea 
    //? en ambos lugares porque el servidor no tiene la información del localStorage del cliente. Si usamos cookies el servidor siempre va a tener la información del cliente.
    //? El problema de las cookies es que siempre vamos a estar mandando todo al servidor, cuando lo que queremos es que se mande al realizar el checkout. 
    persist(
        (set, get) => ({ //! el get permite obtener el estado actual del store de Zustand
            // estado (se inicializa en []):
            cart: [],
        
            addProductToCart: (product:ProductInCart) => {
                const {cart} = get(); // Todos los productos en mi cart
                //console.log(cart)

                // 1. Busco en mi cart si existe el producto con la talla seleccionada
                const productInCart = cart.some( // Determina si existe el elemento según la condición y devuelve ese solo, sin evaluar los demas
                    (item) => (item.id === product.id && item.sizes === product.sizes)
                );
        
                // Si no esta en el carrito agregalo
                if(!productInCart) {
                    set({cart: [...cart, product]});
                    return;
                }
        
                // 2. Si existe hay que incrementarlo/actualizar la cantidad
                const updatedCartProducts = cart.map((item) => {
                    if(item.id === product.id && item.sizes === product.sizes) {
                        return {...item, quantity: item.quantity + product.quantity}
                    }
        
                    return item;
                })
        
                set({cart: updatedCartProducts});
        
            },

            getTotalItems: () => {
                const {cart} = get();
                // Barremos cada producto y le sumamos la cantidad al total que se inicializa en 0
                return cart.reduce( (total, item) => total + item.quantity , 0)
            },

            updateProductQuantity: (product:ProductInCart,quantity:number) => {
                const {cart} = get();
                const updatedCartProducts = cart.map((item) => {
                    if(item.id === product.id && item.sizes === product.sizes) {
                        return {...item, quantity: quantity}
                    }
                    return item;
                })
                set({cart: updatedCartProducts});
            },

            removeProductInCart: (product:ProductInCart) => {
                const {cart} = get();
                const deleteProducts = cart.filter((item) => (item.id !== product.id || item.sizes !== product.sizes))
                set({cart:deleteProducts});
            },

            getSummaryTotalCart: () => {
                const {cart} = get();
                const subTotal = cart.reduce((subTotal, item) => subTotal + (item.quantity * item.price) ,  0);
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const totalItems = cart.reduce((total, item) => total + item.quantity , 0);
                return {
                    subTotal,
                    tax,
                    total,
                    totalItems
                }
            },
            clearCart: () => {
                set({cart: []})
            }
        }
    )

   
    
        ,{
            name: 'shopping-cart',
            //skipHydration: true, <= Esto evitará el problema de la hidratación del persist y tendremos que controlar más el localStorage (se hace tedioso)
        }
    )
    
    

    
)