<template>
  <div class="content">

    <!-- Start Page Header -->
    <div class="page-header">
      <h1 class="title">更新日志</h1>
        <ol class="breadcrumb">
          <li class="active">该钱包为开源项目，将持续进行版本的迭代、功能更新优化。</li>
        </ol>

    </div>
    <!-- End Page Header -->

   <!-- //////////////////////////////////////////////////////////////////////////// -->
  <!-- START CONTAINER -->
  <div class="container-default">


    <!-- Start Changelog -->
    <div class="changelogs">

      <div class="update">
        <span class="label label-default version">Coming Soon</span>
        <span class="date">on next update</span>
          <span class="dot"></span>
          <span class="line"></span>
          <div class="list">
            <h4>多签名、账户冻结</h4>
            <div class="desc">增加新的核心功能模块，可对账户进行资产冻结。</div>
          </div>
          <div class="list">
            <h4>交易记录</h4>
            <div class="desc">增加交易详情，筛选功能</div>
          </div>

          <div class="list">
            <h4>完善扫码支付的流程</h4>
            <div class="desc">使用户通过2步操作完成一次支付。</div>
            <div class="desc">增加复制地址功能（H5）</div>
          </div>

          <div class="list">
            <h4>完善代码质量，增加Vuex数据仓库，整体架构为单向数据流模式。</h4>
            <div class="desc">Vue全家桶</div>
          </div>

          <div class="list">
            <h4>footer功能添加</h4>
          </div>
      </div>


      <div class="update">
        <span class="label label-danger version">v 1.1</span>
        <span class="date">13 January 2017</span>

          <p>该版本主要在V1.0的基础上解决一些bug，对部分功能做了些取舍。</p>
          <div class="list">
            <h4>增加收款模块，二维码</h4>
          </div>

          <div class="list">
            <h4>修复删除锚点功能的bug</h4>
          </div>

          <div class="list">
            <h4>删除后端封装的API接口</h4>
            <p>V1.0的操作功能是在由nodejs封装的后端接口中完成，此次放到前端执行。（需进行代码模块优化）</p>
          </div>
          <div class="list">
            <h4>优化支付和锚点操作的用户体验</h4>
            <p>对Loading进行改进，支付时自动识别所选资产的发行人地址。</p>
          </div>
      </div>

      <div class="update">
        <span class="label label-danger version">v 1.0</span>
        <span class="date">3 January 2017</span>

          <div class="list">
            <!--
            ******
            V1.0编辑区
            ******
            -->
            <h4>第一版基础功能完成</h4>
            <p>包含余额、支付、交易记录、锚点添加、删除锚点、去中心化交易所，挂单</p>
          </div>
          <div class="list">
            <!--
            ******
            V1.0编辑区
            ******
            -->
            <h4>样式及用户体验，H5,PAID响应式的适配。</h4>
          </div>
          <!-- <div class="list">
            <h4>余额</h4>
            <p>SSE模式读取用户信息</p>
          </div>
          <div class="list">
            <h4>支付</h4>
            <p></p>
          </div>
          <div class="list">
            <h4>锚点</h4>
            <p></p>
          </div> -->
      </div>


    </div>
    <!-- End Changelog -->


  <br><br><br>

  </div>
  <!-- END CONTAINER -->
   <!-- //////////////////////////////////////////////////////////////////////////// -->


  <!-- Start Footer -->
  <div class="row footer">
    <div class="col-md-6 text-left">
    Copyright © 2017 <a href="#" target="_blank"></a> All rights reserved.
    </div>
    <div class="col-md-6 text-right">
      <!-- Design and Developed by <a href="#" target="_blank">@block.lol</a> -->
    </div>
  </div>
  <!-- End Footer -->


  </div>

</template>

<script>
export default{
    mounted(){

    },
    methods:{

  }
}
</script>
