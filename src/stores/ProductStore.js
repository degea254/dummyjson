import { create } from "zustand";

const useProductsStore = create((set) => ({
  favourites: [],

  search: "",

  category: "all",

  addFavourite: (id) =>
    set((state) => ({
      favourites: state.favourites.includes(id)
        ? state.favourites
        : [...state.favourites, id],
    })),

  removeFavourite: (id) =>
    set((state) => ({
      favourites: state.favourites.filter((item) => item !== id),
    })),

  //checks whether an item already exists in the list
  //if no , it adds it
  // if yes it removes it
  toggleFavourites: (id) =>
    set((state) => ({
      favourites: state.favourites.includes(id)
        ? state.favourites.filter((item) => item !== id)
        : [...state.favourites, id],
    })),

  setSearch: (search) => set({ search }),

  setCategory: (category) => set({ category }),
}));

export default useProductsStore;
