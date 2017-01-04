<template>
  <!-- Start Row -->
  <div class="row">
    <!-- Start Panel -->
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-title">
          DAtaTables
        </div>
        <div class="panel-body table-responsive">

            <table id="example0" class="table display">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                    </tr>
                </thead>

                <tfoot>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                    </tr>
                </tfoot>

                <tbody>
                    <tr v-for="item in effects_info">
                        <td>{{item.type}}</td>
                        <td>+{{item.amount}} {{item.asset_code}}</td>
                        <td>{{item.from}}</td>
                        <td>61</td>
                        <td>2011/04/25</td>
                    </tr>
                </tbody>
            </table>


        </div>

      </div>
    </div>
    <!-- End Panel -->
  </div>
</template>

<script>
var StellarSdk = require('stellar-sdk')
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  export default {
    data(){
        return{
          effects_info:[],
        }
    },
    mounted(){
      var vm = this;
      vm.stream_effects();
      setTimeout(function () {
        vm.history_render();
      },5000);
      //end
    },
    methods:{
      history_render:function () {
        $('#example0').DataTable();
          var table = $('#example').DataTable({
              "columnDefs": [
                  { "visible": false, "targets": 2 }
              ],
              "order": [[ 2, 'asc' ]],
              "displayLength": 25,
              "drawCallback": function ( settings ) {
                  var api = this.api();
                  var rows = api.rows( {page:'current'} ).nodes();
                  var last=null;

                  api.column(2, {page:'current'} ).data().each( function ( group, i ) {
                      if ( last !== group ) {
                          $(rows).eq( i ).before(
                              '<tr class="group"><td colspan="5">'+group+'</td></tr>'
                          );

                          last = group;
                      }
                  } );
              }
          } );

          // Order by the grouping
          $('#example tbody').on( 'click', 'tr.group', function () {
              var currentOrder = table.order()[0];
              if ( currentOrder[0] === 2 && currentOrder[1] === 'asc' ) {
                  table.order( [ 2, 'desc' ] ).draw();
              }
              else {
                  table.order( [ 2, 'asc' ] ).draw();
              }
          } );
      },
      stream_effects:function () {
        //初始化函数
        var account_id = 'GBS7IAXICCZ62XLYKVFDYG7TLLIARICSWF47QJKRNMUOZVBP24D47X4B';
        var payments = server.payments().order('desc').forAccount(account_id);
        var arr = new Array();
        var vm = this;
        payments.stream({
              onmessage: function(payment) {
                // Record the paging token so we can start from here next time.

                // The payments stream includes both sent and received payments. We only
                // want to process received payments here.
                if (payment.to !== account_id) {
                  return;
                }

                // In Stellar’s API, Lumens are referred to as the “native” type. Other
                // asset types have more detailed information.
                var asset;
                if (payment.asset_type === 'native') {
                    asset = 'lumens';
                }
                else {
                    asset = payment.asset_code;
                }
                var num = new Number(payment.amount)
                var effects_code = {
                  type        : payment.type,
                  amount      : num.toFixed(2),
                  asset_code  : asset,
                  from        : payment.from
                }

                // console.log(payment.amount + ' ' + asset + ' from ' + payment.from);
                arr.push(effects_code);
                vm.effects_info = arr;
              },
              onerror: function(error) {

              }
        });
      }
    }
//end
}
</script>
