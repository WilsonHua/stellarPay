
<template>
<div class='bg'>
  <div class="login-form">
  <form action="index.html">
    <div class="top">
      <img src="/static/img/kode-icon.png" alt="icon" class="icon profile">
      <h1>stellarPay</h1>
      <h4>输入私钥即可登录</h4>
    </div>
    <div class="form-area">
      <div class="group">
        <input type="password" class="form-control" placeholder="Secret key" v-model='data.Keypair'>
        <i class="fa fa-key"></i>
        <span class="color10" v-show="login_error">私钥输入错误，请检查私钥格式</span>
      </div>
      <a href="javascript:void(0);" v-on:click="submit" class="btn btn-default btn-block">登录</a>
    </div>
    <div class="footer-links">
      <div class="text-right">
        <a href="javascript:void(0);" v-on:click="createAccount"><i class="fa fa-lock"></i> 创建新的账户</a></div>
      </div>
    <div class="account-show" v-if="show"><b>public_key :</b><br>{{Account_key.public_key}}<br><b>Secret Key :</b><br>{{Account_key.seed}}</div>
  </form>

</div>


</div>
</template>
<script>
const StellarSdk = require('stellar-sdk'),
      server = new StellarSdk.Server('https://horizon.stellar.org');
export default{
  data(){
      return{
        data:{
          Keypair:'',
        },
        Account_key:'',
        show:'',
        login_error:''
      }
  },
  mounted(){
  },
  methods:{
    submit:function () {
      var vm = this;
      if(vm.data.Keypair===null){
        return;
      }
      else {

        const sourceKeys =StellarSdk.Keypair.fromSeed(vm.data.Keypair);
        const sourceAccount = sourceKeys.accountId();
        server.loadAccount(sourceAccount).then(function(account) {
          sessionStorage.Keypair = vm.data.Keypair;
          vm.login_error='';
          vm.$router.push('/');
        })
        .catch(function(error) {
          vm.login_error=true;
          console.log(error)
        });
      }
    },
    createAccount:function () {
      const vm = this,
            pair = StellarSdk.Keypair.random();
      const Account = {
          public_key:pair.accountId(),
          seed:pair.seed()
      };
      vm.Account_key = Account;
      vm.show = 'true'
    },

  }


  //end
};
</script>
<style scoped>

.bg {
    position: absolute;
    width: 100%;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    background: url('/static/img/bg.jpg') no-repeat;
}
.account-show{
  margin: 0 10px 5px;
  padding: 0 15px 0 15px;
  word-break: break-all;
  border: 1px solid #383;
  border-radius: 3px;
  background: #d6e7d6;
}
.login-form .footer-links{
  margin-top: -30px;
}
</style>
