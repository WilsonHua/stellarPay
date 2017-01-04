
<template>
<div class='bg'>
  <div class="login-form">
  <form action="index.html">
    <div class="top">
      <img src="/static/img/kode-icon.png" alt="icon" class="icon profile">
      <h1>block.lol</h1>
      <h4>Unlock Screen</h4>
    </div>
    <div class="form-area">
      <div class="group">
        <input type="password" class="form-control" placeholder="Secret key" v-model='data.Keypair'>
        <i class="fa fa-key"></i>
      </div>
      <button type="submit" v-on:click="submit" class="btn btn-default btn-block">LOGIN</button>
    </div>
    <div class="footer-links">
      <div class="text-right">
        <a href="javascript:void(0);" v-on:click="createAccount"><i class="fa fa-lock"></i> Create an account</a></div>
      </div>
    <div class="account-show" v-if="show">public_key:<br>{{Account_key.public_key}}<br>seed:<br>{{Account_key.seed}}</div>
  </form>

</div>


</div>
</template>
<script>
export default{
  data(){
      return{
        data:{
          Keypair:'',
        },
        Account_key:'',
        show:''
      }
  },
  mounted(){
  },
  methods:{
    submit:function () {
      var vm = this;
      if(vm.Keypair===null){
        return;
      }
      else {
        sessionStorage.Keypair = vm.data.Keypair;
        console.log("sesion:::::"+sessionStorage.Keypair);
        vm.$http.post('api/kInfo',vm.data)
          .then((data, error)=>{
            // if(data.code!==1){
            //   return;
            // }
            vm.$router.push('/');
          })
      }
    },
    createAccount:function () {
      var vm = this;
      vm.$http.get('api/create')
        .then((data, error)=>{
            vm.Account_key = data.body.value
            console.log(vm.Account_key);
            vm.show = 'true'
        })
    },
    alert:function () {
      swal("Here's a message!", "It's pretty, isn't it?")
    }
  }


  //end
};
</script>
<style scoped>
/*@import url('/static/css/plugin/Materialize/materialize.css');*/
/*
.margin {
  margin: 0 !important;
}
.btn:hover {
  color: #fff;
}

.holder{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -12.5rem!important;
  margin-top: -16.5rem;
  width:25rem!important;
  overflow: hidden;
}
.input-field .prefix{
    top: 10px;;
}
.login-form{
  width: auto;;
}
.form-control{
  width: 80%;
}*/
.bg {
    position: absolute;
    width: 100%;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    background: url('/static/img/bg.jpg') no-repeat;
}
.account-show{
  padding: 0 15px 0 15px;
  word-break: break-all;
}
.login-form .footer-links{
  margin-top: -30px;
}
</style>
