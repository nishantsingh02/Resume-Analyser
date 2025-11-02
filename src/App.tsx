import "./App.css";
import Home from "./Component/Home";
import Auth from "./Component/Auth";
import { Route, Routes } from "react-router-dom";
import { usePuterStore } from "./lib/puter";
import { useEffect } from "react";

function App() {

  const { init } = usePuterStore()
  useEffect(() => {
    init();
  }, [init])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
