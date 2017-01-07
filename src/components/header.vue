<template>
<div id="top" class="clearfix">

  <!-- Start App Logo -->
  <div class="applogo">
    <a href="/" class="logo">blcok.lol</a>
  </div>
  <!-- End App Logo -->

  <!-- Start Sidebar Show Hide Button -->
  <a href="javascript:;" class="sidebar-open-button"><i class="fa fa-bars"></i></a>
  <a href="javascript:;" class="sidebar-open-button-mobile"><i class="fa fa-bars"></i></a>
  <!-- End Sidebar Show Hide Button -->

  <!-- Start Searchbox -->
  <form class="searchform">
    <input type="text" class="searchbox" id="searchbox" placeholder="Search">
    <span class="searchbutton"><i class="fa fa-search"></i></span>
  </form>
  <!-- End Searchbox -->


  <!-- Start Sidepanel Show-Hide Button -->
  <!-- <a href="#sidepanel" class="sidepanel-open-button"><i class="fa fa-outdent"></i></a> -->
  <!-- End Sidepanel Show-Hide Button -->

  <!-- Start Top Right -->
  <ul class="top-right">

  <li class="dropdown link">
    <a href="#" data-toggle="dropdown" class="dropdown-toggle profilebox"><img src="static/img/profileimg.png" alt="img"><b>我的账户</b><span class="caret"></span></a>
      <ul class="dropdown-menu dropdown-menu-list dropdown-menu-right">
        <li role="presentation" class="dropdown-header">Profile</li>
        <li><a href="#"><i class="fa falist fa-inbox"></i>Inbox<span class="badge label-danger">4</span></a></li>
        <li><a href="#"><i class="fa falist fa-wrench"></i>Settings</a></li>
        <li class="divider"></li>
        <li><a href="#/login" v-on:click = logout()><i class="fa falist fa-power-off"></i>退出登录</a></li>
      </ul>
  </li>
  <!-- <li class="dropdown link">
    <a href="#" data-toggle="dropdown" class="dropdown-toggle profilebox"><b>Language</b><span class="caret"></span></a>
      <ul class="dropdown-menu dropdown-menu-list dropdown-menu-right">
        <li role="presentation" class="dropdown-header">Profile</li>
        <li><a href="#"><i class="fa falist fa-inbox"></i>中文</a></li>
        <li><a href="#"><i class="fa falist fa-inbox"></i>English</a></li>
      </ul>
  </li> -->
  </ul>
  <!-- End Top Right -->

</div>

</template>

<script>
export default{
    mounted(){
      $(".sidebar-open-button-mobile").click(function(){
          $(".sidebar").toggle(150);
      });
    },
    methods:{
      logout:function () {
        sessionStorage.Keypair = ''
      }
  }
}
</script>
