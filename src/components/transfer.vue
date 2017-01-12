<template>
  <div class="col-md-12 col-lg-6">

    <div class="panel panel-widget transfer-box clearfix">
      <div class="">
        转账
      </div>
      <hr>
      <form class="form-horizontal" role="form">
        <div class="form-group" >
          <label class="col-sm-2 control-label">账户</label>
          <div class="col-sm-10">
            <label class="sr-only">Login</label>
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-user"></i></div>
              <input type="text"  data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." class="form-control" v-model='payment_data.address' placeholder="输入对方账户地址">
            </div>
          </div>
        </div>
        <!-- Amount -->
        <div class="form-group">
          <label for="exampleInputAmount" class="col-sm-2 control-label">数量</label>
          <div class="col-sm-10">
            <label class="sr-only" for="exampleInputAmount">Amount</label>
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-usd"></i></div>
              <input type="text" class="form-control" v-model='payment_data.amount' placeholder="输入你想发送的数量">
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputAmount" class="col-sm-2 control-label">资产</label>
          <div class="col-sm-10">
            <select class="form-control" v-show="input_show" v-model='payment_data.asset_code' @change="onselect">
              <option v-if='item.asset_code==null' v-for="item in account_info">XLM</option>
              <option v-else>{{item.asset_code}}</option>
            </select>
            <input class="form-control" type="text"  v-show="!input_show" placeholder="输入资产名称">
            <!-- <a href="javascript:void(0)" v-on:click="toggle_input">手动输入</a> -->
          </div>
        </div>
        <!-- issuer Address -->
        <div class="form-group"  v-if='payment_data.asset_code!=="XLM"'>
          <label for="inputUsername" class="col-sm-2 control-label">发行者</label>
          <div class="col-sm-10">
              <select class="form-control" v-model='payment_data.asset_issuer'>
                <option v-for="item in this_issuer">{{item}}</option>
              </select>

          </div>
        </div>
        <!-- Memo -->
        <div class="form-group">
          <label for="inputNumber" class="col-sm-2 control-label">备注</label>
          <div class="col-sm-10">
            <textarea type="text" class="form-control"  rows="3" v-model='payment_data.memo' placeholder="(可空)  输入你想要备注的信息........"></textarea>
          </div>
          <!-- <div class="col-sm-4">
            <select class="form-control btn" v-model='payment_data.memo_type' >
              <option>Memo Text</option>
              <option>Memo ID</option>
              <option>Memo Hash</option>
              <option>Memo Return</option>
            </select>
          </div> -->
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-xs-4">

          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <a href="javascript:void(0);" v-if="show" class="btn btn-default"  v-on:click="sending">发送</a>
            <img src="static/img/loading/loading5.gif" id='loading-wh' v-if='!show'>
          </div>
        </div>
      </form>
    </div>
  </div>


</template>

<script>
const StellarSdk = require('stellar-sdk')
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
export default{

  data(){
      return{
        payment_data:{
          address:'',
          amount:'',
          asset_code:'XLM',
          asset_issuer:'',
          memo:'',
          memo_type:'Memo Text'
        },
        account_info:[],
        this_issuer:[],
        validator_obj:{
          accountID:'true',
          amount:'true',
        },
        show:true,
        input_show:true,
      }
  },
  mounted(){
    var vm = this;

    const sourceKeys =StellarSdk.Keypair.fromSeed(sessionStorage.Keypair);
    const sourceAccount = sourceKeys.accountId();

    this.loadAccount ()
  },
  methods:{
    sending () {
      var vm = this;
      const sourceKeys =StellarSdk.Keypair.fromSeed(sessionStorage.Keypair);
      const sourceAccount = sourceKeys.accountId();
      // if(vm.payment_data.address===''){
      //   vm.validator_obj.accountID = null;
      //   return;
      // }
      // if(vm.payment_data.amount==='' || vm.payment_data.amount==='0'){
      //   vm.validator_obj.amount = null;
      //   return;
      // }
      vm.show = false;
      var destinationId = vm.payment_data.address,
          amount = vm.payment_data.amount,
          new_asset = new StellarSdk.Asset( vm.payment_data.asset_code, vm.payment_data.asset_issuer ),
          amount_type = vm.payment_data.asset_code ==='XLM'? StellarSdk.Asset.native():new_asset,
          memo = vm.payment_data.memo;
      // First, check to make sure that the destination account exists.
      // You could skip this, but if the account does not exist, you will be charged
      // the transaction fee when the transaction fails.
      server.loadAccount(destinationId)
      // If the account is not found, surface a nicer error message for logging.
      .catch(StellarSdk.NotFoundError, function (error) {
          throw new Error('对方账户地址不存在');
      })
      .then(function() {
            return server.loadAccount(sourceKeys.accountId());
      })
      .then(function(inAccount) {
          console.log("账户地址：..."+inAccount)
          // Start building the transaction.
          var transaction = new StellarSdk.TransactionBuilder(inAccount)
            .addOperation(StellarSdk.Operation.payment({
              destination: destinationId,
              // Because Stellar allows transaction in many currencies, you must
              // specify the asset type. The special "native" asset represents Lumens.
              asset: amount_type,
              amount: amount
          }))
          // A memo allows you to add your own metadata to a transaction. It's
          // optional and does not affect how Stellar treats the transaction.
          .addMemo(StellarSdk.Memo.text(memo))
          .build();
          // Sign the transaction to prove you are actually the person sending it.
          transaction.sign(sourceKeys);
          // And finally, send it off to Stellar!
          return server.submitTransaction(transaction);
      })
      .then(function(result) {
        vm.$set(vm.payment_data,{})
        vm.show = true;
        swal("发送成功!", "你成功完成了这笔支付！", "success");
      })
      .catch(function(error) {
        if(error.status === 400){
          vm.show = true;
          const ecode = error.extras.result_codes.operations[0];
          console.log(ecode);
          if(ecode==="op_no_trust"){
            swal("操作失败!", "对方账户尚未信任", "error")
            return;
          }
          swal("操作失败!", "请检查填写是否正确或该资产余额不足", "error")
        }
        else {
          vm.show = true;
          swal("发送失败!", error || error.errno, "error")
          console.info("错误代码："+error.detail)
        }
      });


      // vm.$http.post('api/payment',vm.payment_data)
      //   .then((data, error)=>{
      //     if(data.body.code === 1){
      //       vm.$set(vm.payment_data,{})
      //       vm.show = true;
      //       swal("发送成功!", "你成功完成了这笔支付！", "success");
      //     }
      //     else if(data.body.message.status === 400){
      //       const ecode = data.body.message.extras.result_codes.operations[0];
      //       console.log(ecode);
      //       if(ecode==="op_no_trust"){
      //         swal("操作失败!", "对方账户尚未信任", "error")
      //         return;
      //       }
      //       swal("操作失败!", "请检查填写是否正确或该资产余额不足", "error")
      //     }
      //     else {
      //       vm.show = true;
      //       swal("发送失败!", data.body.message || data.body.message.errno, "error")
      //       console.info("错误代码："+data.body.message)
      //     }
      //   })
    },
    loadAccount () {
      var vm = this;
      const sourceKeys =StellarSdk.Keypair.fromSeed(sessionStorage.Keypair);
      const sourceAccount = sourceKeys.accountId();

      server.loadAccount(sourceAccount).then(function(account) {
        vm.account_info = account.balances;
        console.info(vm.account_info)
      });
      // vm.$http.get('api/loadAccount')
      //   .then((doneCallbacks, failCallbacks)=>{
      //       vm.account_info = doneCallbacks.body.value.balances;
      //
      //       console.info(vm.account_info)
      //   })
    },
    validator (){
      validator_obj
    },
    toggle_input(){
      var vm = this;
      vm.input_show=''
    },
    onselect (){
      var vm = this;
      var account_obj = vm.account_info
      vm.this_issuer=[]
      console.log("当前选择的资产:"+vm.payment_data.asset_code)
      for (var i = 0; i < account_obj.length; i++) {
        if(account_obj[i].asset_code === vm.payment_data.asset_code){
            vm.this_issuer.push(account_obj[i].asset_issuer)
        }
      }
      vm.payment_data.asset_issuer = vm.this_issuer[0]

      console.log("当前选择的资产的发行人:"+vm.this_issuer[0]);
    }
  }
};
</script>
<style>
#loading-wh{
  width: 40px;
}
</style>
