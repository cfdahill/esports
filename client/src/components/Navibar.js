import React, {Component} from "react";
import {Navbar, Nav, NavDropdown, MenuItem} from "react-bootstrap";
import {Link} from 'react-router-dom';
import '../css/navibar.css';


export default class Navigation extends Component {

  render() {
    return(
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">BlizzPicks</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
            <NavDropdown eventKey={0} title="Picks" id="basic-nav-dropdown">
                <li><Link className="naviLink" to="/picks">Picks</Link></li>
                <li><Link className="naviLink" to="/shop">Shop</Link></li>
                <li className='deadLink'>Top Scores</li>
                <li className='deadLink'>Account</li>
              </NavDropdown>
              <NavDropdown eventKey={1} title="eSports" id="basic-nav-dropdown">
                  <li className='deadLink'>News</li>
                  <li><Link to="/calendar" className="naviLink">Calendar</Link></li>
              </NavDropdown>
              <NavDropdown eventKey={2} title="OverWatch" id="basic-nav-dropdown">
                  <MenuItem eventKey={2.1} href="https://playoverwatch.com/" target="blank">About</MenuItem>
                  <MenuItem eventKey={2.2} href="https://overwatchleague.com/" target="blank">OverWatch League</MenuItem>
                  <MenuItem eventKey={2.3} href="https://worldcup.playoverwatch.com/" target="blank">OverWatch World Cup</MenuItem>
                  <MenuItem eventKey={2.4} href="https://playoverwatch.com/esports/open_division" target="blank">OverWatch Open Division</MenuItem>
                  <MenuItem eventKey={2.5} href="https://overwatchcontenders.com/" target="blank">OverWatch Contenders</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={3} title="Hearthstone" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} href="https://playhearthstone.com/" target="blank">About</MenuItem>
                  <MenuItem eventKey={3.2} href="https://playhearthstone.com/esports/" target="blank">Hearthstone Championship Tour (HCT)</MenuItem>
                  <MenuItem eventKey={3.3} href="https://playhearthstone.com/esports/global-games/" target="blank">Hearthstone Global Games</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={4} title="Heroes of the Storm" id="basic-nav-dropdown">
                  <MenuItem eventKey={4.1} href="https://heroesofthestorm.com/" target="blank">About</MenuItem>
                  <MenuItem eventKey={4.2} href="https://esports.heroesofthestorm.com/" target="blank">Heroes of the Storm Global Championship (HGC)</MenuItem>
                  <MenuItem eventKey={4.3} href="https://heroesofthedorm.com/" target="blank">Heroes of the Dorm</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={5} title="World of WarCraft" id="basic-nav-dropdown">
                  <MenuItem eventKey={5.1} href="https://worldofwarcraft.com/" target="blank">About</MenuItem>
                  <MenuItem eventKey={5.2} href="https://worldofwarcraft.com/esports/arena" target="blank">Arena World Championship (AWC)</MenuItem>
                  <MenuItem eventKey={5.3} href="https://worldofwarcraft.com/esports/mythic" target="blank">World Mythic Invitational (WMI)</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={5} title="StarCraft II" id="basic-nav-dropdown">
                  <MenuItem eventKey={5.1} href="https://starcraft2.com/" target="blank">About</MenuItem>
                  <MenuItem eventKey={5.2} href="https://ksl.starcraft.com/" target="blank">Korea StarCraft League (KSL)</MenuItem>
                  <MenuItem eventKey={5.3} href="https://wcs.starcraft2.com/" target="blank">StarCraft II World Championship Series (WCS)</MenuItem>
              </NavDropdown>
              {localStorage.getItem("account") === "admin" ? <Navbar.Brand>
                  <li><Link to="/admin" className="naviLink">Admin</Link></li>
                </Navbar.Brand> : ''}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }

}