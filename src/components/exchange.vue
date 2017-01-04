<template>
  <div class="row">
    <div class="content">
      <div class="row">
        <div class="col-lg-12">
      <div class="panel panel-widget transfer-box clearfix">
        <!-- <div class="panel-title">
            Add Anchor
        </div> -->
        <div>
        <div ng-view="" class="ng-scope"><div id="trade-page" class="ng-scope">
            <div>
                <h1>Distributed trade</h1>
                <hr>
                <!-- ngIf: assets.length == 0 -->
                <!-- ngIf: assets.length > 0 --><div ng-if="assets.length > 0" class="ng-scope">
                    <div class="row" id="trade-top-row">
                        <div class="col-lg-6">
                            <h2>Assets</h2>
                            <div class="trade-top-limit">
                                <ul id="balances">
                                    <li class="line">
                                        <span class="asset">XLM</span>
                                        <span class="balance ng-binding">52.00</span>
                                    </li>
                                    <!-- ngRepeat: asset in balances.assets --><!-- ngIf: asset.balance > 0 --><li class="line ng-scope" ng-repeat="asset in balances.assets" ng-if="asset.balance > 0">
                                        <span class="asset ng-binding">aaa</span>
                                        <span class="balance ng-binding">300.00</span>
                                        <!-- ngIf: !asset.isNative --><ul class="issuer-lines ng-scope" ng-if="!asset.isNative">
                                            <!-- ngRepeat: issuer in asset.issuers --><!-- ngIf: issuer.balance > 0 --><li class="issuer-line ng-scope" ng-repeat="issuer in asset.issuers" ng-if="issuer.balance > 0">
                                                <span class="issuer-balance ng-binding">300.00</span>
                                                <span class="issuer-name ng-binding">hua2</span>
                                            </li><!-- end ngIf: issuer.balance > 0 --><!-- end ngRepeat: issuer in asset.issuers -->
                                        </ul><!-- end ngIf: !asset.isNative -->
                                    </li><!-- end ngIf: asset.balance > 0 --><!-- end ngRepeat: asset in balances.assets -->
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" data-target="#orders"><h2>Open orders</h2></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" data-target="#history"><h2>Recent history</h2></a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane trade-top-limit active" id="orders">
                                    <table class="table table-orders">
                                        <thead>
                                        <tr>
                                            <th colspan="2">Selling</th>
                                            <th colspan="2">Price</th>
                                            <th colspan="2">You Get</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <!-- ngRepeat: offer in books.my | orderBy: 'selling.asset_code' --><tr ng-repeat="offer in books.my | orderBy: 'selling.asset_code'" class="ng-scope">
                                            <td class="ng-binding">1.00</td>
                                            <td class="ng-binding">aaa</td>
                                            <td class="ng-binding">1.0000</td>
                                            <td class="ng-binding">XLM</td>
                                            <td class="ng-binding">1.00</td>
                                            <td class="ng-binding">XLM</td>
                                            <td class="link"><a ng-click="removeOffer(offer);"><i class="fa fa-trash"></i></a></td>
                                        </tr><!-- end ngRepeat: offer in books.my | orderBy: 'selling.asset_code' --><tr ng-repeat="offer in books.my | orderBy: 'selling.asset_code'" class="ng-scope">
                                            <td class="ng-binding">12.00</td>
                                            <td class="ng-binding">aaa</td>
                                            <td class="ng-binding">2.0000</td>
                                            <td class="ng-binding">XLM</td>
                                            <td class="ng-binding">24.00</td>
                                            <td class="ng-binding">XLM</td>
                                            <td class="link"><a ng-click="removeOffer(offer);"><i class="fa fa-trash"></i></a></td>
                                        </tr><!-- end ngRepeat: offer in books.my | orderBy: 'selling.asset_code' -->
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane trade-top-limit" id="history">
                                    <table class="table table-history">
                                        <thead>
                                            <tr>
                                                <th colspan="2">Sold</th>
                                                <th colspan="2">Price</th>
                                                <th colspan="2">Bought</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- ngRepeat: trade in books.trades -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <h2>Market</h2>
                    <div class="row">
                        <div class="col-lg-2">
                            <label class="small">Asset</label>
                            <select class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" ng-options="assetLine as assetLine.name for assetLine in assets track by assetLine.name" ng-model="trade.asset" ng-change="trade.issuer = trade.asset.issuers[0]; onAssetChange();"><option value="" class="">XLM</option><option label="aaa" value="aaa" selected="selected">aaa</option></select>
                        </div>
                        <div class="col-lg-4">
                            <label class="small">Issuer</label>
                            <select class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" ng-options="issuer as issuer.name for issuer in trade.asset.issuers track by issuer.issuerId" ng-model="trade.issuer" ng-disabled="!trade.asset || trade.asset.isNative" ng-change="onAssetChange();"><option label="hua2" value="GCZIGLMLVFD6GRGP6LF3W6A2QXNBWMELDVE5WUUKVCHAXIIXIEB3GFE2" selected="selected">hua2</option></select>
                        </div>
                        <div class="col-lg-2">
                            <label class="small">Counter Asset</label>
                            <select class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" ng-options="assetLine as assetLine.name for assetLine in assets track by assetLine.name" ng-model="trade.counterAsset" ng-change="trade.counterIssuer = trade.counterAsset.issuers[0];onAssetChange();"><option value="" class="" selected="selected">XLM</option><option label="aaa" value="aaa">aaa</option></select>
                        </div>
                        <div class="col-lg-4">
                            <label class="small">Issuer</label>
                            <select class="form-control ng-pristine ng-untouched ng-valid ng-empty" ng-options="issuer as issuer.name for issuer in trade.counterAsset.issuers track by issuer.issuerId" ng-model="trade.counterIssuer" ng-disabled="!trade.counterAsset || trade.counterAsset.isNative" ng-change="onAssetChange();" disabled="disabled"><option value="?" selected="selected"></option></select>
                        </div>
                    </div>
                    <!-- ngIf: isValidMarket(); --><div ng-if="isValidMarket();" class="ng-scope">
                        <div class="row">
                            <div class="col-lg-12">
                                <div id="market-name-wrapper">
                                    <div id="market-name" class="text-lg-center ng-binding">aaa/XLM</div>
                                    <div id="market-description">
                                        <div class="left ng-binding">
                                            (hua2)
                                        </div>
                                        <div class="right ng-binding">
                                            (Stellar)
                                        </div>
                                    </div>
                                    <div id="swap-arrows" class="link text-lg-center"><a ng-click="swapAssets();"><i class="fa fa-arrows-h"></i></a></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-8">
                                <h2>Depth</h2>
                                <div id="trade-graph-area" ng-controller="tradeGraphCtrl" class="ng-scope">
                                    <div id="trade-graph" class="js-plotly-plot"><div class="plot-container plotly"><div class="svg-container" style="position: relative; width: 596.656px; height: 500px;"><svg class="main-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="596.656" height="500" style="background: rgb(255, 255, 255);"><defs id="defs-4cd2f8"><g class="clips"><clipPath class="axesclip" id="clip4cd2f8x"><rect x="60" y="0" width="477" height="500"></rect></clipPath><clipPath class="axesclip" id="clip4cd2f8y"><rect x="0" y="20" width="596.656" height="400"></rect></clipPath><clipPath class="axesclip" id="clip4cd2f8xy"><rect x="60" y="20" width="477" height="400"></rect></clipPath><clipPath class="axesclip" id="clip4cd2f8y2"><rect x="0" y="20" width="596.656" height="400"></rect></clipPath><clipPath class="axesclip" id="clip4cd2f8xy2"><rect x="60" y="20" width="477" height="400"></rect></clipPath><clipPath class="plotclip" id="clip4cd2f8xyplot"><rect width="477" height="400"></rect></clipPath><clipPath class="plotclip" id="clip4cd2f8xy2plot"><rect width="477" height="400"></rect></clipPath></g></defs><g class="draglayer"><g transform="translate(60,20)"><rect class="drag nsewdrag cursor-pointer" data-subplot="xy" x="0" y="0" width="477" height="400" style="fill: transparent; stroke-width: 0; pointer-events: all;"></rect><rect class="drag nwdrag cursor-pointer" data-subplot="xy" x="-20" y="-20" width="20" height="20" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag nedrag cursor-pointer" data-subplot="xy" x="477" y="-20" width="20" height="20" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag swdrag cursor-pointer" data-subplot="xy" x="-20" y="400" width="20" height="20" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag sedrag cursor-pointer" data-subplot="xy" x="477" y="400" width="20" height="20" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag ewdrag cursor-pointer" data-subplot="xy" x="47.7" y="415.5" width="381.6" height="20" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag wdrag cursor-pointer" data-subplot="xy" x="0" y="415.5" width="47.7" height="20" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag edrag cursor-pointer" data-subplot="xy" x="429.3" y="415.5" width="47.7" height="20" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag nsdrag cursor-pointer" data-subplot="xy" x="-35.5" y="40" width="20" height="320" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag sdrag cursor-pointer" data-subplot="xy" x="-35.5" y="360" width="20" height="40" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag ndrag cursor-pointer" data-subplot="xy" x="-35.5" y="0" width="20" height="40" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect></g><g transform="translate(60,20)"><rect class="drag nsdrag cursor-pointer" data-subplot="xy2" x="492.5" y="40" width="20" height="320" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag sdrag cursor-pointer" data-subplot="xy2" x="492.5" y="360" width="20" height="40" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect><rect class="drag ndrag cursor-pointer" data-subplot="xy2" x="492.5" y="0" width="20" height="40" style="fill: transparent; stroke-width: 0; pointer-events: none;"></rect></g></g><g class="layer-below"><g class="imagelayer"></g><g class="shapelayer"></g></g><g class="subplot xy"><rect x="45" y="5" width="507" height="430" style="stroke-width: 0; fill: rgb(255, 255, 255); fill-opacity: 1;"></rect><g class="layer-subplot"><g class="shapelayer"></g><g class="imagelayer"></g></g><g transform="translate(60,20)"><path class="xgrid crisp" d="M0,0v400" transform="translate(119.25,0)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="xgrid crisp" d="M0,0v400" transform="translate(238.5,0)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="xgrid crisp" d="M0,0v400" transform="translate(357.75,0)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="ygrid crisp" d="M0,0h477" transform="translate(0,338.46)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="ygrid crisp" d="M0,0h477" transform="translate(0,276.92)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="ygrid crisp" d="M0,0h477" transform="translate(0,215.38)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="ygrid crisp" d="M0,0h477" transform="translate(0,153.85)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="ygrid crisp" d="M0,0h477" transform="translate(0,92.31)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="ygrid crisp" d="M0,0h477" transform="translate(0,30.77)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path></g><g><g transform="translate(60,20)"><path class="xgrid crisp" d="M0,0v400" transform="translate(119.25,0)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="xgrid crisp" d="M0,0v400" transform="translate(238.5,0)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="xgrid crisp" d="M0,0v400" transform="translate(357.75,0)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="y2grid crisp" d="M0,0h477" transform="translate(0,338.46)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="y2grid crisp" d="M0,0h477" transform="translate(0,276.92)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="y2grid crisp" d="M0,0h477" transform="translate(0,215.38)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="y2grid crisp" d="M0,0h477" transform="translate(0,153.85)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="y2grid crisp" d="M0,0h477" transform="translate(0,92.31)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path><path class="y2grid crisp" d="M0,0h477" transform="translate(0,30.77)" style="stroke: rgb(238, 238, 238); stroke-opacity: 1; stroke-width: 1px;"></path></g></g><g transform="translate(60,20)"><path class="yzl zl crisp" d="M0,0h477" transform="translate(0,400)" style="stroke: rgb(68, 68, 68); stroke-opacity: 1; stroke-width: 1px;"></path></g><g><g transform="translate(60,20)"><path class="y2zl zl crisp" d="M0,0h477" transform="translate(0,400)" style="stroke: rgb(68, 68, 68); stroke-opacity: 1; stroke-width: 1px;"></path></g></g><g transform="translate(60, 20)" clip-path="url(https://www.ecliptic.co/user/trade#clip4cd2f8xyplot)"><g class="imagelayer"></g><g class="maplayer"></g><g class="barlayer"></g><g class="boxlayer"></g><g class="scatterlayer"><g class="trace scatter trace0bbc93" style="stroke-miterlimit: 2; opacity: 1;"><path class="js-line" d="M238.5,400L238.5,369.23L477,369.23L477,0" style="vector-effect: non-scaling-stroke; fill: none; stroke: rgb(227, 73, 73); stroke-opacity: 1; stroke-width: 2px; opacity: 1;"></path></g></g></g><g><g transform="translate(60, 20)" clip-path="url(https://www.ecliptic.co/user/trade#clip4cd2f8xy2plot)"><g class="imagelayer"></g><g class="maplayer"></g><g class="barlayer"></g><g class="boxlayer"></g><g class="scatterlayer"></g></g></g><path class="crisp" transform="translate(60,20)" d="M-16,415.5h509" style="fill: none; stroke-width: 1px; stroke: rgb(0, 0, 0); stroke-opacity: 0;"></path><path class="crisp" transform="translate(60,20)" d="M-15.5,-16v431" stroke-width="1px" style="fill: none; stroke: rgb(0, 0, 0); stroke-opacity: 0;"></path><g><path class="crisp" transform="translate(60,20)" d="M0,0" style="fill: none; stroke-width: 1px; stroke: rgb(0, 0, 0); stroke-opacity: 0;"></path><path class="crisp" transform="translate(60,20)" d="M492.5,-16v432" stroke-width="1px" style="fill: none; stroke: rgb(0, 0, 0); stroke-opacity: 0;"></path></g><g transform="translate(60,20)"><g class="xtick" data-bb="3226"><text text-anchor="middle" x="0" y="428" transform="translate(0,0)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;" data-bb="3220">0</text></g><g class="xtick" data-bb="3227"><text text-anchor="middle" x="0" y="428" transform="translate(119.25,0)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;" data-bb="3221">0.5</text></g><g class="xtick" data-bb="3228"><text text-anchor="middle" x="0" y="428" transform="translate(238.5,0)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;" data-bb="3222">1</text></g><g class="xtick" data-bb="3229"><text text-anchor="middle" x="0" y="428" transform="translate(357.75,0)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;" data-bb="3223">1.5</text></g><g class="xtick" data-bb="3230"><text text-anchor="middle" x="0" y="428" transform="translate(477,0)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;" data-bb="3224">2</text></g></g><g transform="translate(60,20)"><g class="ytick" data-bb="3233"><text text-anchor="end" x="-17" y="5.5" transform="translate(0,400)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">0</text></g><g class="ytick" data-bb="3234"><text text-anchor="end" x="-17" y="5.5" transform="translate(0,338.46)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">2</text></g><g class="ytick" data-bb="3235"><text text-anchor="end" x="-17" y="5.5" transform="translate(0,276.92)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">4</text></g><g class="ytick" data-bb="3236"><text text-anchor="end" x="-17" y="5.5" transform="translate(0,215.38)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">6</text></g><g class="ytick" data-bb="3237"><text text-anchor="end" x="-17" y="5.5" transform="translate(0,153.85)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">8</text></g><g class="ytick" data-bb="3238"><text text-anchor="end" x="-17" y="5.5" transform="translate(0,92.31)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">10</text></g><g class="ytick" data-bb="3239"><text text-anchor="end" x="-17" y="5.5" transform="translate(0,30.77)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">12</text></g></g><g><g transform="translate(60,20)"></g><g transform="translate(60,20)"><g class="y2tick" data-bb="3241"><text text-anchor="start" x="494" y="5.5" transform="translate(0,400)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">0</text></g><g class="y2tick" data-bb="3242"><text text-anchor="start" x="494" y="5.5" transform="translate(0,338.46)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">2</text></g><g class="y2tick" data-bb="3243"><text text-anchor="start" x="494" y="5.5" transform="translate(0,276.92)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">4</text></g><g class="y2tick" data-bb="3244"><text text-anchor="start" x="494" y="5.5" transform="translate(0,215.38)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">6</text></g><g class="y2tick" data-bb="3245"><text text-anchor="start" x="494" y="5.5" transform="translate(0,153.85)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">8</text></g><g class="y2tick" data-bb="3246"><text text-anchor="start" x="494" y="5.5" transform="translate(0,92.31)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">10</text></g><g class="y2tick" data-bb="3247"><text text-anchor="start" x="494" y="5.5" transform="translate(0,30.77)" style="font-family: 'Work Sans', sans-serif; font-size: 11px; fill: rgb(51, 51, 51); fill-opacity: 1; visibility: visible; white-space: pre;">12</text></g></g></g></g><g class="subplot xy2"></g><g class="ternarylayer"></g><g class="layer-above"><g class="imagelayer"></g><g class="shapelayer"></g></g><g class="pielayer"></g><g class="glimages"></g><g class="geoimages"></g><text class="js-plot-link-container" y="491" text-anchor="end" x="589.656" style="font-family: 'Open Sans', Arial, sans-serif; font-size: 12px; fill: rgb(68, 68, 68); pointer-events: all;"><tspan class="js-link-to-tool"></tspan><tspan class="js-link-spacer"></tspan><tspan class="js-sourcelinks"></tspan></text></svg><div class="gl-container"></div><div class="geo-container"></div><svg class="main-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="596.656" height="500"><defs id="topdefs-4cd2f8"></defs><g class="infolayer"><g class="g-gtitle"></g><g class="g-xtitle" data-bb="3231"><text class="xtitle" data-unformatted="Price (XLM)" x="298.5" y="469" text-anchor="middle" style="font-family: 'Work Sans', sans-serif; font-size: 13px; fill: rgb(51, 51, 51); opacity: 1; font-weight: normal; white-space: pre; visibility: visible;">Price (XLM)</text></g><g class="g-ytitle" data-bb="3232"><text class="ytitle" data-unformatted="Sum (aaa)" transform="rotate(-90,24,220) translate(0, 0)" x="24" y="220" text-anchor="middle" style="font-family: 'Work Sans', sans-serif; font-size: 13px; fill: rgb(51, 51, 51); opacity: 1; font-weight: normal; white-space: pre; visibility: visible;">Sum (aaa)</text></g><g class="g-y2title" data-bb="3240"></g></g><g class="zoomlayer"></g><g class="hoverlayer"></g></svg></div></div></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <h2>Place an Order</h2>
                                <div class="trade-direction">
                                    <a class="btn btn-secondary btn-block dropdown-toggle ng-binding" data-toggle="dropdown">
                                        Selling
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" ng-click="onTradeDirectionChanged('Buy');">Buying</a>
                                        <a class="dropdown-item" ng-click="onTradeDirectionChanged('Sell');">Selling</a>
                                    </div>
                                </div>
                                <form class="ng-pristine ng-valid">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="text" class="form-control ng-pristine ng-untouched ng-valid ng-empty" ng-model="trade.actionAmount" ng-change="onOrderChanged();">
                                            <span class="input-group-addon ng-binding">aaa</span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Price</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control ng-pristine ng-untouched ng-valid ng-empty" ng-model="trade.price" ng-change="onOrderChanged();">
                                            <span class="input-group-addon ng-binding">XLM</span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <!-- ngIf: trade.direction == 'Buy' -->
                                        <!-- ngIf: trade.direction == 'Sell' --><label ng-if="trade.direction == 'Sell'" class="ng-scope">You Get</label><!-- end ngIf: trade.direction == 'Sell' -->
                                        <div class="input-group">
                                            <input type="text" class="form-control ng-pristine ng-untouched ng-valid ng-empty" ng-regex="[0-9.]*" ng-model="trade.consequenceAmount" disabled="disabled">
                                            <span class="input-group-addon ng-binding">XLM</span>
                                        </div>
                                    </div>
                                    <button class="btn btn-primary btn-block ng-binding" ng-click="placeOrder();" ng-disabled="!(trade.actionAmount > 0 &amp;&amp; trade.price > 0) || isPlacingOrder" disabled="disabled">
                                        Sell
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Value<br><small class="ng-binding">XLM</small></th>
                                            <th>Amount<br><small class="ng-binding">aaa</small></th>
                                            <th>Bid<br><small class="ng-binding">XLM</small></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- ngRepeat: bid in books.bids -->
                                </tbody></table>
                            </div>
                            <div class="col-lg-6">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Ask<br><small class="ng-binding">XLM</small></th>
                                            <th>Amount<br><small class="ng-binding">aaa</small></th>
                                            <th>Value<br><small class="ng-binding">XLM</small></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- ngRepeat: ask in books.asks --><tr ng-repeat="ask in books.asks" class="ng-scope">
                                            <td class="ng-binding">1.0000</td>
                                            <td class="ng-binding">1</td>
                                            <td class="ng-binding">1.00</td>
                                        </tr><!-- end ngRepeat: ask in books.asks --><tr ng-repeat="ask in books.asks" class="ng-scope">
                                            <td class="ng-binding">2.0000</td>
                                            <td class="ng-binding">12</td>
                                            <td class="ng-binding">24.00</td>
                                        </tr><!-- end ngRepeat: ask in books.asks -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div><!-- end ngIf: isValidMarket(); -->
                </div><!-- end ngIf: assets.length > 0 -->
            </div>
        </div></div>
        </div>

        <!-- end -->
      </div>
    </div>
      </div>
  </div>
  </div>
</template>

<script>
export default{
  data(){
      return{
      }
  },
  mounted(){

  },
  methods:{

  }
};
</script>
