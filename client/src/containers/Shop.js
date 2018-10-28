import React, {Component} from "react";
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import { fetchPoints, fetchRewards, createPick} from '../actions';
import {ToggleButtonGroup, ToggleButton, Button, Modal} from "react-bootstrap";
import '../css/shop.css';

class Shop extends Component {
  state={
    id: localStorage.getItem("_id"),
    value: [
      { number: 0, game: "hots", name: "Heroes of the Storm", checked: true },
      { number: 1, game: "hs", name: "HearthStone", checked: true },
      { number: 2, game: "ow", name: "OverWatch", checked: true },
      { number: 3, game: "sc", name: "StarCraft II", checked: true },
      { number: 4, game: "wow", name: "World of WarCraft", checked: true}
    ],
    show: false,
    shop: [],
    hideShop: [],
    quantity: 1,
    modalEvent:{},
    game: ''
  }

  componentDidMount = () => {
    if(localStorage.getItem("name")) {
      this.props.fetchPoints(this.state.id);
      this.props.fetchRewards(this.state.id);
      this.setState({shop: this.props.shop});
    }
  }

  //Create buttons to toggle the visibility of events on/off
  renderButton = (game) => {
    const i = game.number;
    let shop = this.state.shop;
    let hideShop = this.state.hideShop;
    return(
      <ToggleButton className="shopButton" value={game.game} key={game.game} onChange={ (e) => {
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

  //renderStore
  renderItems = () => {
    console.log(this.state.shop);
    return(this.state.shop.sort((a,b) => {
      if (a.game < b.game)
        return -1;
      if (a.game > b.game)
        return 1;
      return 0;
  }).map(item => (
    <div key={item._id} className={`shopItem`} value={item.game} onClick={e => {this.handleShow(e, item._id)}}>
      <img className="shopPic" src={`/images/${item.img}`} alt={item.name}></img>
      <div className="shopItemDesc">
        <h2>{item.name}</h2>
        <h3>{item.cost} points</h3>
        <p>{item.description}</p>
      </div>
    </div>
  )));
}

  //show Modal and pass info to it
  handleShow = (e, id) => {
    let modalEvent = this.state.shop.filter(item => (item._id === id));
    modalEvent = modalEvent[0];
    this.setState({modalEvent, show:true});
  }

  //hide Modal
  handleClose = () => {
    this.setState({ show: false });
  }

  //change the quantity to buy
  changeQuantity = e => {
    let quantity = this.state.quantity;
    quantity = quantity + parseInt(e.target.value, 10);
    console.log(typeof quantity);
    this.setState({quantity});
  }

  //push to database
  savePurchase = (totalCost) => {
    let points = this.props.points;
    points.spent = this.props.points.spent + totalCost;
    let rewards = this.props.rewards;
    rewards.push({
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
      this.props.fetchPoints(this.state.id);
    });
    this.setState({
    show: false,
    quantity: 1,
    modalEvent:{}
    });
  }

  render() {
    let totalCost = this.state.modalEvent.cost * this.state.quantity;
    return(
      <div>
        <h1>Store</h1>
        <h2>Points available: {this.props.points.lifetime - this.props.points.spent}</h2>
        <p>These products are not actually purchasable.  This is a proof of concept.  Have fun shopping for nothing!</p>
        <div>
          <ToggleButtonGroup type="checkbox" className="shopCheckbox">
             {this.state.value.map(game => (this.renderButton(game)))}
          </ToggleButtonGroup>
        </div>
        {this.renderItems()}
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton className={`modal${this.state.modalEvent.game}`}>
              <Modal.Title>{this.state.modalEvent.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`modal${this.state.modalEvent.game}`}>
              <p className='modalCenter'>Quantity: {this.state.quantity}</p>
              <div className='modalQuantity'>
              <Button value={-1} onClick={e => {this.changeQuantity(e)}}>
                Less
              </Button>
              {isNaN(totalCost) ? <h2>0</h2> : <h2>{totalCost}</h2>}
              <Button value={1} onClick={e => {this.changeQuantity(e)}}>
                More
              </Button>
              </div>
            </Modal.Body>
            <Modal.Footer className={`modal${this.state.modalEvent.game}`}>
              {totalCost <= (this.props.points.lifetime - this.props.points.spent) ? 
                <Button onClick={() => {this.savePurchase(totalCost)}}>
                  Purchase
                </Button> :
                <p>You currently cannot afford this, you only have {this.props.points.lifetime - this.props.points.spent} points.</p>
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