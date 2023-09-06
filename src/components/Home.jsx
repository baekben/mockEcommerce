import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";

export default function Home() {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    async function getPreviewImgs() {
      try {
        const response = await getAllProducts();
        setImgs(response);
      } catch (error) {
        console.error(error);
      }
    }
    getPreviewImgs();
  }, []);
  return (
    <>
      <div className="homeContainer">
        <div className="title">
          <h1>Welcome</h1>
        </div>
        <div className="previewProducts">
          {imgs.slice(0, 3).map((img) => {
            return (
              <>
                <div className="previewImg">
                  <img
                    className="previewProductImg"
                    src={img.image}
                    alt={img.title}
                    key={img.id}
                  />
                </div>
              </>
            );
          })}
        </div>
        <div className="messageBox">
          <div className="message">
            <h2>Bring the styles back</h2>
          </div>
        </div>
        {/* <div className="imgBoxes">
          <div className="imgBox"></div>
          <div className="imgBox"></div>
        </div>
        <div className="imgBoxes">
          <div className="imgBox"></div>
          <div className="imgBox"></div>
        </div> */}
      </div>
    </>
  );
}
