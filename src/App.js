import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import LoginForm from './pages/LoginForm';
import Search from './pages/Search';

const router = createBrowserRouter([
	{ path: "/", element: <Home />, errorElement: <h1>404 - Página não encontrada</h1> },
	{ path: "/about", element: <About /> },
	{ path: "/login", element: <LoginForm /> },
	{ path: "/search", element: <Search /> },
]);

export default function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}