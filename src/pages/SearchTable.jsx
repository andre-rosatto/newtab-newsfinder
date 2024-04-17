import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";

export default function SearchTable() {
	return (
		<div>
			<Navbar
				home
				exit
				onExitClick={() => localStorage.removeItem('authenticated')}
			/>
			<Search />
		</div>
	)
}