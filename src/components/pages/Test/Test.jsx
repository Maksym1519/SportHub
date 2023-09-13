import React, { useState, useEffect } from "react";
import axios from "axios";

function TestStrapi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/show-mores?populate[0]=show-mores&populate[1]=show-mores.formats&populate[2]=show-mores.formats.thumbnail");
// http://localhost:1337/api/show-mores?populate[0]=content&populate[1]=content.formats&populate[2]=content.formats.thumbnail
        if (response.status === 200) {
          setData(response.data.data);
          setLoading(false);
        } else {
          setError("Request failed with status: " + response.status);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <img src={item.attributes.formats.thumbnail} alt="img" />
          {/* <p>{item.attributes.title}</p> */}
        </div>
      ))}
    </div>
  );
}

export default TestStrapi;
