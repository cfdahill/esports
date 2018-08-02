import React, {Component} from "react";
import CreateMatch from "./pages/CreateMatch";
import CreateTeam from "./pages/CreateTeam";
import CustomerSupport from "./pages/CustomerSupport";
import NavBar from "./NavBar";

class EmployeeUI extends Component {
    state = {
        currentPage: "CreateTeam"
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    render() {
        return (
            <div>
                <NavBar
                    currentPage={this.state.currentPage}
                    handlePageChange={this.handlePageChange}
                />
                {this.state.currentPage === `CreateMatch` ? <CreateMatch /> :
                this.state.currentPage === `CreateTeam` ? <CreateTeam /> :
                <CustomerSupport />}
            </div>
        );
    };
};

export default EmployeeUI;