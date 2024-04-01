import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SearchTable from './pages/SearchTable';

const router = createBrowserRouter([
	{ path: "/", element: <Home />, errorElement: <h1>404 - Página não encontrada</h1> },
	{ path: "/about", element: <About /> },
	{ path: "/login", element: <Login /> },
	{ path: "/search", element: <SearchTable /> },
]);

export default function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}