import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemoveFavorite = (fav) => {
    dispatch({
      type: "remove_favorite",
      payload: { uid: fav.uid, type: fav.type }
    });
  };

  return (
    <nav className="navbar navbar-light bg-light px-3 d-flex justify-content-between">
      <Link to="/" className="navbar-brand">
        <strong>StarWars</strong>
      </Link>

      <div className="d-flex align-items-center gap-3">
        {/* 🔍 Search bar */}
        <SearchBar />

        {/* ⭐ Favorites dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="favoritesDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="favoritesDropdown"
          >
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No favorites yet</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li
                  key={index}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  <Link
                    to={`/${fav.type}/${fav.uid}`}
                    className="me-2 text-decoration-none"
                  >
                    {fav.name}
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation(); // 👈 evita que el dropdown se cierre
                      handleRemoveFavorite(fav);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;