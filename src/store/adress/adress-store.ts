import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    //State
    adress: {
        firstName: string;
        lastName: string;
        adress: string; 
        adress2?: string; 
        postalCode: string; 
        city: string;
        country: string;
        phone: string;
    }

    //Methods
    setAdress: (adress:State['adress']) => void;
}

export const useAdressStore = create<State>()(
    persist(
        (set,get) => ({
            adress: { // Default Values
                firstName: '',
                lastName: '',
                adress: '', 
                adress2: '', 
                postalCode: '', 
                city: '',
                country: '',
                phone: '',
            },
            setAdress: (adress) => {
                set({adress});
            }
        }),
        {
            name: 'adress-storage'
        }
    ),
);