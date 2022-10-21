import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/layout/Header";
import Detail from "./pages/ProductDetail";

import "./App.css";
import "./assets/css/setting.css";
import "./assets/css/loading.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
