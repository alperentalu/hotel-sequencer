import { Routes, Route } from "react-router-dom";
import Home from "./page/Home"
import AddHotel from "./page/AddHotel";
import "./style/App.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-hotel" element={<AddHotel />} />
      </Routes>
    </div>
  );
}

export default App;
