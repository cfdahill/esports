import React from "react";

const NavBar = props => (
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <a onClick={() => props.handlePageChange("CreateMatch")} className="nav-link">
                Create Matches
            </a>
        </li>
        <li className="nav-item">
            <a onClick={() => props.handlePageChange("CreateTeam")} className="nav-link">
                Create Teams
            </a>
        </li>
        <li className="nav-item">
            <a onClick={() => props.handlePageChange("CustomerSupport")} className="nav-link">
                Customer Support
            </a>
        </li>
    </ul>
);

export default NavBar;