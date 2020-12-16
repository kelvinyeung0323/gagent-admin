<template>
  <div>
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }" >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="仓库名称">
            <a-input/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="省份" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
           <a-select @change="onProvinceChange" style="width:200px" :default-value="0">
             <a-select-option v-for="(a,index) in this.provinces" :key="index" :value="index">
               {{a.name}}
             </a-select-option>
           </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item label="市/县" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
            <a-select @change="onCityChange"  style="width:200px" :default-value="0">
              <a-select-option v-for="(a,index) in this.cities" :key="index" :value="index">
                {{a.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="区" :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
            <a-select @change="onAreaChange"  style="width:200px" :default-value="0">
              <a-select-option v-for="(a,index) in this.areas" :key="index" :value="index">
                {{a.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="街道">
            <a-input v-model="this.warehouse.detailAddr"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="邮编">
          <a-input v-model="this.warehouse.detailAddr"/>
        </a-form-item>
      </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data () {
    return {

      selectedProvinceIndex:0,
      selectedCityIndex:0,
      selectedAreaIndex:0,
      area:[],
      warehouse: {
        id: null,
        name: null,
        seqNo: null,
        areaId: null,
        detailAddr: '',
        postCode: null,
        createTime: null,
        updateTime: null,
      }
    }
  },
  methods:{
    onProvinceChange(value){
      this.selectedProvinceIndex = value;
    },
    onCityChange(value){
      this.selectedCityIndex = value;

    },
    onAreaChange(value){
    },
  },
  computed:{
    ...mapState({
      provinces: state=> state.common.areas
    }),

    cities(){
      if(this.provinces.length > 0){
        return  this.provinces[this.selectedProvinceIndex].child;
      }else{
        return [];
      }
    },
    areas(){
      if(this.cities.length > 0){
        return  this.cities[this.selectedCityIndex].child;
      }else{
        return [];
      }
    },
  },
}
</script>

<style scoped>

</style>