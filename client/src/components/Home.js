import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';


export default class Footer extends Component {
  render() {
    return(
      <div>
        <h1>BlizzPicks</h1>
        <p>
          Welcome to BlizzPicks.com.  This site has no affiliation  with Blizzard Entertainment; it was built to celebrate Blizzard eSports.  This site is currently in its alpha stage so you may notice that there are some options in the menu bar that won't work.  I built this site for several reasons but ultimately, I built this out of a love of watching the Blizzard eSports events.
        </p>
        <p>
          In this site you will find a calendar of eSports events so you can easily know when events are occuring.  The events in the calendar of events can be clicked on to provide more details, including links to the twitch channels of the English streams of the events.  I feel like Blizzard doesn't have a good calendar of all of their events so this felt like a must for me.
        </p>
        <p>
          The real fun of this site are the picks.  Before a match starts you are able to pick the team/player that you think will win the match.  Pick correctly and you get points.  Right now these points are only for bragging rights but maybe in the future, the store that exists is a concept of being able to use your points to buy goodies.
        </p>
        <p>
          This site is still under development.  As a result, there are still some bugs.  Refreshing the page should help, especially after logging in.  It curretnly has only been formatted for smart phones.  It will still work on tablets and computers but it will look wonky.
        </p>
        <Link to="/login"><Button>Login</Button></Link>
        <Link to="/createaccount"><Button>New User</Button></Link>


      </div>
    )
  }
}