<template>


    <div class="row">
<!-- 未激活 -->
      <div class="col-md-12" v-show = 'unactive'>

        <ul class="topstats clearfix" style="display: block;" >
          <li class="arrow"></li>

          <li class="bkp bix abd col-xs-6 col-lg-2">
            <h3 class="bis">
              0
            </h3>
            <span class="bit">XLM</span>
          </li>

        </ul>
        <div  v-on:click = "close_self()" class="kode-alert kode-alert-icon kode-alert-click alert6 kode-alert-top" v-show = 'error_pop' style="display:block">
            <i class="fa fa-user"></i>
            提示：您的账户还没有被激活，账户余额至少20 lumens (XLM)才会被激活，可以通过朋友转账或充值的方式获得lumens<a style="float:right;">点击即可关闭窗口</a>
          </div>
      </div>

<!-- 已激活 -->
      <div class="col-md-12">
        <div class="col-sm-6 col-lg-4"  v-for="item in account_info">
            <div class="widget-bg-color-icon card-box">
                <div class="bg-icon bg-icon-green pull-left">
                  <span v-if='item.asset_code==null' class="bit">XLM</span>
                  <span v-else class="bit">{{item.asset_code}}</span>
                </div>
                <div class="text-right">
                    <h3 class="text-dark"><b class="counter">{{item.balance}}</b></h3>
                    <div v-if='item.asset_code==null' style="width:110px;height:1px;float:right">(已冻结20XLM)</div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
      </div>
        <!-- <div class="col-sm-6 col-lg-3">
            <div class="widget-bg-color-icon card-box fadeInDown animated">
                <div class="bg-icon bg-icon-primary pull-left">
                </div>
                <div class="text-right">
                    <h3 class="text-dark"><b class="counter">31,570</b></h3>
                    <p class="text-muted">Total Revenue</p>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="widget-bg-color-icon card-box">
                <div class="bg-icon bg-icon-danger pull-left">
                </div>
                <div class="text-right">
                    <h3 class="text-dark"><b class="counter">280</b></h3>
                    <p class="text-muted">Today's Sales</p>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="widget-bg-color-icon card-box">
                <div class="bg-icon bg-icon-purple pull-left">
                    <i class="ti-stats-up text-purple"></i>
                </div>
                <div class="text-right">
                    <h3 class="text-dark"><b class="counter">0.01</b>%</h3>
                    <p class="text-muted">Conversion</p>
                </div>
                <div class="clearfix"></div>
            </div>
        </div> -->
    </div>
</template>

<script>
var StellarSdk = require('stellar-sdk')
var server = new StellarSdk.Server('https://horizon.stellar.org');

export default{
  data(){
      return{
        account_info:[],
        card_color:[
          'bg-icon-green',
          'bg-icon-blue',
          'bg-icon-red',
          'bg-icon-purple'
        ],
        unactive:'',
        error_pop:'true'
      }
  },
  mounted(){
    var vm = this;
    const accountId = StellarSdk.Keypair
          .fromSeed(sessionStorage.Keypair).accountId();

    if(accountId!==''){
      console.log("账号验证成功");
      vm.SSE_balance(accountId)
    }
  },
  methods:{
        SSE_balance:function (accountId) {
          var vm = this,balance_obj;
          const accounts = server.accounts().accountId(accountId);
          accounts.stream({
              onmessage: function(payment) {
                vm.unactive = ''
                balance_obj = payment.balances.reverse();
                vm.account_info = balance_obj;
                for (var i = 0; i < balance_obj.length; i++) {
                  var num = new Number(vm.account_info[i].balance);
                  vm.account_info[i].balance = Math.floor(num * 100) / 100 ;
                }
                $(".loading").fadeOut(1150);
              },
              onerror: function(error) {
                if(error.srcElement.readyState===2){
                  console.log("未激活账户！");
                  vm.unactive = 'true'
                  $(".loading").fadeOut(1150);
                }
              }
          })
        },
        close_self:function () {
          var vm = this
          this.error_pop = ''
        }
  }

//end
};

</script>
