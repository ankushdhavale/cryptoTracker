import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import Header from "./components/Common/Header/Header";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/ComparePage";
import { WishListContextProvider } from "./context/WishListContext";
import WishListPage from "./pages/WishListPage";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<WishListContextProvider>
					<Header />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/dashboard' element={<DashboardPage />} />
						<Route path='/coin/:coinId' element={<CoinPage />} />
						<Route path='/compare' element={<ComparePage />} />
						<Route path='/wishlist' element={<WishListPage />} />
					</Routes>
				</WishListContextProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
