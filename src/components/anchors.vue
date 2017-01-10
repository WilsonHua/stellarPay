<template>
  <div class="content">

    <div class="row">
      <div class="col-lg-12">
      <div class="panel panel-widget transfer-box clearfix">
            <div class="panel-title">
                添加锚点
                <!-- <ul class="panel-tools">
                  <li><a class="icon"><i class="fa fa-refresh"></i></a></li>
                  <li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li>
                </ul> -->
            </div>
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
                        <a href="javascript:void(0);" class="btn btn-primary" v-on:click="add_trust">确认添加</a>
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
                    <td>资产名字</td>
                    <td>余额</td>
                    <td>上限</td>
                    <td></td>
                </tr>
              </thead>
              <tr v-for="item in anchors_info">
                  <td>{{item.asset_issuer}}</td>
                  <td>{{item.asset_code}}</td>
                  <td>{{item.balance}}</td>
                  <td>{{item.limit}}</td>
                  <td><a v-if='item.balance == 0' class="btn-xs btn-danger">删除</a></td>
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
// const sourceAcoount = StellarSdk.Keypair
//       .fromSeed(sessionStorage.Keypair).accountId();
export default{
  data(){
      return{
        trust_data:{
          asset_issuer:'',
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
        .then((data, error)=>{
          if(data.body.code === 1){
            swal("操作成功!", "您已成功添加锚点！", "success");
            vm.$set(vm.trust_data,{})
            vm.load_trust_list()
          }
          else if(data.body.message.status === 400){
            swal("操作失败!", "提交失败，请检查填写是否正确", "error")
          }
          else {
            vm.show = true;
            swal("操作失败!", data.body.message || data.body.message.errno, "error")
            console.info(data.body.message)
          }

        })
    },
    load_trust_list () {
      var vm = this;
      vm.$http.get('api/loadAccount')
        .then((doneCallbacks, failCallbacks)=>{
            var anchor_obj = doneCallbacks.body.value.balances
            vm.anchors_info = anchor_obj
            for (var i = 0; i < anchor_obj.length; i++) {
              var num = new Number(vm.anchors_info[i].balance);
              var num1 = new Number(vm.anchors_info[i].limit);
              vm.anchors_info[i].balance = Math.floor(num * 100) / 100 ;
              vm.anchors_info[i].limit = Math.floor(num1 * 100) / 100 ;
            }
            vm.anchors_info.pop();
        })
    }
  }
};
</script>
