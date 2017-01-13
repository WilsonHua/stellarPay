<template>
  <div class="col-md-12 col-lg-6 main">
   <section class="panel panel-widget clearfix">
    <p class="literal">这是你的公开地址。将此地址告诉其它用户，他们就可以给你付款。</p>
    <hr />
    <div class="address">
     <h4 class="box">
      <span class="font-w-400 font-title" id="pk">{{public_key}}</span>
    </h4>
     <button class="btn btn-primary" v-on:click="copyText">复制钱包地址</button>
    </div>
    <br>
    <p class="literal">提示：扫描下方二维码，可快速进行支付。</p>
    <div class="qr">
     <img src='/static/img/qrcode.png'>
    </div>

   </section>
  </div>
</template>

<script>

export default{
  data(){
    return {
      public_key:''
    }
  },
  mounted(){
    var vm = this;
    const StellarSdk = require('stellar-sdk')
    const server = new StellarSdk.Server('https://horizon.stellar.org');
    const sourceKeys =StellarSdk.Keypair.fromSeed(sessionStorage.Keypair);
    const sourceAccount = StellarSdk.Keypair
          .fromSeed(sessionStorage.Keypair).accountId();

    vm.public_key = sourceAccount
  },
  methods:{
    copyText(){
        // var Url2=document.getElementById("pk");
        // Url2.select(); // 选择对象
        // document.execCommand("Copy"); // 执行浏览器复制命令
        // alert("ok");
    }
  }
}
</script>
