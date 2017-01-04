<template>

    <div id="wrapper">

        <router-view class="view one" name='header'></router-view>

        <router-view class="view two" name='sidebar'></router-view>
        <router-view></router-view>
    </div>
</template>

<script>
  import sidebar from './components/sidebar.vue'
  import comHeader from './components/header.vue'

  export default {
    components: {
      'com-header':comHeader,
      'sidebar':sidebar,
    }
  }
</script>
