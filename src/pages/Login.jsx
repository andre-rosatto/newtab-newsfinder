import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

export default function Login() {
	return (
		<div className="login">
			<Navbar home />
			<LoginForm />
		</div>
	)
}