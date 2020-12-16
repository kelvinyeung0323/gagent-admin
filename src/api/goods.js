import axios from "./http";

function queryGoods() {
  return axios.post("/goods", {});
}

export default {
  queryGoods,
};
