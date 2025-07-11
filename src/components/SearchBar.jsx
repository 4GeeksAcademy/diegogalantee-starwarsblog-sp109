import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const SearchBar = () => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);

    if (input === "") {
      setResults([]);
      return;
    }

    // Combina todos los datos disponibles
    const combined = [
      ...store.people.map((item) => ({ ...item, type: "people" })),
      ...store.planets.map((item) => ({ ...item, type: "planets" })),
      ...store.vehicles.map((item) => ({ ...item, type: "vehicles" }))
    ];

    const filtered = combined.filter((item) =>
      item.name.toLowerCase().includes(input)
    );

    setResults(filtered.slice(0, 5)); // Mostrar máximo 5
  };

  const handleSelect = (item) => {
    setQuery("");
    setResults([]);
    navigate(`/${item.type}/${item.uid}`);
  };

  return (
    <div className="position-relative" style={{ width: "300px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search Star Wars..."
        value={query}
        onChange={handleChange}
      />
      {results.length > 0 && (
        <ul className="list-group position-absolute w-100 z-3" style={{ top: "100%" }}>
          {results.map((item, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(item)}
            >
              {item.name} <small className="text-muted">({item.type})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;