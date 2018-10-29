
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

if(window.isc&&window.isc.module_Core&&!window.isc.module_VisualBuilder){isc.module_VisualBuilder=1;isc._moduleStart=isc._VisualBuilder_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log && isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={ message:'VisualBuilder load/parse time: ' + (isc._moduleStart-isc._moduleEnd) + 'ms', category:'loadTime'};
if(isc.Log && isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime')
else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM
else isc._preLog=[isc._pTM]}isc.definingFramework=true;isc.ClassFactory.defineClass("VisualBuilder","VLayout");isc.A=isc.VisualBuilder;isc.A.titleEditEvent="doubleClick";isc.A=isc.VisualBuilder.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.vertical=true;isc.A.sControlIsomorphicDir="http://www.isomorphic.com/isomorphic/";isc.A.sControlSkin="SmartClient";isc.A.workspacePath="[VBWORKSPACE]";isc.A.workspaceURL="workspace/";isc.A.basePathRelWorkspace="..";isc.A.webRootRelWorkspace="../../..";isc.A.helpPaneProperties={headerTitle:"About Visual Builder",contentsURL:"visualBuilderHelp.html"};isc.A.canEditExpressions=true;isc.A.typeCount={};isc.A.dirty=false;isc.A.workspaceDefaults={_constructor:"TLayout",vertical:false,autoDraw:false,backgroundColor:isc.nativeSkin?null:"black"};isc.A.leftStackDefaults={_constructor:"TSectionStack",autoDraw:false,width:280,showResizeBar:true,visibilityMode:"multiple"};isc.A.middleStackDefaults={_constructor:"TSectionStack",autoDraw:false,showResizeBar:true,resizeBarTarget:"next",visibilityMode:"multiple",styleName:"pageBackground"};isc.A.modeSwitcherDefaults={_constructor:"TDynamicForm",autoDraw:false,autoParent:"middleStack",numCols:7,initWidget:function(){this.Super("initWidget",arguments);this.setValue("skin",this.creator.skin)},setNativeSkin:function(_1){this.creator.doAutoSave(this.getID()+".doSetNativeSkin('"+_1+"')")},doSetNativeSkin:function(_1){var _2=isc.clone(isc.params);_2.useNativeSkin=_1=="useNativeSkin"?1:0;var _3=location.href;if(_3.contains("?"))_3=_3.substring(0,_3.indexOf("?"));_3+="?";for(var _4 in _2){_3+=encodeURIComponent(_4)+"="+encodeURIComponent(_2[_4])+"&"}
_3=_3.substring(0,_3.length-1);isc.Cookie.set(this.creator.loadAutoSaveCookie,"true");location.replace(_3)},setSkin:function(_1){this.creator.doAutoSave(this.getID()+".doSetSkin('"+_1+"')")},doSetSkin:function(_1){var _2=isc.clone(isc.params);_2.skin=_1;var _3=location.href;if(_3.contains("?"))_3=_3.substring(0,_3.indexOf("?"));_3+="?";for(var _4 in _2){_3+=encodeURIComponent(_4)+"="+encodeURIComponent(_2[_4])+"&"}
_3=_3.substring(0,_3.length-1);isc.Cookie.set(this.creator.loadAutoSaveCookie,"true");location.replace(_3)},setResolution:function(_1){var s=_1.split("x");var _3=parseInt(s[0].trim());var _4=parseInt(s[1].trim());this.creator.middleStack.setWidth(_3);this.creator.rootLiveObject.setHeight(_4)},fields:[{name:"useToolSkin",editorType:"TSelectItem",width:160,showTitle:false,titleAlign:"top",valueMap:{useToolSkin:"Use high contrast tool skin",useNativeSkin:"Use app skin for tools "},defaultValue:isc.nativeSkin?"useNativeSkin":"useToolSkin",changed:"form.setNativeSkin(value)"},{name:"skin",editorType:"TSelectItem",width:100,titleAlign:"top",wrapTitle:false,valueMap:{Enterprise:"Enterprise",EnterpriseBlue:"Enterprise Blue",Graphite:"Graphite",Simplicity:"Simplicity",fleet:"Fleet",TreeFrog:"TreeFrog",SilverWave:"SilverWave",BlackOps:"Black Ops"},title:"App Skin",change:"form.setSkin(value)"},{name:"resolution",editorType:"TSelectItem",width:100,valueMap:["1024x768","1280x1024"],title:"Resolution",change:"form.setResolution(value)"},{name:"switcher",showTitle:false,title:"Component mode",valueMap:["Live","Edit"],vertical:false,editorType:"TRadioGroupItem",wrapTitle:false,changed:function(_1,_2,_3){var _4=_3=="Edit";var _5=_1.creator.projectComponents.data;for(var i=0;i<_5.getLength();i++){var _7=_5.get(i);var _8=_7.liveObject;if(_8.setEditMode){_8.setEditMode(_4,_1.creator.projectComponents,_7)}else{_8.editingOn=_4}}
_1.creator.editingOn=_4;isc.EditContext.setEditMode(_4)}}]};isc.A.rightStackDefaults={_constructor:"TSectionStack",autoDraw:false,width:200,visibilityMode:"multiple"};isc.A.canvasItemWrapperConstructor="CanvasItem";isc.A.canvasItemWrapperDefaults={showTitle:false,colSpan:"*",width:"*"};isc.A.simpleTypeNodeConstructor="FormItem";isc.A.simpleTypeNodeDefaults={isGroup:true,cellPadding:5,showComplexFields:false,doNotUseDefaultBinding:true};isc.A.complexTypeNodeConstructor="DynamicForm";isc.A.complexTypeNodeDefaults={isGroup:true,cellPadding:5,showComplexFields:false,doNotUseDefaultBinding:true};isc.A.repeatingComplexTypeNodeDefaults={autoFitData:"vertical",leaveScrollbarGap:false};isc.A.paletteNodeDSDefaults={_constructor:"DataSource",ID:"paletteNode",recordXPath:"/PaletteNodes/PaletteNode",fields:{name:{name:"name",type:"text",length:8,required:true},title:{name:"title",type:"text",title:"Title",length:128,required:true},className:{name:"className",type:"text",title:"Class Name",length:128,required:true},icon:{name:"icon",type:"image",title:"Icon Filename",length:128},iconWidth:{name:"iconWidth",type:"number",title:"Icon Width"},iconHeight:{name:"iconHeight",type:"number",title:"Icon Height"},iconSize:{name:"iconSize",type:"number",title:"Icon Size"},showDropIcon:{name:"showDropIcon",type:"boolean",title:"Show Drop Icon"},defaults:{name:"defaults",type:"Canvas",propertiesOnly:true},children:{name:"children",type:"paletteNode",multiple:true}}};isc.A.libraryComponentsDefaults={_constructor:"TTreePalette",defaultEditContext:"projectComponents",autoShowParents:true,autoDraw:false,cellHeight:22,showRoot:false,showHeader:false,selectionType:Selection.SINGLE,treeFieldTitle:"Form Items",canDragRecordsOut:true,canAcceptDroppedRecords:false,dragDataAction:TreeViewer.COPY,iconSize:16,folderOpenImage:"cubes_blue.gif",folderClosedImage:"cubes_blue.gif",folderDropImage:"cubes_green.gif",fileImage:"cube_blue.gif"};isc.A.dataSourceListDefaults={_constructor:"TListPalette",showHeaderMenuButton:false,autoDraw:false,height:"40%",selectionType:"single",canDragRecordsOut:true,editSelectedDataSource:function(){var _1=this.getSelectedRecord();if(_1)isc.DS.get(_1.ID,this.creator.getID()+".showDSEditor(ds)")},doubleClick:function(){this.editSelectedDataSource()},selectionChanged:function(){this.creator.dsEditButton.setDisabled(this.getSelectedRecord()==null)},fields:[{name:"ID",width:"*"},{name:"type",title:"Type",width:65},{name:"download",showTitle:false,width:22}],formatCellValue:function(_1,_2,_3,_4){var _5=this.getField(_4);if(_5.name=="download"){return this.imgHTML("[SKINIMG]/actions/download.png",null,null,null,null,this.widgetImgDir)}else return _1},cellClick:function(_1,_2,_3){var _4=this.getField(_3);if(_4.name=="download"){isc.DS.get(_1.ID,this.creator.getID()+".downloadDataSource(ds)")}else return this.Super("cellClick",arguments)}};isc.A.dataSourceListToolbarDefaults={_constructor:"TLayout",vertical:false,autoDraw:true,membersMargin:10,height:20};isc.A.dsNewButtonDefaults={_constructor:"TButton",autoDraw:false,title:"New...",width:70,click:"this.creator.showDSWizard()",autoParent:"dataSourceListToolbar"};isc.A.dsEditButtonDefaults={_constructor:"TButton",autoDraw:false,disabled:true,title:"Edit...",width:70,click:"this.creator.dataSourceList.editSelectedDataSource()",autoParent:"dataSourceListToolbar"};isc.A.projectComponentsMenuDefaults={_constructor:"Menu",autoDraw:false,showIcon:false,enableIf:"var selection = target ? target.getSelection() : null, node = selection ? selection[0] : null",data:[{title:"Remove",enableIf:"node != null",click:function(_1){var _2=_1.getSelection();for(var i=0;i<_2.length;i++){var _4=_2[i];_1.destroyComponent(_4)}
_1.data.removeList(_2)}},{title:"Edit",enableIf:"node != null",click:function(_1,_2,_3){var _4=_1.getSelection()[0];_3.creator.editComponent(_4,_3.creator.projectComponents.getLiveObject(_4))}}]};isc.A.projectComponentsDefaults={_constructor:"TEditTree",showHeaderMenuButton:false,autoDraw:false,canSort:false,leaveScrollbarGap:false,nodeClick:function(_1,_2){this.hiliteSelected();this.creator.editComponent(_2,this.getLiveObject(_2))},hiliteSelected:function(){var _1=this.getSelectedRecord(),_2=_1?_1.liveObject:null;if((isc.isA.Canvas(_2)||isc.isA.FormItem(_2))&&_2.isDrawn()&&_2.isVisible()){isc.EditContext.selectCanvasOrFormItem(_2)}},autoShowParents:true,addNode:function(_1,_2,_3,_4,_5){_1=this.Super("addNode",arguments);if(!_1)return;if(!_1.dropped||(_1.loadData!=null&&!_1.isLoaded))return _1;var _6=isc.ClassFactory.getClass(_1.type);if(_6!=null&&_6.isA(isc.DataSource)){var _7=_1.liveObject,_8=_7.serverType||_7.type||_7.dataSourceType,_9=_2,_10=_2.liveObject;if((isc.isA.ListGrid(_10)||isc.isA.TileGrid(_10))&&(_8=="sql"||_8=="hibernate"||_7.dataURL!=null||_7.clientOnly||_7.serviceNamespace!=null)&&!_7.noAutoFetch&&_10.autoFetchData!=false)
{_9.initData.autoFetchData=true;if(isc.SForce&&isc.isA.SFDataSource(_7)&&!isc.SForce.sessionId){var _11=this;isc.SForce.ensureLoggedIn(function(){_10.fetchData()},true)}else{_10.fetchData()}}}
var _12=this.getLiveObject(_1);if(!_12.getEditableProperties)return;if(_12.setEditableProperties){_12.setEditableProperties({});if(_12.markForRedraw)_12.markForRedraw();else if(_12.redraw)_12.redraw()}
this.selection.delayCall("selectSingle",[_1]);this.delayCall("hiliteSelected",[true]);this.nodeClick(this,_1);return _1},removeNode:function(_1,_2,_3,_4,_5){this.Super("removeNode",[_1,_2,_3,_4,_5],arguments);this.creator.componentRemoved(_1)},removeAll:function(){this.creator.clearComponent();return this.Super("removeAll",arguments)},destroyAll:function(){this.creator.clearComponent();return this.Super("destroyAll",arguments)},folderOpenImage:"cubes_blue.gif",folderClosedImage:"cubes_blue.gif",folderDropImage:"cubes_green.gif",fileImage:"cube_blue.gif",hasComponents:function(){var _1=this.getData();var _2=_1.getLength();return _2>1||(_2==1&&_1.get(0).type!="DataView")},checkDiscardProject:function(_1,_2,_3){var _4=this;isc.confirm("Discard current project?",function(_5){if(_5){_4.destroyAll();isc.Class.fireCallback(_1,_2,_3)}})},loadView:function(_1,_2){var _3=this,_4=_3.creator;if(!_2&&this.hasComponents())
{this.checkDiscardProject(this.getID()+".loadView(screenName,confirmed)","screenName,confirmed",[_1,true]);return}
this.currentScreen=_1;var _5=_4.workspacePath+"/"+_1+".xml";this.loadNodeTreeFromFile(_5,{target:this,methodName:"addNodeTree"})},loadViewFromFile:function(_1){this.currentScreen=_1;this.loadNodeTreeFromFile(_1,{target:this,methodName:"addNodeTree"})},loadViewFromURL:function(_1){var _2=this,_3=_2.creator;this.currentScreen=_1;isc.RPCManager.send(null,function(_4){_2.loadNodeTree(_4,{target:_2,methodName:"addNodeTree"})},{actionURL:_1,useSimpleHttp:true,dataProtocol:"postMessage"})},loadViewFromXML:function(_1,_2){this.currentScreen=_2;this.loadNodeTreeFromXML(_1,{target:this,methodName:"addNodeTree"})},loadViewFromJS:function(_1,_2){this.currentScreen=_2;this.loadNodeTreeFromJS(_1,{target:this,methodName:"addNodeTree"})},loadNodeTreeFromFile:function(_1,_2){var _3=this,_4=_3.creator,_5=_2;_4.currentRepo.loadObject({criteria:{path:_1}},function(_6){_3.loadNodeTreeFromJS(_6,_5)})},loadNodeTreeFromXML:function(_1,_2){var _3=this,_4=_2;isc.DMI.callBuiltin({methodName:"xmlToJS",arguments:[_1],callback:function(_5){_3.loadNodeTree(_5.data,_4)}})},loadNodeTreeFromJS:function(_1,_2){this.loadNodeTree(_1,_2)},loadNodeTree:function(_1,_2){this.logDebug("fileContents: "+_1,"loadProject");this.nodeTreeLoadedCallback=_2;isc.captureInitData=true;isc.Class.globalEvalWithCapture(_1,{target:this,methodName:"nodeTreeLoaded"},null,false)},nodeTreeLoaded:function(_1,_2){this.getCapturedComponents(_1,_2);if(this.nodeTreeLoadedCallback){isc.Class.fireCallback(this.nodeTreeLoadedCallback,["paletteNodes"],[this.capturedComponents],this);this.nodeTreeLoadedCallback=null}
return this.capturedComponents},viewLoaded:function(_1){this.logDebug("fileContents: "+_1,"loadProject");isc.captureInitData=true;isc.Class.globalEvalWithCapture(_1,{target:this,methodName:"addViewToTree"},null,false)},addViewToTree:function(_1,_2){this.getCapturedComponents(_1,_2);this.addNodeTree(this.capturedComponents);this.creator.setIsDirty(false)},getCapturedComponents:function(_1,_2){isc.captureInitData=null;if(_2){isc.warn("The following error occurred during loading of your view<br><br>: "+_2+".<br><br>  The portion of the view that loaded succesfully will be shown.")}
var _3=this.capturedComponents=isc.capturedComponents;isc.capturedComponents=null;var _4=(_3?_3.getProperty("defaults").getProperty("ID"):null);this.logInfo("capturedComponents are: "+_4,"loadProject");var _5;for(var i=0;i<_4.length;i++)window[_4[i]]=_5},addNodeTree:function(_1){this.componentsToCreate=[];this.addComponentCalls=[];this.requiredDataSources=[];for(var i=0;i<_1.length;i++){this.addChildComponent(null,_1[i])}
for(var i=0;i<_1.length;i++){if(!_1[i].hasParent){this.addChildComponent(this.data.getRoot(),_1[i])}}
var _3,_4;for(var i=0;i<this.capturedComponents.length;i++){_3=this.capturedComponents[i];_3.component=this.palette.makeNewComponent(_3)}
for(var i=0;i<this.componentsToCreate.length;i++){_3=this.componentsToCreate[i];if(!_3.component){_3.component=this.palette.makeNewComponent(_3)}}
var _5=-1,_6=this.addComponentCalls,_7=[];isc.$75u=true;while(_6.length>0&&_5!=_6.length){_5=_6.length;var _8=_6.duplicate();for(var i=0;i<_8.length;i++){var _9=_8[i],_4=_9[1],_3=_9[0],_10=_9[2];if(_4.name=="/"){this.addComponent(_3.component,this.data.getRoot());_6.remove(_9);_7.add(_9)}else if(this.data.contains(_4.component)){var _11=_3.component;if(this.data.contains(_11)){_11=isc.addProperties({},_11)}
this.addComponent(_11,_4.component,null,_10);_6.remove(_9);_7.add(_9)}}}
delete isc.$75u;if(this.logIsDebugEnabled("loadProject")){this.logDebug("addComponent() calls during project loading:","loadProject");for(var i=0;i<_7.length;i++){var _9=_7[i],_4=_9[1],_3=_9[0];this.logDebug("addComponent("+this.echoLeaf(_3)+","+this.echoLeaf(_4),"loadProject")}}
if(_6.length>0){this.logWarn("the following components could not be added to the project tree: "+isc.echoAll(_6.getProperty("0")))}},makeDSPaletteNode:function(_1,_2){var _3={ID:_1,className:"DataSource",type:_2||"DataSource",title:_1,icon:"DataSource.png",iconSize:16,loadData:function(_3,_4){isc.DS.get(_3.ID,function(_5){_3.liveObject=_5;_3.initData={_constructor:"DataSource",ID:_5.ID};isc.Class.fireCallback(_4,"",[_3])})}};return _3},palette:isc.HiddenPalette.create(),addChildComponent:function(_1,_2,_3){var _4=_2.className;var _5=this.logIsInfoEnabled("loadProject"),_6=this.logIsDebugEnabled("loadProject");if(_5){this.logInfo("inspecting defaults of component: "+this.echoLeaf(_2)+" of type: "+_4,"loadProject")}
var _7=_2.defaults,_8=this,_9=_8.creator;var _10=[],_11=[],_12=isc.DS.get(_4);for(var _13 in _7){var _14=_7[_13];if(!isc.isAn.Array(_14)){_11[0]=_14;_14=_11}else if(_6){this.logDebug("checking Array property: "+_13+", value: "+this.echoLeaf(_14)+(_17?" with schema: "+_17:""),"loadProject")}
var _15=_12?_12.getField(_13):null,_16=_15?_15.type:null,_17=isc.DS.get(_16),_18=false;for(var i=0;i<_14.length;i++){var _20=_14[i];if(_6){this.logDebug("checking property: "+_13+", value: "+this.echoLeaf(_20),"loadProject")}
if(this.capturedComponents.contains(_20)){if(_5){this.logInfo("found capturedComponent: "+this.echoLeaf(_20)+" under property: "+_13+" of component: "+this.echoLeaf(_2),"loadProject")}
_10.add([_13,_20]);_18=true;continue}
if(_20==null){this.logInfo("null property: "+_13+" on component: "+this.echoLeaf(_2))}
var _21=(_20?_20._constructor:null)||_16,_22=isc.ClassFactory.getClass(_21);if(_17&&((_22&&_22.isA(isc.Canvas))||(_22&&_22.isA(isc.DataSource))||(_22&&_22.isA(isc.FormItem))||(this.creator.libraryComponents&&this.creator.libraryComponents.data.find("className",_21)!=null)))
{if(_5){this.logInfo("found palettized component: "+this.echoLeaf(_20)+" of type: "+_21+" under property: "+_13+" of component: "+this.echoLeaf(_2),"loadProject")}
if(isc.isA.String(_20)){var _23=this.capturedComponents.find("ID",_20);if(_23==null){if(isc.DataSource.isA(_16)&&_9.dataSourceList){var _24=_9.dataSourceList.data.find("ID",_20);if(_24){_23=this.makeDSPaletteNode(_20)}}
if(_23==null)continue}
_10.add([_13,_23])}else{var _25=_20;_10.add([_13,{ID:_25.ID,name:_25.name,className:_21,defaults:_25}])}
_18=true}}
if(_18)delete _7[_13]}
var _26=_9.libraryComponents?_9.libraryComponents.data.find("className",_4):null||_9.dataSourceList?_9.dataSourceList.data.find("className",_4):null;if(_26){_2.icon=_2.icon||_26.icon;_2.iconSize=_2.iconSize||_26.iconSize;_2.showDropIcon=_2.showDropIcon||_26.showDropIcon}
this.componentsToCreate.add(_2);if(_1!=null){_2.hasParent=true;this.addComponentCalls.add([_2,_1,_3])}
if(_10.length>0){for(var i=0;i<_10.length;i++){this.addChildComponent(_2,_10[i][1],_10[i][0])}}}};isc.A.codePreviewDefaults={_constructor:"DynamicForm",autoDraw:false,overflow:"auto",browserSpellCheck:false,items:[{name:"codeField",editorType:"TTextAreaItem",showTitle:false,colSpan:"*",width:"*",height:"*"}],saveCode:function(_1,_2){this.creator.updateSource(true);var _3=this.getValue("codeField");if(!_3)return;this.creator.saveSourceToRepo(null,null,_2)},saveToSalesForce:function(){if(!this.$48y){this.$48y=true;var _1=this;isc.say("This feature will save your application to your SalesForce account as an 'SControl'"+", which can be shown in a Custom Tab via the customization interfaces within SalesForce."+"<P>In order to be successfully deployed to SalesForce, an application must consist "+" strictly of SalesForce DataSources, 'clientOnly' DataSources and XJSONDataSources."+"<P>The deployed application does not require Java or other external server functionality, "+"instead accessing SalesForce APIs via SOAP, and loading the SmartClient framework itself "+"as static web assets (from SmartClient.com by default - see the "+"visualBuilder/index.jsp 'builderConfig' block to customize).",function(){_1.saveSControl()})}else{this.saveSControl()}},saveSControl:function(_1){if(!_1){var _2=this;isc.SForce.ensureLoggedIn(function(){_2.saveSControl(true)},true);return}
var _3=this.builder.projectComponents.serializeComponents(true);var _4=this.creator;isc.xml.toJSCode(_3,function(_6,_7){isc.askForValue("Name your SControl :",function(_8){if(_8==null)return;var _5=isc.WebService.get("urn:partner.soap.sforce.com");_5.controlIsomorphicDir=_4.sControlIsomorphicDir;_5.controlSkin=_4.sControlSkin;_5.deploySControl(_8,_7)},{defaultValue:"ISC"})})}};isc.A.jsCodePreviewDefaults={_constructor:"DynamicForm",autoDraw:false,overflow:"auto",browserSpellCheck:false,items:[{name:"codeField",editorType:"TTextAreaItem",showTitle:false,colSpan:"*",width:"*",height:"*"}],setContents:function(_1){this.setValue("codeField",_1)}};isc.A.codePaneDefaults={_constructor:"TTabSet",autoDraw:false,height:"35%",tabSelected:function(_1){this.creator.updateSource()}};isc.A.componentAttributeEditorDefaults={_constructor:"TComponentEditor",autoDraw:false,autoFocus:false,overflow:"auto",alwaysShowVScrollbar:true,showAttributes:true,showMethods:false,backgroundColor:isc.nativeSkin?null:"black",basicMode:true};isc.A.componentMethodEditorDefaults={_constructor:"TComponentEditor",sortFields:true,autoDraw:false,autoFocus:false,overflow:"auto",alwaysShowVScrollbar:true,showAttributes:false,showMethods:true,backgroundColor:isc.nativeSkin?null:"black",basicMode:true};isc.A.editorPaneDefaults={_constructor:"TTabSet",autoDraw:false,paneContainerProperties:{customEdges:["T"]},tabBarProperties:{baseLineCapSize:0},tabBarControls:[isc.Img.create({src:"[SKIN]/../../ToolSkin/images/actions/remove.png",autoDraw:false,width:16,height:16,layoutAlign:"center",cursor:"pointer",canHover:true,showHover:true,prompt:"Delete current component",click:function(){var _1=isc.SelectionOutline.getSelectedObject();if(_1&&_1.editContext){_1.editContext.destroyComponent(_1.editNode);isc.SelectionOutline.deselect();isc.EditContext.hideDragHandle()}}}),isc.LayoutSpacer.create({width:10}),"tabScroller","tabPicker"],tabDeselected:function(_1,_2,_3,_4){this.$710=_2.ID},tabSelected:function(_1,_2,_3,_4){if(!this.$710)return;var _5=this.creator.getCurrentComponent(),_6=_5?_5[this.$710+"BasicMode"]:null,_7=_5?_5[_2.ID+"BasicMode"]:null;if(_6!=_7){this.creator.editComponent(_5,_5.liveObject)}else{this.creator.applyBasicModeSettings()}},selectedEditorName:function(){var _1=this.getTabObject(this.selectedTab);if(_1&&_1.title)return _1.title.toLowerCase();return null},PROPERTIES:"properties",EVENTS:"events"};isc.A.applyButtonDefaults={_constructor:"TButton",resizeable:false,autoDraw:false,title:"Apply",click:"this.creator.saveComponentEditors();",disabled:true,height:20};isc.A.advancedButtonDefaults={_constructor:"TButton",resizeable:false,autoDraw:false,click:function(){var _1=this.creator.getCurrentComponent();this.creator.toggleBasicMode(_1);this.creator.editComponent(_1,_1.liveObject)},disabled:true};isc.A.helpPaneDefaults={_constructor:"THTMLFlow",padding:10,autoDraw:false,overflow:"auto"};isc.A.fileMenuButtonDefaults={_constructor:"TMenuButton",autoDraw:false,title:"File",height:16,layoutAlign:"center",extraSpace:4};isc.A.fileMenuDefaults={_constructor:"TMenu",title:"File",width:100,data:[{title:"New",click:function(_1,_2,_3){if(_3.creator.projectComponents.data.getRoot().children.length>0){isc.confirm("Discard current project?",function(_4){if(_4)_3.creator.newProject()})}else{_3.creator.newProject()}}},{title:"Load View...",click:function(_1,_2,_3){_3.creator.showRepoLoadUI()}},{title:"Import..",click:function(_1,_2,_3){var _4="../../isomorphic/system/reference/SmartClient_Reference.html#group..visualBuilder";var _5=this;isc.ask("This feature allows you to import externally edited XML or JS code."+" The Visual Builder cannot fully capture all externally edited files."+" For more information, see the <a target=_blank href='"+_4+"'>Visual Builder Docs</a><br><br>Proceed with Import?",function(_6){if(_6){_5.showImportDialog(_3)}})},showImportDialog:function(_1){if(!this.$482){this.$482=isc.LoadFileDialog.create({actionStripControls:["spacer:10","pathLabel","previousFolderButton","spacer:10","upOneLevelButton","spacer:10","refreshButton","spacer:2"],directoryListingProperties:{canEdit:false},title:"Import File",initialDir:"/",rootDir:"/",loadFile:function(_3){if(_3.match(/\.(xml|js)$/i)==null){isc.say("Only JS or XML files may be imported (must end with .js or .xml");return}
var _2=this;isc.confirm("Discard current project?",function(_4){if(_4){_1.creator.projectComponents.destroyAll();_2.importFile(_3)}})},importFile:function(_3){var _2=this;isc.DMI.callBuiltin({methodName:"loadFile",arguments:[this.currentDir+"/"+_3],callback:function(_4){if(_3.match(/\.xml$/i)!=null){isc.DMI.callBuiltin({methodName:"xmlToJS",arguments:_4.data,callback:function(_4){_2.fileLoaded(_4.data)}})}else{_2.fileLoaded(_4.data)}}})},fileLoaded:function(_3){_1.creator.projectComponents.loadNodeTreeFromJS(_3,{target:_1.creator.projectComponents,methodName:"addNodeTree"});this.hide()}})}else{this.$482.directoryListing.data.invalidateCache()}
this.$482.show()}},{title:"Save",enableIf:function(_1,_2,_3){var _4=_2.creator.getCurrentScreenName();return _4&&_4!=""},click:function(_1,_2,_3){_3.creator.saveSourceToRepo()}},{title:"Save As...",click:function(_1,_2,_3){_3.creator.saveSourceToRepo(null,{saveAs:true})}},{title:"Save To...",name:"saveTo",submenu:[],enableIf:"item.submenu.length > 0",click:function(_1,_2,_3){_3.creator.saveSourceToRepo(_2.name)}},{title:"Save As SControl ...",click:function(_1,_2,_3){_3.creator.codePreview.saveToSalesForce()}},{title:"Test",click:function(_1,_2,_3){var _4="isc_test",_5=_3.creator,_6=_5.getUpdatedSource(),_7=isc.addProperties({},_3.creator.viewContext,{screenName:_4,fileName:_4,caller:_5});_7.additionalModules="Drawing,Analytics,DocViewer,VisualBuilder";_5.currentRepo.showSaveUI(_6,_7,"window.open('"+_3.creator.workspaceURL+_4+".jsp')")}}]};isc.A.mainDefaults={_constructor:"TTabSet",width:"100%",height:"100%",backgroundColor:isc.nativeSkin?null:"black",tabSelected:function(_1,_2,_3,_4){if(_1==1){isc.SelectionOutline.hideOutline();isc.EditContext.hideDragHandle();this.creator.updateSource()}else if(_1==0){isc.SelectionOutline.showOutline();isc.EditContext.showDragHandle()}}};isc.A.operationsPaletteDefaults={_constructor:isc.TTreePalette,getIcon:function(_1){var _2=this.creator.getServiceElementIcon(_1);if(_2)return _2;return this.Super("getIcon",arguments)}};isc.A.schemaViewerDefaults={_constructor:isc.TTreeGrid,autoDraw:false,recordDoubleClick:"this.creator.operationSelected()",fields:[{name:"name",title:"Service/PortType/Operation",treeField:true},{name:"type",title:"Type"}],getIcon:function(_1){var _2=this.creator.getServiceElementIcon(_1);if(_2)return _2;return this.Super("getIcon",arguments)}};isc.A.schemaViewerSelectButtonDefaults={_constructor:isc.TButton,autoDraw:false,title:"Select",click:"this.creator.operationSelected()"};isc.A.commonEditorFunctions={itemChange:function(_1,_2,_3){this.logInfo("itemChange on: "+_1+", value now: "+_2,"editing");if(_1.name=="classSwitcher"){this.builder.switchComponentClass(_2);return true}
if(this.immediateSave||isc.isA.ExpressionItem(_1)||isc.isA.ActionMenuItem(_1)||isc.isA.CheckboxItem(_1))
{this.saveItem(_1,_2);this.builder.updateSource();return true}else{_1.$48z=true;return true}},itemKeyPress:function(_1,_2){if(_2=="Enter")this.save()},saveItem:function(_1,_2){return this.saveItems([_1],[_2])},save:function(){if(!this.validate())return;var _1=[],_2=[];for(var i=0;i<this.items.length;i++){var _4=this.items[i];if(_4.$48z){_1.add(_4);_2.add(this.getValue(_4.name));_4.$48z=false}}
var _5=this.saveItems(_1,_2);this.builder.updateSource();return _5},saveItems:function(_1,_2){if(!_1)return true;if(this.builder.formLoading!=true)this.builder.setIsDirty(true);var _3=this.currentComponent,_4={};for(var i=0;i<_1.length;i++){var _6=_1[i],_7=_2[i];_4[_6.name]=_7}
return this.saveProperties(_4,_3)},saveProperties:function(_1,_2){var _3=_2.liveObject||this.builder.projectComponents.getLiveObject(_2);this.logInfo("applying changed properties: "+this.echo(_1)+" to: "+this.echoLeaf(_3),"editing");this.builder.projectComponents.setNodeProperties(_2,_1);var _4=this.builder.getCurrentlyVisibleEditor(),_5=_2[_4.ID+"BasicMode"];if(_5==false){_2.$711=true}
return true}};isc.A.autoSaveInterval=30000;isc.A.autoSaveCheckerInterval=5000;isc.A.loadAutoSaveCookie="isc_load_autoSave";isc.A.autoSaveFilename="AutoSave.xml";isc.A.librarySearchDefaults={_constructor:"GridSearch",searchProperty:"title",hint:"Find Component..."};isc.A.projectComponentsSearchDefaults={_constructor:"GridSearch",searchProperty:"title",searchProperty:"name",hint:"Find Live Component By ID..."};isc.A.dataSourceListSearchDefaults={_constructor:"GridSearch",searchProperty:"title",hint:"Find DataSource..."};isc.A.downloadDataSourceDialogTitle="Download DataSource [\${dsID}]";isc.A.downloadDataSourceDialogPrompt="Choose the format in which to export this DataSource "+"definition.  If you're making use of server capabilities, you should export to XML.";isc.A.downloadDataSourceDialogButtonTitle="Download";isc.B.push(isc.A.isDirty=function isc_VisualBuilder_isDirty(){return this.dirty}
,isc.A.setIsDirty=function isc_VisualBuilder_setIsDirty(_1){this.dirty=_1}
,isc.A.previewAreaResized=function isc_VisualBuilder_previewAreaResized(){if(!this.modeSwitcher)return;var _1=this.rootLiveObject.getVisibleWidth();var _2=this.rootLiveObject.getVisibleHeight();this.modeSwitcher.setValue("resolution",_1+"x"+_2)}
,isc.A.loadBMMLMockup=function isc_VisualBuilder_loadBMMLMockup(_1,_2,_3,_4){var _5=this;isc.DMI.callBuiltin({methodName:"loadFile",arguments:[_1],callback:function(_9){var _6=isc.BMMLImporter.create({dropMarkup:_2==null?false:_2,trimSpace:_3==null?false:_3,fillSpace:_4==null?false:_4,mockupPath:_1});_6.bmmlToXml(_9.data,function(_10){if(_10){isc.DMI.callBuiltin({methodName:"xmlToJS",arguments:_10,callback:function(_9){_5.projectComponents.loadNodeTreeFromJS(_9.data,function(_11){_5.projectComponents.addNodeTree(_11);for(var i=0;i<_11.length;i++){var _8=_11[i];if(_8.autoDraw!==false&&_8.component&&_8.component.initData)
{delete _8.component.initData.autoDraw}}})}})}})}})}
,isc.A.getServiceElementIcon=function isc_VisualBuilder_getServiceElementIcon(_1){var _2=_1.type;if(_2=="service"||_2=="categoryProject")return"service.png";else if(_2=="portType")return"portType.png";else if(_2=="operation")return"operation.png";else if(_2=="message_in")return"email_in.png";else if(_2=="message_out")return"email_out.png";else if(_2=="simpleType")return"page_single.png";else if(_2=="complexType")return"page_multiple.png";return null}
,isc.A.keyPress=function isc_VisualBuilder_keyPress(){if(isc.EH.getKey()=="Delete"){if(!this.editingOn)return
var _1=isc.SelectionOutline.getSelectedObject();if(_1&&_1.editContext){_1.editContext.destroyComponent(_1.editNode);isc.SelectionOutline.deselect();isc.EditContext.hideDragHandle();return false}}}
,isc.A.initWidget=function isc_VisualBuilder_initWidget(){this.Super('initWidget',arguments);isc.designTime=true;isc.Page.setEvent("mouseDown",function(){var _1=isc.EditContext.titleEditor;if(_1){var x=isc.EH.getX(),y=isc.EH.getY();var _4=_1.getPageRect();if(x>=_4[0]&&x<=_4[0]+_4[2]&&y>=_4[1]&&y<=_4[1]+_4[3])
{}else{_1.blur(_1,_1.getItem("title"))}}});if(this.defaultApplicationMode){this.editingOn=this.defaultApplicationMode.toLowerCase()=="edit"}else{this.editingOn=false}
this.paletteNodeDS=this.createAutoChild("paletteNodeDS");this.buildLibraryTree();if(this.showDataSourceList!=false){this.dsRepo=isc.DSRepo.create({});this.dsRepo.loadObjects(null,this.getID()+".addDataSources(objects, context)")}
if(!this.rootComponent){this.rootComponent={_constructor:"Canvas",autoDraw:true}}
var _5=this;this.rootLiveObject=isc.ClassFactory.getClass(this.rootComponent._constructor).create(this.rootComponent,{autoDraw:false,editorRoot:true,width:"100%",height:"50%",resized:function(){_5.previewAreaResized()}})
this.previewArea=this.rootLiveObject;var _5=this;this.globalDependencies=isc.DataSource.create({dataURL:"globalDependencies.xml",recordXPath:"//dependency",fields:[{name:"type"}],loadDependencies:function(_8){this.deps=_8;for(var i=0;i<_8.length;i++){var _7=_8[i];if(_7.type=="js"||_7.type=="css"){if(_7.url.startsWith("/")){isc.FileLoader.loadFile("../.."+_7.url)}else{isc.FileLoader.loadFile(_7.url)}}else if(_7.type=="schema"){isc.DataSource.get(_7.id,function(){})}else if(_7.type=="ui"){}}}});this.globalDependencies.fetchData(null,this.getID()+".globalDependencies.loadDependencies(data)");this.addChildren()}
,isc.A.initComplete=function isc_VisualBuilder_initComplete(){if(isc.Cookie.get(this.loadAutoSaveCookie)=="true"){isc.Cookie.clear(this.loadAutoSaveCookie);this.loadAutoSave()}
if(this.autoSave)this.startAutoSaveChecker()}
,isc.A.loadAutoSave=function isc_VisualBuilder_loadAutoSave(){this.projectComponents.destroyAll();this.currentRepo.loadObject({fileName:this.autoSaveFilename,screenName:this.autoSaveFilename,criteria:{path:this.workspacePath+"/"+this.autoSaveFilename}},this.getID()+".loadRepoObjectReply(contents, context)")}
,isc.A.startAutoSaveChecker=function isc_VisualBuilder_startAutoSaveChecker(){this.renewAutoSaveCheckerTimer()}
,isc.A.renewAutoSaveCheckerTimer=function isc_VisualBuilder_renewAutoSaveCheckerTimer(){isc.Timer.setTimeout(this.getID()+".autoSaveCheckerTimerExpired()",this.autoSaveCheckerInterval)}
,isc.A.autoSaveCheckerTimerExpired=function isc_VisualBuilder_autoSaveCheckerTimerExpired(){this.checkAutoSave()}
,isc.A.checkAutoSave=function isc_VisualBuilder_checkAutoSave(){if(this.projectComponents.hasComponents()){this.doAutoSave();this.startAutoSave()}else{this.renewAutoSaveCheckerTimer()}}
,isc.A.startAutoSave=function isc_VisualBuilder_startAutoSave(){this.renewAutoSaveTimer()}
,isc.A.renewAutoSaveTimer=function isc_VisualBuilder_renewAutoSaveTimer(){this.$841=isc.Timer.setTimeout(this.getID()+".autoSaveTimerExpired()",this.autoSaveInterval)}
,isc.A.cancelAutoSaveTimer=function isc_VisualBuilder_cancelAutoSaveTimer(){if(this.$841!=null){isc.Timer.clearTimeout(this.$841);return true}
return false}
,isc.A.autoSaveTimerExpired=function isc_VisualBuilder_autoSaveTimerExpired(){this.doAutoSave();this.renewAutoSaveTimer()}
,isc.A.doAutoSave=function isc_VisualBuilder_doAutoSave(_1){var _2=this.getUpdatedSource();if(this.currentRepo.isActive()){this.logWarn("autoSave suppressed - repo dialog visible");return}
var _3=isc.addProperties({},this.viewContext,{caller:this,suppressPrompt:true,fileName:this.autoSaveFilename});_3.additionalModules="Drawing,Analytics,DocViewer,VisualBuilder";this.currentRepo.saveObject(_2,_3,_1)}
,isc.A.hide=function isc_VisualBuilder_hide(){isc.SelectionOutline.deselect();this.Super("hide",arguments)}
,isc.A.clear=function isc_VisualBuilder_clear(){isc.SelectionOutline.deselect();this.Super("clear",arguments)}
,isc.A.addChildren=function isc_VisualBuilder_addChildren(){if(this.showBuilderOnly)this.showCodePane=false;this.projectComponentsMenu=this.createAutoChild("projectComponentsMenu");this.addAutoChild("libraryComponents",{data:this.libraryTree});this.addAutoChild("librarySearch",{grid:this.libraryComponents});this.addAutoChild("projectComponents",{contextMenu:this.projectComponentsMenu,rootComponent:this.rootComponent,rootLiveObject:this.rootLiveObject});this.projectTree=this.projectComponents.data;this.projectTree.observe(this.projectTree,"dataChanged",this.getID()+".updateSource()");if(this.showCodePane!=false){this.addAutoChild("codePane");this.addAutoChildren(["codePreview","jsCodePreview"]);if(this.showCodePreview!=false)
this.codePane.addTab({title:"XML Code",pane:this.codePreview,width:150,click:this.getID()+".updateSource();"});if(this.showJsCodePreview!=false)
this.codePane.addTab({title:"JS Code",pane:this.jsCodePreview,width:150,click:this.getID()+".updateSource();"})}
this.addAutoChild("componentAttributeEditor",isc.addProperties(this.commonEditorFunctions,{builder:this}));this.addAutoChild("componentMethodEditor",isc.addProperties(this.commonEditorFunctions,{canEditExpressions:this.canEditExpressions,builder:this}));this.addAutoChild("editorPane");if(this.showComponentAttributeEditor!=false)
this.editorPane.addTab({title:"Properties",pane:this.componentAttributeEditor});if(this.showComponentMethodEditor!=false)
this.editorPane.addTab({title:"Events",pane:this.componentMethodEditor});this.applyButton=this.createAutoChild("applyButton");if(this.showHelpPane!=false){this.helpPane=this.createAutoChild("helpPane",{contentsURL:this.helpPaneProperties.contentsURL})}
if(this.showLeftStack!=false){this.addAutoChild("leftStack");if(this.showEditorPane!=false){this.editorPaneButtonBar=isc.HStack.create({membersMargin:10,height:this.applyButton.height,members:[this.applyButton]});if(this.showAdvancedButton!=false){this.advancedButton=this.createAutoChild("advancedButton");this.advancedButton.setTitle(this.componentAttributeEditor.basicMode?this.componentAttributeEditor.moreTitle:this.componentAttributeEditor.lessTitle);this.editorPaneButtonBar.addMember(this.advancedButton)}
this.leftStack.addSection({title:"Component Properties",ID:"componentProperties",autoShow:true,items:[this.editorPane,this.editorPaneButtonBar]})}
if(this.showHelpPane!=false){this.leftStack.addSection({title:this.helpPaneProperties.headerTitle,autoShow:false,items:[this.helpPane]})}}
this.showMiddleStack=(this.showPreviewArea!=false||this.showProjectComponents!=false);var _1;if(this.showModeSwitcher!=false){var _2=this.modeSwitcher=this.createAutoChild("modeSwitcher");_2.getField("switcher").setValue(this.editingOn?"Edit":"Live");_1=[_2]}else{_1=[]}
if(this.showMiddleStack!=false){this.addAutoChild("middleStack");if(this.showPreviewArea!=false){this.middleStack.addSection({title:"Application",autoShow:true,ID:"applicationSection",items:[this.previewArea],controls:_1})}
if(this.showProjectComponents!=false){this.projectComponentsSearch=this.createAutoChild("projectComponentsSearch",{grid:this.projectComponents});this.middleStack.addSection({height:24,title:"Component Tree",autoShow:true,items:[this.projectComponents],controls:[this.projectComponentsSearch]})}}
if(this.collapseComponentTree==true)this.middleStack.collapseSection(1);this.showRightStack=(this.showLibraryComponents!=false||this.showDataSourceList!=false);if(this.showRightStack!=false){this.addAutoChild("rightStack");if(this.showLibraryComponents!=false){this.rightStack.addSection({title:"Component Library",autoShow:true,items:[this.librarySearch,this.libraryComponents]})}
if(this.showDataSourceList!=false){this.addAutoChildren(["dataSourceList","dataSourceListToolbar","dsNewButton","dsEditButton"]);this.dataSourceListSearch=this.createAutoChild("dataSourceListSearch",{grid:this.dataSourceList});this.rightStack.addSection({title:"DataSources",autoShow:true,items:[this.dataSourceListSearch,this.dataSourceList,this.dataSourceListToolbar]})}}
this.addAutoChild("workspace");if(this.showLeftStack!=false)this.workspace.addMember(this.leftStack);if(this.showMiddleStack!=false)this.workspace.addMember(this.middleStack);if(this.showRightStack!=false)this.workspace.addMember(this.rightStack);if(this.showCodePane==false)this.showFileMenu=false;if(this.showFileMenu!=false){this.fileMenu=this.createAutoChild("fileMenu");this.fileMenuButton=this.createAutoChild("fileMenuButton",{menu:this.fileMenu})}
if(this.showCodePane!=false){this.addAutoChild("main",isc.addProperties(this.showFileMenu!=false?{tabBarControls:[this.fileMenuButton]}:{},{tabs:[{title:"Build",pane:this.workspace}]}));this.main.addTab({title:"Code",ID:"generatedCodeTab",pane:this.codePane})}else{}
this.initializeRepos();if(this.loadFile=="null")this.loadFile=null;if(this.saveURL=="null")this.saveURL=null}
,isc.A.updateApplicationTitle=function isc_VisualBuilder_updateApplicationTitle(){if(!this.middleStack)return;var _1=this.getCurrentScreenName();if(_1==null||_1==""||this.autoSaveFilename.startsWith(_1))_1="Application";this.middleStack.setSectionTitle("applicationSection",_1)}
,isc.A.initializeRepos=function isc_VisualBuilder_initializeRepos(){this.repos=isc.DataSource.create({dataURL:"viewRepos.xml",recordXPath:"//Repo",fields:[{name:"name"},{name:"title"},{name:"className"},{name:"isDefault"}]});this.repos.fetchData(null,this.getID()+".reposLoaded(data)")}
,isc.A.reposLoaded=function isc_VisualBuilder_reposLoaded(_1){var _2=this.registeredRepos=_1,_3=null,_4=this;if(this.fileMenu!=null)_3=this.fileMenu.getItems().find("name","saveTo");this.loadedRepos=[];_2.setProperty("menu",_3?_3.menu:this.fileMenu);_2.setProperty("click",function(_7,_6,_8){_4.saveSourceToRepo(_6.className)});for(var i=0;i<_2.length;i++){var _6=_2.get(i);if(_6.isDefault==true||_6.isDefault=="true"){this.loadRepo(_6.className,true);break}}
if(this.registeredRepos&&this.registeredRepos.length>1){_3.submenu.addList(this.registeredRepos)}else if(this.fileMenu!=null&&_3!=null){this.fileMenu.removeItem(_3)}
if(this.loadFile&&this.loadFile.length>0)
this.projectComponents.loadView(this.loadFile);else this.newProject();this.initComplete()}
);isc.evalBoundary;isc.B.push(isc.A.loadRepo=function isc_VisualBuilder_loadRepo(_1,_2){var _3=this.registeredRepos,_4=this.loadedRepos,_5=_4.find("className",_1);if(!_5){_5=isc.ClassFactory.newInstance(_1);this.loadedRepos.add(_5)}else
if(isc.isAn.Array(_5))_5=_5[0];this.currentRepo=_5;if(_2==true)this.defaultRepo=this.currentRepo;return this.currentRepo}
,isc.A.showRepoLoadUI=function isc_VisualBuilder_showRepoLoadUI(){if(!this.currentRepo)return;if(this.projectComponents.hasComponents()){this.projectComponents.checkDiscardProject(this.getID()+".showRepoLoadUI()");return}
var _1={target:this,methodName:"loadRepoObjectReply"};this.currentRepo.showLoadUI({caller:this},_1)}
,isc.A.loadRepoObjectReply=function isc_VisualBuilder_loadRepoObjectReply(_1,_2){this.viewContext={};if(_2)this.viewContext={screenName:_2.screenName,fileName:_2.fileName};this.updateApplicationTitle();this.projectComponents.destroyAll();if(this.currentRepo.objectFormat=="xml"){this.projectComponents.loadViewFromXML(_1)}else{this.projectComponents.loadViewFromJS(_1)}}
,isc.A.showRepoSaveUI=function isc_VisualBuilder_showRepoSaveUI(){if(!this.currentRepo)return;var _1={target:this,methodName:"saveRepoObjectReply"},_2=this.getUpdatedSource();if(this.currentRepo.objectFormat=="js"){this.getUpdatedJSSource(this.getID()+"getJSSourceForSave(data)")}else{this.currentRepo.showSaveUI(_2,isc.addProperties({},this.viewContext,{caller:this,additionalModules:"Drawing,Analytics,DocViewer,VisualBuilder"}),_1)}}
,isc.A.getJSSourceForSave=function isc_VisualBuilder_getJSSourceForSave(_1){var _2={target:this,methodName:"saveRepoObjectReply"},_3=_1;this.currentRepo.showSaveUI(_3,isc.addProperties({},this.viewContext,{caller:this,additionalModules:"Drawing,Analytics,DocViewer,VisualBuilder"}),_2)}
,isc.A.saveRepoObjectReply=function isc_VisualBuilder_saveRepoObjectReply(_1,_2){this.viewContext={screenName:""};if(_2)this.viewContext={screenName:_2.screenName,fileName:_2.fileName};this.projectComponents.currentScreen=this.viewContext.screenName;this.setIsDirty(false);this.updateApplicationTitle()}
,isc.A.getCurrentScreenName=function isc_VisualBuilder_getCurrentScreenName(){if(this.viewContext)return this.viewContext.screenName;return this.projectComponents.currentScreen||""}
,isc.A.editComponent=function isc_VisualBuilder_editComponent(_1,_2){if(isc.isA.DataSource(_2))return;this.setBasicMode(_1);if(this.showComponentAttributeEditor!=false){this.componentAttributeEditor.editComponent(_1,_2)}
if(this.showComponentMethodEditor!=false)
this.componentMethodEditor.editComponent(_1,_2);if(this.showComponentAttributeEditor!=false||this.showComponentMethodEditor!=false){this.applyBasicModeSettings(_1)}
if(isc.Browser.isIE&&this.editorPane.paneContainer&&this.editorPane.paneContainer.isVisible())
{this.editorPane.paneContainer.hide();this.editorPane.paneContainer.show()}
if(this.leftStack){var _3=_2;if(!_3._constructor)_3=_1;this.leftStack.setSectionTitle("componentProperties",isc.DS.getAutoId(_3)+" Properties")}
this.setComponentList()}
,isc.A.setBasicMode=function isc_VisualBuilder_setBasicMode(_1){if(!_1)return;var _2=this.getCurrentlyVisibleEditor(),_3=_2.ID+"BasicMode";if(_1[_3]==null)_1[_3]=_2.basicMode;_2.$694=_1[_3]}
,isc.A.toggleBasicMode=function isc_VisualBuilder_toggleBasicMode(_1){if(!_1)return;var _2=this.getCurrentlyVisibleEditor();_2.$694=_2.$694==null?!_2.basicMode:!_2.$694;_1[_2.ID+"BasicMode"]=_2.$694}
,isc.A.applyBasicModeSettings=function isc_VisualBuilder_applyBasicModeSettings(_1){if(!_1)return;var _2=this.getCurrentlyVisibleEditor();this.setComponentEditorButtonState(_1);this.setClassSwitcherState(_1)}
,isc.A.setComponentEditorButtonState=function isc_VisualBuilder_setComponentEditorButtonState(_1){if(!_1)return;if(this.showAdvancedButton!=false){var _2=this.getCurrentlyVisibleEditor(),_3=_1[_2.ID+"BasicMode"];if(_3){this.advancedButton.setTitle(_2.moreTitle)}else{this.advancedButton.setTitle(_2.lessTitle)}
this.advancedButton.setDisabled(false)}
this.applyButton.setDisabled(false)}
,isc.A.setClassSwitcherState=function isc_VisualBuilder_setClassSwitcherState(_1){if(this.getCurrentlyVisibleEditor()!=this.componentAttributeEditor)return;if(!this.componentAttributeEditor.canSwitchClass)return;if(!this.componentAttributeEditor.getField("classSwitcher"))return;if(!this.componentAttributeEditor.$694||_1.$711){this.componentAttributeEditor.getField("classSwitcher").setDisabled(true)}else{this.componentAttributeEditor.getField("classSwitcher").setDisabled(false)}}
,isc.A.getCurrentlyVisibleEditor=function isc_VisualBuilder_getCurrentlyVisibleEditor(){if(this.editorPane.selectedEditorName()==this.editorPane.PROPERTIES){return this.componentAttributeEditor}
return this.componentMethodEditor}
,isc.A.saveComponentEditors=function isc_VisualBuilder_saveComponentEditors(){if(this.componentMethodEditor)this.componentMethodEditor.save();if(this.componentAttributeEditor)this.componentAttributeEditor.save()}
,isc.A.getCurrentComponent=function isc_VisualBuilder_getCurrentComponent(){return this.componentAttributeEditor?this.componentAttributeEditor.currentComponent:this.componentMethodEditor?this.componentMethodEditor.currentComponent:null}
,isc.A.setComponentList=function isc_VisualBuilder_setComponentList(){var _1=this.projectComponents,_2=_1.data.getDescendants(_1.data.getRoot());if(this.componentMethodEditor)this.componentMethodEditor.allComponents=_2;if(this.componentAttributeEditor)this.componentAttributeEditor.allComponents=_2}
,isc.A.componentAdded=function isc_VisualBuilder_componentAdded(){this.setComponentList();if(this.formLoading!=true)this.setIsDirty(true)}
,isc.A.componentRemoved=function isc_VisualBuilder_componentRemoved(_1){var _2=this.getCurrentComponent();if(_2==_1)this.clearComponent();this.setComponentList();if(this.formLoading!=true)this.setIsDirty(true)}
,isc.A.clearComponent=function isc_VisualBuilder_clearComponent(){if(this.componentAttributeEditor)this.componentAttributeEditor.clearComponent();if(this.componentMethodEditor)this.componentMethodEditor.clearComponent();if(this.leftStack){this.leftStack.setSectionTitle("componentProperties","Component Properties");if(this.applyButton)this.applyButton.setDisabled(true);if(this.advancedButton)this.advancedButton.setDisabled(true)}}
,isc.A.switchComponentClass=function isc_VisualBuilder_switchComponentClass(_1){var _2=this.getCurrentComponent(),_3=this.projectComponents.data,_4=_3.getParent(_2),_5=_3.getChildren(_4).indexOf(_2);var _6=this.projectComponents.makeEditNode({type:_1,defaults:_2.initData});this.projectComponents.removeComponent(_2);_6=this.projectComponents.addComponent(_6,_4,_5);if(_6&&_6.liveObject){isc.EditContext.selectCanvasOrFormItem(_6.liveObject,true)}}
,isc.A.getCustomComponentsURL=function isc_VisualBuilder_getCustomComponentsURL(){return"customComponents.xml"}
,isc.A.buildLibraryTree=function isc_VisualBuilder_buildLibraryTree(){this.libraryTree=isc.Tree.create();this.paletteNodeDS.dataURL=this.getCustomComponentsURL();this.paletteNodeDS.fetchData({},this.getID()+".fetchLibraryComponentsReply(data)");this.paletteNodeDS.dataURL="defaultComponents.xml";this.paletteNodeDS.fetchData({},this.getID()+".fetchLibraryComponentsReply(data); "+this.getID()+".openLibraryTree()")}
,isc.A.fetchLibraryComponentsReply=function isc_VisualBuilder_fetchLibraryComponentsReply(_1){this.libraryTree.addList(_1,this.libraryTree.getRoot())}
,isc.A.openLibraryTree=function isc_VisualBuilder_openLibraryTree(){var _1=this.libraryTree;_1.openFolders(_1.getChildren(_1.getRoot()));var _2=_1.findAll("isClosed","true");if(_2&&_2.length)_1.closeFolders(_2)}
,isc.A.addDataSources=function isc_VisualBuilder_addDataSources(_1,_2){var _3=_1,_4=[],_5;for(var i=0;i<_3.length;i++){var _7=_3[i];_5=this.projectComponents.makeDSPaletteNode(_7.dsName,_7.dsType);_4.add(_5)}
if(this.dataSourceList)this.dataSourceList.setData(_4)}
,isc.A.addDataSource=function isc_VisualBuilder_addDataSource(_1){if(this.dsEditorWindow){this.dsEditorWindow.hide();if(_1.serverType=="sql"||_1.serverType=="hibernate"){if(this.dsWizard!=null){var _2=this.dsWizard.dsTypeRecord,_3=_2.wizardDefaults,_4=_3?_3.existingTable=="true":false;if(!_4)
{var _5="http://"+window.location.host+"/smartclient/tools/adminConsole.jsp";isc.say("To generate or regenerate SQL tables for this DataSource, use the "+"<a target=_blank href='"+_5+"'>Admin Console</a> or the "+"<i>DataSources</i> tab in the Developer Console")}}}}
var _6=_1.serviceNamespace?"webService":_1.serverType||_1.dataFormat,_7=this.projectComponents.makeDSPaletteNode(_1.ID,_6);var _8=this.dataSourceList.data,_9=_8.findIndex("ID",_1.ID);if(_9==-1){_8.addAt(_7,0)}else{_8.set(_9,_7)}}
,isc.A.newProject=function isc_VisualBuilder_newProject(){isc.EditContext.deselect();this.projectComponents.destroyAll();delete this.projectComponents.currentScreen;this.viewContext={};if(this.initialComponent){var _1=isc.HiddenPalette.create().makeNewComponent(this.initialComponent);this.projectComponents.addComponent(_1)}}
,isc.A.updateSource=function isc_VisualBuilder_updateSource(_1){if(this.showCodePane==false||!this.main)return;if(!_1&&this.main.getSelectedTabNumber()!=1)return;var _2=this.getUpdatedSource();if(!_2)return;if(this.codePreview)this.codePreview.setValue("codeField",_2);if(this.jsCodePreview&&this.codePane.isDrawn()&&this.codePane.getSelectedTab().pane==this.jsCodePreview)
{isc.xml.toJSCode(_2,this.getID()+".jsCodePreview.setContents(data)")}}
,isc.A.getUpdatedJSSource=function isc_VisualBuilder_getUpdatedJSSource(_1){isc.xml.toJSCode(this.getUpdatedSource(),_1)}
,isc.A.getUpdatedSource=function isc_VisualBuilder_getUpdatedSource(){return this.projectComponents.serializeComponents()}
,isc.A.saveSourceToRepo=function isc_VisualBuilder_saveSourceToRepo(_1,_2,_3){if(!_1)_1=this.currentRepo;if(!_1)return;if(isc.isA.String(_1))_1=this.loadRepo(_1);else this.currentRepo=_1;this.viewContext=isc.addProperties({},{screenName:this.getCurrentScreenName()},this.viewContext,_2);if(!_3)_3={target:this,methodName:"saveRepoObjectReply"};this.saveSource(this.viewContext.screenName,_3)}
,isc.A.saveSource=function isc_VisualBuilder_saveSource(_1,_2){var _3=this,_4=_3.getUpdatedSource(),_5=isc.addProperties({},this.viewContext,{caller:this});_5.additionalModules="Drawing,Analytics,DocViewer,VisualBuilder";this.currentRepo.showSaveUI(_4,_5,_2)}
,isc.A.downloadDataSource=function isc_VisualBuilder_downloadDataSource(_1){var _2=this;var _3=this.downloadDataSourceDialogTitle.evalDynamicString(this,{dsID:_1.ID}),_4=this.downloadDataSourceDialogPrompt,_5=this.downloadDataSourceDialogButtonTitle;this.downloadDataSourceDialog=isc.TWindow.create({title:_3,width:300,height:160,isModal:true,showModalMask:true,autoCenter:true,padding:8,items:[isc.Label.create({width:"100%",padding:8,contents:_4}),isc.DynamicForm.create({width:"100%",numCols:3,items:[{name:"formatType",title:"Format",type:"select",width:"*",defaultValue:"XML",valueMap:["XML","JavaScript"]},{name:"downloadButton",title:_5,type:"button",startRow:false,click:function(){_2.continueDSDownload(_1,this.form.getValue("formatType"))}}]})]});this.downloadDataSourceDialog.show()}
,isc.A.continueDSDownload=function isc_VisualBuilder_continueDSDownload(_1,_2){this.downloadDataSourceDialog.hide();this.downloadDataSourceDialog.markForDestroy();var _3=this,_4=_1.getClassName(),_5;if(isc.DS.isRegistered(_4)){_5=isc.DS.get(_4)}else{_5=isc.DS.get("DataSource");_1._constructor=_4}
var _6=_5.xmlSerialize(_1);if(_2=="XML"){_3.downloadDataSourceReply(_1,_2,_6)}else{isc.XMLTools.toJSCode(_6,function(_7){_3.downloadDataSourceReply(_1,_2,_7.data)})}}
,isc.A.downloadDataSourceReply=function isc_VisualBuilder_downloadDataSourceReply(_1,_2,_3){var _4=_1.ID+".ds."+(_2=="XML"?"xml":"js"),_5=(_2=="XML"?"text/xml":"application/json");isc.DMI.callBuiltin({methodName:"downloadClientContent",arguments:[_3,_4,_5],requestParams:{showPrompt:false,useXmlHttpRequest:false,timeout:0}})}
,isc.A.showDSWizard=function isc_VisualBuilder_showDSWizard(){if(this.wizardWindow)return this.wizardWindow.show();var _1=this;this.wizardWindow=isc.TWindow.create({title:"DataSource Wizard",autoCenter:true,width:"85%",height:"85%",builder:_1,closeClick:function(){this.Super("closeClick",arguments);_1.dsWizard.resetWizard()},items:[_1.dsWizard=isc.DSWizard.create({callingBuilder:_1})]})}
,isc.A.showDSEditor=function isc_VisualBuilder_showDSEditor(_1,_2,_3){var _4=this,_5={target:_4,methodName:"addDataSource"}
this.makeDSEditor();if(_2)this.dsEditor.editNew(_1,_5,_3);else this.dsEditor.editSaved(_1,_5,_3);this.dsEditorWindow.show()}
,isc.A.makeDSEditor=function isc_VisualBuilder_makeDSEditor(){if(this.dsEditorWindow)return;var _1=this;if(!this.dsEditor){this.dsEditor=isc.DataSourceEditor.create({dataSource:"DataSource",width:"100%",height:"80%",autoDraw:false,canAddChildSchema:true,canEditChildSchema:true,builder:_1,mainStackProperties:{_constructor:"TSectionStack"},instructionsProperties:{_constructor:"THTMLFlow"},mainEditorProperties:{_constructor:"TComponentEditor",formConstructor:isc.TComponentEditor},fieldLayoutProperties:{_constructor:"TLayout"},getUniqueDataSourceID:function(){var _2,i=0;while(_2==null){_2="dataSource"+i;if(_1.dataSourceList.data.find("ID",_2)){_2=null;i++}}
return _2}})}
this.dsEditorWindow=isc.Window.create({title:"DataSource Editor",autoDraw:true,builder:this,isModal:true,autoCenter:true,width:"85%",height:"85%",canDragResize:true,items:[this.dsEditor]})}
,isc.A.hideRightMostResizeBar=function isc_VisualBuilder_hideRightMostResizeBar(){this.workspace.getMember(this.workspace.getMembers().length-1).showResizeBar=false}
,isc.A.addOperation=function isc_VisualBuilder_addOperation(){if(!this.schemaWindow){this.schemaWindow=isc.TWindow.create({title:this.schemaWindowTitle||"Webservice Operations",autoCenter:true,autoDraw:false,width:Math.round(this.width*.6),height:Math.round(this.height*.9),items:[this.addAutoChild("schemaViewer"),this.addAutoChild("schemaViewerSelectButton")]})}
this.getOperationsTreeData(this.getID()+".addOperationReply(data)")}
,isc.A.addOperationReply=function isc_VisualBuilder_addOperationReply(_1){this.schemaViewer.setData(isc.Tree.create({modelType:"children",root:_1,nameProperty:"name",childrenProperty:"children"}));this.schemaViewer.getData().openAll();this.schemaWindow.show()}
,isc.A.operationSelected=function isc_VisualBuilder_operationSelected(){var _1=this.schemaViewer.data,_2=this.schemaViewer.getSelectedRecord();if(_2!=null){if(_2.type=="service")_2=_1.getChildren(_2)[0];if(_2.type=="portType")_2=_1.getChildren(_2)[0];var _3=_1.getParent(_2);var _4=_1.getParent(_3);var _5=_2.location||_3.location||_4.location;var _6=this.projectComponents.data;_5=this.getOperationWSDLLocation(_5);var _7=this;this.loadWebService(_5,_4.name,_3.name,_2.name)}}
,isc.A.getOperationWSDLLocation=function isc_VisualBuilder_getOperationWSDLLocation(_1){return _1}
,isc.A.loadWebService=function isc_VisualBuilder_loadWebService(_1,_2,_3,_4){var _5=this;isc.xml.loadWSDL(_1,function(_6){_5.newServiceLoaded(_6,_2,_3,_4,_1)},null,true)}
,isc.A.newServiceLoaded=function isc_VisualBuilder_newServiceLoaded(_1,_2,_3,_4,_5){var _6={operationName:_4,serviceNamespace:_1.serviceNamespace,serviceName:_1.name,serviceDescription:_2,portTypeName:_3,location:_5}
this.addWebService(_1,_6);this.schemaWindow.hide()}
,isc.A.getOperationsTreeData=function isc_VisualBuilder_getOperationsTreeData(){var _1=this.operationsPalette,_2=_1?_1.data:null,_3=_2?_2.getChildren(_2.getRoot()):null;return _3}
,isc.A.trimOperationsTreeData=function isc_VisualBuilder_trimOperationsTreeData(_1,_2){if(!_1)return null;var _3=_2?"message_in":"message_out",_4=isc.addProperties({},_1),_5=false;while(!_5){var _6=_4.find("type",_3);if(_6){_4.remove(_6)}else _5=true}
return _4}
,isc.A.addWebService=function isc_VisualBuilder_addWebService(_1,_2){var _3={};_3.webService=_1;_3.inputSchema=_1.getRequestMessage(_2.operationName);_3.outputSchema=_1.getResponseMessage(_2.operationName);_2.inputSchema=_3.inputSchema;_2.outputSchema=_3.outputSchema;var _4=this.addServiceOperation(_2);var _5=this.getComplexOperationsPaletteTreeData(),_6="|"+_2.serviceDescription+"|"+_2.portTypeName+"|"+_2.operationName,_7;if(this.operationsPalette.getData()){_7=isc.Tree.create({root:this.operationsPalette.getData().getRoot()})}else{_7=isc.Tree.create({})}
_5.pathDelim="|";_7.pathDelim="|";if(_7.find(_6)){this.logWarn("Attempting to add webservice operation that is already in the tree");this.schemaWindow.hide();return}
var _8;if(_4){_8={name:_2.operationName,type:"operation",className:"IButton",defaults:{title:"Invoke "+_2.operationName,autoFit:true,click:{target:_4.liveObject.ID,name:"invoke",title:"Invoke "+_2.operationName}}}}else{_8={name:_2.operationName,type:"operation",canDrag:false}}
_6="|"+_2.serviceDescription+"|"+_2.portTypeName;var _9=_7.find(_6)
var _10=false;if(_9){_7.add(_8,_9);_10=true}else{_6="|"+_2.serviceDescription
var _9=_7.find(_6)
var _10=false;if(_9){_7.add({name:_2.portTypeName,type:"portType",canDrag:false,children:[_8]},_9);_10=true}else{var _11={name:_2.serviceDescription,type:"service",canDrag:false,children:[{name:_2.portTypeName,type:"portType",canDrag:false,children:[_8]}]}}
_5.children.add(_11);this.operationsPalette.setData(isc.Tree.create({modelType:"children",root:_5,nameProperty:"name",childrenProperty:"children"}))}
this.operationsPalette.setData(_7);var _6="|"+_2.serviceDescription+"|"+_2.portTypeName+"|"+_2.operationName,_9=_7.find(_6);var _12={palette:this.operationsPalette,isOutput:false,operation:_2.operationName,serviceName:_2.serviceName,serviceNamespace:_2.serviceNamespace};if(_3.inputSchema){this.setSchema(_3.inputSchema,_9,null,"",_12)}
if(_3.outputSchema){_12.isOutput=true;this.setSchema(_3.outputSchema,_9,null,"",_12)}
this.operationsPalette.getData().openAll()}
,isc.A.addServiceOperation=function isc_VisualBuilder_addServiceOperation(_1){var _2,_3;if(_1.inputSchema){_2={className:"ValuesManager",defaults:{parentProperty:"inputVM",dataSource:_1.inputSchema.ID,serviceName:_1.serviceName,serviceNamespace:_1.serviceNamespace}}}
if(_1.outputSchema){_3={className:"ValuesManager",defaults:{parentProperty:"outputVM",dataSource:_1.outputSchema.ID,serviceName:_1.serviceName,serviceNamespace:_1.serviceNamespace}}}
var _4={className:"ServiceOperation",defaults:{operationName:_1.operationName,serviceNamespace:_1.serviceNamespace,serviceName:_1.serviceName,serviceDescription:_1.serviceDescription,portTypeName:_1.portTypeName,location:_1.location}};var _5=this.projectComponents;var _6=_5.makeEditNode(_4);_5.addComponent(_6);if(_2)_5.addComponent(_5.makeEditNode(_2),_6,null,"inputVM");if(_3)_5.addComponent(_5.makeEditNode(_3),_6,null,"outputVM");return _6}
,isc.A.shouldShowDataPathFields=function isc_VisualBuilder_shouldShowDataPathFields(){return this.operationsPalette?true:false}
,isc.A.getComplexOperationsPaletteTreeData=function isc_VisualBuilder_getComplexOperationsPaletteTreeData(){if(!this.operationsPalette||!this.operationsPalette.data)return{children:[]};var _1=this.operationsPalette.data,_2=_1.getChildren(_1.getRoot());return{children:_2}}
,isc.A.setSchema=function isc_VisualBuilder_setSchema(_1,_2,_3,_4,_5){var _6=_5.populateTarget&&this.targetContext!=null;var _7=_1.getFieldNames();for(var i=0;i<_7.length;i++){var _9=_7[i],_10=_1.getField(_9),_11=_1.fieldIsComplexType(_9),_12;var _13=this.getFieldPaletteNode(_1,_9,_4,_5);var _14=_5.palette.data;_14.add(_13,_2||_14.getRoot());if(_6&&_3&&_3.type==this.complexTypeNodeConstructor){var _15=null;if(_11){var _16={};isc.addProperties(_16,this.canvasItemWrapperDefaults);isc.addProperties(_16,this.canvasItemWrapperProperties);_15=_5.palette.makeEditNode({className:this.canvasItemWrapperConstructor,defaults:_16});this.targetContext.addNode(_15,_3)}
var _17=_5.palette.makeEditNode(_13);this.targetContext.addNode(_17,_15||_3);if(isc.EditContext)isc.EditContext.clearSchemaProperties(_17)}
if(_11){var _18=_1.getSchema(_10.type);this.setSchema(_18,_13,_17,(_4?_4+"/":"")+_9,_5)}}}
,isc.A.getFieldPaletteNode=function isc_VisualBuilder_getFieldPaletteNode(_1,_2,_3,_4){var _5=_1.fieldIsComplexType(_2),_6=_1.getField(_2),_7=_4.isOutput,_8=_4.displayOnly!=null?_4.displayOnly:_7,_9=this.getSchemaDataSourceIDs(_4.operation,_4.serviceName,_4.serviceNamespace),_10={schemaDataSource:_7?_9.output:_9.input,serviceNamespace:_4.serviceNamespace,serviceName:_4.serviceName,isComplexType:_5,type:_5?"complexType":"simpleType"},_11=isc.DataSource.getAutoTitle(_2),_12={name:_2,defaults:_10},_13=(_3?_3+"/":"")+_2;_10.dataPath=_13;if(_8){_10.inputDataPath=_13;_10.inputSchemaDataSource=_10.schemaDataSource;_10.inputServiceNamespace=_10.serviceNamespace;_10.inputServiceName=_10.serviceName}
if(_8)_10.canEdit=false;var _14,_15=_6.xmlMaxOccurs;if(_15=="unbounded")_15=1000;if(!_5){_12=this.getSimpleTypeNode(_12,_8,_11)}else{_10.dataSource=_10.schemaDataSource;delete _10.schemaDataSource;if(_15==null||_15<=1){_12=this.getComplexTypeNode(_12,_8,_11)}else{_12=this.getRepeatingComplexTypeNode(_12,_15,_8,_1,_6.type,_11)}}
_12.title=_10.title;_12.type=_10.type;return _12}
,isc.A.getSimpleTypeNode=function isc_VisualBuilder_getSimpleTypeNode(_1,_2,_3){_1.className=this.simpleTypeNodeConstructor;_1.defaults.title=_3;isc.addProperties(_1.defaults,this.simpleTypeNodeDefaults);isc.addProperties(_1.defaults,this.simpleTypeNodeProperties);return _1}
,isc.A.getComplexTypeNode=function isc_VisualBuilder_getComplexTypeNode(_1,_2,_3){_1.className=this.complexTypeNodeConstructor;delete _1.defaults.dataPath;delete _1.defaults.inputDataPath;_1.defaults.groupTitle=_3;isc.addProperties(_1.defaults,this.complexTypeNodeDefaults);isc.addProperties(_1.defaults,this.complexTypeNodeProperties);return _1}
,isc.A.getRepeatingComplexTypeNode=function isc_VisualBuilder_getRepeatingComplexTypeNode(_1,_2,_3,_4,_5,_6){if(_2<5&&_3){_1.className="DetailViewer"}else{_1.className=(_3?"ListGrid":"LineEditor")}
var _7=_4.getSchema(_5);var _8=_3?"inputDataPath":"dataPath";if(_3){_1.defaults.height=80;_1.defaults.autoFitMaxRecords=10;_1.defaults.canDragSelectText=true}else{_1.defaults.saveLocally=true}
var _9=_7.getFlattenedFields(null,_1.defaults.dataPath,_8);_9=isc.getValues(_9);_9=isc.applyMask(_9,["name","title","dataPath","inputDataPath"]);_1.defaults.defaultFields=_9;isc.addProperties(_1.defaults,this.repeatingComplexTypeNodeDefaults);isc.addProperties(_1.defaults,this.repeatingComplexTypeNodeProperties);return _1}
,isc.A.getSchemaDataSourceIDs=function isc_VisualBuilder_getSchemaDataSourceIDs(_1,_2,_3){var _4={};var _5=isc.ServiceOperation.getServiceOperation(_1,_2,_3);if(_5){if(_5.inputVM){_4.input=isc.DataSource.get(_5.inputVM.dataSource).ID}
if(_5.outputVM){_4.output=isc.DataSource.get(_5.outputVM.dataSource).ID}}
return _4}
);isc.B._maxIndex=isc.C+82;isc.defineClass("ActionMenu","Menu");isc.A=isc.ActionMenu.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.$50a=["string","number","boolean","object","array"];isc.B.push(isc.A.initWidget=function isc_ActionMenu_initWidget(){this.setComponents(this.components);this.Super("initWidget",arguments)}
,isc.A.setComponents=function isc_ActionMenu_setComponents(_1){var _2=[];if(!_1)_1=[];for(var i=0;i<_1.length;i++){var _4=_1[i],_5={component:_4,icon:_4.icon,title:_4.liveObject.getActionTargetTitle?_4.liveObject.getActionTargetTitle():_4.ID+" ("+_4.type+")"};var _6=isc.jsdoc.getActions(_4.type);if(_6){_5.submenu=this.getActionsMenu(_4,_6);_2.add(_5)}}
_2.add({title:"[None]",click:this.getID()+".clearAction()",icon:"[SKINIMG]/actions/cancel.png"})
this.setData(_2)}
,isc.A.rowOver=function isc_ActionMenu_rowOver(_1){this.Super("rowOver",arguments);var _2=_1.component;if(_2&&_2.liveObject)isc.SelectionOutline.select(_2.liveObject);else isc.SelectionOutline.deselect();this.bringToFront()}
,isc.A.getActionsMenu=function isc_ActionMenu_getActionsMenu(_1,_2){var _3=[];for(var i=0;i<_2.length;i++){var _5=_2[i],_6={title:_5.title,icon:_5.icon,component:_1,targetAction:_5,click:this.getID()+".bindAction(item.component, item.targetAction)"}
_3.add(_6)}
return _3}
,isc.A.getInheritedMethod=function isc_ActionMenu_getInheritedMethod(_1,_2){while(_1){var _3=isc.jsdoc.getDocItem("method:"+_1+"."+_2);if(_3!=null)return _3;var _4=isc.DS.get(_1);if(_4&&_4.methods){var _5=_4.methods.find("name",_2);if(_5)return _5}
var _6=isc.ClassFactory.getClass(_1);if(_6==null)return null;_6=_6.getSuperClass();if(_6==null)return null;_1=_6.getClassName()}}
,isc.A.bindAction=function isc_ActionMenu_bindAction(_1,_2){var _3=this.sourceComponent,_4=this.getInheritedMethod(_3.type,this.sourceMethod),_5=isc.isAn.XMLNode(_4)?isc.jsdoc.toJS(_4):_4;if(this.logIsDebugEnabled("actionBinding")){this.logDebug("bindAction: component "+_1.ID+", sourceMethod: "+this.echoFull(_5)+", action method: "+this.echoFull(_2),"actionBinding")}
var _6={title:_2.title,target:_1.ID,name:_2.name};var _7;if(_2.params){var _8=[],_9=false;_7=_5.params;if(!_7)_7=[];else if(!isc.isAn.Array(_7))_7=[_7];else _7=_7.duplicate();_7.add({name:"this",type:this.sourceComponent.type});for(var i=0;i<_2.params.length;i++){var _11=_2.params[i];this.logInfo("considering actionMethod "+_2.name+" param: "+_11.name+" of type "+_11.type,"actionBinding");var _12=_11.optional!=null&&_11.optional.toString()!="false";if(!_12||_11.type!=null&&!this.$50a.contains(_11.type.toLowerCase()))
{var _13=this.getMatchingSourceParam(_11,_7);if(_13!=null){_8[i]=_13.name;_13.$480=true;_9=true;continue}else if(!_12){this.logInfo("action binding failed, actionMethod param "+_11.name+" of type "+_11.type+" couldn't be fulfilled","actionBinding");isc.say("Visual Builder couldn't find an automatic binding from event "+_5.name+" to action "+(_2.title||_2.name));return null}}
_8[i]="null"}
if(_9)_6.mapping=_8}
if(this.logIsInfoEnabled("actionBinding")){this.logWarn("generated binding: "+this.echoFull(_6),"actionBinding")}
if(_7)_7.setProperty("$480",null);this.bindingComplete(_6)}
,isc.A.bindingComplete=function isc_ActionMenu_bindingComplete(_1){}
,isc.A.clearAction=function isc_ActionMenu_clearAction(){var _1=null;this.bindingComplete(_1)}
,isc.A.getMatchingSourceParam=function isc_ActionMenu_getMatchingSourceParam(_1,_2){var _3=this.getFirstType(_1.type);var _4=isc.DS.get(_3);this.logInfo("selected type "+_3+" has schema: "+_4,"actionBinding");for(var i=0;i<_2.length;i++){var _6=_2[i];if(_6.$480)continue;this.logDebug("considering source param: "+_6.name+" of type "+_6.type,"actionBinding");var _7=this.getFirstType(_6.type);var _8=isc.DS.get(_7);if(!_8){if(_3==_7)return _6;continue}
if(_8.inheritsSchema(_4)){return _6}}}
,isc.A.getFirstType=function isc_ActionMenu_getFirstType(_1){_1=_1.split(/[ \t]+/)[0];_1=_1.substring(0,1).toUpperCase()+_1.substring(1);return _1}
);isc.B._maxIndex=isc.C+10;isc.A=isc.jsdoc;isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.B.push(isc.A.getActions=function isc_c_jsdoc_getActions(_1){var _2=isc.DS.get(_1);if(_2==null)return null;var _3;while(_2!=null){var _4=_2.methods?_2.methods.findAll("action",true):null;if(_4==null){if(_2.showSuperClassActions==false)break;_2=_2.superDS();continue}
for(var i=0;i<_4.length;i++){var _6=_4[i],_7=isc.jsdoc.getDocItem("method:"+_2.ID+"."+_6.name),_8=_7?isc.jsdoc.toJS(_7):_6;if(_3==null)_3=[];_3.add(isc.addProperties({},_8,_6));var _9=_3[i].params;if(_9!=null&&!isc.isAn.Array(_9))_3[i].params=[_9]}
if(_2.showSuperClassActions==false)break;_2=_2.superDS()}
return _3}
);isc.B._maxIndex=isc.C+1;isc.defineClass("GridSearch","DynamicForm");isc.A=isc.GridSearch.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.browserSpellCheck=false;isc.A.height=20;isc.A.numCols=2;isc.A.cellPadding=0;isc.A.colWidths=[46,200];isc.A.titleSuffix=":&nbsp;";isc.A.showSearchTitle=false;isc.A.wrapItemTitles=false;isc.A.selectOnFocus=true;isc.A.hint="Find...";isc.A.searchTitle="<span style='color:#FFFFFF'>Search</span>";isc.B.push(isc.A.initWidget=function isc_GridSearch_initWidget(){this.items=[isc.addProperties({name:"search",width:"*",colSpan:"*",showTitle:this.showSearchTitle,editorType:"TTextItem",selectOnFocus:true,title:this.searchTitle,showHintInField:true,hint:this.hint,changed:"form.findNode()",keyPress:function(_1,_2,_3){if(_3=="Enter")_2.findNode();if(_3=="Escape"){_2.revertState();return false}}},this.searchItemProperties)];this.Super("initWidget",arguments);if(this.grid)this.setGrid(this.grid)}
,isc.A.setGrid=function isc_GridSearch_setGrid(_1){this.grid=_1;this.defaultSearchProperty();if(isc.isA.TreeGrid(_1)){if(_1.$84w)_1.getNodeTitle=_1.$84w;_1.$84w=_1.getNodeTitle;_1.getNodeTitle=function(_5,_6,_7){var _2=_1.$84w(_5,_6,_7);if(_5.$826){var _3,_4;if(_2.match(/<.*>/)){_4=new RegExp("(^|>)([^<]*?)("+_5.$826+")","ig");_3=_2.replace(_4,"$1$2<span style='background-color:#FF0000;'>$3</span>")}else{_4=new RegExp("("+_5.$826+")","ig");_3=_2.replace(_4,"<span style='background-color:#FF0000;'>$1</span>")}
_2=_3}
return _2}}else{if(_1.$84x)_1.formatCellValue=_1.$84x;_1.formatCellValue=function(_2,_5,_6,_7){if(_1.$84x){_2=_1.$84x(_2,_5,_6,_7)}
if(_2!=null&&_5.$826){var _3,_4;if(_2.match(/<.*>/)){_4=new RegExp("(^|>)([^<]*?)("+_5.$826+")","ig");_3=_2.replace(_4,"$1$2<span style='background-color:#FF0000;'>$3</span>")}else{_4=new RegExp("("+_5.$826+")","ig");_3=_2.replace(_4,"<span style='background-color:#FF0000;'>$1</span>")}
_2=_3}
return _2}}}
,isc.A.defaultSearchProperty=function isc_GridSearch_defaultSearchProperty(){if(!this.searchProperty&&this.grid){if(isc.isA.TreeGrid(this.grid)){this.searchProperty=this.grid.getTitleField()}else{this.searchProperty=this.grid.getFieldName(0)}}}
,isc.A.revertState=function isc_GridSearch_revertState(){var _1=this.grid;if(this.$49d){delete this.$49d.$826;_1.refreshRow(_1.getRecordIndex(this.$49d))}
this.$49c=this.$49d=null;if(this.$827){for(var i=0;i<this.$827.length;i++)_1.data.closeFolder(this.$827[i])}
this.$827=null;this.clearValue("search")}
,isc.A.findNode=function isc_GridSearch_findNode(){if(!this.grid||!this.grid.getData())return;var _1=this.getValue("search");if(_1==null){this.revertState();return}
_1=_1.toLowerCase();var _2=this.$49c==_1&&this.$49d;this.$49c=_1;var _3=this.grid;var _4=isc.isA.TreeGrid(_3)?_3.data.getAllNodes():_3.getData();var _5=this.$49d?_4.indexOf(this.$49d):0;if(_2)_5++;if(this.$49d){delete this.$49d.$826;_3.refreshRow(_3.getRecordIndex(this.$49d));this.$49d=null}
var _6=this.findNext(_4,_5,_1);if(!_6)_6=this.findNext(_4,0,_1);if(_6){this.$49d=_6;_6.$826=_1;if(this.$827){for(var i=0;i<this.$827.length;i++)_3.data.closeFolder(this.$827[i])}
this.$827=null;if(isc.isA.TreeGrid(_3)){var _8=_3.data.getParents(_6);this.$827=[];for(var i=0;i<_8.length;i++){var _9=_8[i];if(!_3.data.isOpen(_9)){this.$827.add(_9);_3.data.openFolder(_9)}}
if(_3.data.isFolder(_6)&&!_3.data.isOpen(_6)){_3.data.openFolder(_6);this.$827.add(_6)}}
var _10=_3.getRecordIndex(_6);_3.refreshRow(_10)
_3.scrollRecordIntoView(_10)}}
,isc.A.findNext=function isc_GridSearch_findNext(_1,_2,_3){for(var i=_2;i<_1.getLength();i++){var _5=_1.get(i);if(_5[this.searchProperty]&&_5[this.searchProperty].toLowerCase().contains(_3)){return _5}}}
);isc.B._maxIndex=isc.C+6;isc.defineClass("BMMLImporter");isc.A=isc.BMMLImporter.getPrototype();isc.A.transformRules="/tools/visualBuilder/balsamiqTransformRules.js";isc.A.useLayoutHeuristics=true;isc.A.sloppyEdgeControlOverflow=10;isc.A.maxControlOverlap=20;isc.A.stackContainerFillInset=20;isc.A.labelMaxOffset=10;isc.A.dropExtraProperties=true;isc.A.allowedExtraProperties=[];isc.A.tallFormItems=["TextAreaItem","RadioGroupItem","SpacerItem"];isc.A.dropMarkup=true;isc.A.trimSpace=true;isc.A.fillSpace=true;isc.A.formsGridCellWidth=5;isc.A.formsGridCellHeight=22;isc.A.maxOuterControlsDistance=50;isc.A.$87q=["HStack","HLayout","VStack","VLayout"];isc.A.$87t=["ButtonItem","CheckboxItem","RadioItem"];isc.A.$878={};isc.A=isc.BMMLImporter.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.$85p=[];isc.A.$z=false;isc.B.push(isc.A.init=function isc_BMMLImporter_init(){var _1=this;isc.FL.loadJSFiles(this.transformRules,function(){_1.$z=true;for(var i=0;i<_1.$85p.length;i++){_1.bmmlToXml(_1.$85p[i].xml,_1.$85p[i].callback)};_1.$85p.clear();delete _1.$85p})}
,isc.A.bmmlToXml=function isc_BMMLImporter_bmmlToXml(_1,_2,_3){if(!this.$z){this.$85p.add({xml:_1,callback:_2})}else{var _4=_3;if(_4==null){_4=this.mockupPath}
if(this.$878[_4]==null){this.$878[_4]={widgets:[]}}
var _5=isc.XMLTools.toJS(isc.XMLTools.parseXML(_1));var _6=this.$873(_5);var _7=this;this.$874(_6,function(_13){if(_13==null){_2(null);return}
if(_7.trimSpace){var _8=10000;var _9=10000;for(var i=0;i<_13.length;i++){if(_13[i].left!=null&&_13[i].top!=null){_8=Math.min(_8,_13[i].left);_9=Math.min(_9,_13[i].top)}}
for(var i=0;i<_13.length;i++){if(_13[i].left!=null&&_13[i].top!=null){_13[i].left-=_8;_13[i].top-=_9}}}
if(_7.useLayoutHeuristics){_13=_7.processHeuristics(_13)}
for(var i=0;i<_13.length;i++){var _11=_13[i];var _12=_11.$86d;if(_12!=null&&(_12.fullWidth||_12.fullHeight))
{if(_12.containerName=="TabSet"||_12.containerName=="Window"||_12.containerName=="SectionStack"||_12.containerName=="HStack"||_12.containerName=="HLayout"||_12.containerName=="VLayout")
{if(_12.fullWidth)delete _11.width;if(_12.fullHeight)delete _11.height}else if(_12.containerName=="VStack"||_12.controlName=="com.balsamiq.mockups::FieldSet"||_12.controlName=="com.balsamiq.mockups::Canvas")
{if(_12.fullWidth)_11.width="100%";if(_12.fullHeight)_11.height="100%"}}
delete _11.absX;delete _11.absY;if(_11._constructor=="DynamicForm"&&_11.isGroup!=true)
{delete _11.height}}
_7.$878[_4].layout=_13;_7.$879(_13,_3,_2)})}}
,isc.A.$879=function isc_BMMLImporter__processLinks(_1,_2,_3){if(this.$88a==null){this.$88a=0}
var _4=this;var _5=0;for(var i=0;i<_1.length;i++){var _7=[_1[i]];if(_1[i]._constructor=="DynamicForm"&&_1[i].items){_7=_1[i].items}
for(var _8=0;_8<_7.length;_8++){var _9=_7[_8];if(_9.$86d==null||(_9.$86d.hrefs==null&&_9.$86d.href==null))continue;var _10=null;if(_9.$86d.hrefs){if(isc.isA.String(_9.$86d.hrefs)){_10=_9.$86d.hrefs.split(",")}else{}}else{_10=[_9.$86d.href]}
if(_10==null)continue;var _11=this.mockupPath.substring(0,this.mockupPath.lastIndexOf("/"));_9.$86d.links=[];for(var j=0;j<_10.length;j++){var _13=_10[j].split("&bm;");var _14=_13[1];if(_14==null){_9.$86d.links.add(null);continue}
_14=_11+"/"+_14;_9.$86d.links.add({fileName:_14,name:_13[0]});if(this.$878[_14]){this.$878[_14].widgets.add(_9)}else{this.$878[_14]={widgets:[_9],fileName:_14,layoutName:_13[0]};_5++;load=true;isc.DMI.callBuiltin({methodName:"loadFile",arguments:[_14],callback:function(_16){if(_16.status==isc.RPCResponse.STATUS_FAILURE){isc.logWarn("load error "+_16.context.data.arguments[0]);return}
var _15=function(_17){_5--;if(_5==0){if(_2){_3(_4.$360(_1))}else{_1=_4.$88b(_1);_3(isc.EditContext.serializeInitData(_1))}}};_4.bmmlToXml(_16.data,_15,_16.context.data.arguments[0])},requestParams:{willHandleError:true}})}}}}
if(_5==0){if(_2){_3(this.$360(_1))}else if(this.$88a==0){_3(isc.EditContext.serializeInitData(_1))}}}
,isc.A.$88b=function isc_BMMLImporter__mergeLinksLayout(_1){for(var _2 in this.$878){var _3=this.$878[_2];if(_2==this.mockupPath){_3.prefix="";_3.processed=true}else{_3.prefix=_3.layoutName+"_"}
_3.topLevelElements=this.$88q(_3.layout)}
var _4=this.mockupPath.substring(0,this.mockupPath.lastIndexOf("/"));var _2=this.mockupPath;var _5=[];do{var _3=this.$878[_2];this.$88r(_3);if(_3.prefix!=""){this.$88s(_3.layout,_3.prefix);for(var i=0;i<_3.topLevelElements.length;i++){_3.topLevelElements[i].autoDraw=false}}
_3.activateCode=this.$88t(_3.layout);_3.showCode=this.$88u(_3);_3.hideCode=this.$88v(_3);_5.addList(_3.layout);_2=null;for(var _7 in this.$878){var _3=this.$878[_7];if(_3.processed!=true){_2=_7;_3.processed=true;break}}}while(_2);for(var _2 in this.$878){if(this.$878[_2].mergedWith)continue;_1=this.$878[_2].layout
for(var i=0;i<_1.length;i++){var _8=_1[i];if(_8.$86d&&_8.$86d.links&&(_8._constructor!="TabSet"&&_8._constructor!="SectionStack")){var _9=_8.$86d.links;for(var j=0;j<_9.length;j++){if(_9[j]==null)continue;var _11=_9[j].fileName;var _12=this.$878[_11];if(_8._constructor=="TreeGrid"||_8._constructor=="ListGrid")
{if(_8.selectionChanged==null){_8.selectionChanged=""}
_8.selectionChanged+="if (this.getRecordIndex(record) == "+(j-1)+") {"+_12.activateCode+"}"}else{}}}else if(_8._constructor=="DynamicForm"){for(var j=0;j<_8.items.length;j++){if(_8.items[j].$86d&&_8.items[j].$86d.links)
{var _9=_8.items[j].$86d.links;for(var k=0;k<_9.length;k++){if(_9[k]==null)continue;var _11=_9[k].fileName;var _12=this.$878[_11];var _14="";if(_12.prefix!=this.$878[_2].prefix){var _15=this.$878[_2];if(_15.mergedWith!=null){if(_15.mergedWith==""){_15=this.$878[this.mockupPath]}else{_15=this.$878[_15.mergedWith]}}
_14+=_15.hideCode;_14+=_12.showCode}
_14+=_12.activateCode;_8.items[j].click=_14}}}}}}
return _5}
,isc.A.$88r=function isc_BMMLImporter__mergeLinksLayoutProcessTabsAndStacks(_1){var _2=_1.layout;do{var _3=false;for(var i=0;i<_2.length;i++){var _5=_2[i];if(_5.$86d&&_5.$86d.links&&(_5._constructor=="TabSet"||_5._constructor=="SectionStack")){var _6=_5.$86d.links;for(var j=0;j<_6.length;j++){if(_6[j]==null)continue;var _8=this.$878[_6[j].fileName];if(!_8.processed&&this.$88c(_2,_8,_5))
{var _9=null;if(_5._constructor=="TabSet"){_9=this.$88d(j,_5,_8,_8.prefix)}else{_9=this.$88e(j,_5,_8,_8.prefix)}
if(_9){_2.addListAt(_9,_2.indexOf(_5)-1);_3=true;_8.processed=true;_8.mergedWith=_1.prefix}}}}}}while(_3)}
,isc.A.$88t=function isc_BMMLImporter__getActivateLayoutCode(_1){var _2="";for(var i=0;i<_1.length;i++){if(_1[i]._constructor=="TabSet"){_2+=_1[i].ID+".selectTab("+_1[i].selectedTab+");\n"}else if(_1[i]._constructor=="SectionStack"){for(var j=0;j<_1[i].sections.length;j++){if(_1[i].sections[j].expanded){_2+=_1[i].ID+".expandSection("+j+");\n"}else if(_1[i].sections[j].items){_2+=_1[i].ID+".collapseSection("+j+");\n"}}}};return _2}
,isc.A.$88u=function isc_BMMLImporter__getShowLayoutCode(_1){var _2="";for(var k=0;k<_1.topLevelElements.length;k++){_2+=_1.topLevelElements[k].ID+".show();\n"};return _2}
,isc.A.$88v=function isc_BMMLImporter__getHideLayoutCode(_1){var _2="";for(var k=0;k<_1.topLevelElements.length;k++){_2+=_1.topLevelElements[k].ID+".hide();\n"};return _2}
,isc.A.$88q=function isc_BMMLImporter__getLayoutTopLevelElements(_1){var _2=[];for(var i=0;i<_1.length;i++){if(_1[i]._constructor!="MockDataSource"&&_1[i]._constructor!="ValuesManager"&&this.$88g(_1,_1[i])==null)
{_2.add(_1[i])}};return _2}
,isc.A.$88d=function isc_BMMLImporter__mergeTabLayout(_1,_2,_3,_4){if(_2.tabs[_1].pane)return null;var _5=this.$88f(_3,_2);if(_5==null)return null;var _6=_5.layout;this.$88s(_6,_4);_2.$86d.innerItems.addList(_6);for(var i=0;i<_5.widget.tabs.length;i++){var _8=_5.widget.tabs[i].pane;if(_8==null)continue;if(isc.isA.String(_8)){_2.tabs[i].pane=_4+_8}else{for(var j=0;j<_8.VStack.members.length;j++){_8.VStack.members[j]=_4+_8.VStack.members[j]};_2.tabs[i].pane=_8}
break};return _6}
,isc.A.$88e=function isc_BMMLImporter__mergeSectionStackLayout(_1,_2,_3,_4){for(var _5=0;_5<_2.sections.length;_5++){if(_2.sections[_5].$76w!=_1)continue;var _6=this.$88f(_3,_2);if(_6==null)return;var _7=_6.layout;this.$88s(_7,_4);_2.$86d.innerItems.addList(_7);_2.sections[_5].items=_6.widget.sections[_5].items;return _7}}
,isc.A.$88s=function isc_BMMLImporter__addPrefixToIds(_1,_2){for(var i=0;i<_1.length;i++){var _4=_1[i];if(_4.ID&&!_4.ID.startsWith(_2)){_4.ID=_2+_4.ID}
if(_4.dataSource&&!_4.dataSource.startsWith(_2)){_4.dataSource=_2+_4.dataSource}
if(_4.valuesManager&&!_4.valuesManager.startsWith(_2)){_4.valuesManager=_2+_4.valuesManager}
if(_4.$86d){var _5=_4.$86d.refs;if(_5){for(var j=0;j<_5.length;j++){_5[j].ref=_4.ID}}}
if(_4._constructor=="TabSet"){for(var j=0;j<_4.tabs.length;j++){if(_4.tabs[j].pane==null)continue;if(isc.isA.String(_4.tabs[j].pane)&&!_4.tabs[j].pane.startsWith(_2))
{_4.tabs[j].pane=_2+_4.tabs[j].pane}else{var _7=_4.tabs[j].pane;for(var k=0;k<_7.VStack.members.length;k++){if(!_7.VStack.members[k].startsWith(_2)){_7.VStack.members[k]=_2+_7.VStack.members[k]}}}}}}}
,isc.A.$88c=function isc_BMMLImporter__compareParentLayout(_1,_2,_3){var _4=this.$360(_1);var _5=this.$360(_2.layout);var _6=this.$88f({layout:_1},_3);var _7=this.$88f(_2,_3);for(var i=0;i<_6.layout.length;i++){for(var j=0;j<_4.length;j++){if(_6.layout[i].ID==_4[j].ID){_4.removeAt(j);break}}};for(var i=0;i<_7.layout.length;i++){for(var j=0;j<_5.length;j++){if(_7.layout[i].ID==_5[j].ID){_5.removeAt(j);break}}};var _10=_6.widget;var _11=_7.widget;do{_10=this.$88g(_4,_10);_11=this.$88g(_5,_11);if(_10==null||_11==null)break;if(_10._constructor=="TabSet"&&_11._constructor=="TabSet"){delete _11.layoutLeftMargin;delete _11.layoutTopMargin;delete _11.layoutRightMargin;delete _10.layoutLeftMargin;delete _10.layoutTopMargin;delete _10.layoutRightMargin;var _12=_10.$86d.innerItems;for(var i=0;i<_11.tabs.length;i++){if(_11.tabs[i].pane!=null||_10.tabs[i].pane==null){continue}
var _13=_10.tabs[i].pane;if(isc.isA.String(_13)){for(var k=0;k<_12.length;k++){var _15=_12[k]
if(_15.ID!=_13)continue;this.$88h(_4,_15)}}else{for(var j=0;j<_13.VStack.members.length;j++){for(var k=0;k<_12.length;k++)
{var _15=_12[k]
if(_15.ID!=_13.VStack.members[j])continue;this.$88h(_4,_15)}}}}}else if(_10._constructor=="SectionStack"&&_11._constructor=="SectionStack")
{var _12=_10.$86d.innerItems;for(var i=0;i<_11.sections.length;i++){if(_11.sections[i].items!=null||!_10.sections[i].items==null)
{continue}
_10.sections[i].expanded=_11.sections[i].expanded;for(var j=0;j<_10.sections[i].items.length;j++){for(var k=0;k<_12.length;k++)
{var _15=_12[k]
if(_15.ID!=_10.sections[i].items[j].ref)continue;this.$88h(_4,_15)}};delete _10.sections[i].items}}}while(true);for(var j=0;j<_4.length;j++){if(_6.widget.ID==_4[j].ID){_4.removeAt(j);break}}
for(var j=0;j<_5.length;j++){if(_7.widget.ID==_5[j].ID){_5.removeAt(j);break}}
this.$88i(_4);this.$88i(_5);var _16=function(_20,_21){return isc.echoAll(_20)<isc.echoAll(_21)};_4.sort(_16);_5.sort(_16);var _17=isc.JSON.encode(_4);var _18=isc.JSON.encode(_5);var _19=_17===_18;if(!_19){}
return _19}
,isc.A.$88h=function isc_BMMLImporter__removeItemWithChildItemsFromLayout(_1,_2){for(var l=0;l<_1.length;l++){if(_1[l].ID==_2.ID){_1.removeAt(l);break}};var _4=this.$88j(_2);for(var m=0;m<_4.length;m++){for(var l=0;l<_1.length;l++){if(_1[l].ID==_4[m].ID){_1.removeAt(l);break}}};var _6=_2.$86d.additionalElements;if(_6){for(var m=0;m<_6.length;m++){for(var l=0;l<_1.length;l++){if(_1[l].ID==_6[m].ID){_1.removeAt(l);break}}}}}
,isc.A.$88g=function isc_BMMLImporter__findParentWidget(_1,_2){for(var i=0;i<_1.length;i++){if(_1[i].$86d&&_1[i].$86d.innerItems){for(var j=0;j<_1[i].$86d.innerItems.length;j++){if(_1[i].$86d.innerItems[j].ID==_2.ID){return _1[i]}}}}}
,isc.A.$88i=function isc_BMMLImporter__cleanObjects(_1){if(this.$88k(_1)){}else if(isc.isA.Array(_1)){for(var i=0;i<_1.length;i++){if(!this.$88k(_1[i])){this.$88i(_1[i])}}}else{for(var _3 in _1){if(_3=="ID"||_3=="ref"||_3=="$86d"||_3=="pane"||_3=="selectedTab"||_3=="zIndex"||_3=="expanded"||_3=="$88w"){delete _1[_3]}else if(!this.$88k(_1[_3])){this.$88i(_1[_3])}}}}
,isc.A.$360=function isc_BMMLImporter__clone(_1,_2){if(_2==null)_2=10;var _3=null;if(this.$88k(_1)){_3=this.$88l(_1)}else if(isc.isA.Array(_1)){_3=[];for(var i=0;i<_1.length;i++){var _5=_1[i];if(this.$88k(_5)){_3.add(this.$88l(_5))}else if(_2==0){_3.add(isc.isA.Array(_5)?[]:{})}else{_3.add(this.$360(_5,_2-1))}}}else{_3={};for(var _6 in _1){var _5=_1[_6];if(this.$88k(_5)){_3[_6]=this.$88l(_5)}else if(_2==0){_3[_6]=(isc.isA.Array(_5)?[]:{})}else{_3[_6]=this.$360(_5,_2-1)}}}
return _3}
,isc.A.$88k=function isc_BMMLImporter__isPlainObject(_1){var _2;return(_1===_2)||(_1==null)||isc.isA.String(_1)||isc.isA.Boolean(_1)||isc.isA.Number(_1)||isc.isA.Function(_1)||isc.isA.Date(_1)}
,isc.A.$88l=function isc_BMMLImporter__clonePlainObject(_1){var _2;if(_1===_2)return _2;if(_1==null)return null;if(isc.isA.String(_1)||isc.isA.Boolean(_1)||isc.isA.Number(_1)||isc.isA.Function(_1))return _1;if(isc.isA.Date(_1))return _1.duplicate();return null}
,isc.A.$88f=function isc_BMMLImporter__getWidgetContentLayout(_1,_2){if(_2._constructor=="TabSet"){var _3=this.$88m(_1.layout,_2.tabs);if(_3){return{layout:this.$88j(_3),widget:_3}}}else if(_2._constructor=="SectionStack"){var _4=this.$88n(_1.layout,_2.sections);if(_4){return{layout:this.$88j(_4),widget:_4}}}}
,isc.A.$88m=function isc_BMMLImporter__findSameTabSet(_1,_2){for(var i=0;i<_1.length;i++){var _4=_1[i];if(_4._constructor=="TabSet"&&_4.tabs.length==_2.length){var _5=_4;var _6=true;for(var j=0;j<_2.length;j++){if(_2[j].title!=_4.tabs[j].title){_6=false;break}};if(_6){return _5}}};return null}
,isc.A.$88n=function isc_BMMLImporter__findSameSectionStack(_1,_2){for(var i=0;i<_1.length;i++){var _4=_1[i];if(_4._constructor=="SectionStack"&&_4.sections.length==_2.length)
{var _5=_4;var _6=true;for(var j=0;j<_2.length;j++){if(_2[j].title!=_4.sections[j].title){_6=false;break}};if(_6){return _5}}};return null}
,isc.A.$88j=function isc_BMMLImporter__getInnerComponents(_1){var _2=this.$88o(_1);for(var i=_2.length-1;i>=1;i--){for(var j=i-1;j>=0;j--){if(_2[i].ID==_2[j].ID){_2.removeAt(i);i--;break}}};return _2}
,isc.A.$88o=function isc_BMMLImporter__getInnerComponentsRecursive(_1){var _2=[];if(_1.$86d.innerItems==null)return[];for(var i=0;i<_1.$86d.innerItems.length;i++){var _4=_1.$86d.innerItems[i];if(_4.$86d&&_4.$86d.innerItems){_2.addList(this.$88o(_4))}
if(_4.$86d&&_4.$86d.additionalElements){_2.addList(_4.$86d.additionalElements)}
_2.add(_4)};return _2}
,isc.A.$873=function isc_BMMLImporter__convertBMMLWidgetsToISCWidgets(_1){var _2=[];var _3=_1.controls.control;if(!isc.isAn.Array(_3)){_3=[_3]}
for(var i=0;i<_3.length;i++){if(this.dropMarkup&&transformRules.markupItems.contains(_3[i].controlTypeID))
{continue}
if("__group__"==_3[i].controlTypeID){_2.addList(this.convertGroup(_3[i]))}else{_2.addList(this.convertControl(_3[i]))}};return _2}
,isc.A.$874=function isc_BMMLImporter__loadSymbolsAssets(_1,_2){if(this.mockupPath){var _3=this.mockupPath.substring(0,this.mockupPath.lastIndexOf("/"));var _4=[];var _5=[];for(var i=0;i<_1.length;i++){if(_1[i]._constructor=="Symbol"){var _7=_1[i].symbolPath;if(_7.startsWith("./")){_7=_7.substring(2)}
_7=_3+"/"+_7;var _8=_7.substring(_7.indexOf("#")+1);_7=_7.substring(0,_7.indexOf("#"));_4.add({symbol:_1[i],path:_7,symbolName:_8})
if(!_5.contains(_7)){_5.add(_7)}}};var _9=0;var _10=this;for(var i=0;i<_5.length;i++){var _11=_5[i];isc.DMI.callBuiltin({methodName:"loadFile",arguments:[_11],callback:function(_21){if(_21.status==isc.RPCResponse.STATUS_FAILURE){var _12=function(){for(var j=0;j<_4.length;j++){if(_11!=_4[j].path)continue;var _14=_4[j].symbol;var _15={_constructor:"Label",ID:"symbol_"+j,contents:_4[j].symbolName,left:_14.left,top:_14.top,width:_14.width,height:_14.height,border:"1px solid black",align:"center",zIndex:_14.zIndex,$86d:{controlName:"com.balsamiq.mockups::Label"}};_1.addAt(_15,_1.indexOf(_14));_1.remove(_14)};_9++;if(_9==_5.length){_2(_1)}
this.topElement.hide()}
isc.ask("Unable to import this mockup. Asset "+_11+" is missing. Do you want to abort import or continue with "+"placeholders. You will be able to upload this asset and "+"import this mockup again.",function(){},{buttons:[isc.Button.create({title:"Abort",click:function(){this.topElement.hide();_2(null)}}),isc.Button.create({title:"Continue",click:_12})]});return}
for(var j=0;j<_4.length;j++){if(_11!=_4[j].path)continue;var _16=isc.XMLTools.toJS(isc.XMLTools.parseXML(_21.data));var _15;var _17=_16.controls.control;for(var k=0;k<_17.length;k++){var _19=_17[k].controlProperties.controlName;if(unescape(_19)==_4[j].symbolName){_15=_17[k];break}};_15.x=0;_15.y=0;_15=_10.$875(_15,_4[j].symbol);var _20=_10.$873({controls:{control:[_15]}});_1.addListAt(_20,_1.indexOf(_4[j].symbol));_1.remove(_4[j].symbol)};_9++;if(_9==_5.length){_2(_1)}},requestParams:{willHandleError:true}})};if(_5.length==0){_2(_1)}}else{_2(_1)}}
,isc.A.$875=function isc_BMMLImporter__handleSymbolOverride(_1,_2){_1.controlID=_2.ID+"$876"+_1.controlID;_1.x+=_2.left;_1.y+=_2.top;_1.zOrder+=_2.zIndex-1000000;if(_2.override){var _3=_2.override.controlID.split(":");var _4=_1;for(var i=0;i<_3.length;i++){var _6=_4.groupChildrenDescriptors.control;for(var j=0;j<_6.length;j++){if(_6[j].controlID==_3[i]){_4=_6[j];break}}};for(var _8 in _2.override){for(var _9 in _4){if(_8!="controlID"&&_8==_9){_4[_9]=_2.override[_8]}}
for(var _9 in _4.controlProperties){if(_8==_9){_4.controlProperties[_9]=_2.override[_8]}}}}
return _1}
,isc.A.convertGroup=function isc_BMMLImporter_convertGroup(_1){var _2=[];var _3=_1.groupChildrenDescriptors.control;if(!isc.isA.Array(_3)){_3=[_3]}
for(var i=0;i<_3.length;i++){var _5=_3[i];var _6;if("__group__"==_5.controlTypeID){_6=this.convertGroup(_5)}else{_6=this.convertControl(_5)}
for(var j=0;j<_6.length;j++){var _8=transformRules.propertyTranslations;if(_6[j][_8.x]!=null){_6[j][_8.x]=parseInt(_6[j][_8.x])+parseInt(_1.x)}
if(_6[j][_8.y]!=null){_6[j][_8.y]=parseInt(_6[j][_8.y])+parseInt(_1.y)}
if(_6[j][_8.zOrder]!=null){_6[j][_8.zOrder]=parseInt(_6[j][_8.zOrder])+parseInt(_1.zOrder)}
_6[j].ID="group_"+_1.controlID+"_"+_6[j].ID;if(_6[j].dataSource!=null){_6[j].dataSource="group_"+_1.controlID+"_"+_6[j].dataSource}}
_2.addList(_6)}
return _2}
,isc.A.convertControl=function isc_BMMLImporter_convertControl(_1){var _2=this.getSCClass(_1.controlTypeID);var _3={ID:"control"+_1.controlID,_constructor:_2,$86d:{controlName:_1.controlTypeID}};if(_2==null){_2="MockupElement";_3._constructor=_2;_3.controlName=_1.controlTypeID}
for(var _4 in _1){if(_4!="controlProperties"&&_4!="controlTypeID"){var _5=_1[_4];var _6=this.getSCPropertyName(_1.controlTypeID,_4,_5);if(_6!=null){_3[_6]=_5}else{if(!this.dropExtraProperties||this.allowedExtraProperties.contains(_4))
{_3[_4]=_5}else{_3.$86d[_4]=_5}}}}
if(_1.controlProperties!=null){for(var _4 in _1.controlProperties){var _5=_1.controlProperties[_4];if(typeof _5=="string")_5=unescape(_5);var _6=this.getSCPropertyName(_1.controlTypeID,_4,_5);_5=this.getSCPropertyValue(_1.controlTypeID,_4,_5);if(_6!=null){_3[_6]=_5}else{if(!this.dropExtraProperties||this.allowedExtraProperties.contains(_4))
{_3[_4]=_5}else{_3.$86d[_4]=_5}}}}
_3=this.afterConvert(_1.controlTypeID,_2,_3);var _7=[_3];var _8=this.getAdditionalElements(_1.controlTypeID,_2,_3);if(_8!=null){if(_3.$86d==null){_3.$86d={}}
_3.$86d.additionalElements=[];_3.$86d.additionalElements.addAll(_8);_8.add(_3);_7=_8}
return _7}
,isc.A.getSCClass=function isc_BMMLImporter_getSCClass(_1){return transformRules.classTranslations[_1]}
,isc.A.getSCPropertyName=function isc_BMMLImporter_getSCPropertyName(_1,_2,_3){var _4=transformRules.widgetPropertyTranslations[_1];if(_4!=null){var _5=_4[_2];if(_5!=null){return _5}}
return transformRules.propertyTranslations[_2]}
,isc.A.getSCPropertyValue=function isc_BMMLImporter_getSCPropertyValue(_1,_2,_3){var _4=transformRules.widgetPropertyTranslations[_1];if(_4!=null&&_4.controlPropertiesParser!=null){var _5=_4.controlPropertiesParser(_2,_3);if(_5!=null){return _5}}
return _3}
,isc.A.afterConvert=function isc_BMMLImporter_afterConvert(_1,_2,_3){if(_3.zIndex!=null){_3.zIndex=1000000+parseInt(_3.zIndex)}
if(_3.width==null||_3.width=='-1'){if(_3.measuredW){_3.width=_3.measuredW}else{_3.width=_3.$86d.measuredW}}
if(_3.height==null||_3.height=='-1'){if(_3.measuredH){_3.height=_3.measuredH}else{_3.height=_3.$86d.measuredH}}
var _4=transformRules.widgetPropertyTranslations[_1];if(_4&&_4.afterInit){_4.afterInit(_2,_3)}
if(_3.height)_3.height=parseInt(_3.height);if(_3.top)_3.top=parseInt(_3.top);if(_3.left)_3.left=parseInt(_3.left);if(_3.width)_3.width=parseInt(_3.width);if(transformRules.formItems.contains(_2)){_3.showTitle=false;var _5={_constructor:'DynamicForm',ID:_3.ID,height:_3.height,top:_3.top,left:_3.left,width:_3.width,zIndex:_3.zIndex,title:_3.title,cellPadding:0,items:[_3],$86d:_3.$86d};if(_3.title==null){delete _5.title;_5.numCols=1}
delete _3.ID;delete _3.zIndex;delete _3.left;delete _3.top;_3=_5}
return _3}
,isc.A.getAdditionalElements=function isc_BMMLImporter_getAdditionalElements(_1,_2,_3){var _4=transformRules.widgetPropertyTranslations[_1];if(_4&&_4.getAdditionalElements){return _4.getAdditionalElements(_2,_3)}
return null}
,isc.A.processHeuristics=function isc_BMMLImporter_processHeuristics(_1){var _2=[];for(var i=0;i<_1.length;i++){if(_1[i].$86d){var _4=_1[i].$86d.controlName;var _5=transformRules.widgetPropertyTranslations[_4];if(_5&&_5.addChild){_2.add(_1[i]);_1[i].contained=[];_1[i].headerContained=[];_1[i].markupContained=[]}
if(_1[i].members){_1[i].contained=[]}}}
_1=this.processContainersHeuristic(_1,_2);_1=this.processStackHeuristic(_1,_2);_1=this.processFormsHeuristic(_1,_2);_1=this.removeExtraContainers(_1,_2);_1=this.processAddingToContainersHeuristic(_1,_2);return _1}
,isc.A.processContainersHeuristic=function isc_BMMLImporter_processContainersHeuristic(_1,_2){var _3=[];var _4=[];for(var i=0;i<_1.length;i++){if(_1[i].left!=null){_1[i].absX=_1[i].left}
if(_1[i].top!=null){_1[i].absY=_1[i].top}}
for(var i=0;i<_1.length;i++){var _6=_1[i];if(_6._constructor=="MockDataSource"){_4.addAt(_6,0)}else{var _7=this.findBestContainer(_2,_6);if(_7!=null){var _8=_7.$86d.controlName;var _9=_6.$86d.controlName;var _10=transformRules.widgetPropertyTranslations[_8];_6.top-=_7.absY;_6.left-=_7.absX;_6.autoDraw=false;if(transformRules.markupItems.contains(_9)){_7.markupContained.add(_6);_6.top-=_10.getTopMargin(_7);_6.left-=_10.getLeftMargin(_7)}else{var _11;if(_10.getControlAreaName){_11=_10.getControlAreaName(_7,_6)}
if(_11){_7.headerContained.add({controlAreaName:_11,control:_6})}else{_7.contained.add(_6);_6.top-=_10.getTopMargin(_7);_6.left-=_10.getLeftMargin(_7);var _12=transformRules.widgetPropertyTranslations[_9];if(_12&&_12.sloppyEdgeControl){if((_6.left+_6.width)>_7.width){_6.width=_7.width-_6.left}
if((_6.top+_6.height)>_7.height){_6.height=_7.height-_6.top}}}}
_6.top=Math.max(0,_6.top);_6.left=Math.max(0,_6.left)}
_3.add(_6)}}
var _13=[];for(var i=0;i<_3.length;i++){var _6=_3[i];var _14=this.getAllChildItems(_6);if(_14.length==0){_13.add(_6,0)}else{var _15=-1;for(var j=0;j<_14.length;j++){var _17=_13.indexOf(_14[j]);if(_17>=0&&_15<_17){_15=_17}}
if(_15>0){_13.add(_6,_15+1)}else{_13.add(_6,0)}}}
var _18=[];for(var i=0;i<_13.length;i++){var _6=_13[i]
if(_2.contains(_6))continue;var _19=false;for(var j=0;j<_2.length;j++){var _7=_2[j];if((_7.contained&&_7.contained.contains(_6))||(_7.markupContained&&_7.markupContained.contains(_6)))
{_19=true;break}
if(_7.headerContained){for(var k=0;k<_7.headerContained.length;k++){if(_7.headerContained[k].control==_6){_19=true;break}}
if(_19){break}}}
if(!_19){_18.add(_6)}}
if(_18.length>0){for(var j=0;j<_18.length-1;j++){_18[j].autoDraw=false;var _21={ID:"outer_"+j,_constructor:"VStack",fake:true,contained:[_18[j]],markupContained:[],$86d:{controlName:"Stack"},top:_18[j].top,left:_18[j].left,width:_18[j].width,height:_18[j].height};var _22;do{_22=false;for(var k=j+1;k<_18.length;k++){var _23=_18[k];var _24=_23.left+_23.width;var _25=_21.left+_21.width;var _26=Math.min(Math.abs(_21.left-_24),Math.abs(_23.left-_25));if((_21.left>=_23.left&&_25<=_24)||(_23.left>=_21.left&&_24<=_25))
{_26=0}
var _27=_23.top+_23.height;var _28=_21.top+_21.height;var _29=Math.min(Math.abs(_21.top-_27),Math.abs(_23.top-_28));if((_21.top>=_23.top&&_28<=_27)||(_23.top>=_21.top&&_27<=_28))
{_29=0}
if(_26<this.maxOuterControlsDistance&&_29<this.maxOuterControlsDistance)
{_21.contained.add(_23);_23.autoDraw=false;_21.top=Math.min(_21.top,_23.top);_21.left=Math.min(_21.left,_23.left);var _30=Math.max(_21.top+_21.height,_23.top+_23.height);var _31=Math.max(_21.left+_21.width,_23.left+_23.width);_21.height=_30-_21.top;_21.width=_31-_21.left;_18.removeAt(k);k--;_22=true}}}while(_22);for(var k=0;k<_21.contained.length;k++){_21.contained[k].left-=_21.left;_21.contained[k].top-=_21.top;if(transformRules.markupItems.contains(_21.contained[k].$86d.controlName))
{_21.markupContained.add(_21.contained[k]);_21.contained.removeAt(k);k--}}
_2.add(_21);_13.add(_21)}}
_13.addListAt(_4,0);return _13}
,isc.A.getAllChildItems=function isc_BMMLImporter_getAllChildItems(_1,_2){if(_1.contained==null){return[]}
var _3=[];_3.addList(_1.contained);if(_2!=true){if(_1.markupContained){_3.addList(_1.markupContained)}
if(_1.headerContained){for(var i=0;i<_1.headerContained.length;i++){_3.add(_1.headerContained[i].control)}}}
for(var i=0;i<_1.contained.length;i++){if(_1.contained[i].contained&&_1.contained[i].contained.length>0){_3.addList(this.getAllChildItems(_1.contained[i]))}}
return _3}
,isc.A.findBestContainer=function isc_BMMLImporter_findBestContainer(_1,_2){var _3=_2.absX+(_2.width==null?0:_2.width);var _4=_2.absY+(_2.height==null?0:_2.height);var _5=[];for(var i=0;i<_1.length;i++){var _7=_1[i];if(_7==_2){continue}
var _8=_7.absX-2;var _9=_7.absX+_7.width+2;var _10=_7.absY-2;var _11=_7.absY+_7.height+2;if(_8<=_2.absX&&_10<=_2.absY&&_2.zIndex>=_7.zIndex){var _12=transformRules.widgetPropertyTranslations[_2.$86d.controlName];if(_12!=null&&_12.sloppyEdgeControl){if((_9+this.sloppyEdgeControlOverflow)>=_3&&(_11+this.sloppyEdgeControlOverflow)>=_4)
{_5.add(_7)}}else{if(_9>=_3&&_11>=_4){_5.add(_7)}}}}
if(_5.length>0){var _7=_5[0];for(var i=1;i<_5.length;i++){if(_7.width>_5[i].width||_7.height>_5[i].height){_7=_5[i]}}
return _7}else{return null}}
,isc.A.processStackHeuristic=function isc_BMMLImporter_processStackHeuristic(_1,_2){for(var i=0;i<_2.length;i++){var _4=_2[i];_4.contained.sort(function(_21,_22){if(_21.top==_22.top){return _21.left-_22.left}
return _21.top-_22.top});this.handleElementsOverlap(_4.contained);this.addLabelsToFormItems(_1,_4);var _5=this.splitElementsByContainers(_4.contained,"top","height");var _6=this.splitElementsByContainers(_4.contained,"left","width");var _7;if(_6.size()>1&&_6.size()<5&&(_5.size()<2||_6.size()<_5.size())&&_4._constructor!="HStack"&&_4._constructor!="HLayout")
{_7=this.processStacksRecursively(_4,"root_horizontal");var _8={_constructor:"HStack",ID:_4.ID+"$856",contained:_4.contained,$86d:{controlName:"Stack"}};var _9=1000000;for(var j=0;j<_8.contained.lenght;j++){if(_8.contained[j].zIndex){_9=Math.max(_9,_8.contained[j].zIndex)}};_8.zIndex=_9;_4.contained=[_8];_7.add(_8)}else{_7=this.processStacksRecursively(_4,"root_vertical")}
_2.addListAt(_7,i);var _11=_1.indexOf(_4);_1.addListAt(_7,_11);i+=_7.length}
for(var i=0;i<_2.length;i++){var _4=_2[i];var _12=_4._constructor=="HStack"||_4._constructor=="HLayout";var _13=0;for(var j=1;j<_4.contained.length;j++){var _14=_4.contained[j];var _15=_4.contained[j-1];var _16=_14.$86d.controlName;if(_16=="com.balsamiq.mockups::HSplitter"||_16=="com.balsamiq.mockups::HRule"||_16=="com.balsamiq.mockups::VSplitter"||_16=="com.balsamiq.mockups::VRule")
{_15.showResizeBar=true;_4.overflow="auto";_1.remove(_4.contained[j]);_4.contained.removeAt(j);j--;continue}
if((_12&&_16=="com.balsamiq.mockups::VerticalScrollBar")||(!_12&&_16=="com.balsamiq.mockups::HorizontalScrollBar"))
{_4.overflow="auto";if(_12){_15.width+=_14.width}else{_15.height+=_14.height}
_1.remove(_14);_4.contained.removeAt(j);j--;continue}
var _17;if(_12){_17=_14.left-_15.left-_15.width}else{_17=_14.top-_15.top-_15.height}
if(_13==0){_13=_17}else if(Math.abs(_13-_17)>5){_13=0;break}}
var _18=_4.$86d.controlName;var _19=transformRules.widgetPropertyTranslations[_18];if(_19.canUseMargin==null||_19.canUseMargin)
{if(_13>0){_4.membersMargin=_13}}else{_13=0}
for(var j=1;j<_4.contained.length;j++){var _14=_4.contained[j];var _15=_4.contained[j-1];var _20=0;if(_12){if(_14.absX!=null&&_15.absX!=null){_20=_14.absX-_13-
(_15.absX+_15.width)}else{_20=_14.left-_13-
(_15.left+_15.width)}}else{if(_14.absY!=null&&_15.absY!=null){_20=_14.absY-_13-
(_15.absY+_15.height)}else{_20=_14.top-_13-
(_15.top+_15.height)}}
if(_20>0){_15.extraSpace=_20}}}
return _1}
,isc.A.addLabelsToFormItems=function isc_BMMLImporter_addLabelsToFormItems(_1,_2){for(var i=0;i<_2.contained.length;i++){var _4=_2.contained[i];if(_4._constructor!="Label")continue;for(var j=0;j<_2.contained.length;j++){var _6=_2.contained[j];if(_6._constructor!="DynamicForm"||_6.items==null){continue}
var _7=(_6.top>_4.top)&&(_6.top-(_4.top+_4.height)<this.labelMaxOffset)&&(Math.abs(_6.left-_4.left)<this.labelMaxOffset);var _8=(_6.left>_4.left)&&(_6.left-(_4.left+_4.width)<2*this.labelMaxOffset)&&(_4.top+this.labelMaxOffset>_6.top)&&(_4.top+_4.height-this.labelMaxOffset<
_6.top+_6.height);if(_7||_8){if(_6.items[0].title){if(_7){var _9=false;for(var l=0;l<_2.contained.length;l++){var _11=_2.contained[l];if(i!=l&&_11._constructor=="Label"){var _12=(_4.top>_11.top&&(_4.top-(_11.top+_11.height))<
this.labelMaxOffset)&&(Math.abs(_4.left-_11.left)<
this.labelMaxOffset);if(_12){_9=true;break}}}
if(_9){continue}}
_4._constructor="DynamicForm";_4.items=[{_constructor:"StaticTextItem",showTitle:false,width:_4.width,value:_4.contents}]}else{_6.items[0].showTitle=true;_6.items[0].title=_4.contents;if(_7){_6.numCols=1;_6.items[0].titleOrientation="top";var _13=17;_6.height+=_13;_6.top-=_13;_6.absY-=_13}else{_6.numCols=2;_6.width=_6.left+_6.width-_4.left;_6.left=_4.left;_6.absX=_4.absX;if(_6.height>_4.height*2){var _14=_4.top;var _15=Math.abs(_6.top+_6.height/ 2-_4.top-_4.height/ 2);var _16=Math.abs(_6.height-_4.top-_4.height);if(_14<_15&&_14<_16){_6.items[0].titleVAlign="top"}else if(_16<_15&&_16<_14){_6.items[0].titleVAlign="bottom"}}
_6.titleWidth=_6.width-_6.items[0].width+1}
_2.contained.removeAt(i);_1.remove(_4);i--;break}}}}}
,isc.A.processStacksRecursively=function isc_BMMLImporter_processStacksRecursively(_1,_2){_1.contained.sort(function(_17,_18){if(_17.top==_18.top){return _17.left-_18.left}
return _17.top-_18.top});var _3=_1.contained;if(_2=="vertical"||_2=="root_vertical"){var _4=this.splitElementsByContainers(_3,"top","height");if(_2=="vertical"&&_4.length==1){return[]}
_4.sort(function(_17,_18){return _17.top-_18.top});_1.contained=[];var _5=[];for(var i=0;i<_4.length;i++){var _7=_4[i];if(_7.children.length==1){_1.contained.add(_7.children[0])}else{var _8={_constructor:"HStack",ID:_1.ID+"$852"+i,contained:_7.children,top:_7.top,height:_7.height,absY:_7.children[0].absY,absX:_7.children[0].absX,$86d:{controlName:"Stack"}};var _9=1000000;var _10=1000000;var _11=0;for(var j=0;j<_7.children.length;j++){var _13=_7.children[j];_13.top-=_8.top;if(_13.top<0)_13.top=0;if(_13.zIndex){_9=Math.max(_9,_13.zIndex)}
_10=Math.min(_10,_13.left);_11=Math.max(_11,_13.left+_13.width)}
_8.zIndex=_9;_8.width=_11-_10;_8.left=_10;for(var j=0;j<_7.children.length;j++){_7.children[j].left-=_8.left}
var _14=this.processStacksRecursively(_8,"horizontal");_1.contained.add(_8);if(_14.length!=0){_5.addList(_14)}
_5.add(_8)}}
return _5}else{var _4=this.splitElementsByContainers(_3,"left","width");if(_2=="horizontal"&&_4.length==1){return[]}
_4.sort(function(_17,_18){return _17.left-_18.left});_1.contained=[];var _5=[];for(var i=0;i<_4.length;i++){var _7=_4[i];if(_7.children.length==1){_1.contained.add(_7.children[0])}else{var _8={_constructor:"VStack",ID:_1.ID+"$853"+i,contained:_7.children,left:_7.left,width:_7.width,absX:_7.children[0].absX,absY:_7.children[0].absY,autoDraw:false,$86d:{controlName:"Stack"}};var _9=1000000;var _15=1000000;var _16=0;for(var j=0;j<_7.children.length;j++){var _13=_7.children[j];_13.left-=_8.left;if(_13.left<0){_13.left=0}
if(_13.zIndex){_9=Math.max(_9,_13.zIndex)}
_15=Math.min(_15,_13.top);_16=Math.max(_16,_13.top+_13.height)}
_8.zIndex=_9;_8.height=_16-_15;_8.top=_15;for(var j=0;j<_7.children.length;j++){_7.children[j].top-=_8.top}
var _14=this.processStacksRecursively(_8,"vertical");_1.contained.add(_8);if(_14.length!=0){_5.addList(_14)}
_5.add(_8)}}
return _5}}
,isc.A.splitElementsByContainers=function isc_BMMLImporter_splitElementsByContainers(_1,_2,_3){var _4=[];for(var i=0;i<_1.length;i++){var _6=_1[i];var _7=_6[_3];var _8=_6.$86d.controlName;var _9=transformRules.widgetPropertyTranslations[_8];if(_9&&_9.sloppyEdgeControl&&_9.estimateControlSize)
{_7=_9.estimateControlSize(_6)[_3];_6[_3]=_7}
var _10=null;for(var j=0;j<_4.length;j++){var _12=_4[j];var _13=_7/ 4;var _14=_12[_3];_14/=4;var _15=Math.min(_13,_14);if((_6[_2]+_15>=_12[_2])&&(_6[_2]+_15<_12[_2]+_12[_3]))
{_10=_12;break}}
if(_10!=null){_10.children.add(_6);if(_6[_2]<_10[_2]||(_6[_2]+_7>
_10[_2]+_10[_3]))
{_10[_2]=Math.min(_6[_2],_10[_2]);_10[_3]=_6[_2]+_7-_10[_2];for(var j=0;j<_4.length;j++){var _12=_4[j];var _13=_7/ 4;var _14=_12[_3];_14/=4;var _15=Math.min(_13,_14);if(_12!=_10&&(_10[_2]+_15)<
(_12[_2]+_12[_3])&&(_10[_2]+_10[_3])>
(_12[_2]+_15))
{_10.children.addList(_12.children);if(_10[_2]>_12[_2]){_10[_2]=_12[_2]}
if(_10[_2]+_10[_3]<
_12[_2]+_12[_3])
{_10[_3]=_12[_2]+_12[_3]-_10[_2]}
_4.removeAt(j);j--}}}}else{var _16={children:[_6]};_16[_2]=_6[_2];_16[_3]=_7;_4.add(_16)}}
return _4}
,isc.A.handleElementsOverlap=function isc_BMMLImporter_handleElementsOverlap(_1){for(var i=0;i<_1.length-1;i++){for(var j=i+1;j<_1.length;j++){var _4=_1[i];var _5=_1[j];var _6=_4.left+_4.width;var _7=_4.top+_4.height;var _8=_5.left+_5.width;var _9=_5.top+_5.height;if(_4.left<_8&&_6>_5.left&&_4.top<_9&&_7>_5.top)
{var _10=Math.abs(_7-_5.top);var _11=Math.abs(_6-_5.left);if(_10>0&&_10<this.maxControlOverlap){_4.height-=_10+1;if(_4._constructor=="DynamicForm"&&_4.items){for(var k=0;k<_4.items.length;k++){_4.items[k].height=Math.min(_4.items[k].height,_4.height)}}}
if(_11>0&&_11<this.maxControlOverlap){_4.width-=_11+1;if(_4._constructor=="DynamicForm"&&_4.items){for(var k=0;k<_4.items.length;k++){_4.items[k].width=Math.min(_4.items[k].width,_4.width)}}}}}}}
,isc.A.processFormsHeuristic=function isc_BMMLImporter_processFormsHeuristic(_1,_2){var _3=[];for(var i=0;i<_2.length;i++){var _5=_2[i];if(this.isFormsOnlyContainer(_5)){_3.add(_5)}}
var _6=[];for(var i=0;i<_2.length;i++){var _5=_2[i];if(_3.contains(_5))continue;var _7=-1;var _8=-1;for(var j=0;j<_5.contained.length;j++){var _10=_5.contained[j];var _11=(j==(_5.contained.length-1));if((_10._constructor=="DynamicForm"&&_10.items!=null)||(_10._constructor!="DynamicForm"&&_3.contains(_10)&&this.$87q.contains(_10._constructor)))
{if(_7<0)_7=j;_8=j}else{_11=true}
if(_11&&_7>=0){if(_7!=_8){_6.add({container:_5,startInd:_7,endInd:_8});for(var k=_7;k<=_8;k++){_3.remove(_5.contained[k]);var _13=this.getAllChildItems(_5.contained[k],true);for(var _14=0;_14<_13.length;_14++){if(_13[_14].contained)_3.remove(_13[_14])}}}
_7=-1;_8=-1}}}
for(var i=0;i<_3.length;i++){for(var j=0;j<_3.length;j++){if(_3[j].contained.contains(_3[i])){_3.removeAt(i);i--;break}}}
for(var i=0;i<_3.length;i++){var _15=_3[i];var _16=this.getAllChildItems(_15,true)
if(_16.length<=1)continue;var _17=this.combineItemsIntoAForm(_16);var _18=_15.$86d.controlName;var _19=transformRules.widgetPropertyTranslations[_18];_17.left=_17.absX-_15.absX-
_19.getLeftMargin(_15);_17.top=_17.absY-_15.absY-
_19.getTopMargin(_15);_17.$86d={};_17.ID="f_"+i;_15.contained=[_17];_1.addAt(_17,_1.indexOf(_15));for(var j=0;j<_16.length;j++){_1.remove(_16[j]);_2.remove(_16[j])}}
for(var i=0;i<_6.length;i++){var _20=_6[i];var _21=_20.container;var _16=[];for(var j=_20.startInd;j<=_20.endInd;j++){var _22=_21.contained[j];if(_22.contained){_16.addList(this.getAllChildItems(_22,true))}else{_16.add(_22)}}
if(_16.length<=1)continue;var _17=this.combineItemsIntoAForm(_16);_17.left=_21.contained[_20.startInd].left;_17.top=_21.contained[_20.startInd].top;_17.$86d={};_17.ID="pf_"+i;var _23=_21.contained[_20.endInd]
if(_23.extraSpace)_17.extraSpace=_23.extraSpace;for(var j=_20.endInd;j>=_20.startInd;j--){_1.remove(_21.contained[j]);_21.contained.removeAt(j)};_21.contained.addAt(_17,_20.startInd);_1.addAt(_17,_1.indexOf(_21));for(var j=0;j<_16.length;j++){_1.remove(_16[j]);_2.remove(_16[j])}}
for(var i=0;i<_1.length;i++){var _10=_1[i];if(_10._constructor=="DynamicForm"&&_10.items&&_10.items.length==1&&_10.items[0]._constructor=="ButtonItem")
{var _24=_10.items[0];_24.left=_10.left;_24.top=_10.top;_24._constructor="Button";delete _24.startRow;delete _24.endRow;for(var _25 in _10){if(_25!="ID"&&_25!="$86d"){delete _10[_25]}}
for(var _25 in _24){_10[_25]=_24[_25]}}}
return this.processValuesManagers(_1,_2)}
);isc.evalBoundary;isc.B.push(isc.A.isFormsOnlyContainer=function isc_BMMLImporter_isFormsOnlyContainer(_1){var _2=this.getAllChildItems(_1,true)
if(_2.length==0)return false;for(var j=0;j<_2.length;j++){var _4=_2[j]._constructor=="DynamicForm";var _5=this.$87q.contains(_2[j]._constructor);if(!_4&&!_5)return false;if(_4&&_2[j].items==null)return false}
return true}
,isc.A.combineItemsIntoAForm=function isc_BMMLImporter_combineItemsIntoAForm(_1){var _2=[];for(var j=0;j<_1.length;j++){if(_1[j]._constructor!="DynamicForm"||_1[j].items==null)continue;var x=_1[j].absX;var y=_1[j].absY;var _6=_1[j].orientation=="horizontal";for(var k=0;k<_1[j].items.length;k++){var _8=_1[j].items[k];_8.$86q={x:x,y:y,width:_8.width?_8.width:_1[j].width,height:_8.height?_8.height:22};if(_8.title&&!this.$87t.contains(_8._constructor)){if(_8.titleOrientation=="top"){_8.$86q.height+=17}else{_8.$86q.x+=_1[j].titleWidth;_8.titleWidth=_1[j].titleWidth}}
if(_6){x+=_8.$86q.width}else{y+=_8.$86q.height}
_2.add(_8)}}
var _9={_constructor:"DynamicForm",cellPadding:0,items:[]}
var _10=10000;var _11=10000;for(var j=0;j<_2.length;j++){_10=Math.min(_10,_2[j].$86q.x);_11=Math.min(_11,_2[j].$86q.y)}
_9.absX=_10;_9.absY=_11;var _12=0;var _13=0;var _14=[];var _15=[];for(var j=0;j<_2.length;j++){_2[j].$86q.x-=_10;_2[j].$86q.y-=_11;_12=Math.max(_12,_2[j].$86q.x+_2[j].$86q.width);_13=Math.max(_13,_2[j].$86q.y+_2[j].$86q.height);if(!_14.contains(_2[j].$86q.x)){_14.add(_2[j].$86q.x)}
if(!_15.contains(_2[j].$86q.y)){_15.add(_2[j].$86q.y)}}
_14.sort(function(_32,_33){return _32-_33});_15.sort(function(_32,_33){return _32-_33});for(var i=0;i<_14.length-1;i++){if(_14[i+1]-_14[i]<this.formsGridCellWidth){for(var j=0;j<_2.length;j++){if(_2[j].$86q.x==_14[i+1]){_2[j].$86q.width+=(_14[i+1]-_14[i]);_2[j].$86q.x=_14[i]}}
_14.removeAt(i+1);i--}}
for(var i=0;i<_15.length-1;i++){if(_15[i+1]-_15[i]<this.formsGridCellHeight){for(var j=0;j<_2.length;j++){if(_2[j].$86q.y==_15[i+1]){_2[j].$86q.height+=(_15[i+1]-_15[i]);_2[j].$86q.y=_15[i]}}
_15.removeAt(i+1);i--}}
var _17=[];for(var _18=0;_18<_15.length;_18++){var _19=[];_17.add(_19);for(var _20=0;_20<_14.length;_20++){_19.add(null)}}
for(var j=0;j<_2.length;j++){var _8=_2[j];var _21=0;var _22=0;for(var _18=0;_18<_15.length;_18++){if(_8.$86q.y>=_15[_18]){_21=_18;_22=_18}
if((_8.$86q.y+_8.$86q.height)<=_15[_18]){break}
_22=_18}
var _23=0;var _24=0;for(var _20=0;_20<_14.length;_20++){if(_8.$86q.x>=_14[_20]){_23=_20;_24=_20}
if((_8.$86q.x+_8.$86q.width)<=_14[_20]){break}
_24=_20}
if(_24-_23>=1){_8.colSpan=_24-_23+1}
if(_22-_21>=1){_8.rowSpan=_22-_21+1}
delete _8.$86q;for(var _20=_23;_20<=_24;_20++){for(var _18=_21;_18<=_22;_18++){var _25=_17[_18][_20];if(_25){if(_20>0&&_25==_17[_18][_20-1]){_25.colSpan--;if(_25.colSpan==1)delete _25.colSpan}else if(_18>0&&_25==_17[_18-1][_20]){_25.rowSpan--;if(_25.rowSpan==1)delete _25.rowSpan}}
_17[_18][_20]=_8;if(_8.titleWidth!=null){var _26=_20-1;var _27=0;while(_26>=0&&_17[_18][_26]==null){_17[_18][_26]=_8;_27++;_26--}
if(_27>1)_8.titleColSpan=_27;if(_27>0)delete _8.titleWidth}}}}
for(var _18=0;_18<_15.length;_18++){for(var _20=0;_20<_14.length;_20++){var _28=_17[_18][_20];if(_28==null){if(_18!=0&&_17[_18-1][_20]._constructor=="SpacerItem"){_17[_18][_20]=_17[_18-1][_20];if(_17[_18][_20].rowSpan==null){_17[_18][_20].rowSpan=2}else{_17[_18][_20].rowSpan++}}else{if(_20>0&&_17[_18][_20-1]._constructor=="SpacerItem"){_17[_18][_20]=_17[_18][_20-1];if(_17[_18][_20].colSpan==null){_17[_18][_20].colSpan=2}else{_17[_18][_20].colSpan++}}else{_17[_18][_20]={_constructor:"SpacerItem"};_9.items.add(_17[_18][_20])}}}else if(!_9.items.contains(_28)){_9.items.add(_28)}
_28=_17[_18][_20];if(_28.rowSpan==null&&_18<(_15.length-1)){_28.cellHeight=_15[_18+1]-_15[_18]}}
for(var i=_9.items.length-1;i>=0;i--){if(_9.items[i]._constructor=="SpacerItem"){_9.items.removeAt(i);if(_18!=(_15.length-1)){_9.items[_9.items.length-1].endRow=true}}else{break}}}
var _29=[];for(var _20=0;_20<_14.length;_20++){var _30=0;for(var _18=0;_18<_15.length;_18++){if(_17[_18][_20].titleWidth!=null){if(_20==0){_30=Math.max(_30,_17[_18][_20].titleWidth)}else{tw=_14[_20]-_14[_20-1]-
_17[_18][_20-1].width;_30=Math.max(_30,tw)}}}
if(_30>0){if(_20!=0){_29[_29.length-1]-=_30}else{_9.absX-=_30}
for(var _18=0;_18<_15.length;_18++){if(_17[_18][_20].titleWidth==null){if(_17[_18][_20].colSpan==null){_17[_18][_20].colSpan=2}else{_17[_18][_20].colSpan++}}}
_29.add(_30)}
if(_20==_14.length-1){_29.add(_12-_14[_20])}else{_29.add(_14[_20+1]-_14[_20])}}
for(var i=0;i<_2.length;i++){delete _2[i].titleWidth}
var _31="";_9.width=0;for(var j=0;j<_29.length;j++){_31+=_29[j];_9.width+=_29[j];if(j!=_29.length-1){_31+=","}}
_9.colWidths=_31;_9.numCols=_29.length;_9.height=_13;return _9}
,isc.A.removeExtraContainers=function isc_BMMLImporter_removeExtraContainers(_1,_2){var _3;do{_3=false;for(var i=0;i<_2.length;i++){var _5=_2[i];if(_5.contained.length==1&&this.$87q.contains(_5._constructor)&&!(_5.overflow&&_5.contained[0]._constructor!="ListGrid"))
{for(var j=0;j<_2.length;j++){var _7=_2[j].contained.indexOf(_5);if(_7>=0){if(_5.top)_5.contained[0].top+=_5.top;if(_5.left)_5.contained[0].left+=_5.left;_5.contained[0].extraSpace=_2[j].contained[_7].extraSpace;_2[j].contained[_7]=_5.contained[0];_1.remove(_5);_2.removeAt(i);i--;_3=true
break}}}}}while(_3);return _1}
,isc.A.processValuesManagers=function isc_BMMLImporter_processValuesManagers(_1,_2){for(var i=0;i<_2.length;i++){if(!this.$87q.contains(_2[i]._constructor)&&_2[i]._constructor!="DynamicForm")
{var _4=this.findDynamicFormsRecursively(_2[i]);if(_4.length>1){var _5={_constructor:"ValuesManager",ID:"vm_"+i};for(var j=0;j<_4.length;j++){_4[j].valuesManager=_5.ID;if(_4[j].$86d.additionalElements==null){_4[j].$86d.additionalElements=[]}
_4[j].$86d.additionalElements.add(_5)}
_1.addAt(_5,0)}
var _7=[];for(var j=0;j<_4.length;j++){_7.addList(_4[j].items)}
for(var j=0;j<_7.length;j++){var _8=_7[j];if(_8.title!=null){var _9=_8.title.trim();_9=_9.replace(/\\r/g,"_").replace(/[^a-zA-Z0-9_]/g,"_");if(_9.charAt(0)>='0'&&_9.charAt(0)<='9'){_9='_'+_9}
var _10=_9;var _11=0;do{var _12=false;for(var k=0;k<_7.length;k++){if(_7[k].name==_10){_11++;_10=_9+_11;_12=true;break}}}while(_12);_8.name=_10}}}}
return _1}
,isc.A.findDynamicFormsRecursively=function isc_BMMLImporter_findDynamicFormsRecursively(_1){var _2=[];for(var i=0;i<_1.contained.length;i++){var _4=_1.contained[i];if(_4._constructor=="DynamicForm"&&_4.items!=null){_2.add(_4)}
if(this.$87q.contains(_4._constructor)||(_4._constructor=="DynamicForm"&&_4.items==null))
{_2.addAll(this.findDynamicFormsRecursively(_4))}}
return _2}
,isc.A.processAddingToContainersHeuristic=function isc_BMMLImporter_processAddingToContainersHeuristic(_1,_2){this.cleanZIndexParam(_1,_2);for(var i=0;i<_2.length;i++){this.processRemoveWidths(_1,_2,_2[i]);var _4=transformRules.widgetPropertyTranslations[_2[i].$86d.controlName];var _5=null;if(_2[i].markupContained!=null&&_2[i].markupContained.length>0){_5={_constructor:"VStack",ID:"widgets_container_"+i,position:"absolute",top:0,autoDraw:false,width:"100%",height:"100%",zIndex:_2[i].zIndex,members:[]};var _6={_constructor:"Canvas",height:"100%",width:"100%",autoDraw:false,children:[this.$88p(_5)]}
for(var j=0;j<_2[i].markupContained.length;j++){_2[i].markupContained[j].position="absolute";_6.children.add(this.$88p(_2[i].markupContained[j]))}
_4.addChild(_2[i],_6,_1);_1.addAt(_5,_1.indexOf(_2[i]))}
var _8=_2[i];this.processLayoutMargin(_1,_2,_8,_5);for(var j=0;j<_8.contained.length;j++){if(_8.contained.length==1&&(_8._constructor=="TabSet"||_8._constructor=="SectionStack")&&_8.verticalScrollBar!=null&&_8.contained[0]._constructor=="VStack")
{_8.contained[0]._constructor="VLayout";_8.contained[0].overflow="auto";delete _8.verticalScrollBar}
_8.contained[j].autoDraw="false";if(_5!=null){_5.members.add(this.$88p(_2[i].contained[j]))}else{_4.addChild(_2[i],this.$88p(_2[i].contained[j]),_1)}}
if(_8.headerContained!=null){_8.headerContained.sort(function(_13,_14){return _13.control.left-_14.control.left});for(var j=0;j<_8.headerContained.length;j++){if(j>0&&_8.headerContained[j].control.$86d.controlName=="com.balsamiq.mockups::VSplitter"||_8.headerContained[j].control.$86d.controlName=="com.balsamiq.mockups::VRule")
{_8.headerContained[j-1].control.showResizeBar=true;_8.overflow="auto";_1.remove(_8.headerContained[j].control);_8.headerContained.removeAt(j);j--;continue}
delete _8.headerContained[j].control.height;delete _8.headerContained[j].control.zIndex;delete _8.headerContained[j].control.top;delete _8.headerContained[j].control.left;_8.headerContained[j].control.autoDraw="false";_4.addControl(_8,{controlAreaName:_8.headerContained[j].controlAreaName,control:this.$88p(_8.headerContained[j].control)})}}
if(_8._constructor!="DynamicForm"&&(_8.markupContained==null||_8.markupContained.length==0))
{for(var j=0;j<_8.contained.length;j++){delete _8.contained[j].left;delete _8.contained[j].top;if(_8.contained[j]._constructor=="DynamicForm"&&_8.contained[j].items!=null)
{for(var k=0;k<_8.contained[j].items.length;k++){var _10=_8.contained[j].items[k];delete _10.left;delete _10.top;if(!this.tallFormItems.contains(_10._constructor)&&("SelectItem"!=_10._constructor||_10.multipleAppearance!="grid"))
{delete _10.height}}}}}
if(_8.fake){if(_8.layoutLeftMargin==null){_8.layoutLeftMargin=0}
if(_8.layoutTopMargin==null){_8.layoutTopMargin=0}
if(_8.contained.length==1&&_8.markupContained==0){_8.contained[0].left=_8.left+_8.layoutLeftMargin;_8.contained[0].top=_8.top+_8.layoutTopMargin;if(_8.contained[0].$86d){delete _8.contained[0].$86d.fullWidth;delete _8.contained[0].$86d.fullHeight}
delete _8.contained[0].autoDraw;_1.remove(_8)}else{_8.left=_8.left+_8.layoutLeftMargin;_8.top=_8.top+_8.layoutTopMargin;delete _8.layoutLeftMargin;delete _8.layoutTopMargin;delete _8.fake}}}
if(this.fillSpace){var _11=null;for(var i=0;i<_2.length;i++){var _12=true;for(var j=0;j<_2.length;j++){if(_2[j].contained.contains(_2[i])){_12=false;break}}
if(_12){if(_11!=null){_11=null;break}else{_11=_2[i]}}}
if(_11!=null&&(this.$87q.contains(_11._constructor)||"SectionStack"==_11._constructor||((_11._constructor=="Window"||_11._constructor=="TabSet"||_11._constructor=="Canvas")&&_11.contained.length==1&&this.$87q.contains(_11.contained[0]._constructor)&&((_11.contained[0].width==null||_11.contained[0].width=="100%")&&(_11.contained[0].height==null||_11.contained[0].height=="100%")))))
{_11.width="100%";_11.height="100%";delete _11.left;delete _11.top}}
for(var i=0;i<_2.length;i++){_2[i].$86d.innerItems=[];_2[i].$86d.innerItems.addList(_2[i].contained);_2[i].$86d.innerItems.addList(_2[i].headerContained);_2[i].$86d.innerItems.addList(_2[i].markupContained);delete _2[i].contained;delete _2[i].headerContained;delete _2[i].markupContained}
return _1}
,isc.A.$88p=function isc_BMMLImporter__getRefCanvas(_1){var _2={_constructor:"Canvas",ref:_1.ID};if(_1.$86d==null){_1.$86d={}}
if(_1.$86d.refs==null){_1.$86d.refs=[]}
_1.$86d.refs.add(_2);return _2}
,isc.A.cleanZIndexParam=function isc_BMMLImporter_cleanZIndexParam(_1,_2){var _3=this;var _4=function(_10,_9){var _11=_3.getAllChildItems(_10);for(var j=0;j<_11.length;j++){var _12=_11[j];var _13=_12.width;if(_13==null&&_12.$86d!=null){_13=_12.$86d.measuredWidth}
var _14=_12.height;if(_14==null&&_12.$86d!=null){_14=_12.$86d.measuredHeight}
if(_14!=null&&_13!=null&&_12.absX!=null&&_12.absY!=null&&_9.absX<(_12.absX+_13)&&(_9.absX+_9.width)>_12.absX&&_9.absY<(_12.absY+_14)&&(_9.absY+_9.height)>_12.absY)
{_9.doNotRemoveIndex=true}}
if(_9.doNotRemoveIndex){delete _9.doNotRemoveIndex}else{delete _9.zIndex}}
for(var i=0;i<_2.length;i++){var _6=true;for(var j=0;j<_2.length;j++){if(_2[j].contained!=null&&_2[j].contained.contains(_2[i]))
{_6=false;break}}
if(_6)delete _2[i].zIndex;if(_2[i].markupContained!=null){for(var k=0;k<_2[i].markupContained.length;k++){var _9=_2[i].markupContained[k];_4(_2[i],_9)}}
for(var j=0;j<_2[i].contained.length;j++){if(_2[i].children==null){delete _2[i].contained[j].zIndex}else{_4(_2[i],_2[i].contained[j])}}}}
,isc.A.processLayoutMargin=function isc_BMMLImporter_processLayoutMargin(_1,_2,_3,_4){var _5=10000;var _6=_5+1;var _7=_5+1;var _8=_5+1;var _9=_3._constructor=="HStack"||_3._constructor=="HLayout";var _10=this.getControlHeightUsingItsParents(_2,_3);var _11=this.getControlWidthUsingItsParents(_2,_3);for(var j=0;j<_3.contained.length;j++){var c=_3.contained[j];if(_9){if(j==0&&c.left!=null){_6=Math.min(_6,c.left)}
if(c.top!=null){_7=Math.min(_7,c.top)}
if(j==(_3.contained.length-1)&&c.left!=null&&_11!=null&&c.width!=null){_8=Math.min(_8,(_11-c.left-c.width))}}else{if(c.left!=null){_6=Math.min(_6,c.left)}
if(j==0&&c.top!=null){_7=Math.min(_7,c.top)}
if(c.left!=null&&_11!=null&&c.width!=null){_8=Math.min(_8,(_11-c.left-c.width))}}}
for(var j=0;j<_3.contained.length;j++){var c=_3.contained[j];if(this.$87q.contains(c._constructor)||"DynamicForm"==c._constructor)
{var _14=0;var _15=0;var _16=0;if(_9){if(j==0&&c.left!=null){_14=c.left-_6}
if(c.top!=null){_15=c.top-_7}
if(j==(_3.contained.length-1)&&c.left!=null&&_11!=null&&c.width!=null){_16=_11-c.left-c.width-_8}}else{if(c.left!=null){_14=c.left-_6}
if(j==0&&c.top!=null){_15=c.top-_7}
if(c.left!=null&&_11!=null&&c.width!=null){_16=_11-c.left-c.width-_8}}
if("DynamicForm"==c._constructor){if(c.items&&_15>3){c.items.addAt({type:"SpacerItem",cellHeight:_15,colSpan:"*"},0)}}else{if(_14>0&&c.layoutLeftMargin==null)c.layoutLeftMargin=_14;if(_15>0&&c.layoutTopMargin==null)c.layoutTopMargin=_15;if(_16>0&&c.layoutRightMargin==null)c.layoutRightMargin=_16}}}
if(_3._constructor=="SectionStack"&&((_6>0&&_6<=_5)||(_7>0&&_7<=_5)||(_8>0&&_8<=_5)||(_3.membersMargin!=null)))
{var c={ID:_3.ID+"$856",_constructor:"VStack",autoDraw:false,contained:_3.contained,$86d:{controlName:"Stack"}};_2.addAt(c,_2.indexOf(_3)+1);_1.addAt(c,_1.indexOf(_3));if(_3.membersMargin){c.membersMargin=_3.membersMargin;delete _3.membersMargin}
_3.contained=[c]}
if((_6>0&&_6<=_5)||(_7>0&&_7<=_5)||(_8>0&&_8<=_5))
{var c=null;if(_4!=null){c=_4}else if(_3._constructor=="Window"){c={};_3.bodyDefaults=c}else if(_3._constructor=="SectionStack"){c=_3.contained[0]}else{c=_3}
if(c!=null){if(_3.$86d==null){_3.$86d={}}
_3.$86d.layoutContainer=c;if(c._constructor=="DynamicForm"){var _17=Math.round((_6+_7)/2);var _18=10;if(Math.abs(_7-_17)<_18&&Math.abs(_6-_17)<_18&&(_17-_8)<_18)
{c.padding=_17}}else{if(_6>0&&_6<=_5){c.layoutLeftMargin=_6}
if(_7>0&&_7<=_5){c.layoutTopMargin=_7}
if(_8>0&&_8<=_5){c.layoutRightMargin=_8}}}}}
,isc.A.processRemoveWidths=function isc_BMMLImporter_processRemoveWidths(_1,_2,_3){var _4=transformRules.widgetPropertyTranslations[_3.$86d.controlName];for(var j=0;j<_3.contained.length;j++){var _6=_3.contained[j];var _7=null;var _8=null;var _9=this.getParent(_1,_3);var _10=this.getControlWidthUsingItsParents(_1,_3);var _11=0;var _12=0;var _13=0;var _14=0;if(_6.$86d.controlName){var _15=transformRules.widgetPropertyTranslations[_6.$86d.controlName];if(_15){var _11=_15.getLeftMargin?_15.getLeftMargin(_6):0;var _12=_15.getRightMargin?_15.getRightMargin(_6):0;var _13=_15.getTopMargin?_15.getTopMargin(_6):0;var _14=_15.getLeftMargin?_15.getLeftMargin(_6):0}}
if(_6.left<=(this.stackContainerFillInset+_11)&&(_6.left+_6.width)>=(_10-(this.stackContainerFillInset+_12))||((_3._constructor=="VStack"||_3._constructor=="VLayout")&&(_6._constructor=="HStack"||_6._constructor=="HLayout")))
{_6.$86d.fullWidth=true;_6.$86d.containerName=_3._constructor;_7=true}
var _16=this.getControlHeightUsingItsParents(_1,_3);if((_6.top<=(this.stackContainerFillInset+_13)&&((_6.top+_6.height)>=(_16-(this.stackContainerFillInset+_14))))||((_3._constructor=="HStack"||_3._constructor=="HLayout")&&(_6._constructor=="VStack"||_6._constructor=="VLayout")))
{_6.$86d.fullHeight=true;_6.$86d.containerName=_3._constructor;_8=true}
if((_3._constructor=="TabSet"||_3._constructor=="Window"||_3._constructor=="SectionStack"||_3._constructor=="VStack"||_3._constructor=="VLayout")&&_6.width!=null)
{if(_6.left<=this.stackContainerFillInset){_6.layoutAlign="left"}else if(_6.left+_6.width>=(_3.width-this.stackContainerFillInset-_4.getLeftMargin(_3)
-_4.getRightMargin(_3)))
{_6.layoutAlign="right"}else if(Math.abs(_6.left+_6.width/ 2-
(_3.width-_4.getLeftMargin(_3)
-_4.getRightMargin(_3))/2)<=this.stackContainerFillInset)
{_6.layoutAlign="center"}}else if((_3._constructor=="HStack"||_3._constructor=="HLayout")&&_6.height!=null)
{if(_6.top<=this.stackContainerFillInset){_6.layoutAlign="top"}else if(_6.top+_6.height>=(_3.height-this.stackContainerFillInset-_4.getTopMargin(_3)
-_4.getBottomMargin(_3)))
{_6.layoutAlign="bottom"}else if(Math.abs(_6.top+_6.height/ 2-
(_3.height-_4.getTopMargin(_3)
-_4.getBottomMargin(_3))/2)<this.stackContainerFillInset)
{_6.layoutAlign="center"}}
if(_7&&_8&&_3.contained.length>1){this.processSnapToHeuristic(_1,_3,_6);break}}}
,isc.A.processSnapToHeuristic=function isc_BMMLImporter_processSnapToHeuristic(_1,_2,_3){var _4=5;for(var i=0;i<_2.contained.length;i++){var _6=_2.contained[i];if(_6!=_3){if(_6.width!=null){var _7=this.getControlWidthUsingItsParents(_1,_2);if(Math.abs(_7-_6.width)<=_4*2){}else if(Math.abs(_7-(_6.left+_6.width))<=_4){_6.snapToHor="R";delete _6.left}else if(Math.abs(_7/ 2-(_6.left+_6.width/ 2))<=_4){_6.snapToHor="C";delete _6.left}else if(_6.left<=_4){_6.snapToHor="L";delete _6.left}}
if(_6.height!=null){var _8=this.getControlHeightUsingItsParents(_1,_2);if(Math.abs(_8-_6.height)<=_4*2){}else if(Math.abs(_8-(_6.top+_6.height))<=_4){_6.snapToVer="B";delete _6.top}else if(Math.abs(_8/ 2-(_6.top+_6.height/ 2))<=_4){_6.snapToVer="C";delete _6.top}else if(_6.top<=_4){_6.snapToVer="T";delete _6.top}}
var _9="";if(_6.snapToVer!=null){_9+=_6.snapToVer;delete _6.snapToVer;delete _6.layoutTopMargin}
if(_6.snapToHor!=null){if(_6.snapToVer=="C"){_9=_6.snapToHor}else{_9+=_6.snapToHor}
delete _6.snapToHor;delete _6.layoutLeftMargin}
if(_2.markupContained==null){_2.markupContained=[]}
if(_9!=null&&_9!=""){_6.snapTo=_9;_2.markupContained.add(_6);_2.contained.removeAt(i);i--}else{_2.markupContained.add(_6);_2.contained.removeAt(i);i--}}}
return _1}
,isc.A.getControlHeightUsingItsParents=function isc_BMMLImporter_getControlHeightUsingItsParents(_1,_2){var _3=_2.height;if(_3==null){var _4=this.getParent(_1,_2);while(_4!=null&&_4.height==null){_4=this.getParent(_1,_4)}
if(_4!=null){var _5=transformRules.widgetPropertyTranslations[_4.$86d.controlName];_3=_4.height-_5.getTopMargin(_4)-_5.getBottomMargin(_4)}}else{var _5=transformRules.widgetPropertyTranslations[_2.$86d.controlName];if(_5.getTopMargin!=null&&_5.getBottomMargin!=null){_3=_2.height-_5.getTopMargin(_2)-_5.getBottomMargin(_2)}}
return _3}
,isc.A.getControlWidthUsingItsParents=function isc_BMMLImporter_getControlWidthUsingItsParents(_1,_2){var _3=_2.width;if(_3==null){var _4=this.getParent(_1,_2);while(_4!=null&&_4.width==null){_4=this.getParent(_1,_4)}
if(_4!=null){var _5=transformRules.widgetPropertyTranslations[_4.$86d.controlName];_3=_4.width-_5.getLeftMargin(_4)-_5.getRightMargin(_4)}}else{var _5=transformRules.widgetPropertyTranslations[_2.$86d.controlName];if(_5.getLeftMargin!=null&&_5.getRightMargin!=null){_3=_2.width-_5.getLeftMargin(_2)-_5.getRightMargin(_2)}}
return _3}
,isc.A.getParent=function isc_BMMLImporter_getParent(_1,_2){for(var i=0;i<_1.length;i++){if(_1[i].contained!=null&&_1[i].contained.contains(_2)){return _1[i]}
if(_1[i].children!=null&&_1[i].children.contains(_2)){return _1[i]}}
return null}
);isc.B._maxIndex=isc.C+58;isc.ClassFactory.defineClass("BMMLImportDialog","Dialog");isc.A=isc.BMMLImportDialog.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.showOutputField=true;isc.A.showSkinSelector=true;isc.A.width=540;isc.A.height=350;isc.A.isModal=true;isc.A.title="Import Balsamiq file";isc.A.showToolbar=false;isc.A.importFormDefaults={_constructor:"DynamicForm",numCols:3,cellPadding:6,autoDraw:false,saveOnEnter:true,titleWidth:160,useAllDataSourceFields:false,uploadCallback:function(_1,_2){var _3=this.dataSource;var _4=this;var _5=RPCManager.actionURL;RPCManager.actionURL="[ISOMORPHIC]/IDACall";var _6=_3.getFileURL(_2);RPCManager.actionURL=_5;isc.RPCManager.sendRequest({actionURL:_6,callback:function(_9){var _7="/tools/visualBuilder/mockups/"+_2.file_filename;isc.DMI.callBuiltin({methodName:"saveFile",arguments:[_7,_9.data],callback:function(_10){var v=_4.getValues();_4.creator.submit(_7,v.outputFileName,v.skin,v.dropMarkup,v.trimSpace,v.fillSpace)}})}})},uploadAssetCallback:function(_1,_2,_3){var _4=this;var _5=this.dataSource;var _6=RPCManager.actionURL;RPCManager.actionURL="[ISOMORPHIC]/IDACall";var _7=_5.getFileURL(_2);RPCManager.actionURL=_6;isc.RPCManager.sendRequest({actionURL:_7,callback:function(_10){var _8="/tools/visualBuilder/mockups/assets/"+_2.file_filename;isc.DMI.callBuiltin({methodName:"saveFile",arguments:[_8,_10.data],callback:function(_11){var _9=_2.file_filename;if(_4.assetFiles==null){_4.assetFiles=[]}
if(!_4.assetFiles.contains(_9))
{_4.assetFiles.add(_9)}
if(_4.assetFiles.length==1){_4.setValue("assetsName",_4.assetFiles[0]+" (click to upload more)")}else{_4.setValue("assetsName",_4.assetFiles.length+" assets (click to upload more)")}
if(_3){_4.getField("file").clearValue()}}})}})}};isc.B.push(isc.A.initWidget=function isc_BMMLImportDialog_initWidget(){this.Super("initWidget",arguments);var _1=[];if(this.showSkinSelector){_1.add({name:"skin",editorType:"TSelectItem",width:160,title:"Skin",colSpan:2,valueMap:{Enterprise:"Enterprise",EnterpriseBlue:"Enterprise Blue",Graphite:"Graphite",Simplicity:"Simplicity",fleet:"Fleet",TreeFrog:"TreeFrog",SilverWave:"SilverWave",BlackOps:"Black Ops",SmartClient:"Stone",Cupertino:"Cupertino",standard:"Basic"}})}
_1.addList([{name:"dropMarkup",title:"Drop Markup",type:"checkbox",labelAsTitle:true,defaultValue:true,hoverWidth:200,itemHoverHTML:function(){return"If enabled, markup elements such as sticky notes and "+"strikethroughs are dropped during import."},titleHoverHTML:function(){return this.itemHoverHTML()}},{name:"trimSpace",title:"Trim Space",type:"checkbox",labelAsTitle:true,defaultValue:true,hoverWidth:200,itemHoverHTML:function(){return"If enabled, if there is empty space to the left/top of the "+"mockup, the mockup is moved to 0,0 instead.  In combination with "+"dropMarkup, this also means that a mockup with only markup "+"elements to the left/top of it will be moved to 0,0 as part of "+"importing."},titleHoverHTML:function(){return this.itemHoverHTML()}},{name:"fillSpace",title:"Fill Space",type:"checkbox",labelAsTitle:true,defaultValue:true,hoverWidth:200,itemHoverHTML:function(){return"If enabled, for a mockup where importing resulting a single "+"layout or single top-level container with a single layout within "+"it, the top-level widget will be set to 100% width and height so "+"that it fills available space."},titleHoverHTML:function(){return this.itemHoverHTML()}},{name:"fileName",title:"Select file",type:"link",target:"javascript",defaultValue:"select file",canEdit:false,click:function(_7,_9){var _2=isc.LoadFileDialog.create({actionStripControls:["spacer:10","pathLabel","previousFolderButton","spacer:10","upOneLevelButton","spacer:10","refreshButton","spacer:2"],directoryListingProperties:{canEdit:false},title:"Import Balsamiq File",initialDir:"/tools/visualBuilder/workspace",rootDir:"/",loadFile:function(_10){if(_10.match(/\.(bmml)$/i)==null){isc.say("Only BMML files may be imported (must end with .bmml)");return}
var _3=this;_7.setValue("fileName",this.currentDir+"/"+_10);_2.hide()}});_2.show()}},{name:"file",title:"Upload file",type:"FileItem",width:200,hoverWidth:200,visible:false,itemHoverHTML:function(){return"Upload file to server and proceed."},titleHoverHTML:function(){return this.itemHoverHTML()}},{name:"assetsName",title:"Upload assets",type:"link",target:"javascript",defaultValue:"upload an asset file",startRow:true,canEdit:false,visible:false,click:function(_7,_9){var _4=isc.Dialog.create({title:"Load asset",height:140,width:350,showToolbar:false});var _5=isc.DynamicForm.create({dataSource:_7.dataSource,numCols:3,cellPadding:10,autoDraw:false,fields:[{name:"file",type:"FileItem",title:"Asset file",colSpan:2},{type:"SpacerItem"},{name:"submitButton",title:"Load",type:"button",endRow:false,startRow:false,align:"right",click:function(_10,_9){if(_10.getValues().file!=null){_4.hide();_10.saveData(_7.getID()+".uploadAssetCallback(dsResponse, data)")}else{isc.warn("Select asset to upload")}}},{name:"cancelButton",title:"Cancel",type:"button",startRow:false,click:function(_7,_9){_4.hide()}}]});_4.addItem(_5);_4.show()}}]);if(this.showOutputField){_1.add({name:"outputFileName",title:"Output File Name",type:"TextItem",width:320,colSpan:2,hoverWidth:200,hint:"Optional",itemHoverHTML:function(){return"Writes the source code of the imported screen to the specified "+"path under webroot, in JavaScript format if the file name ends in "+"'.js', otherwise in XML format."},titleHoverHTML:function(){return this.itemHoverHTML()}})}
_1.add({name:"submitButton",title:"Import",type:"button",colSpan:3,align:"right",click:function(_7,_9){var _6=_7.getValues();if(_6.fileName=='select file'&&_6.file==null){isc.warn("Select file to process.")}else{if(_6.file!=null){if(_6.file=="symbols.bmml"||_6.file.endsWith("\symbols.bmml")){isc.ask("The file symbols.bmml looks like an asset file. "+"Do you want to convert it or add to assets?",function(_10){},{buttons:[isc.Button.create({title:"Convert",click:function(){this.topElement.hide();_7.creator.hide();_7.saveData(_7.getID()+".uploadCallback(dsResponse, data)")}}),isc.Button.create({title:"Add to assets",click:function(){this.topElement.hide();_7.saveData(_7.getID()+".uploadAssetCallback(dsResponse, data, true)")}})]})}else{_7.creator.hide();_7.saveData(_7.getID()+".uploadCallback(dsResponse, data)")}}else{_7.creator.hide();_7.creator.submit(_6.fileName,_6.outputFileName,_6.skin,_6.dropMarkup,_6.trimSpace,_6.fillSpace)}}}});var _7=this.importForm=this.createAutoChild("importForm",{fields:_1});var _7=this.importForm;var _8=this;isc.DataSource.load("uploadedFiles",function(_9){if(_9=="uploadedFiles"){_7.setDataSource(isc.DataSource.get("uploadedFiles"),_7.fields);_7.getField("file").show();_7.getField("assetsName").show()}else{_7.getField("file").hide();_7.getField("assetsName").hide()}
_8.addItem(_7)})}
,isc.A.submit=function isc_BMMLImportDialog_submit(_1,_2,_3,_4,_5,_6){}
);isc.B._maxIndex=isc.C+2;isc.defineClass("FieldMapper","HStack");isc.A=isc.FieldMapper.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.membersMargin=10;isc.A.padding=10;isc.B.push(isc.A.initWidget=function isc_FieldMapper_initWidget(){this.Super("initWidget",arguments);var _1=this;var _2=isc.ListGrid.create({width:500,height:224,alternateRecordStyles:true,fields:[{name:"name",title:"Name"},{name:"title",title:"Title"},{name:"type",title:"Type"},{name:"inUse",title:"In use",type:"boolean"}],canDragRecordsOut:true,dragDataAction:"copy",autoDraw:false,updateInUseFields:function(_8,_9){if(_9){this.setValue(_9,false)}
this.setValue(_8,true);var _3={};for(var i=0;i<this.data.length;i++){if(!this.data[i].inUse){var _5=this.data[i].name;_3[_5]=_6[_5].title}}
_1.$87z.getField("mappedTo").valueMap=_3},setValue:function(_5,_8){for(var i=0;i<this.data.length;i++){if(this.data[i].name==_5){this.data[i].inUse=_8;this.redraw();return}}}});this.$87z=isc.ListGrid.create({width:500,height:224,alternateRecordStyles:true,fields:[{name:"name",title:"Name"},{name:"title",title:"Title"},{name:"mappedTo",title:"Mapped To",type:"SelectItem",change:"targetDataSourceList.updateInUseFields(value, oldValue)"}],canReorderRecords:true,canAcceptDroppedRecords:true,recordDrop:function(_8,_9,_10){for(var i=0;i<this.data.length;i++){if(this.data[i].mappedTo==_8[0].name){return}};_2.updateInUseFields(_8[0].name,_9.mappedTo);_9.mappedTo=_8[0].name;this.redraw()},canEdit:true,autoDraw:false});this.setMembers([this.$87z,_2]);if(this.mockDataSource==null){isc.logWarn("MockDataSource should be set")}else if(this.targetDataSource==null){isc.logWarn("TargetDataSource should be set")}else{var _6=this.mockDataSource.getFields();var _7=[];for(var _5 in _6){_7.add({name:_5,title:_6[_5].title})};this.$870(_7);this.$87z.setData(_7);_6=this.targetDataSource.getFields();_7=[];var _3={};for(var _5 in _6){_7.add({name:_5,title:_6[_5].title,type:_6[_5].type,inUse:false});_3[_5]=_6[_5].title};_2.setData(_7);this.$87z.getField("mappedTo").valueMap=_3}}
,isc.A.$870=function isc_FieldMapper__automaticDefaultMapping(_1){var _2=[];var _3=isc.shallowClone(this.targetDataSource);_3.autoDeriveTitles=true;var _4=_3.getFields();for(var _5 in _4){_2.add({name:_5,splittedTitle:_4[_5].title.toLowerCase().split(" ")})};for(var i=0;i<_1.length;i++){var _7=_1[i].title.toLowerCase().split(" ");var _8=null;var _9=0;for(var j=0;j<_2.length;j++){if(_2[j].occupied)continue;var _11=0;var _12=_2[j].splittedTitle;for(var _13=0;_13<_12.length;_13++){for(var _14=0;_14<_7.length;_14++){if(_7[_14]==_12[_13]){_11++}}}
if(_11>_9){_9=_11;_8=_2[j]}};if(_8){_8.occupied=true;_1[i].mappedTo=_8.name}}}
,isc.A.getMappedFields=function isc_FieldMapper_getMappedFields(){var _1=this.$87z.getData();var _2=[];for(var i=0;i<_1.length;i++){var _4={name:_1[i].mappedTo,title:_1[i].title};_2.add(_4)};return _2}
);isc.B._maxIndex=isc.C+3;isc.overwriteClass("MockupElement","Img");isc.A=isc.MockupElement.getPrototype();isc.A.controlName="MockupElement";isc.A.defaultWidth=16;isc.A.defaultHeight=28;isc.A.measuredW=-1;isc.A.measuredH=-1;isc.A=isc.MockupElement.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.B.push(isc.A.initWidget=function isc_MockupElement_initWidget(){this.Super(this.$oc);var _1="/tools/visualBuilder/mockups/";var _2=this.controlName.substr(this.controlName.indexOf("::")+2,this.controlName.length)+".png";this.src=_1+_2;if(this.title!=null){this.addChild(isc.Label.create({ID:this.getID()+"_titleLabel",autoDraw:true,left:10,top:0,width:this.width,height:this.height,zIndex:this.getZIndex(true)+1,contents:this.title}))}}
);isc.B._maxIndex=isc.C+1;isc.defineClass("MockDataSource","DataSource");isc.A=isc.MockDataSource.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.mockData="md";isc.A.clientOnly=true;isc.A.cacheData=[];isc.A.fields=[];isc.A.mockDataType="grid";isc.B.push(isc.A.init=function isc_MockDataSource_init(){if(this.mockDataType=="grid"){this.fields=this.parseTableFields(this.mockData);this.cacheData=this.parseTable(this.mockData)}else if(this.mockDataType=="tree"){this.fields=[{name:"name",type:"text"}];this.cacheData=this.parseTree(this.mockData)}
return this.Super("init",arguments)}
,isc.A.parseTextWikiSymbols=function isc_MockDataSource_parseTextWikiSymbols(_1){var _2=false;var _3=false;var _4=false;var _5=[];for(var i=0;i<_1.length;i++){var c=_1.charAt(i);if(c=='\\'){if((i+1)<_1.length&&_1.charAt(i+1)=='r'){c="<br/>";i++}}else if(c=='['&&_1.indexOf("]",i+1)>0){c="<a href='#'>";_4=true}else if(c==']'){if(_4){c="</a>";_4=false}}else if(c=='*'){if(_3){_3=false;c="</b>"}else{_3=true;c="<b>"}}else if(c=='_'){if(_2){_2=false;c="</i>"}else{_2=true;c="<i>"}}
_5.push(c)}
return _5.join("")}
,isc.A.parseTableFields=function isc_MockDataSource_parseTableFields(_1){var _2=_1.split("\n");var _3=_2[0].split(","),_4=[];var _5=_2[_2.length-1];if(_5.startsWith("[")&&_5.endsWith("]")&&_5!="[]"&&_5!="[ ]"&&_5!="[x]"){var _6=_5.substring(1,_5.length-1).split(",")}
for(var j=0;j<_3.length;j++){var _8=_3[j].trim().replace(/\\r/g,"<br/>");var _9=_3[j].trim().replace(/\\r/g,"_").replace(/[^a-zA-Z0-9_]/g,"_");if(_9.charAt(0)>='0'&&_9.charAt(0)<='9'){_9='_'+_9}
var _10=_9;var _11=0;do{var _12=false;for(var i=0;i<_4.length;i++){if(_4[i].name==_10){_11++;_10=_9+_11;_12=true;break}}}while(_12);var _14={name:_10,title:_8};if(_6!=null){_14.width=_6[j];var _15=_14.width[_14.width.length-1];if(!this.$871(_15)){_14.width=_14.width.substring(0,_6[j].length-1);if(_15=='R'||_15=='r'){_14.align="right"}else if(_15=='L'||_15=='l'){_14.align="left"}else if(_15=='C'||_15=='c'){_14.align="center"}}
_14.width+="%"}
_4.add(_14)}
return _4}
,isc.A.$871=function isc_MockDataSource__isDigit(_1){var _2=_1.charCodeAt(0);if((_2>47)&&(_2<58)){return true}
return false}
,isc.A.parseTable=function isc_MockDataSource_parseTable(_1){var _2=_1.split("\n");var _3=this.parseTableFields(_1);var _4=[];for(var i=1;i<_2.length;i++){if(_2[i].startsWith("[")&&_2[i].endsWith("]")&&_2[i]!="[]"&&_2[i]!="[ ]"&&_2[i]!="[x]"){continue}
var _6={};var _7=this.splitComma(_2[i]);for(var j=0;j<_3.length;j++){var _9=_7[j];if(_9==null){_9=""}
_9=_9.replace("[]","<input type='checkbox' />");_9=_9.replace("[ ]","<input type='checkbox' />");_9=_9.replace("[x]","<input type='checkbox' checked='true' />");_6[_3[j].name]=this.parseTextWikiSymbols(_9)}
_4.add(_6)}
return _4}
,isc.A.splitComma=function isc_MockDataSource_splitComma(_1){var _2=_1.split(","),_3=[];for(var i=0,_5=_2.length,_6;i<_5;++i){_6="";while(_2[i].slice(-1)=="\\"){_6+=_2[i++].slice(0,-1)+","}
_3.push(_6+_2[i])}
return _3}
,isc.A.parseTree=function isc_MockDataSource_parseTree(_1){var _2=_1.split("\n");var _3=[];var _4;var _5=0;for(var i=0;i<_2.length;i++){var _7={};var _8=_2[i].split("");var _9=0;for(var j=0;j<_8.length;j++){if(_8[j]==" "||_8[j]=="."){_9+=1}else{break}}
var _11=_2[i].substr(_9);var _12=false;if(_11.startsWith("f")||_11.startsWith(">")||_11.startsWith("[x")||_11.startsWith("[+")){_7.isFolder=true;_7[_3.openProperty]=true}else if(_11.startsWith("F")||_11.startsWith("v")||_11.startsWith("[ ")||_11.startsWith("[-")){_7.isFolder=true}
if(_11.startsWith("f")){_7.icon="/tools/visualBuilder/mockups/folder_closed.png"}else if(_11.startsWith(">")){_7.icon="/tools/visualBuilder/mockups/group_closed.png"}else if(_11.startsWith("[x")){_7.icon="/tools/visualBuilder/mockups/unchecked.png"}else if(_11.startsWith("[+")){_7.icon="/tools/visualBuilder/mockups/expander_closed.png"}else if(_11.startsWith("F")){_7.icon="/tools/visualBuilder/mockups/folder_opened.png"}else if(_11.startsWith("v")){_7.icon="/tools/visualBuilder/mockups/group_opened.png"}else if(_11.startsWith("[ ")){_7.icon="/tools/visualBuilder/mockups/checked.png"}else if(_11.startsWith("[-")){_7.icon="/tools/visualBuilder/mockups/expander_opened.png"}else if(_11.startsWith("-")||_11.startsWith("_")){_7.icon="/tools/visualBuilder/mockups/file.png"}
if(_11.startsWith("["))_11=_11.substr(3);else if(_7.isFolder)_11=_11.substr(1);else if(_11.startsWith("-")||_11.startsWith("_"))_11=_11.substr(2);_7.name=this.parseTextWikiSymbols(_11);_7.children=[];if(_9==0){_3.add(_7)}else if(_9>_5){_4.children.add(_7);_7.parent=_4}else if(_9==_5){_4.parent.children.add(_7);_7.parent=_4.parent}else{var _13=_5;var _14=_4.parent;while(_13>_9){_14=_14.parent;_13-=1}
_14.children.add(_7);_7.parent=_14}
_4=_7;_5=_9}
return _3}
);isc.B._maxIndex=isc.C+7;isc._moduleEnd=isc._VisualBuilder_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('VisualBuilder module init time: ' + (isc._moduleEnd-isc._moduleStart) + 'ms','loadTime');delete isc.definingFramework;}else{if(window.isc && isc.Log && isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'VisualBuilder'.");}

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

