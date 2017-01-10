<template>
  <div class="col-md-12 col-lg-6 main">
   <section class="panel panel-widget clearfix">
    <p class="literal">这是你的公开地址。将此地址告诉其它用户，他们就可以给你付款。</p>
    <hr />
    <div class="address">
     <h4 class="box">
      <span class="font-w-400 font-title">{{public_key}}</span>
    </h4>
     <button class="btn btn-primary">复制钱包地址</button>
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
var StellarSdk = require('stellar-sdk')
export default{
  data(){
    return {
      public_key:StellarSdk.Keypair.fromSeed(sessionStorage.Keypair).accountId()
    }
  },
  methods:{

  }
}
</script>
