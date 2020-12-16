import api from '../api/api'

const commonModule = {
  state: () => ({
    areas:[]
  }),
  mutations: {
    refreshAreas(state,areas){
      state.areas = areas;
    },
  },
  getters: {
    getAreasByParentId:(state)=>(parentId)=>{
      //TODO:
      return null;
    }
  },
  actions: {
    getAreas(context,areas) {
       api.common.getAreas().then(res=>{
         context.commit("refreshAreas",res.data);
         }).catch((error)=>{
           console.log(error);
       })
    },
  },
};
export default commonModule;