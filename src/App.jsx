import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Protected from "./pages/Protected";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/kategori" element={<h1> Category Sayfası </h1>} />

        {/* PRIVATE */}
        <Route element={<Protected />}>
          <Route path="/home" element={<Feed />} />
          <Route path="/ayar" element={<h1> Ayar Sayfası </h1>} />
          <Route path="/profil" element={<h1> Profil Sayfası </h1>} />
          <Route path="/arkadaslar" element={<h1> Arkadaşlar Sayfası </h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;