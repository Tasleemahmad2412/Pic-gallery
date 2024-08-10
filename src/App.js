import { useEffect, useState } from "react";
import "./App.css";
import ImageCard from "./ImageCard";
import ImageSearch from "./ImageSearch";

const URL = "45291993-cee186fb9ffe8b2b78e255bca";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("yellow+flowers");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${URL}&q=${term}&image_type=photo&pretty=true`
      // `https://pixabay.com/api/?key=45291993-cee186fb9ffe8b2b78e255bca&q=yellow+flowers&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log("Error"));
  }, [term]);

  return (
    <div className="conatiner mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32 text-red-500">
          Image not found for the query You Entered ! Try something else
        </h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading ...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
