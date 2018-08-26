import axios from 'axios';

export default {
  getGames: function() {
    return axios.get("/api/games");
  },
  getGame: function(id) {
    return axios.get("/api/books" + id);
  }
}