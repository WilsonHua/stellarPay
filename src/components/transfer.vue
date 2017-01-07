<template>
  <div class="col-md-12 col-lg-6">

    <div class="panel panel-widget transfer-box clearfix">
      <div class="">
        转账
      </div>
      <hr>
      <form class="form-horizontal" role="form">

        <!-- To -->
        <!-- <div class="form-group">
          <label for="inputAddress" class="col-sm-2 control-label">To</label>
          <div class="col-xs-9">
            <input type="text" class="form-control" v-model='payment_data.address' placeholder="Public key or Address">
          </div>
        </div> -->
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
            <select class="form-control" v-model='payment_data.asset_code'>
              <option v-if='item.asset_code==null' v-for="item in account_info">XLM</option>
              <option v-else>{{item.asset_code}}</option>
            </select>
          </div>
        </div>
        <!-- issuer Address -->
        <div class="form-group"  v-if='payment_data.asset_code!=="XLM"'>
          <label for="inputUsername" class="col-sm-2 control-label">发行者</label>
          <div class="col-sm-10">
            <label class="sr-only">Login</label>
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-user"></i></div>
              <input type="text" class="form-control" v-model='payment_data.asset_issuer' placeholder="输入该资产发行人的账户地址">
            </div>
          </div>
        </div>

        <!-- Memo -->
        <div class="form-group">
          <label for="inputNumber" class="col-sm-2 control-label">备注</label>
          <div class="col-sm-10">
            <textarea type="text" class="form-control"  rows="3" v-model='payment_data.memo' placeholder="输入你想要备注的信息........"></textarea>
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
        validator_obj:{
          accountID:'true',
          amount:'true',
        },
        show:true
      }
  },
  mounted(){
    this.reload_banlance ()
  },
  methods:{
    sending () {
      var vm = this;
      if(vm.payment_data.address===''){
        vm.validator_obj.accountID = null;
        return;
      }
      if(vm.payment_data.amount==='' || vm.payment_data.amount==='0'){
        vm.validator_obj.amount = null;
        return;
      }
      vm.show = false;
      vm.$http.post('api/payment',vm.payment_data)
        .then((doneCallbacks, failCallbacks)=>{
          vm.$set(vm.payment_data,{})
            vm.show = true;
            swal("发送成功!", "你成功完成了这笔支付！", "success")
        })
    },
    reload_banlance () {
      var vm = this;
      vm.$http.get('api/loadAccount')
        .then((doneCallbacks, failCallbacks)=>{
          // vm.$set(vm.account_info,doneCallbacks.body.value)
          vm.account_info = doneCallbacks.body.value.balances;
        })
      // vm.asset_code==='XLM'?vm.un_native='false':vm.un_native='true'
      // console.log(vm.un_native);
    },
    validator (){
      validator_obj
    }
  }
};
</script>
<style>
#loading-wh{
  width: 40px;
}
</style>
