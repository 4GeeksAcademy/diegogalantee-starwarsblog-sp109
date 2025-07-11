import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const Single = () => {
  const { uid } = useParams();
  const pathParts = useLocation().pathname.split("/");
  const type = pathParts[1];

  const [data, setData] = useState(null);
  const [properties, setProperties] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const json = await res.json();
        setData(json.result);
        setProperties(json.result.properties);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching details:", err);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [type, uid]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!data) return <div className="text-center mt-5 text-danger">Not Found</div>;

  return (
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-5 text-center">
          <img
            src="https://via.placeholder.com/800x600.png?text=800x600"
            alt="400x200"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-7">
          <h1 className="mb-3">{data.properties.name}</h1>
          <p className="text-muted fst-italic">UID: {data.uid}</p>
          <hr />
          <div className="row">
            {Object.entries(properties).map(([key, value], index) => (
              <div key={index} className="col-md-6 mb-2">
                <strong>{key.replaceAll("_", " ")}:</strong> {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;