<template>
  <!-- <div class="col-md-12">

    <ul class="topstats clearfix" style="display: block;" >
      <li class="arrow"></li>

      <li class="bkp bix abd col-xs-6 col-lg-2"  v-for="item in account_info">
        <h3 class="bis">
          {{item.balance}}
        </h3>
        <span v-if='item.asset_code==null' class="bit">XLM</span>
        <span v-else class="bit">{{item.asset_code}}</span>
      </li>

    </ul>

  </div> -->

    <div class="row">
        <div class="col-sm-6 col-lg-3"  v-for="item in account_info">
            <div class="widget-bg-color-icon card-box">
                <div class="bg-icon bg-icon-green pull-left">
                  <span v-if='item.asset_code==null' class="bit">XLM</span>
                  <span v-else class="bit">{{item.asset_code}}</span>
                </div>
                <div class="text-right">
                    <h3 class="text-dark"><b class="counter">{{item.balance}}</b></h3>
                    <p class="text-muted"></p>
                </div>
                <div class="clearfix"></div>
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
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

export default{
  data(){
      return{
        account_info:[],
        card_color:[
          'bg-icon-green',
          'bg-icon-blue',
          'bg-icon-red',
          'bg-icon-purple'
        ]
      }
  },
  mounted(){
    var vm = this,balance_obj;
    console.log(sessionStorage.Keypair);
    var accountId = StellarSdk.Keypair
          .fromSeed(sessionStorage.Keypair).accountId();
    var accounts = server.accounts().accountId(accountId);
    accounts.stream({
        onmessage: function(payment) {
          balance_obj = payment.balances.reverse();
          vm.account_info = balance_obj;
          for (var i = 0; i < balance_obj.length; i++) {
            var num = new Number(vm.account_info[i].balance);
            vm.account_info[i].balance = num.toFixed(2)
          }
          $(".loading").fadeOut(1150);
      },onerror: function(error) {
      }
    })
  },
  methods:{

  }

//end
};

</script>
