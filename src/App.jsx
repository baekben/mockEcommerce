import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <div className="main">
        <BrowserRouter>
          <NavBar />
          <div className="body">Body</div>
          <div className="footer">Footer</div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
