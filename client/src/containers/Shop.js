import React, {Component} from "react";
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import { fetchPoints, fetchRewards, createPick} from '../actions';
import {ToggleButtonGroup, ToggleButton, Button, Modal} from "react-bootstrap";

class Shop extends Component {
  state={
    id: localStorage.getItem("_id"),
    points: {},
    value: [
      { number: 0, game: "hs", name: "HearthStone", checked: true },
      { number: 1, game: "hots", name: "Heroes of the Storm", checked: true },
      { number: 2, game: "ow", name: "OverWatch", checked: true },
      { number: 3, game: "sc", name: "StarCraft II", checked: true },
      { number: 4, game: "wow", name: "World of WarCraft", checked: true}
    ],
    show: false,
    shop: [],
    hideShop: [],
    quantity: 1,
    modalEvent:{}
  }

  componentDidMount = () => {
    if(localStorage.getItem("name")) {
      this.props.fetchPoints(this.state.id);
      this.props.fetchRewards(this.state.id);
    }
  }

  //Create buttons to toggle the visibility of events on/off
  renderButton = (game) => {
    const i = game.number;
    let shop = this.state.shop;
    let hideShop = this.state.hideShop;
    return(
      <ToggleButton value={game.game} key={game.game} onChange={ () => {
        //For whatever reason, if this is in a different method it creates an infinate loop.
        if(game.checked){
          game.checked = false;
          hideShop = hideShop.concat(shop.filter(item => (item.game === game.game)));
          shop = shop.filter(item => (item.game !== game.game));
        }else{
          game.checked = true;
          shop = shop.concat(hideShop.filter(item => (item.game === game.game)));
          hideShop = hideShop.filter(item => (item.game !== game.game));
        }
        let value = this.state.value;
        value[i].checked = game.checked;
        this.setState({value, shop, hideShop});
    }}>{game.name}</ToggleButton>
  )}

  handleShow = (e, id) => {
    console.log(e.target);
    let modalEvent = this.props.shop.filter(item => (item._id === id));
    modalEvent = modalEvent[0];
    // modalEvent.cost = parseInt(modalEvent.cost);
    this.setState({modalEvent, show:true}, console.log(modalEvent));
  }

  //hide Modal
  handleClose = () => {
    this.setState({ show: false });
  }

  changeQuantity = e => {
    let quantity = this.state.quantity;
    quantity = quantity + parseInt(e.target.value);
    console.log(typeof quantity);
    this.setState({quantity});
  }

  savePurchase = (totalCost) => {
    let points = this.props.points;
    points.spent = this.props.points.spent + totalCost;
    let rewards = this.props.rewards.push({
      date: moment.now(),
      item: this.state.modalEvent._id,
      cost: totalCost
    });

    const dataToPush = {
      dataToPush: {
        points: points,
        rewards: rewards
    }};
    console.log(dataToPush);
    this.props.createPick(this.state.id, dataToPush, () => {
      this.props.fetchPicks(this.state.id)
    });
    this.setState({
    show: false,
    quantity: 1,
    modalEvent:{}
    });
  }

  render() {
    let totalCost = this.state.modalEvent.cost * this.state.quantity;
    console.log(typeof totalCost);
    return(
      <div>
        <div>
          <ToggleButtonGroup type="checkbox">
             {this.state.value.map(game => (this.renderButton(game)))}
          </ToggleButtonGroup>
        </div>
        {this.props.shop.map(item => (
          <div key={item._id} onClick={e => {this.handleShow(e, item._id)}}>
            <img src={`/images/${item.img}`} alt={item.name}></img>
            <h2>{item.name}</h2>
            <h3>{item.cost} points</h3>
            <p>{item.description}</p>
          </div>
        ))}
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modalEvent.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Quantity: {this.state.quantity}</p>
              <Button value={-1} onClick={e => {this.changeQuantity(e)}}>
                Less
              </Button>
              <h2>{totalCost}</h2>
              <Button value={1} onClick={e => {this.changeQuantity(e)}}>
                More
              </Button>
            </Modal.Body>
            <Modal.Footer>
              {totalCost < (this.props.points.lifetime - this.props.points.spent) ? 
                <Button onClick={() => {this.savePurchase(totalCost)}}>
                  Purchase
                </Button> :
                <p>You currently cannot afford this, you currently only have {this.props.points.lifetime - this.props.points.spent} points.</p>
              }
            </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    points: state.points,
    shop: state.shop,
    rewards: state.rewards
  };
}

export default connect(mapStateToProps, {fetchRewards, fetchPoints, createPick})(Shop);