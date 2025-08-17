import LazyRoutes from "./routes/LazyRoutes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LazyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
