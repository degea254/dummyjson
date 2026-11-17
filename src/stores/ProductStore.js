import { create } from "zustand";

const useProductsStore = create((set) => ({
  favourites: [],

  addFavourite: (id) =>
    set((state) => ({
      favourites: [...state.favourites, id],
    })),

  removeFavourite: (id) =>
    set((state) => ({
      favourites: state.favourites.filter((item) => item !== id),
    })),
}));

export default useProductsStore;
