import { useState } from "react";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

function App() {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [productId, setProductId] = useState("");

  const requestAPI = () => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((result: Product) => {
        setError(null);
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <h1>Data from API:</h1>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button onClick={() => requestAPI()}>Buscar</button>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // Render your component using the fetched data
  return (
    <div style={{ margin: "100px" }}>
      <h1>Data from API:</h1>
      <h2>Inserte el ID que desea</h2>
      <input style={{marginRight:"10px"}}
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={() => requestAPI()}>Buscar</button>
      {data && (
        <div>
          <p>ID: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Price: {data.price}</p>
          <p>Description: {data.description}</p>
          <p>Category: {data.category}</p>
          <p>Rating: {data.rating.rate}</p>
          <img src={data?.image} alt="Product Image" width="200px" />
        </div>
      )}
    </div>
  );
}

export default App;
