// src/components/Sidebar.vue
<template>
<div id="wrapper">
  <div class="sidebar clearfix">

  <ul class="sidebar-panel nav">
    <li class="sidetitle">MAIN</li>

    <li>
      <router-link to="/">
        <span class="icon color5">
          <i class="fa fa-home"></i>
        </span>Dashboard<span class="label label-default"></span>
      </router-link>
    </li>
    <li>
      <router-link to="/anchors">
        <span class="icon color6">
          <i class="fa fa-anchor"></i>
        </span>Anchors<span class="label label-default"></span>
      </router-link>
    </li>
    <li>
      <router-link to="/exchange">
        <span class="icon color6">
          <i class="fa fa-line-chart"></i>
        </span>Exchange<span class="label label-default"></span>
      </router-link>
    </li>
    <li><a href="javascript:;"><span class="icon color14"><i class="fa fa-paper-plane-o"></i></span>Extra Pages<span class="caret"></span></a>
      <ul>
        <li><a href="social-profile.html">Social Profile</a></li>
        <li><a href="invoice.html">Invoice<span class="label label-danger">NEW</span></a></li>
        <li><a href="login.html">Login Page</a></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="forgot-password.html">Forgot Password</a></li>
        <li><a href="lockscreen.html">Lockscreen</a></li>
        <li><a href="blank.html">Blank Page</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="404.html">404 Page</a></li>
        <li><a href="500.html">500 Page</a></li>
      </ul>
    </li>
  </ul>

  <ul class="sidebar-panel nav">
    <li class="sidetitle">MORE</li>
    <li><a href="grid.html"><span class="icon color15"><i class="fa fa-columns"></i></span>Grid System</a></li>
    <li><a href="maps.html"><span class="icon color7"><i class="fa fa-map-marker"></i></span>Maps</a></li>
    <li><a href="customizable.html"><span class="icon color10"><i class="fa fa-lightbulb-o"></i></span>Customizable</a></li>
    <li><a href="helper-classes.html"><span class="icon color8"><i class="fa fa-code"></i></span>Helper Classes</a></li>
    <li><a href="changelogs.html"><span class="icon color12"><i class="fa fa-file-text-o"></i></span>Changelogs</a></li>
  </ul>

  <div class="sidebar-plan">
    Pro Plan<a href="#" class="link">Upgrade</a>
    <div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
    </div>
  </div>
  <span class="space">42 GB / 100 GB</span>
  </div>

  </div>
</div>
</template>

<script>
  export default{
    computed:{
      time(){
        return this.$store.state.totalTime
      }
    }
  }
</script>
