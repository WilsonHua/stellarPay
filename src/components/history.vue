<template>
  <!-- Start Row -->
  <div class="row">
    <div class="col-md-6 col-lg-3">
        <div id="alertTip" class="kode-alert-icon kode-alert alert3 kode-alert-top-right" v-show = "tipSuccess" style="display:block">
          <i class="fa fa-check"></i>
          <a href="#" class="closed">×</a>
          <h4>消息提示</h4>
          成功收到一笔交易，详情查看交易记录
        </div>
    </div>


    <!-- Start Panel -->
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-title">
          交易记录
        </div>
        <div class="panel-body table-responsive" style="max-height:500px">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>类型</th>
                <th>数量</th>
                <th>交易事件</th>
                <th>Age</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in effects_info">
                  <td>{{item.type}}</td>
                  <td>+{{item.amount}} {{item.asset_code}}</td>
                  <td>
                    {{item.from}}
                    <i class="fa fa-long-arrow-right"></i>
                    {{item.to}}
                  </td>
                  <td>61</td>
                  <td>2011/04/25</td>
              </tr>
            </tbody>
          </table>
          <div class="margin-t-10 text-center color6 f-size-16">暂无任何交易</div>
        </div>

      </div>
    </div>
    <!-- End Panel -->

  </div>
</template>

<script>
var StellarSdk = require('stellar-sdk')
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  export default {
    data(){
        return{
          effects_info:[],
          tipSuccess:''
        }
    },
    mounted(){
      var vm = this;
      vm.stream_effects();
      //end
    },
    methods:{
      stream_effects:function () {
        //初始化函数
        var account_id = StellarSdk.Keypair
              .fromSeed(sessionStorage.Keypair).accountId();
        var payments = server.payments().order('desc').forAccount(account_id);
        var arr = new Array();
        var vm = this;
        payments.stream({
              onmessage: function(payment) {
                // Record the paging token so we can start from here next time.

                // The payments stream includes both sent and received payments. We only
                // want to process received payments here.
                if (payment.to !== account_id) {
                  return;
                }

                // In Stellar’s API, Lumens are referred to as the “native” type. Other
                // asset types have more detailed information.
                var asset;
                if (payment.asset_type === 'native') {
                    asset = 'lumens';
                }
                else {
                    asset = payment.asset_code;
                }
                if(payment.from == account_id){

                }
                var num = new Number(payment.amount)
                var effects_code = {
                  type        : payment.type,
                  amount      : num.toFixed(2),
                  asset_code  : asset,
                  from        : payment.from === account_id?"我的账户":payment.from,
                  to        : payment.to === account_id?"我的账户":payment.to,
                }
                arr.push(effects_code);
                vm.effects_info = arr;
              },
              onerror: function(error) {

              }
        });
      }
    }
//end
}
</script>
<style scope>
.table-striped{
  overflow: auto;
  height: 500px;
}
</style>
