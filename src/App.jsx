import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import Header from "./components/Common/Header/Header"
import CoinPage from "./pages/CoinPage"
import ComparePage from "./pages/ComparePage"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/> } />
          <Route path="/dashboard" element={<DashboardPage/> } />
          <Route path="/coin/:coinId" element={<CoinPage/> } />
          <Route path="/compare" element={<ComparePage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
