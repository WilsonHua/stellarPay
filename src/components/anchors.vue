<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12">
      <div class="panel panel-widget transfer-box clearfix">
            <div class="panel-title">
                Add Anchor
                <!-- <ul class="panel-tools">
                  <li><a class="icon"><i class="fa fa-refresh"></i></a></li>
                  <li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li>
                </ul> -->
            </div>
            <div>
              <div id="anchor-page">
                  <div>
                    <h1>Anchors</h1>
                    <hr>
                    <h2>Add a new anchor</h2>
                    <form>
                        <div class="form-group">
                            <label>Anchor</label>
                            <span class="small"></span>
                            <input type="text" class="form-control" v-model='trust_data.asset_issuer' placeholder="Domain name, Stellar address, or account ID">
                        </div>
                        <div>
                            <div class="form-group">
                                <label>Asset Name</label>
                                <input type="text" class="form-control"  v-model='trust_data.asset_code'>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Limit</label>
                            <input type="text" class="form-control" v-model='trust_data.limit'>
                        </div>
                        <a href="javascript:void(0);" class="btn btn-primary" v-on:click="add_trust">Connect to Anchor</a>
                    </form>
                  </div>
              </div>
            </div>
        </div>
    </div>
      <div class="col-lg-12">
      <div class="panel panel-widget transfer-box clearfix">
          <h2>Connected anchors</h2>
          <hr>
          <table class="table">
              <thead>
                <tr>
                    <td>Issuer</td>
                    <td>Asset Name</td>
                    <td>Balance</td>
                    <td>Limit</td>
                    <td></td>
                </tr>
              </thead>
              <tr v-for="item in anchors_info">
                  <td>{{item.asset_issuer}}</td>
                  <td>{{item.asset_code}}</td>
                  <td>{{item.balance}}</td>
                  <td>{{item.limit}}</td>
                  <td class="link"></td>
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
var sourceAcoount = 'GBS7IAXICCZ62XLYKVFDYG7TLLIARICSWF47QJKRNMUOZVBP24D47X4B';
export default{
  data(){
      return{
        trust_data:{
          asset_issuer:'GBOZNGDT2QUGMKTIAQIV3KIFB32ZK77Z2US7EXI6E2SPUP6MDJ5XMGLG',
          asset_code:'',
          limit:'',
        },
        anchors_info:[]
    }
  },
  mounted(){
    var vm = this;
    this.load_trust_list()
  },
  methods:{
    add_trust () {
      var vm = this;
      vm.$http.post('api/changeTrust',vm.trust_data)
        .then((doneCallbacks, failCallbacks)=>{
            vm.$set(vm.trust_data,{})
            vm.load_trust_list()
        })
    },
    load_trust_list () {
      var vm = this;
      vm.$http.get('api/loadAccount')
        .then((doneCallbacks, failCallbacks)=>{
            vm.anchors_info = doneCallbacks.body.value.balances
        })
    }
  }
};
</script>
