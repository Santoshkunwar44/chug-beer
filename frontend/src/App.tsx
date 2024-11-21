import { useEffect } from "react";
import "./App.css";
import useFetchUserData from "./hooks/useFetchUserData";
import Dashboard from "./pages/Dashboard";
import EntryDetail from "./pages/EntryDetailPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const { initializeUserData } = useFetchUserData();

  useEffect(() => {
    initializeUserData();
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/entry/:id" element={<EntryDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
