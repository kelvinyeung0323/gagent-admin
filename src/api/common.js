import axios from "./http";

function getAreas() {
  return axios.get("/admin/common/areas", {});
}

export default {
  getAreas
};