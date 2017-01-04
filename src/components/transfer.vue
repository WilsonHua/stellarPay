<template>
  <div class="col-md-12 col-lg-6">

    <div class="panel panel-widget transfer-box clearfix" style="height:450px;">
      <div class="panel-title">
        transfer
        <ul class="panel-tools">
          <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li>
          <li><a class="icon expand-tool"><i class="fa fa-expand"></i></a></li>
        </ul>
      </div>
      <form class="form-horizontal" role="form">

        <!-- To -->
        <!-- <div class="form-group">
          <label for="inputAddress" class="col-sm-2 control-label">To</label>
          <div class="col-xs-9">
            <input type="text" class="form-control" v-model='payment_data.address' placeholder="Public key or Address">
          </div>
        </div> -->
        <div class="form-group" >
          <label class="col-sm-2 control-label">To</label>
          <div class="col-sm-10">
            <label class="sr-only">Login</label>
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-user"></i></div>
              <input type="text" class="form-control" v-model='payment_data.address' id="exampleInputAmount2" placeholder="Destination account ID">
            </div>
            <span v-show='!validator_obj.accountID'>accountID can't be empty!</span>
          </div>
        </div>
        <!-- Amount -->
        <div class="form-group">
          <label for="exampleInputAmount" class="col-sm-2 control-label">Amount</label>
          <div class="col-sm-6">
            <label class="sr-only" for="exampleInputAmount">Amount</label>
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-usd"></i></div>
              <input type="text" class="form-control" v-model='payment_data.amount' placeholder="Amount to send">
            </div>
            <span v-show='!validator_obj.amount'>amount can't be empty!</span>
          </div>
          <div class=" col-sm-4">
            <select class="form-control" v-model='payment_data.asset_code'>
              <option v-if='item.asset_code==null' v-for="item in account_info">XLM</option>
              <option v-else>{{item.asset_code}}</option>
            </select>
          </div>
        </div>
        <!-- issuer Address -->
        <div class="form-group"  v-if='payment_data.asset_code!=="XLM"'>
          <label for="inputUsername" class="col-sm-2 control-label">issuer</label>
          <div class="col-sm-10">
            <label class="sr-only">Login</label>
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-user"></i></div>
              <input type="text" class="form-control" v-model='payment_data.asset_issuer' placeholder="Enter issuer Address">
            </div>
          </div>
        </div>

        <!-- Memo -->
        <div class="form-group">
          <label for="inputNumber" class="col-sm-2 control-label">Memo</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model='payment_data.memo' placeholder="memo">
          </div>
          <div class="col-sm-4">
            <select class="form-control btn" v-model='payment_data.memo_type' >
              <option>Memo Text</option>
              <option>Memo ID</option>
              <option>Memo Hash</option>
              <option>Memo Return</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-xs-4">

          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <a href="javascript:void(0);" v-if="show" class="btn btn-default"  data-toggle="modal" data-target="#myModal"  v-on:click="send_XLM">send_XLM</a>
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
    send_XLM () {
      var vm = this;
      if(vm.payment_data.address===''){
        console.log(111)
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
            swal("Success!", "You have done a payment!", "success")
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
