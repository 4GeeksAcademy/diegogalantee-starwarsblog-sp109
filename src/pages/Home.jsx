import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const categories = [
    { name: "people", title: "Characters" },
    { name: "planets", title: "Planets" },
    { name: "vehicles", title: "Vehicles" }
  ];

  useEffect(() => {
    categories.forEach(async (cat) => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${cat.name}`);
        const data = await res.json();
        dispatch({
          type: "load_data",
          payload: {
            category: cat.name,
            data: data.results
          }
        });
      } catch (err) {
        console.error(`Error fetching ${cat.name}:`, err);
      }
    });
  }, []);

  const handleAddFavorite = (item, type) => {
    dispatch({
      type: "add_favorite",
      payload: { ...item, type }
    });
  };

  return (
    <div className="container mt-4">
      {categories.map((cat) => (
        <div key={cat.name} className="mb-5">
          <h2 className="mb-3 text-danger">{cat.title}</h2>
          <div className="d-flex overflow-auto gap-3">
            {store[cat.name]?.map((item) => (
              <div key={item.uid} className="card" style={{ minWidth: "250px" }}>
                <img
                  src="https://via.placeholder.com/400x200.png?text=400x200"
                  alt="400x200"
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="d-flex justify-content-between">
                    <Link to={`/${cat.name}/${item.uid}`} className="btn btn-outline-primary btn-sm">
                      Details
                    </Link>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleAddFavorite(item, cat.name)}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;