import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className="collapse navbar-collapse p-2" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Link to="/" className="nav-link">
                            Practice
                        </Link>
                    </ul>
                </div>
            </nav>
        );
    }
}
