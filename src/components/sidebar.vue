// src/components/Sidebar.vue
<template>
<div id="wrapper">
  <div class="sidebar clearfix">

  <ul class="sidebar-panel nav">
    <li class="sidetitle">核心模块</li>

    <li>
      <router-link to="/">
        <span class="icon color5">
          <i class="fa fa-home"></i>
        </span>首页<span class="label label-default"></span>
      </router-link>
    </li>
    <li>
      <router-link to="/anchors">
        <span class="icon color6">
          <i class="fa fa-anchor"></i>
        </span>锚点(资产管理)<span class="label label-default"></span>
      </router-link>
    </li>
    <li>
      <router-link to="/exchange">
        <span class="icon color6">
          <i class="fa fa-line-chart"></i>
        </span>交易<span class="label label-default"></span>
      </router-link>
    </li>

  </ul>

  <ul class="sidebar-panel nav">
    <li class="sidetitle">更多</li>
    <li><a href="changelogs.html"><span class="icon color12"><i class="fa fa-file-text-o"></i></span>更新日志</a></li>
  </ul>

  <div class="sidebar-plan">
    开始<a href="#" class="link">完成</a>
    <div class="progress">
    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
    </div>
  </div>
  <span class="space">60 % / 100 %</span>
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
