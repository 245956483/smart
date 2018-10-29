
/*

  SmartClient Ajax RIA system
  Version v8.2p_2012-10-08/EVAL Development Only (2012-10-08)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

if(window.isc&&window.isc.module_Core&&!window.isc.module_Charts){isc.module_Charts=1;isc._moduleStart=isc._Charts_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log && isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={ message:'Charts load/parse time: ' + (isc._moduleStart-isc._moduleEnd) + 'ms', category:'loadTime'};
if(isc.Log && isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime')
else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM
else isc._preLog=[isc._pTM]}isc.definingFramework=true;isc.ClassFactory.defineInterface("Chart").addInterfaceMethods({valueProperty:"_value",metricFacetId:"metric",stacked:false,isStacked:function(){return this.stacked},chartType:"Column",threeD:true,animateValuesOnShow:true,labelValues:false,setupChart:function(){if(this.facets!=null&&!isc.isAn.Array(this.facets)){this.facets=[this.facets]}
var _1=this.inlinedFacet=this.facets.find("inlinedValues",true);if(_1)_1.id=_1.id||"inlined";this.metricFacet=null;for(var i=0;i<this.facets.length;i++){var _3=this.facets[i];if(_3.id==this.metricFacetId)this.metricFacet=_3;this.deriveFacetValues(_3);_3.valueIds=_3.values.getProperty("id")}
if(!this.data)return},getFacetData:function(){if(this.facetData&&this.data==this.$78u)return this.facetData;var _1=this.data;if(!isc.isAn.Array(_1))return _1;var _2=[];for(var i=0;i<_1.length;i++){var _4=_1[i],_5=true;for(var j=0;j<this.facets.length;j++){var _7=this.facets[j];if(_7==this.inlinedFacet||_7.autoDerived)continue;if(!_7.valueIds.contains(_4[_7.id])){_5=false;break}}
if(_5)_2.add(_4)}
this.$78u=_1;return(this.facetData=_2)},deriveFacetValues:function(_1){if(_1.values&&!_1.autoDerived)return;var _2=_1.id,_3=[];for(var i=0;i<this.data.getLength();i++){var _5=this.data.get(i)[_2];if(!_3.find("id",_5)){_3.add({id:_5,title:_5})}}
_1.autoDerived=true;_1.values=_3},getFacet:function(_1){return this.facets.find("id",_1)},getFacetValue:function(_1,_2){var _3=this.getFacet(_1);if(_3)return _3.values.find("id",_2)},isMultiFacet:function(){return this.facets.length>(this.metricFacet!=null?2:1)},getValue:function(_1,_2){var _3=this.getFacetData();if(_3==null)return null;_1=_1||{};if(_2==null)_2=this.multiCellData;var _4=this.getDataRecord(_1,_2);if(!_4)return null;return this.getValueFromRecord(_4,_1,_2)},getValueFromRecord:function(_1,_2,_3){if(_1==null)return null;if(!this.metricFacet){if(!this.inlinedFacet||(_2&&_2[this.inlinedFacet.id]!=null)){var _4=this.inlinedFacet?_2[this.inlinedFacet.id]:this.valueProperty;return _3?_1.getProperty(_4).map(parseFloat):parseFloat(_1[_4])}
var _5=isc.isAn.Array(_1)?_1:[_1],_6=[],_7=this.inlinedFacet.valueIds;for(var i=0;i<_5.length;i++){for(var j=0;j<_7.length;j++){_6.add(parseFloat(_5[i][_7[j]]))}}
if(!_3&&_6.length<2)return _6[0];else return _6}else{if(!this.inlinedFacet||this.metricFacetId!=this.inlinedFacet.id){this.logWarn("the metric facet must be an inlined facet");return null}
var _10=_2[this.metricFacet.id];if(!_10)_10=this.getDefaultMetric();return _3?_1.getProperty(_10).map(parseFloat):parseFloat(_1[_10])}},getDataRecord:function(_1,_2){var _3=this.getFacetData();if(!isc.isAn.Array(_3))return _3;if(_2==null)_2=this.multiCellData;if(!this.inlinedFacet){return _2?_3.findAll(_1):_3.find(_1)}
var _4=isc.addProperties({},_1);delete _4[this.inlinedFacet.id];return _2?_3.findAll(_4):_3.find(_4)},getDataSeries:function(_1,_2){var _3=isc.isAn.Object(_1)?_1:this.facets.find("id",_1);if(_2==null){_2={}}if(!isc.isAn.Object(_2)){var _4=_2;var _5=(_3==this.facets[0]?this.facets[1]:this.facets[0]);_2={};_2[_5.id]=_4}else{_2=isc.addProperties({},_2)}
var _6=[];for(var i=0;i<_3.values.length;i++){var _8=_3.values[i];_2[_3.id]=_8.id;var _9=this.getDataRecord(_2),_10=this.getValueFromRecord(_9,_2);_6.add({facetValueId:_8.id,title:_8.title||_8.id,value:_10,record:_9})}
return _6},getDefaultMetric:function(){return this.metricFacet?this.metricFacet.values.first().id:this.valueProperty},getMinValue:function(_1,_2){return this.getMaxValue(_1,_2,false)},getMaxValue:function(_1,_2,_3){if(_3==null)_3=true;if(!_1)_1=this.getDefaultMetric();var _4;if(_3){_4=this.cachedMaxValues=this.cachedMaxValues||{}}else{_4=this.cachedMinValues=this.cachedMinValues||{}}
if(!_2&&_4[_1]!=null)return _4[_1];var _5=0;if(this.isMultiFacet()){var _6=this.facets[1],_7=this.facets[0],_8={};if(this.metricFacet)_8[this.metricFacet.id]=_1;for(var i=0;i<_7.values.length;i++){_8[_7.id]=_7.values[i].id;var _10=this.getDataSeries(_6,_8),_11=_10.getProperty("value");_5=Math.max(_5,this.isStacked()?_11.sum():(_3?_11.max():_11.min()))}
return(_4[_1]=_5)}else{var _12=null;if(this.metricFacet){_12={};_12[this.metricFacet.id]=_1}
var _11=this.getValue(_12,true);if(_11==null)return;return(_4[_1]=(_3?_11.max():_11.min()))}},setData:function(){}});isc.A=isc.Chart;isc.A.allChartTypes=[];if(isc.Flashlet){isc.ClassFactory.defineClass("FusionChart","Flashlet","Chart");isc.A=isc.FusionChart;isc.A.allChartTypes=["Area","Bar","Column","Pie","Doughnut","Line","Radar"];isc.A.singleSeriesChartTypes=["Area","Bar","Column","Pie","Doughnut","Line"];isc.A.singleOnlyChartTypes=["Doughnut","Pie"];isc.A.multiSeriesChartTypes=["Area","Bar","Column","Line","Radar"];isc.A.multiOnlyChartTypes=["Radar"];isc.A.stackedChartTypes=["Area","Bar","Column"];isc.A.threeDChartTypes=["Column","Bar","Pie"];isc.A.needsDimension=["Column","Bar","Pie","Doughnut","Area"];isc.A=isc.FusionChart.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.overflow="hidden";isc.A.redrawOnResize=true;isc.A.chartsBaseURL=isc.Page.getIsomorphicDir()+"../FusionCharts/Charts/";isc.A.fusionVersion="3.0";isc.A.dataColors=["CCCCFF","CCCC99","FFCCCC","FFFF99","CCFF99","FFCC99","FF0000","00FF00","0000FF","FF00FF","FFFF00","00FFFF","000000"];isc.A.codeBase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";isc.A.pluginsPage="http://www.macromedia.com/go/getflashplayer";isc.A.params={};isc.B.push(isc.A.getDataColor=function isc_FusionChart_getDataColor(_1){return this.dataColors[_1]||"FFFFFF"}
,isc.A.initWidget=function isc_FusionChart_initWidget(){this.Super("initWidget",arguments);this.setupChart();this.setChartProperties();this.$43w();this.setData()}
,isc.A.setSrc=function isc_FusionChart_setSrc(){if(this.chartURL){this.src=this.chartURL;return}
var _1=this.stacked&&isc.FusionChart.stackedChartTypes.contains(this.chartType);var _2,_3,_4=isc.FusionChart.needsDimension.contains(this.chartType);if(this.fusionVersion=="2.3"){_3="FC_2_3_";_2="Stckd";if(this.chartType=="Area"&&this.$43x){_2="Stkcd";_4=!_1}}else{_3="";_2="Stacked";if(this.chartType=="Area"&&this.$43x&&!_1){_4=false}}
var _5=isc.SB.create();_5.append(this.chartsBaseURL,_3,isc.FusionChart.multiOnlyChartTypes.contains(this.chartType)||(!this.$43x&&isc.FusionChart.singleSeriesChartTypes.contains(this.chartType))?"":_1?_2:"MS",this.chartType);if(_4){_5.append(this.threeD&&isc.FusionChart.threeDChartTypes.contains(this.chartType)&&!(this.fusionVersion=="2.3"&&this.chartType=="Bar")?"3D":"2D")}
_5.append(".swf")
this.src=_5.toString();this.logInfo("src set to: "+this.src)}
,isc.A.getInnerHTML=function isc_FusionChart_getInnerHTML(){this.setSrc();var _1=isc.SB.concat('&chartWidth=',this.getInnerWidth(),'&chartHeight=',this.getInnerHeight(),'&dataXML=',encodeURIComponent(this.getChartXML()));this.params.FlashVars=_1;return this.Super("getInnerHTML",arguments)}
,isc.A.getChartXML=function isc_FusionChart_getChartXML(){var _1=isc.SB.concat('<graph ',this.$263,'>',this.$264,this.$265,'</graph>');if(this.logIsDebugEnabled()){this.logWarn("chartXML: "+_1)}
return _1}
,isc.A.setChartProperties=function isc_FusionChart_setChartProperties(_1){if(!_1)_1=this.chartProperties;else this.chartProperties=_1;_1=isc.addProperties({caption:this.title,subCaption:this.subTitle,yAxisName:this.valueTitle,xAxisName:this.facets[0].title,animation:this.animateValuesOnShow,showValues:this.labelValues},this.chartProperties);var _2=isc.SB.create();for(var _3 in _1){if(_1[_3]===true){_2.append(_3,'="1" ')}else if(_1[_3]===false){_2.append(_3,'="0" ')}else if(_3.endsWith("olor")&&_1[_3].startsWith("#")){_2.append(_3,'="',_1[_3].substring(1),'" ')}else{_2.append(_3,'="',_1[_3],'" ')}}
this.$263=_2.toString();if(this.isDrawn())this.markForRedraw()}
,isc.A.$43w=function isc_FusionChart__generateCategoriesXML(_1){if(!_1)_1=this.facets[0].values;var _2=isc.SB.create();_2.append('<categories>');for(var i=0;i<_1.length;i++){if(_1[i].vLine){this.$768(_1[i],_2);continue}
_2.append('<category name="',isc.makeXMLSafe(_1[i].title||_1[i].id),'"');if(_1[i].longTitle){_2.append(' hoverText="',isc.makeXMLSafe(_1[i].longTitle),'"')}
if(_1[i].showTitle===false)_2.append(' showName="0"');_2.append('/>')}
_2.append('</categories>');this.$264=_2.toString();if(this.isDrawn())this.markForRedraw()}
,isc.A.$768=function isc_FusionChart__writeVLineXML(_1,_2){_2.append('<vLine');for(var _3 in _1){if(_3=="vLine")continue;_2.append(' ',_3,'="',isc.makeXMLSafe(_1[_3]),'"')}
_2.append('/>')}
,isc.A.setFacets=function isc_FusionChart_setFacets(_1){this.facets=_1;this.setupChart();this.$43w()}
,isc.A.setData=function isc_FusionChart_setData(_1,_2){var _1=this.data=_1||this.data;if(_1==null||(isc.isAn.Array(_1)&&_1.length==0)){return this.$265=""}
var _3=isc.SB.create();var _4=this.facets.first(),_5=_4.values,_6={};this.$43x=this.isMultiFacet();if(this.isMultiFacet()&&isc.FusionChart.singleOnlyChartTypes.contains(this.chartType))
{this.logWarn("'"+this.chartType+"' charts support one facet only;"+" showing only first value for second facet");this.$43x=false;_6[this.facets[1].id]=this.facets[1].values[0].id}
if(this.$43x){var _7=this.facets[1],_8=_7.values;var _9='<set value="',_10='"',_11='/>';for(var i=0;i<_8.length;i++){_3.append('<dataset seriesname="',isc.makeXMLSafe(_8[i].title),'" color="',this.getDataColor(i),'">');for(var j=0;j<_5.length;j++){if(_5[j].vLine)continue;_6[_7.id]=_8[i].id||_8[i].name;_6[_4.id]=_5[j].id||_5[j].name;var _14=this.getValue(_6);_3.append(_9,_14,_10);var _15=this.getLink(_6,_14);if(_15)_3.append(' link="'+_15+'"');_3.append(_11)}
_3.append("</dataset>")}}else{for(var i=0;i<_5.length;i++){if(_5[i].vLine){this.$768(_5[j],_3);continue}
_6[_4.id]=_5[i].id||_5[i].name;var _14=this.getValue(_6);_3.append('<set value="',_14,'"');var _15=this.getLink(_6,_14);if(_15){_3.append(' link="'+_15+'"')}
_3.append(' name="',isc.makeXMLSafe(_5[i].title||_5[i].id),'"');_3.append(' color="',this.getDataColor(i),'"');if(_5[i].longTitle){_3.append(' hoverText="',isc.makeXMLSafe(_5[i].longTitle),'"')}
if(_5[i].showTitle===false)_3.append(' showName="0"');_3.append('/>')}}
this.$265=_3.toString();if(this.isDrawn())this.markForRedraw()}
,isc.A.getLink=function isc_FusionChart_getLink(_1,_2){}
,isc.A.setChartType=function isc_FusionChart_setChartType(_1){if(!isc.FusionChart.allChartTypes.contains(_1)){this.logWarn("'"+_1+"' is not a recognized chart type")}else{_1=this.chartType=_1||this.chartType;this.setData();if(this.isDrawn())this.markForRedraw()}}
,isc.A.setFusionVersion=function isc_FusionChart_setFusionVersion(_1){this.fusionVersion=_1;this.setSrc();if(this.isDrawn())this.markForRedraw()}
,isc.A.setStacked=function isc_FusionChart_setStacked(_1){this.stacked=_1;if(_1&&!isc.FusionChart.stackedChartTypes.contains(this.chartType)){this.logWarn("'"+this.chartType+"' charts do not support stacking")}else{if(this.isDrawn())this.markForRedraw()}}
,isc.A.setThreeD=function isc_FusionChart_setThreeD(_1){if(_1&&!isc.FusionChart.threeDChartTypes.contains(this.chartType)){this.logWarn("'"+this.chartType+"' charts do not support 3D effects")}else{this.threeD=_1;if(this.isDrawn())this.markForRedraw()}}
);isc.B._maxIndex=isc.C+15}
if(isc.DrawPane){isc.ClassFactory.defineClass("FacetChart","DrawPane","Chart");isc.addGlobal("BarChart",isc.FacetChart);isc.A=isc.FacetChart.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.defaultHeight=300;isc.A.defaultWidth=400;isc.A.overflow="hidden";isc.A.xGutter=30;isc.A.yGutter=80;isc.A.padding=5;isc.A.styleName="scChart";isc.A.chartType="Column";isc.A.stacked=null;isc.A.connected=true;isc.A.title="Chart";isc.A.showTitle=true;isc.A.titleProperties={fontSize:14};isc.A.pixelsPerGradation=28;isc.A.gradationLabelProperties={fontFamily:"Tahoma",fontSize:10,fontWeight:"normal",fontStyle:"normal",lineColor:"#444444"};isc.A.gradationLineProperties={lineWidth:1,lineColor:"#BBBBBB"};isc.A.bandedBackground=true;isc.A.backgroundBandProperties={lineOpacity:0,fillColor:"#F7F7F7"};isc.A.showRadarGradationLabels=true;isc.A.radarGradationLabelOffset=2;isc.A.dataPointSize=6;isc.A.pointShapes=["Oval","Square","Diamond","Triangle"];isc.A.logScale=false;isc.A.useLogGradations=false;isc.A.logBase=10;isc.A.logGradations=[1,2,4,6,8];isc.A.showChartRect=false;isc.A.chartRectProperties={rounding:0.02,lineWidth:1,lineColor:"#111111",backgroundColor:"#CCCCCC",fillGradient:{x1:'0%',y1:'100%',x2:'100%',y2:'0%',colorStops:[{color:"#FFFFFF",offset:0.0},{color:"#FFFFFF",offset:0.5},{color:"#CCCCCC",offset:0.9},{color:"#C2c2c2",offset:1.0}]},shadow:{blur:8,color:"#555555",offset:[2,2]}};isc.A.chartRectMargin=5;isc.A.dataMargin=10;isc.A.autoRotateLabels=true;isc.A.dataLabelProperties={fontFamily:"Tahoma",fontSize:10,fontWeight:"normal",fontStyle:"normal",lineColor:"#444444"};isc.A.decimalPrecision=2;isc.A.legendMargin=10;isc.A.legendPadding=5;isc.A.legendSwatchSize=16;isc.A.legendSwatchProperties={lineWidth:1,lineColor:"#000000"};isc.A.legendTextPadding=5;isc.A.legendItemPadding=5;isc.A.legendRowPadding=5;isc.A.showLegendRect=false;isc.A.legendRectProperties={lineWidth:1,lineColor:"#333333"};isc.A.legendLabelProperties={fontFamily:"Arial",fontSize:10,fontWeight:"normal",fontStyle:"normal",lineColor:"#333333"};isc.A.showShadows=true;isc.A.shadowProperties={fillColor:"#333333",lineWidth:1.1};isc.A.barMargin=4;isc.A.minBarThickness=4;isc.A.maxBarThickness=150;isc.A.clusterMarginRatio=4;isc.A.barProperties={fillColor:"#FFCCCC",lineWidth:1,opacity:0.5,lineColor:"#333333"};isc.A.dataLineProperties={lineWidth:3,lineColor:"#333333",shadow:{blur:5,color:"#333333",offset:[2,3]}};isc.A.dataOutlineProperties={lineWidth:1,lineColor:"#333333"};isc.A.dataShapeProperties={lineWidth:0,lineOpacity:0,lineColor:"#333333",fillOpacity:0.5};isc.A.valueLineProperties={lineWidth:1,lineColor:"#BBBBBB"};isc.A.maxDataPointSize=14;isc.A.minDataPointSize=3;isc.A.minKnobSize=isc.Browser.isTouch?10:6;isc.A.radarBackgroundProperties={lineWidth:1};isc.A.radialLabelOffset=5;isc.A.pieSliceProperties={lineOpacity:0,lineWidth:0.1};isc.A.pieBorderProperties={lineColor:"#333333",lineWidth:1};isc.A.pieRingBorderProperties={lineColor:"#333333",lineWidth:1};isc.A.showDoughnut=null;isc.A.doughnutRatio=0.2;isc.A.doughnutHoleProperties={lineWidth:0,fillColor:"white"};isc.A.pieLabelLineProperties={lineColor:"#111111",lineWidth:2};isc.A.pieLabelAngleStart=20;isc.A.pieLabelLineExtent=7;isc.A.errorBarWidth=6;isc.A.errorBarThickness=2;isc.A.errorBarProperties={lineWidth:0};isc.A.canDrag=false;isc.A.cursor="auto";isc.B.push(isc.A.isStacked=function isc_FacetChart_isStacked(){return this.stacked!=null?this.stacked:this.chartType!="Line"}
,isc.A.isFilled=function isc_FacetChart_isFilled(){return this.filled!=null?this.filled:(this.isMultiFacet()&&this.isStacked())||this.chartType=="Area"}
,isc.A.shouldShowDoughnut=function isc_FacetChart_shouldShowDoughnut(){return this.showDoughnut||(this.chartType=="Doughnut"&&this.showDoughnut!==false)}
);isc.B._maxIndex=isc.C+3;isc.A=isc.FacetChart.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.redrawOnResize=true;isc.A.allContentAndChildren=true;isc.A.angleMargin=5;isc.A.interactivePoints=true;isc.A.useAutoGradients=true;isc.A.dataColors=["#df5545","#7ae02d","#4d89f9","#2de0e0","#e0e02d","#e02de0","#FF9933","#99FF33","#9933FF","#639966","#63CCCC","#6366FF","#800080","#999999","#FF00FF","#FFCC00","#00FF00","#00CCFF","#996366","#C0C0C0","#000000","#996100","#636300","#006300","#006366","#000080","#636399","#636363","#800000","#FF6600","#808000","#8000FF","#008080","#666699","#808080","#FF99CC","#FFCC99","#FFFF99","#CCFFCC","#CCFFFF","#99CCFF","#CC99FF","#FFFFFF"];isc.A.dataGradients={};isc.A.rotateProps={rotation:90};isc.B.push(isc.A.getChartTop=function isc_FacetChart_getChartTop(){return this.$78t.height+this.chartRectMargin}
,isc.A.getChartHeight=function isc_FacetChart_getChartHeight(_1){return this.getInnerContentHeight()
-this.getChartTop()
-this.chartRectMargin
-this.getXLabelsHeight(_1)
-(this.$78k?this.legendMargin+this.$78k.height:0)}
,isc.A.getChartLeft=function isc_FacetChart_getChartLeft(){return this.getYLabelsWidth()+this.chartRectMargin}
,isc.A.getChartWidth=function isc_FacetChart_getChartWidth(_1){return this.getInnerContentWidth()-this.getChartLeft()-this.chartRectMargin}
,isc.A.getDataAxisLength=function isc_FacetChart_getDataAxisLength(_1){if(this.chartType=="Radar")return this.getChartHeight(_1)/2;if(this.hasYGradations()){var _2=this.getChartHeight(_1);return _2}else{return this.getChartWidth()}}
,isc.A.$78g=function isc_FacetChart__drawChartRect(){var _1=this.getChartTop(),_2=this.getChartHeight(),_3=this.getYLabelsWidth(),_4=_3+this.chartRectMargin,_5=this.getInnerContentWidth()-_3-(2*this.chartRectMargin);var _6=this.$778={top:_1,left:_4,width:_5,height:_2}
if(this.showChartRect){this.drawRect(_4,_1,_5,_2,this.chartRectProperties)}}
,isc.A.getChartRect=function isc_FacetChart_getChartRect(){if(this.$778==null)this.logWarn("getChartRect(): chart rect not available yet");return this.$778}
,isc.A.getChartRectLineWidth=function isc_FacetChart_getChartRectLineWidth(){var _1=this.chartRectProperties;var _2=_1.lineWidth;if(_1.lineOpacity==0)_2=0;if(!this.showChartRect)_2=0;return _2}
,isc.A.getStackFacet=function isc_FacetChart_getStackFacet(){return this.facets[1]}
,isc.A.isPieChart=function isc_FacetChart_isPieChart(){return this.chartType=="Pie"||this.chartType=="Doughnut"}
,isc.A.hasYAxisLabels=function isc_FacetChart_hasYAxisLabels(){return this.chartType!="Radar"&&!this.isPieChart()}
,isc.A.setStacked=function isc_FacetChart_setStacked(_1){this.stacked=_1;if(this.data)this.setData(this.data)}
,isc.A.setFilled=function isc_FacetChart_setFilled(_1){this.filled=_1;if(this.data)this.setData(this.data)}
,isc.A.swapFacets=function isc_FacetChart_swapFacets(){if(this.facets){this.facets.reverse();if(this.data)this.setData(this.data)}}
,isc.A.setChartType=function isc_FacetChart_setChartType(_1){if(!isc.FacetChart.allChartTypes.contains(_1)){this.logWarn("'"+_1+"' is not a recognized chart type")}else{this.chartType=_1;if(this.data)this.setData(this.data)}}
,isc.A.showContextMenu=function isc_FacetChart_showContextMenu(){var _1=this;var _2=[{title:"Chart Type",submenu:isc.FacetChart.allChartTypes.map(function(_3){return{title:_3,click:"target.setChartType('"+_3+"')",checked:_1.chartType==_3}})},{title:"Fill",submenu:[{title:"Filled",click:"target.setFilled(true)",checked:this.filled!=null&&this.filled},{title:"Unfilled",click:"target.setFilled(false)",checked:this.filled!=null&&!this.filled},{title:"Auto",click:"target.setFilled(null)",checked:this.filled==null}]}];if(this.facets.length>1){_2.add({title:"Stack",submenu:[{title:"Stacked",click:"target.setStacked(true)",checked:this.stacked!=null&&this.stacked},{title:"Unstacked",click:"target.setStacked(false)",checked:this.stacked!=null&&!this.stacked},{title:"Auto",click:"target.setStacked(null)",checked:this.stacked==null}]});_2.add({title:"Swap Facets",click:"target.swapFacets()"})}
this.getMenuConstructor().create({data:_2}).showContextMenu(this);return false}
,isc.A.initWidget=function isc_FacetChart_initWidget(){this.Super("initWidget",arguments);this.isVML=this.drawingType=="vml";this.hasShadows=!this.isVML;this.setData(this.data)}
,isc.A.draw=function isc_FacetChart_draw(){if(isc.$cv)arguments.$cw=this;if(!this.readyToDraw())return this;this.Super("draw",arguments);this.drawChart();return this}
,isc.A.resized=function isc_FacetChart_resized(){this.Super("resized",arguments);this.setData(this.data)}
,isc.A.setFacets=function isc_FacetChart_setFacets(_1){this.facets=_1;if(this.data&&this.data.length>0)this.setupChart()}
,isc.A.setData=function isc_FacetChart_setData(_1){if(!_1)return;if(_1!=null&&!isc.isAn.Array(_1))_1=[_1];this.data=_1;if(!this.data||(isc.isAn.Array(this.data)&&this.data.length==0)){if(this.isDrawn())this.erase();return}
this.setupChart();this.xLabelsHeight=this.yLabelsWidth=this.orderedData=null;var _2=this.getMaxValue(null,true);this.logInfo("setData: maxValue: "+_2);if(!this.isDrawn())return;this.destroyItems();this.drawChart()}
,isc.A.drawChart=function isc_FacetChart_drawChart(){this.drawTitle();if(this.shouldShowLegend())this.drawLegend();if(!isc.isAn.Array(this.data)||this.data.length==0)return;this.measureDataLabels();this.getGradations(this.getMultiMaxValue(),true);this.measureGradationLabels(true);this.$78g();this.drawGradationLabels();this.drawGradations();this.drawData()}
,isc.A.hasXGradations=function isc_FacetChart_hasXGradations(){return this.chartType=="Bar"}
,isc.A.hasYGradations=function isc_FacetChart_hasYGradations(){return this.chartType!="Bar"}
,isc.A.measureDataLabels=function isc_FacetChart_measureDataLabels(){if(this.hasYGradations()){this.getXLabelsHeight(true)}else{this.getYLabelsWidth(true)}}
,isc.A.erase=function isc_FacetChart_erase(){if(this.knobs!=null)this.knobs.map("destroy");this.Super("erase",arguments)}
,isc.A.getMultiMaxValue=function isc_FacetChart_getMultiMaxValue(){if(!this.metricFacet||!this.highErrorMetric)return this.getMaxValue();return Math.max(this.getMaxValue(),this.getMaxValue(this.highErrorMetric))}
,isc.A.getMagnitude=function isc_FacetChart_getMagnitude(_1,_2){if(_1==0)return 0;if(_2==null)_2=this.logBase;var _3=this.logValue(_1,_2);return Math.ceil(_3)}
,isc.A.getGradations=function isc_FacetChart_getGradations(_1,_2,_3,_4,_5){if(_3==null)_3=this.shouldUseLogGradations();if(_3){return this.getLogGradations(_1,this.getMinValue(),_2)}
if(!_2&&this.gradations)return this.gradations;var _5=_5||this.getDataAxisLength(true);var _6=Math.round(_5/ this.pixelsPerGradation);var _7=this.getMagnitude(_1,10);var _8=Math.pow(10,_7-1),_9=Math.pow(10,(_7-2));var _10=[_9,2*_9,5*_9,10*_9,2*_8,5*_8];var _11,_12=Number.MAX_VALUE;for(var i=0;i<_10.length;i++){var _14=_10[i],_15=Math.ceil(_1/ _14),_16=Math.abs(_6-_15);if(_15<_6&&_16<_12){_11=_14;_12=_16}}
var _14=_11,_17=Math.ceil(_1/ _14)+1,_15=[];for(var i=0;i<_17;i++){if(this.logScale&&_3&&i==0){continue}
var _18=i*_14;if(_14<1){var _19=_8*10;_18=Math.floor(_18*_19)/_19}
_15.add(_18)}
var _20=_5/ _17;if(_4!==false)this.scale=_20/ _14;if(this.logIsDebugEnabled("chartScale")){this.logDebug("chose increment: "+_14+". "+_17+" gradations (ideal "+_6+"): "+_15,"chartScale")}
if(_4!==false)this.gradations=_15;return _15}
,isc.A.logValue=function isc_FacetChart_logValue(_1,_2){if(_2==null)_2=this.logBase;return Math.log(_1)/Math.log(_2)}
,isc.A.shouldUseLogGradations=function isc_FacetChart_shouldUseLogGradations(){if(this.logScale==false)return false;if(this.useLogGradations!=null)return this.useLogGradations;return this.logBase==10}
,isc.A.getLogGradations=function isc_FacetChart_getLogGradations(_1,_2,_3){if(!_3&&this.gradations)return this.gradations;var _4=this.getMagnitude(_1),_5=this.getMagnitude(_2);this.logDebug("magnitude of max,min: "+[_4,_5],"chartScale");if((Math.pow(this.logBase,_5-1)*this.logGradations.first())>_2){_5--}
var _6=[];for(var i=_5-1;i<_4;i++){var _8=Math.pow(this.logBase,i),_9=Math.pow(this.logBase,Math.abs(i)+1)
for(var j=0;j<this.logGradations.length;j++){var _11=_8*this.logGradations[j];if(_11<1){_11=Math.floor(_11*_9)/_9}
_6.add(_11)}}
_6.add(Math.pow(this.logBase,_4));this.logDebug("log gradations: "+_6,"chartScale");return(this.gradations=_6)}
,isc.A.getMaxGradation=function isc_FacetChart_getMaxGradation(){return this.gradations.last()}
,isc.A.measureGradationLabels=function isc_FacetChart_measureGradationLabels(){if(this.isPieChart()||this.chartType=="Radar"){this.$85f=this.$85g=0;return}
var _1=this.hasYGradations(),_2=0,_3=this.gradationLabelProperties,_4=this.gradations.duplicate();for(var i=0;i<_4.length;i++){_4[i]=this.formatNumber(_4[i])}
if(_1){this.$85f=this.measureLabels(_4,"width",_3)}else{if(this.autoRotateLabels){this.$85g=this.measureLabels(_4,"width",_3)}else{this.$85g=this.measureLabel("Xy",_3).height}}}
,isc.A.getGradationsWidth=function isc_FacetChart_getGradationsWidth(){if(this.$85f==null)this.logWarn("Gradation width not available");return this.$85f}
,isc.A.getGradationsHeight=function isc_FacetChart_getGradationsHeight(){if(this.$85g==null)this.logWarn("Gradation height not available");return this.$85g}
,isc.A.drawGradationLabels=function isc_FacetChart_drawGradationLabels(){if(this.isPieChart()||this.chartType=="Radar")return 0;var _1=this.hasYGradations(),_2=this.gradationLabelProperties,_3=this.gradations,_4=this.measureLabel("Xy",_2).height;if(_1){for(var i=0;i<_3.length;i++){var _6=this.getYCoord(_3[i]),_7=this.formatNumber(_3[i]);this.drawLabel(0,_6-(_4/ 2),_7,_2)}}else{var _8=this.getChartTop()+this.getChartHeight();for(var i=0;i<_3.length;i++){var _9=this.getValueCoord(_3[i],false),_6=_8+this.chartRectMargin,_7=this.formatNumber(_3[i]);if(this.autoRotateLabels){this.drawLabel(_9+this.getRotatedCenteringOffset(_4),_6,_7,_2,true)}else{var _10=this.measureLabel(_7,_2);this.drawLabel(_9-(_10.width/ 2),_6,_7,_2)}}}}
,isc.A.getGradationLineWidth=function isc_FacetChart_getGradationLineWidth(){return this.gradationLineProperties.lineWidth}
,isc.A.drawGradations=function isc_FacetChart_drawGradations(_1,_2){this.logDebug("drawing gradations","chartDraw");if(this.isPieChart())return;if(this.chartType=="Radar")return this.drawRadarGradations();if(_1==null)_1=this.hasYGradations();var _3=this.getChartRect(),_4=_1?_3.height:_3.width,_2=_2||this.gradations;var _5=this.getChartRectLineWidth();var i=0,_7=_2.length;if(_5!=0){i=1;_7-=1}
for(;i<_7;i++){if(_1){var _8=_3.left+_5,_9=_3.left+_3.width-_5,_10=this.getYCoord(_2[i]);isc.DrawLine.create({drawPane:this,startPoint:[_8,_10],endPoint:[_9,_10],autoDraw:true},this.gradationLineProperties)}else{var _8=this.getXCoord(_2[i],_2,false);isc.DrawLine.create({drawPane:this,startPoint:[_8,_3.top+_5],endPoint:[_8,_3.top+_3.height-(2*_5)],autoDraw:true},this.gradationLineProperties)}
if(this.bandedBackground&&_1&&(i%2==1)&&i!=(_2.length-1)){var _11=this.getYCoord(_2[i+1]),_12=_10-_11,_13=this.gradationLineProperties.lineWidth;isc.DrawRect.create({drawPane:this,left:_8,top:_11+_13,width:_9-_3.left-_5*2,height:_12-(_13*2),autoDraw:true},this.backgroundBandProperties)}}}
,isc.A.getValueRatio=function isc_FacetChart_getValueRatio(_1,_2,_3){_2=_2||this.gradations;_3=_3!=null?_3:this.logScale;var _4=_2.last(),_5=_2.first();if(!_3){var _6=_4-_5;return(_1-_5)/_6}else{if(_1==0)return 0;var _7=this.logValue(_4),_8=_5==0?0:this.logValue(_5),_9=_7-_8;return(this.logValue(_1)-_8)/_9}}
,isc.A.getYCoord=function isc_FacetChart_getYCoord(_1){return this.getValueCoord(_1)}
,isc.A.getValueCoord=function isc_FacetChart_getValueCoord(_1,_2){if(_2==null)_2=true;var _3=this.getValueRatio(_1);var _4,_5;if(_2){_4=this.getChartTop();_5=this.getChartHeight();return _4+_5-Math.round(_3*_5)}else{_4=this.getChartLeft();_5=this.getChartWidth();return _4+Math.round(_3*_5)}}
,isc.A.getXCoord=function isc_FacetChart_getXCoord(_1,_2,_3){var _4=this.getValueRatio(_1,_2,_3),_5=this.getChartRect();return _5.left+Math.round(_4*_5.width)}
,isc.A.getDataLabels=function isc_FacetChart_getDataLabels(){if(this.chartType=="Scatter")return this.getHGradations();var _1=this.getOrderedData();return _1.getProperty("title")}
,isc.A.getDataLabelHeight=function isc_FacetChart_getDataLabelHeight(){return this.measureLabel("Xy",this.dataLabelProperties).height}
,isc.A.getXLabelsHeight=function isc_FacetChart_getXLabelsHeight(_1){if(!_1&&this.xLabelsHeight!=null)return this.xLabelsHeight;if(this.chartType=="Radar"||this.isPieChart())return(this.xLabelsHeight=0);if(this.hasXGradations())return this.getGradationsHeight();if(this.autoRotateLabels){this.xLabelsHeight=this.measureDataLabels()}else{this.xLabelsHeight=this.measureLabel("Xy",this.dataLabelProperties).height}
return this.xLabelsHeight}
,isc.A.getYLabelsWidth=function isc_FacetChart_getYLabelsWidth(_1){if(!_1&&this.yLabelsWidth!=null)return this.yLabelsWidth;if(this.hasYGradations())return this.getGradationsWidth();return(this.yLabelsWidth=this.measureDataLabels())}
,isc.A.measureDataLabels=function isc_FacetChart_measureDataLabels(_1,_2){return this.measureLabels(null,_1,_2)}
,isc.A.measureLabels=function isc_FacetChart_measureLabels(_1,_2,_3){_1=_1||this.getDataLabels();_2=_2||"width";_3=_3||this.dataLabelProperties;var _4=0;for(var i=0;i<_1.length;i++){var _6=this.measureLabel(_1[i],_3)[_2];_4=Math.max(_4,_6)}
return _4}
,isc.A.getChartCenter=function isc_FacetChart_getChartCenter(_1){_1=_1||this.getChartRect();return[Math.round(_1.left+(_1.width/ 2)),Math.round(_1.top+(_1.height/ 2))]}
,isc.A.getAvailableRadius=function isc_FacetChart_getAvailableRadius(_1){_1=_1||this.getChartRect();var _2=this.radialLabelOffset,_3=this.getChartRectLineWidth();if(this.isPieChart()&&this.isStacked())_2+=this.pieLabelLineExtent;var _4=2*(this.measureDataLabels()+_2),_5=2*(this.getDataLabelHeight()+_2),_6=Math.min(_1.width-_4,_1.height-_5),_7=this.maxRadius=Math.round((_6-(2*_3))/2);return _7}
,isc.A.drawRadarGradations=function isc_FacetChart_drawRadarGradations(){var _1=this.getChartRect(),_2=this.gradations,_3=this.getAvailableRadius(_1);isc.DrawOval.create({drawPane:this,autoDraw:true,centerPoint:this.getChartCenter(),radius:_3},this.radarBackgroundProperties);var _4=this.getChartCenter(),_5=this.showRadarGradationLabels;for(var i=0;i<_2.length;i++){var _7=this.getValueRatio(_2[i])*_3;if(_7!=0){isc.DrawOval.create({drawPane:this,autoDraw:true,centerPoint:_4,radius:_7},this.radiusLineProperties||this.gradationLineProperties)}
if(_5){var _8=this.radarGradationLabelOffset;this.drawLabel(_4[0]+_8,_4[1]-_7-(this.getDataLabelHeight()/2)+_8,_2[i],this.gradationLabelProperties)}}}
,isc.A.drawRadarData=function isc_FacetChart_drawRadarData(_1,_2,_3){_1=_1||this.getChartRect();_3=_3||this.getOrderedData();_2=_2||this.getMaxGradation();if(this.multiCellData){this.drawRadarSet(this.facets.first());return}
var _4=this.getChartCenter();var _5=Math.round(360/this.facets.first().values.length);for(var i=0;i<_3.length;i++){var _7=_5*i,_8=isc.GraphMath.polar2screen(_7,this.maxRadius,_4,true);this.drawValueLine(_4,_8);this.drawRadialLabel(_4,this.maxRadius,_7,_3[i].title)}
return this.drawLines()}
,isc.A.getRadarPoints=function isc_FacetChart_getRadarPoints(_1,_2){var _3=[],_4=this.getChartCenter();var _5=Math.round(360/this.facets.first().values.length);for(var i=0;i<_2.length;i++){var _7=_2[i],_8=this.getValueRatio(_7),_9=Math.round(_8*this.maxRadius),_10=_5*i,_11=isc.GraphMath.polar2screen(_10,_9,_4,true);_3.add(_11)}
if(this.connected)_3.add(_3[0]);return _3}
,isc.A.drawRadarSet=function isc_FacetChart_drawRadarSet(_1){var _2=Math.round(360/_1.values.length);var _3=this.getChartCenter();for(var i=0;i<_1.values.length;i++){var _5=_1.values[i];var _6=(i*_2);var _7=isc.GraphMath.polar2screen(_6,this.maxRadius,_3,true);this.drawValueLine(_3,_7);var _8=_1.values[i].title||_1.values[i].id;var _9=_6+Math.round(_2/ 2);this.drawRadialLabel(_3,this.maxRadius,_9,_8);var _10={};_10[_1.id]=_5.id;var _11=this.getDataRecord(_10);if(_11==null)return;this.drawPointsAcrossAngle(_11,_6+this.angleMargin,_6+_2-this.angleMargin)}}
,isc.A.drawPointsAcrossAngle=function isc_FacetChart_drawPointsAcrossAngle(_1,_2,_3){var _4=Math.round((_3-_2)/_1.length),_5=this.getChartCenter(),_6=this.getMaxValue(),_7,_8,_9;if(this.metricFacet){_8=this.metricFacet.values[1].id;_7=this.metricFacet.values[0].id;_9=this.getMaxValue(_8)}
for(var i=0;i<_1.length;i++){var _11=_1[i];var _12,_13=this.dataPointSize;if(this.metricFacet){_12=parseFloat(_11[_7]);var _14=parseFloat(_11[_8]);_13=Math.max(this.minDataPointSize,Math.ceil((_14/ _9)*this.maxDataPointSize))}else{_12=_11[this.getDefaultMetric()]}
var _15=Math.round((_12/ _6)*this.maxRadius);var _16=isc.GraphMath.polar2screen(_2+(i*_4),_15,_5,true);this.drawDataPoint(_16,0,_13,_11,_12)}}
,isc.A.drawRadialLabel=function isc_FacetChart_drawRadialLabel(_1,_2,_3,_4){var _5=isc.GraphMath.polar2screen(_3,_2+this.radialLabelOffset,_1,true);var _6=this.measureLabel(_4,this.dataLabelProperties);if(_3>=360)_3-=360;if(_3>180&&_3<=360){_5[0]-=_6.width}
if((_3>=0&&_3<90)||(_3>270&&_3<=360)){_5[1]-=_6.height}
var _7=isc.GraphMath.angleDifference(0,_3),_8=isc.GraphMath.angleDifference(_3,180),_9=isc.GraphMath.angleDifference(90,_3),_10=isc.GraphMath.angleDifference(_3,270),_11=Math.min(Math.abs(_7),Math.abs(_8)),_12=Math.min(Math.abs(_10),Math.abs(_9));if(_11<=20){var _13=Math.abs(_7)==_11?_7:_8,_14=_13==_11?1:-1,_15=_14*(_6.width/ 2),_16=1-(_11/ 20),_17=Math.round(_16*_15);_5[0]-=Math.round(_16*_15)}else if(_12<=20){var _13=Math.abs(_10)==_12?_10:_9,_14=_13==_12?1:-1,_15=_14*(_6.height/ 2),_16=1-(_12/ 20),_17=Math.round(_16*_15);_5[1]-=_17}
this.drawLabel(_5[0],_5[1],_4,this.dataLabelProperties)}
,isc.A.formatNumber=function isc_FacetChart_formatNumber(_1){return isc.Format.toUSString(_1)}
,isc.A.getOrderedData=function isc_FacetChart_getOrderedData(_1){if(this.orderedData&&!_1)return this.orderedData;var _2=this.orderedData=[],_3=this.facets.first(),_4=_3.values,_5={};if(this.isMultiFacet()){var _6=this.facets[1],_7=_6.values;for(var i=0;i<_4.length;i++){var _9={};_9[_3.id]=_4[i].id;var _10={title:_4[i].title||_4[i].id,facetValueId:_4[i].id,series:[]}
_2.add(_10);for(var j=0;j<_7.length;j++){var _12=_7[j];var _13={facetValueId:_7[j].id,title:_7[j].title||_7[j].id};_10.series.add(_13);_9[_6.id]=_7[j].id;_13.record=this.getDataRecord(_9,this.multiCellData);_13.value=this.getValueFromRecord(_13.record,_9,this.multiCellData)}}}else{var _9={};for(var i=0;i<_4.length;i++){var _12=_4[i];var _13={title:_4[i].title||_4[i].id};_2.add(_13);_9[_3.id]=_4[i].id;_13.record=this.getDataRecord(_9,this.multiCellData);_13.value=this.getValueFromRecord(_13.record,_9,this.multiCellData)}}
return _2}
,isc.A.drawData=function isc_FacetChart_drawData(){this.logDebug("drawing data","chartDraw");if(this.chartType=="Column"||this.chartType=="Bar"){this.drawBars()}else if(this.chartType=="Line"||this.chartType=="Area"){this.drawLines()}else if(this.chartType=="Radar"){this.drawRadarData()}else if(this.isPieChart()){this.drawPieData()}else if(this.chartType=="Scatter"){this.drawScatterData()}else{this.logWarn("chart type: '"+this.chartType+"' not supported")}}
,isc.A.drawLines=function isc_FacetChart_drawLines(_1,_2,_3){_1=_1||this.getChartRect();_3=_3||this.getOrderedData();var _4=this.chartType=="Radar",_5=this.isStacked(),_6=this.isFilled()
if(this.isMultiFacet()){var _7=Math.round(360/this.facets.first().values.length),_8=this.getChartCenter();var _9=null,_10=null;for(var i=0;i<_3[0].series.length;i++){var _12=_3.getProperty("series").getProperty(i),_13=_12.getProperty("record"),_14=_12.getProperty("value");if(_5){_14=this.addValues(_14,_10);_10=_14}
var _15=(_4?this.getRadarPoints(_1,_14):this.getPoints(_1,_14)),_16=_15;var _17=this.getDataColor(i);var _18={lineColor:_17};this.drawDataLine(_15,_18);if(_6){if(_9==null||!_5){_9=_4?[]:this.getBasePoints(_15)}
_16=_15.concat(_9.duplicate().reverse());_9=_15;var _19=this.useAutoGradients&&!this.isVML;if(this.chartType=="Area"||this.chartType=="Line"){this.drawDataShape(_16,{lineColor:_17,fillColor:!_19?_17:null,fillGradient:_19?this.getDataGradient(i):null})}else if(this.chartType=="Radar"){this.drawDataShape(_16,{lineColor:_17,fillColor:!_19?_17:null,fillGradient:_19?this.getRadarShapeGradient(_17,_16,_8,i==0):null})}}
if(this.showDataPoints){this.drawPoints(_15,_13,i,_14)}
if(this.lowErrorMetric!=null){this.drawErrorBars(_15,_13,i,_2,_1)}
if(i==0&&!_4)this.drawDataLabels(_15.getProperty("0"),_3.getProperty("title"))}}else{var _14=_3.getProperty("value");var _15=_4?this.getRadarPoints(_1,_14):this.getPoints(_1,_14),_16=_15;this.drawDataLine(_15,{lineColor:this.getDataColor(0)});if(_6){var _20;if(this.useAutoGradients){_20=this.getDataGradient(0)}
_16=_15.concat(this.getBasePoints(_15).reverse());this.drawDataShape(_16,{lineColor:_17,fillColor:!this.useAutoGradients?_17:null,fillGradient:this.useAutoGradients?_20:null})}
if(this.showDataPoints){var _13=_3.getProperty("record");this.drawPoints(_15,_13,0,_14)}
if(!_4)this.drawDataLabels(_15.getProperty("0"),_3.getProperty("title"))}}
,isc.A.getBasePoints=function isc_FacetChart_getBasePoints(_1){var _2=this.getChartRect();var _3=[];for(var i=0;i<_1.length;i++){_3.add([_1[i][0],_2.top+_2.height])}
return _3}
,isc.A.addValues=function isc_FacetChart_addValues(_1,_2){if(_2==null)return _1;if(_1==null)return _2;var _3=[];for(var i=0;i<_1.length;i++){_3[i]=_1[i]+_2[i]}
return _3}
,isc.A.getPoints=function isc_FacetChart_getPoints(_1,_2){var _3=[],_4=this.dataMargin,_5=(_1.width-2*this.dataMargin),_6=_2.length>1?Math.floor(_5/(_2.length-1)):0,_7=_5-(_6*(_2.length-1));_4+=Math.floor(_7/ 2);for(var i=0;i<_2.length;i++){var _9=_2[i];if(_9==null)_9=0;_3.add([_1.left+_4,this.getYCoord(_9)]);_4+=_6}
return _3}
,isc.A.drawPoints=function isc_FacetChart_drawPoints(_1,_2,_3,_4){if(!_4)_4=[];if(this.pointSizeMetric){var _5=this.getMaxValue(this.pointSizeMetric)}
var _6=this.dataPointSize;for(var i=0;i<_1.length;i++){var x=_1[i][0],y=_1[i][0],_10=_2[i];if(this.pointSizeMetric){var _11=_10[this.pointSizeMetric];_6=Math.max(this.minDataPointSize,Math.ceil((_11/ _5)*this.maxDataPointSize))}
this.drawDataPoint(_1[i],_3,_6,_2[i],_4[i])}}
,isc.A.drawErrorBars=function isc_FacetChart_drawErrorBars(_1,_2,_3,_4,_5){for(var i=0;i<_1.length;i++){var x=_1[i][0],_8=_2[i],_9=_8[this.highErrorMetric],_10=_8[this.lowErrorMetric];if(_9!=null)this.drawErrorBar(x,_9,_4,_3,_5);if(_10!=null)this.drawErrorBar(x,_10,_4,_3,_5)}}
,isc.A.drawErrorBar=function isc_FacetChart_drawErrorBar(_1,_2,_3,_4,_5){var y=this.getYCoord(_2),_7=this.getDataColor(_4);this.drawRect(_1-(this.errorBarWidth/ 2),y+(this.errorBarThickness/ 2),this.errorBarWidth,this.errorBarThickness,isc.addProperties({fillColor:_7},this.errorBarProperties))}
,isc.A.drawDataLabels=function isc_FacetChart_drawDataLabels(_1,_2,_3){for(var i=0;i<_1.length;i++){this.drawDataLabel(_1[i],_2[i],_3)}}
,isc.A.getRotatedCenteringOffset=function isc_FacetChart_getRotatedCenteringOffset(_1){if(this.drawingType=="vml"){return-Math.floor(_1/ 2)}else{return Math.floor(_1/ 2)}}
,isc.A.drawDataLabel=function isc_FacetChart_drawDataLabel(_1,_2,_3){if(_3==null)_3=true;var _4=this.getDataLabelHeight();if(_3){var _5=this.getChartTop()+this.getChartHeight()+this.chartRectMargin;var _6=_1;if(this.autoRotateLabels){_6+=this.getRotatedCenteringOffset(_4)}else{var _7=this.measureLabel(_2,this.dataLabelProperties);_6=_6-(_7.width/ 2)}
this.drawLabel(_6,_5,_2,this.dataLabelProperties,this.autoRotateLabels)}else{var _4=this.getDataLabelHeight();this.drawLabel(0,_1-Math.round(_4/ 2),_2,this.dataLabelProperties)}}
,isc.A.drawBars=function isc_FacetChart_drawBars(_1,_2,_3){_1=_1||this.getChartRect();_3=_3||this.getOrderedData();_2=_2||this.getMaxGradation();var _4=this.isMultiFacet()&&this.isStacked();var _5=this.isMultiFacet()&&!this.isStacked();var _6=(this.chartType=="Column");var _7=this.dataMargin;var _8=this.isMultiFacet()?_3[0].series.length:1;var _9=_8;var _10=_3.length;var _11=_5?_10*_9:_3.length;var _12=(_6?_1.width:_1.height)-(2*_7);var _13=!_5?this.barMargin:Math.min(50,Math.round(this.barMargin*this.clusterMarginRatio));var _14=(_11*this.barMargin)+(_5?_10*_13:0);var _15=Math.max(100,_12-_14);var _16=Math.floor(_15/ _11);if(_16<this.minBarThickness){_16=this.minBarThickness}else if(_16>this.maxBarThickness){_16=this.maxBarThickness}
var _17=_5?((_16+this.barMargin)*_9):_16;var _18=_3.length<2?0:Math.round((_12-(_3.length*_17))/(_3.length-1));if(_5){var _19=Math.max(1,Math.round(_18/ this.clusterMarginRatio));_17=(_16+_19)*_9;_18=_3.length<2?0:Math.round((_12-(_3.length*_17))/(_3.length-1))}
var _20=_17+_18;var _21=_12-(_17*_3.length)
-(_18*(_3.length-1));_7+=Math.round(_21/ 2);if(this.logIsDebugEnabled("chartDraw")){this.logDebug("availableSpace: "+_12+", availableBarSpace: "+_15+", bars per cluster: "+_9+", final gap between clusters/bars: "+_18+", final within-cluster bar margin: "+_19+", barThickness: "+_16+", extraSpace: "+_16,"chartDraw")}
_13=_4?0:_13;var _22=(_6?_1.left:_1.top)+_7;if(this.isMultiFacet()){for(var i=0;i<_3.length;i++){var _24=0;for(var j=0;j<_3[i].series.length;j++){var _26=_22+(i*_20);if(_5)_26+=(j*(_16+_19));var _27=_3[i].series[j];var _28=this.getValueCoord(_24,_6);var _29=this.getValueCoord(_24+_27.value,_6)-_28;if(_4&&_27.value)_24+=_27.value;var _30=isc.shallowClone(this.barProperties);if(!this.useAutoGradients){_30.fillColor=this.getDataColor(j)}else{_30.fillGradient=this.getDataGradient(j)}
this.drawBar(_26,_28,_16,_29,_30)}
var _26=_22+(i*_20);var _31=_26+Math.floor(_17/ 2);this.drawDataLabel(_31,_3[i].title,_6)}}else{var _28=this.getValueCoord(0,_6);for(var i=0;i<_3.length;i++){var _26=(i*_20)+_22,_29=this.getValueCoord(_3[i].value,_6)-_28;var _30=isc.shallowClone(this.barProperties);if(!this.useAutoGradients){_30.fillColor=this.getDataColor(i)}else{_30.fillGradient=this.getDataGradient(i)}
this.drawBar(_26,_28,_16,_29,_30);this.drawDataLabel(Math.round(_26+(_16/ 2)),_3[i].title,_6)}}}
,isc.A.drawBar=function isc_FacetChart_drawBar(_1,_2,_3,_4,_5){var _6=(this.chartType=="Column");if(_6)return this.drawRect(_1,_2-Math.abs(_4),_3,Math.abs(_4),_5);else return this.drawRect(_2,_1,_4,_3,_5)}
,isc.A.drawRect=function isc_FacetChart_drawRect(_1,_2,_3,_4,_5){var _6=isc.DrawRect.create({autoDraw:true,drawPane:this,left:_1,top:_2,width:_3,height:_4},_5);return _6}
,isc.A.drawDataSeriesLine=function isc_FacetChart_drawDataSeriesLine(_1,_2){this.drawDataLine(_1,{lineColor:this.getDataColor(_2)})}
,isc.A.drawDataShape=function isc_FacetChart_drawDataShape(_1,_2){var _3=this.dataShapeProperties;if(!this.hasShadows)_3.shadow=null;var _4=isc.DrawPath.create({drawPane:this,points:_1,autoDraw:true},_3,_2);return _4}
,isc.A.drawDataLine=function isc_FacetChart_drawDataLine(_1,_2){var _3=this.isFilled()?this.dataOutlineProperties:this.dataLineProperties;if(!this.hasShadows)_3.shadow=null;var _4=isc.DrawPath.create({drawPane:this,points:_1,autoDraw:true},_3,_2);return _4}
,isc.A.drawValueLine=function isc_FacetChart_drawValueLine(_1,_2,_3){var _4=isc.DrawLine.create({drawPane:this,startPoint:_1,endPoint:_2,autoDraw:true},this.valueLineProperties,_3)}
,isc.A.drawPieData=function isc_FacetChart_drawPieData(){var _1=this.getChartRect(),_2=this.getChartCenter(),_3=Math.min(_1.width,_1.height)/2-(this.getChartRectLineWidth()*2),_4=this.getOrderedData(),_5=(this.shouldShowDoughnut()?(_3*this.doughnutRatio):0);var _6=20;if(this.isMultiFacet()){var _7=_4[0].series.length;if(this.stacked){_3=this.getAvailableRadius()}
var _8=_3-_5,_9=_8/ _7,_10=360/_7;var _11=Math.ceil(Math.sqrt((_1.width/ _1.height)*_7)),_12=Math.ceil(_7/ _11),_13=_7%_11==0?_11:_7%_11;if(_13<_11&&(_12-1)<=(_11-1-_13)){_11-=1;_13+=(_12-1)}
var _14=Math.min(_1.width/ _11,_1.height/ _12),_15=(_14-_6)/2,_16=(_1.width-(_11*_14))/2,_17=(_1.width-(_13*_14))/2;var _18=_4.getProperty("series");for(var i=0;i<_7;i++){var _20=_18.getProperty(i),_21=_20.getProperty("value"),_22=_21.sum(),_23=_4[0].series[i].title;if(this.stacked){var _24=_3-(_9*i);this.drawPieSeries(_21,_22,_2,_24,(i!=0));var _25=this.pieLabelAngleStart+(_10*i);this.drawRadialLabel(_2,_3+this.pieLabelLineExtent,_25,_23);var _26=isc.GraphMath.polar2screen(_25,_24-(_9/ 2),_2,true),_27=isc.GraphMath.polar2screen(_25,_3+this.pieLabelLineExtent,_2,true);this.drawValueLine(_26,_27,this.pieLabelLineProperties)}else{var _28=Math.floor(i/ _11);var _29=_1.top+(_28*_14);var _30=_1.left+((i%_11)*_14);if(_28==_12-1)_30+=_17;else _30+=_16;var _31=[_30+(_6/ 2)+_15,_29+_6+_15];this.drawPieSeries(_21,_22,_31,_15);if(this.shouldShowDoughnut()){isc.DrawOval.create({drawPane:this,autoDraw:true,centerPoint:_31,radius:_15*this.doughnutRatio,shadow:this.hasShadows?{blur:5,color:"#333333",offset:[0,0]}:null},this.doughnutHoleProperties)}
var _32=this.measureLabel(_23,this.dataLabelProperties);this.drawLabel(_30+(_14/ 2)-(_32.width/ 2),_29+(_6/ 2)-(_32.height/ 2),_23,this.dataLabelProperties)}}}else{var _21=_4.getProperty("value"),_22=_21.sum();this.drawPieSeries(_21,_22,_2,_3,false)}
if(this.shouldShowDoughnut()&&(!this.isMultiFacet()||this.stacked)){isc.DrawOval.create({drawPane:this,autoDraw:true,centerPoint:_2,radius:_5,shadow:this.hasShadows?{blur:5,color:"#333333",offset:[0,0]}:null},this.doughnutHoleProperties)}}
,isc.A.drawPieSeries=function isc_FacetChart_drawPieSeries(_1,_2,_3,_4,_5){if(this.showShadows&&this.hasShadows&&!_5){isc.DrawOval.create({drawPane:this,autoDraw:true,centerPoint:_3,radius:_4-1,shadow:{blur:8,color:"#111111",offset:[2,2]}},this.pieBorderProperties,this.shadowProperties)}
var _6=0;for(var i=0;i<_1.length;i++){var _8=_1[i],_9=(_8/ _2)*360;isc.DrawSector.create({drawPane:this,autoDraw:true,centerPoint:_3,radius:_4,startAngle:Math.floor(_6),endAngle:Math.ceil(_6+_9),fillColor:!this.useAutoGradients?this.getDataColor(i):null,fillGradient:this.useAutoGradients?this.getDataGradient(i):null},this.pieSliceProperties)
_6+=_9}
if(_5){isc.DrawOval.create({drawPane:this,autoDraw:true,centerPoint:_3,radius:_4},_5?this.pieRingBorderProperties:this.pieBorderProperties)}}
,isc.A.getYAxisMetric=function isc_FacetChart_getYAxisMetric(){return this.metricFacet.values[0].id}
,isc.A.getXAxisMetric=function isc_FacetChart_getXAxisMetric(){return this.metricFacet.values[1].id}
,isc.A.getHGradations=function isc_FacetChart_getHGradations(){var _1=this.getMaxValue(this.getXAxisMetric());var _2=Math.max(150,this.getInnerContentWidth()-(2*this.chartRectMargin)-300);return this.getGradations(_1,true,false,false,_2)}
,isc.A.drawScatterData=function isc_FacetChart_drawScatterData(){var _1=0,_2=this.getMaxValue(this.getXAxisMetric()),_3=0,_4=this.getGradations().last();var _5=this.getHGradations();this.drawGradations(false,_5);for(var i=0;i<_5.length;i++){var _7=this.getXCoord(_5[i],_5,false);this.drawDataLabel(_7,_5[i])}
var _8;if(this.facets.length<2){this.drawScatterSeries(this.data,0,_1,_2,_3,_4)}else{var _9=this.facets[1];for(var i=0;i<_9.values.length;i++){var _10=this.data.findAll(_9.id,_9.values[i].id);this.drawScatterSeries(_10,i,_1,_2,_3,_4)}}}
,isc.A.drawScatterSeries=function isc_FacetChart_drawScatterSeries(_1,_2,_3,_4,_5,_6){var _7=this.getChartRect(),_8=this.getXAxisMetric(),_9=this.getYAxisMetric(),_10=[],_11=[];for(var i=0;i<_1.length;i++){var _13=_1[i],_14=_13[_8],_15=_13[_9],_16=_7.left+(_14/(_4-_3))*(_7.width),_17=this.getYCoord(_15);_10.add([_16,_17]);_11.add(_15)}
if(this.showScatterLines){this.drawDataSeriesLine(_10,_2)}
this.drawPoints(_10,_1,_2,_11);if(this.lowErrorMetric!=null){this.drawErrorBars(_10,_1,_2,_6,_7)}}
,isc.A.drawDataPoint=function isc_FacetChart_drawDataPoint(_1,_2,_3,_4,_5){var _6=this.getDataColor(_2),_7=this.pointShapes[_2%this.pointShapes.length];_3=_3||this.dataPointSize;var _7=this["draw"+_7+"Point"](_6,_1,_3);if(this.interactivePoints){_3+=2;if(_3<this.minKnobSize)_3=this.minKnobSize;var _8=isc.DrawKnob.create({autoDraw:false,drawPane:this,knobShape:_7,dataRecord:_4,dataValue:_5,x:this.getLeftPadding()+_1[0],y:this.getTopPadding()+_1[1],width:_3,height:_3,overflow:"hidden",border:this.showKnobs?"1px solid black":"none",cursor:"arrow",canHover:true,hover:function(){if(this.drawPane.pointHover){return this.drawPane.pointHover(this.dataValue,this.dataRecord,this.knobShape,this)}},getHoverHTML:function(){if(this.drawPane.getPointHoverHTML){return this.drawPane.getPointHoverHTML(this.dataValue,this.dataRecord,this.knobShape,this)}else return null},click:function(){if(this.drawPane.pointClick){return this.drawPane.pointClick(this.dataValue,this.dataRecord,this.knobShape,this)}}})
this.addChild(_8);this.knobs=this.knobs||[];this.knobs.add(_8)}}
,isc.A.drawOvalPoint=function isc_FacetChart_drawOvalPoint(_1,_2,_3){return isc.DrawOval.create({drawPane:this,autoDraw:true,fillColor:_1,centerPoint:_2,radius:Math.round(_3/ 2)})}
,isc.A.drawSquarePoint=function isc_FacetChart_drawSquarePoint(_1,_2,_3,_4){return isc.DrawRect.create({drawPane:this,autoDraw:true,fillColor:_1,left:_2[0]-Math.round(_3/ 2),top:_2[1]-Math.round(_3/ 2),width:_3,height:_3,rotation:_4})}
,isc.A.drawDiamondPoint=function isc_FacetChart_drawDiamondPoint(_1,_2,_3){return this.drawSquarePoint(_1,_2,_3,45)}
,isc.A.drawTrianglePoint=function isc_FacetChart_drawTrianglePoint(_1,_2,_3,_4){var _5=[];var _6=Math.round(_3/ 2);_5.push([_2[0]-_6,_2[1]+_6]);_5.push([_2[0]+_6,_2[1]+_6]);_5.push([_2[0],_2[1]-_6]);return isc.DrawTriangle.create({drawPane:this,autoDraw:true,fillColor:_1,points:_5})}
,isc.A.prepareForDragging=function isc_FacetChart_prepareForDragging(){this.Super("prepareForDragging",arguments);var _1=this.getChartRect();this.hoopSelectorRect=[this.getPageLeft()+_1.left,this.getPageTop()+_1.top,_1.width,_1.height]}
,isc.A.updateHoopSelection=function isc_FacetChart_updateHoopSelection(){}
,isc.A.drawTitle=function isc_FacetChart_drawTitle(){if(!this.showTitle){this.$78t={left:0,top:0,width:0,height:0}
return}
var _1=this.$78t=this.measureLabel(this.title||" ",this.titleProperties);var _2=Math.floor((this.getInnerContentWidth()/2)-(_1.width/ 2));this.$78h=this.drawLabel(_2,0,this.title||" ",this.titleProperties)}
,isc.A.setTitle=function isc_FacetChart_setTitle(_1){this.title=_1;this.setData(this.data)}
,isc.A.setShowTitle=function isc_FacetChart_setShowTitle(_1){this.showTitle=_1;this.setData(this.data)}
,isc.A.shouldShowLegend=function isc_FacetChart_shouldShowLegend(){if(this.showLegend!==false&&(this.isMultiFacet()||this.isPieChart()||(this.chartType=="Scatter"&&this.facets.length>1)))this.drawLegend()}
,isc.A.getLegendFacet=function isc_FacetChart_getLegendFacet(){return this.isPieChart()?this.facets[0]:this.facets[1]}
,isc.A.drawLegend=function isc_FacetChart_drawLegend(){this.logDebug("drawing legend","chartDraw");var _1=this.legendSwatchSize;var _2=this.legendPadding;var _3=this.legendItemPadding;var _4=this.legendTextPadding;var _5=this.legendRowPadding;var _6=this.getLegendFacet();if(!_6.values)return;var _7=[];for(var i=0;i<_6.values.getLength();i++){var _9=_6.values[i];_7.add({title:_9.title||_9.id})}
var _10=this.getInnerWidth();var _11=_2;var _12=1;for(var i=0;i<_7.length;i++){var _13=this.measureLabel(_7[i].title,this.legendLabelProperties);var _14=_1+_4+_13.width;if(_11+_14+_2>_10){_12++;_11=_2}
if(i!=_7.length-1){_14+=_3}
_7[i].width=_13.width;_7[i].height=_13.height;_7[i].rowNum=_12;_7[i].left=_11;_11+=_14}
_11+=_2;var _15,_16,_17,_18;if(_12>1){_18=_10}else{_18=_11}
_16=(_12*_1)+(_2*2)+((_12-1)*_5);_17=this.getInnerContentHeight()-_16;if(_18==_10)_15=0;else _15=Math.floor((_10/ 2)-(_18/ 2));this.$78k={left:_15,top:_17,width:_18,height:_16};if(this.showLegendRect){this.drawRect(_15,_17,_18,_16,this.legendRectProperties)}
for(i=0;i<_7.length;i++){var _19=_7[i].width;var _11=_15+_7[i].left;var _20=_7[i].rowNum;var _21=_17+((_1+_5)*(_20-1))+_2;this.drawRect(_11,_21,_1,_1,isc.addProperties({fillColor:this.getDataColor(i)},this.legendSwatchProperties));_11+=_1+_4;this.drawLabel(_11,_21+Math.round((_1-this.getDataLabelHeight())/2),_7[i].title,this.legendLabelProperties)}}
,isc.A.getDataColor=function isc_FacetChart_getDataColor(_1){var _2=this.dataColors[_1%this.dataColors.length];return(!isc.startsWith(_2,"#"))?"#"+_2:_2}
,isc.A.getDataGradient=function isc_FacetChart_getDataGradient(_1){var _2=this.getDataColor(_1);var _3=this.chartType+_2;if(!this.dataGradients[_3]){switch(this.chartType){case"Bar":this.dataGradients[_3]=this.createLinearGradient(_3,{x1:'0%',y1:'0%',x2:'0%',y2:'100%',colorStops:[{color:this.getClass().mixrgb(_2,"-#0A0A0A"),offset:0.0},{color:_2,offset:0.2},{color:this.getClass().mixrgb(_2,"+#333333"),offset:0.4},{color:_2,offset:0.7},{color:this.getClass().mixrgb(_2,"-#111111"),offset:1.0}]});break;case"Column":this.dataGradients[_3]=this.createLinearGradient(_3,{x1:'0%',y1:'0%',x2:'100%',y2:'0%',colorStops:[{color:this.getClass().mixrgb(_2,"-#0A0A0A"),offset:0.0},{color:_2,offset:0.2},{color:this.getClass().mixrgb(_2,"+#333333"),offset:0.4},{color:_2,offset:0.7},{color:this.getClass().mixrgb(_2,"-#111111"),offset:1.0}]});break;case"Area":case"Line":this.dataGradients[_3]=this.createLinearGradient(_3,{x1:0,x2:0,y1:"0%",y2:"100%",colorStops:[{color:this.getClass().mixrgb(_2,"+#555555"),offset:0.0},{color:this.getClass().mixrgb(_2,"+#222222"),offset:0.3},{color:this.getClass().mixrgb(_2,"-#333333"),offset:1.0}]});break;case"Doughnut":case"Pie":this.dataGradients[_3]=this.createRadialGradient(_3,{cx:0,cy:0,r:'72%',fx:0,fy:0,colorStops:[{color:_2,offset:0.0},{color:_2,offset:this.isVML?0.8:0.9},{color:this.getClass().mixrgb(_2,"-#222222"),offset:this.isVML?0.9:0.95},{color:this.getClass().mixrgb(_2,"-#666666"),offset:1.0}]});break;default:this.dataGradients[_3]=this.createLinearGradient(_3,{x1:'0%',y1:'0%',x2:'0%',y2:'100%',colorStops:[{color:this.getClass().mixrgb(_2,"+"+(this.isVML?"#111111":"#222222")),offset:0.0},{color:_2,offset:0.4},{color:_2,offset:0.6},{color:this.getClass().mixrgb(_2,"-"+(this.isVML?"#111111":"#1A1A1A1A")),offset:1.0}]});break}}
return _3}
);isc.evalBoundary;isc.B.push(isc.A.getRadarShapeGradient=function isc_FacetChart_getRadarShapeGradient(_1,_2,_3,_4){var _5=this.getClass().mixrgb(_1,"+#444444");var _6=this.getClass().mixrgb(_1,"-#444444");var _7=0.01,_8=Number.MAX_VALUE;for(var i=0;i<_2.length;++i){var _10=isc.GraphMath.straightDistance(_2[i],_3);_7=Math.max(_10,_7);_8=Math.min(_10,_8)}
if(_4)_8=0;var _11=_8/ _7;return{cx:0,cy:0,r:_7,fx:0,fy:0,colorStops:[{color:_5,offset:0},{color:_5,offset:_11},{color:_6,offset:1.0}]}}
,isc.A.drawLabel=function isc_FacetChart_drawLabel(_1,_2,_3,_4,_5){var _6=(_5?this.rotateProps:null);var _7=isc.DrawLabel.create({autoDraw:true,drawPane:this,left:_1,top:_2,contents:_3},_4,_6);return _7}
,isc.A.measureLabel=function isc_FacetChart_measureLabel(_1,_2){var _3=this.$83a=this.$83a||{};if(!_2)_2={};var _4=_2.fontFamily||isc.DrawLabel.getInstanceProperty('fontFamily'),_5=_2.fontWeight||isc.DrawLabel.getInstanceProperty('fontWeight'),_6=_2.fontSize||isc.DrawLabel.getInstanceProperty('fontSize'),_7=_2.fontStyle||isc.DrawLabel.getInstanceProperty('fontStyle');if(!this.$78l){this.$78l=isc.Canvas.create({top:-1000,overflow:"visible",autoDraw:true,height:1,width:1})}
var _8="font-family:"+_4+";font-weight:"+_5+";font-size:"+_6+"px;font-style:"+_7+";white-space:nowrap";var _9="<span style='"+_8+"'>"+_1+"</span>";if(_3[_9]!=null&&isc.isA.Number(_3[_9].width)){return _3[_9]}
this.$78l.setContents(_9);this.$78l.redraw("label measurement: "+_1);var _10={width:this.$78l.getVisibleWidth(),height:this.$78l.getVisibleHeight()};return(_3[_9]=_10)}
);isc.B._maxIndex=isc.C+102}else{isc.defineClass("FacetChart","Canvas","Chart");isc.A=isc.FacetChart;isc.A.invalidClass=true;isc.A.invalidErrorMessage="FacetChart class requires optional Drawing module which is "+"not loaded. Please make sure the Drawing module is included in this page "+"before the Charts module.";isc.A=isc.FacetChart.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.B.push(isc.A.initWidget=function isc_FacetChart_initWidget(){this.logWarn(isc.FacetChart.invalidErrorMessage);this.Super("initWidget",arguments)}
);isc.B._maxIndex=isc.C+1}
isc.A=isc.FacetChart;isc.A.allChartTypes=["Area","Column","Bar","Line","Pie","Doughnut","Radar"];isc._moduleEnd=isc._Charts_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('Charts module init time: ' + (isc._moduleEnd-isc._moduleStart) + 'ms','loadTime');delete isc.definingFramework;}else{if(window.isc && isc.Log && isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'Charts'.");}

/*

  SmartClient Ajax RIA system
  Version v8.2p_2012-10-08/EVAL Development Only (2012-10-08)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

