import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Nav from "./components/Nav";
import Landing from "./components/Landing"
import Search from "./components/Search"

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/cities" element={<Search />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
