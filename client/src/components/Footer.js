import React, {Component} from "react";
import '../css/footerHeader.css'

export default class Footer extends Component {
  render() {
    return(
    <footer>
      <div className='footerOverlay'>
      <p>This site is not affiliated  with Blizzard Entertainment</p>
      <p>Created by <a href="https://chaydahill.com" target="blank">Chay Dahill</a></p>
      <p>2018</p>
      </div>
    </footer>
  )}
}