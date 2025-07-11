export const initialStore = () => {
  const localData = localStorage.getItem("store");
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (err) {
      console.error("Error parsing localStorage store:", err);
    }
  }

  // Estado por defecto si no hay nada guardado
  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'load_data':
      return {
        ...store,
        [action.payload.category]: action.payload.data
      };

    case 'add_favorite':
      if (store.favorites.find(fav => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
        return store; // Ya está en favoritos
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
        )
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}