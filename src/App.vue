<template>
  <div id="app">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            nav 1
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-menu-item key="1"><router-link to="/goods">商品管理</router-link> </a-menu-item>
            <a-menu-item key="2"><router-link to="/warehouse">仓库管理</router-link></a-menu-item>
            <a-menu-item key="3">快递管理</a-menu-item>
            <a-menu-item key="4">订单管理</a-menu-item>
            <a-menu-item key="5">系统管理</a-menu-item>
            <a-menu-item key="6">用户管理</a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
          >
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>


<script>

import {mapActions} from 'vuex';

export default {
  data(){
    return {}
  },
  components:{
  },
  methods:{
    ...mapActions(['getAreas'])
  },
  mounted () {
    this.getAreas();
  }

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
