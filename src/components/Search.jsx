import React from "react";
import '../css/search.css';
import '../css/login.css';

const Search = () => {
    return (
        <div className="searchHeader">
            <h2 className="newsFinder">newsFinder</h2>
            <button className="buttonHome">
              <span className="dot">.</span> 
              <span className="home">HOME</span>
            </button>
            <button className="buttonHome">
              <span className="dot">.</span> 
              <span className="sair">SAIR</span>
            </button>
        </div>
    )
}

export default Search;
