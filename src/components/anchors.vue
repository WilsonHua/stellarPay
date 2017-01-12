<template>
  <div class="content">

    <div class="row">
      <div class="col-lg-12">
      <div class="panel panel-widget transfer-box clearfix">
            <!-- <div class="panel-title">
                添加锚点
            </div> -->
            <div>
              <div id="anchor-page">
                  <div>
                    <h1>添加锚点</h1>
                    <hr>
                    <form>
                        <div class="form-group">
                            <label>锚点</label>
                            <span class="small"></span>
                            <input type="text" class="form-control" v-model='trust_data.asset_issuer' placeholder="发行方的账户地址，如:GBS7IAXICCZ62XLYKVFDYG7TLLIARICSWF47QJKRNMUOZVBP24D47X4B">
                        </div>
                        <div>
                            <div class="form-group">
                                <label>资产名称</label>
                                <input type="text" class="form-control"  v-model='trust_data.asset_code' placeholder="选择添加的资产名称代码,如：CNY、AAA">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>上限</label>
                            <input type="text" maxlength = "11" class="form-control" v-model='trust_data.limit' placeholder="选择添加的资产数量上限，为空则默认没有上限">
                        </div>
                        <a href="javascript:void(0);" class="btn btn-primary" v-on:click="add_trust" v-if='show'>确认添加</a>
                        <img src="static/img/loading/loading5.gif" id='loading-wh' v-if='!show'>
                    </form>
                  </div>
              </div>
            </div>
        </div>
    </div>


      <div class="col-lg-12">
        <div class="panel panel-widget transfer-box clearfix">
          <h2>已添加列表</h2>
          <hr>
          <table class="table">
              <thead>
                <tr>
                    <td>发行方</td>
                    <td>资产名称</td>
                    <td>余额</td>
                    <td>上限</td>
                    <td></td>
                </tr>
              </thead>
              <tr v-for="(item ,index) in anchors_info">
                  <td>{{item.asset_issuer}}</td>
                  <td>{{item.asset_code}}</td>
                  <td>{{item.balance}}</td>
                  <td>{{item.limit}}</td>
                  <td><a href="javascript:void(0)" v-if='item.balance == 0' v-show="delete_btn" v-on:click="remove_trust(index)" class="btn-xs btn-danger">删除</a></td>
                  <hr>
              </tr>
              </tbody>
          </table>
          <hr>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
const StellarSdk = require('stellar-sdk')
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
export default{
  data(){
      return{
        trust_data:{
          asset_issuer:'',
          asset_code:'',
          limit:'',
        },
        anchors_info:[],
        show:'true',
        delete_btn:true
    }
  },
  mounted(){
    var vm = this;

    const sourceKeys =StellarSdk.Keypair.fromSeed(sessionStorage.Keypair);
    const sourceAccount = StellarSdk.Keypair
          .fromSeed(sessionStorage.Keypair).accountId();

    this.load_trust_list()
  },
  methods:{
    add_trust () {
      var vm = this;

      vm.show = ''

      var anchor_accountId =  vm.trust_data.asset_issuer ,
          asset_type = vm.trust_data.asset_code ,
          limit = vm.trust_data.limit;

      vm.change_trust(anchor_accountId,asset_type,limit,"已成功添加锚点！")
    },
    remove_trust (index) {
      var vm = this;

      swal({
            title: "操作提交中...",
            text: "预计时间：3-5S,请耐心等待...",
            imageUrl: "static/img/loading/loading3.gif"
          });

      var anchor_accountId =  vm.anchors_info[index].asset_issuer ,
          asset_type = vm.anchors_info[index].asset_code;

          // vm.delete_btn = false
      vm.change_trust(anchor_accountId,asset_type,'0',"已删除该锚点！")
    },
    change_trust (anchor_accountId,asset_type,limit,result_text){
      const sourceKeys =StellarSdk.Keypair.fromSeed(sessionStorage.Keypair),
            sourceAccount = StellarSdk.Keypair.fromSeed(sessionStorage.Keypair).accountId(),
            vm = this;

           // Create an object to represent the new asset
           var new_asset = new StellarSdk.Asset(asset_type, anchor_accountId);

           // First, the receiving account must trust the asset
             server.loadAccount(sourceAccount)
               .then(function(receiver) {
                   var transaction = new StellarSdk.TransactionBuilder(receiver)
                   // The `changeTrust` operation creates (or alters) a trustline
                   // The `limit` parameter below is optional
                       .addOperation(StellarSdk.Operation.changeTrust({
                           asset: new_asset,
                           limit: limit
                       }))
                       .build();
                   transaction.sign(sourceKeys);
                   return server.submitTransaction(transaction);
               })
               .then(function (result) {
                 swal("操作成功!", result_text, "success");
                 vm.show = 'true'
                 vm.$set(vm.trust_data,{})
                 vm.load_trust_list()
               })
               .catch(function(error) {
                 if(error.status === 400){
                   vm.show = 'true'
                   swal("操作失败!", "提交失败，请检查填写是否正确", "error")
                 }
                 else {
                   vm.show = 'true'
                   swal("操作失败!", error || error.errno, "error")
                   console.info(error)
                 }
               });
    },
    load_trust_list () {
      const StellarSdk = require('stellar-sdk')
      const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      const accountId = StellarSdk.Keypair
            .fromSeed(sessionStorage.Keypair).accountId();
      var vm = this;
      server.loadAccount(accountId).then(function(account) {
        var anchor_obj = account.balances
        vm.anchors_info = anchor_obj
        for (var i = 0; i < anchor_obj.length; i++) {
          var num = new Number(vm.anchors_info[i].balance);
          var num1 = new Number(vm.anchors_info[i].limit);
          vm.anchors_info[i].balance = Math.floor(num * 100) / 100 ;
          vm.anchors_info[i].limit = Math.floor(num1 * 100) / 100 ;
        }
        vm.anchors_info.pop();
      });
    }

  }
};
</script>
