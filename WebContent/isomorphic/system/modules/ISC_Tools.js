/*
asda
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

if (window.isc && window.isc.module_Core && !window.isc.module_Tools) {
	isc.module_Tools = 1;
	isc._moduleStart = isc._Tools_start = (isc.timestamp ? isc.timestamp()
			: new Date().getTime());
	if (isc._moduleEnd
			&& (!isc.Log || (isc.Log && isc.Log.logIsDebugEnabled('loadTime')))) {
		isc._pTM = {
			message : 'Tools load/parse time: '
					+ (isc._moduleStart - isc._moduleEnd) + 'ms',
			category : 'loadTime'
		};
		if (isc.Log && isc.Log.logDebug)
			isc.Log.logDebug(isc._pTM.message, 'loadTime')
		else if (isc._preLog)
			isc._preLog[isc._preLog.length] = isc._pTM
		else
			isc._preLog = [ isc._pTM ]
	}
	isc.definingFramework = true;
	isc.defineClass("ComponentEditor", "PropertySheet");
	isc.A = isc.ComponentEditor.getPrototype();
	isc.A.immediateSave = false;
	isc.A.itemHoverWidth = 500;
	isc.A.showSuperClassEvents = true;
	isc.A.initialGroups = 3;
	isc.A.showAttributes = true;
	isc.A.showMethods = false;
	isc.A.basicMode = false;
	isc.A.lessTitle = "Less...";
	isc.A.moreTitle = "More...";
	isc.A.canSwitchClass = false;
	isc.A.componentTypeTitle = "Component Type";
	isc.A = isc.ComponentEditor.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.A.handlerFieldBase = {
		validateOnChange : true,
		validators : [ {
			type : "isFunction"
		} ],
		itemHoverHTML : function() {
			var _1 = this.mapValueToDisplay(this.getValue());
			if (_1 == null)
				return _1;
			if (_1 == "&nbsp;" || _1.match(/^\W+$/))
				_1 = "";
			return _1.asHTML()
		}
	};
	isc.A.itemHoverStyle = "docHover";
	isc.B
			.push(
					isc.A.shouldUseField = function isc_ComponentEditor_shouldUseField(
							_1) {
						if (!this.Super("shouldUseField", arguments)) {
							return false
						}
						if (_1.hidden || _1.inapplicable || _1.advanced)
							return false;
						var _2 = this.$694 == null ? this.basicMode : this.$694;
						if (_2 && !_1.basic)
							return false;
						if (_1.type && isc.DS.isLoaded(_1.type)
								&& _1.type != "ValueMap" && _1.type != "Action") {
							return false
						}
						var _3 = isc.DS.get(this.dataSource);
						if (!_3)
							return true;
						var _4 = _3.ID, _5 = _1[this.fieldIdProperty];
						if (isc.jsdoc.hasData()) {
							var _6 = isc.jsdoc.getDocItem(_4, _5, true);
							if (_1.visibility != null && _6 == null)
								return false;
							if (isc.isAn.XMLNode(_6)
									&& _6.getAttribute("deprecated"))
								return false;
							if (_6 && isc.jsdoc.isAdvancedAttribute(_6))
								return false
						}
						return true
					},
					isc.A.bindToDataSource = function isc_ComponentEditor_bindToDataSource(
							_1, _2) {
						var _3 = this.$46d = this.Super("bindToDataSource",
								arguments);
						var _4 = this.dataSource ? isc.DS.get(this.dataSource)
								: null;
						if (_1 && _1.length > 0)
							return _3;
						if (_4 == null || this.$46d == null)
							return _3;
						for ( var i = 0; i < _3.length; i++) {
							var _6 = _3[i], _7 = _6.defaultValue;
							if (_7 == null)
								continue;
							if (_7 == "false")
								_7 = false;
							else if (_7 == "true")
								_7 = true;
							else if (parseInt(_7).toString() == _7) {
								_7 = parseInt(_7)
							}
							_6.defaultValue = _7
						}
						if (!isc.jsdoc.hasData())
							return _3;
						var _8 = {}, _9 = false;
						if (this.showAttributes) {
							for ( var i = 0; i < _3.length; i++) {
								var _6 = _3[i], _10 = _6[this.fieldIdProperty];
								var _11 = isc.jsdoc.getGroupForAttribute(_4.ID,
										_10)
										|| _6.group || "other";
								if (_11 == null)
									_11 = "other";
								if (_11 != "other")
									_9 = true;
								if (!_8[_11])
									_8[_11] = [];
								_8[_11].add(_6)
							}
						}
						if (this.showMethods) {
							if (!this.createMethodGroups(_8, _4)
									&& !this.showAttributes) {
								return []
							} else {
								_9 = true
							}
						}
						if (!_9) {
							if (this.sortFields)
								_3.sortByProperty("name", Array.ASCENDING);
							return _3
						}
						var _12 = isc.getKeys(_8), _13 = _4.getGroups(), _14 = [];
						if (_13 != null) {
							for ( var i = 0; i < _13.length; i++) {
								var _15 = _12.indexOf(_13[i]);
								if (_15 == -1)
									continue;
								_12.removeAt(_15);
								_14.add(_13[i])
							}
							_14.addList(_12)
						} else {
							_14 = _12
						}
						var _15 = _14.indexOf("other");
						if (_15 != -1) {
							_14.removeAt(_15);
							_14.add("other")
						}
						_1 = [];
						if (this.canSwitchClass) {
							var _16 = this.getClassSwitcher();
							if (_16)
								_1[0] = _16
						}
						if (this.creator.shouldShowDataPathFields
								&& this.creator.shouldShowDataPathFields()) {
							_1[_1.length] = this.getDataPathField(true)
						}
						for ( var i = 0; i < _14.length; i++) {
							var _11 = _14[i], _17 = _8[_11], _18 = isc.jsdoc
									.getGroupItem(_11), _19 = _18 && _18.title ? _18.title
									: isc.DataSource.getAutoTitle(_11);
							if (this.sortFields)
								_17.sortByProperty("name", Array.ASCENDING);
							_1[_1.length] = {
								editorType : "TSectionItem",
								defaultValue : _19,
								sectionExpanded : (i < this.initialGroups),
								items : _17
							}
						}
						return _1
					},
					isc.A.addField = function isc_ComponentEditor_addField(_1,
							_2) {
						if (this.fields)
							this.fields.addAt(_1, _2)
					},
					isc.A.getDataPathField = function isc_ComponentEditor_getDataPathField(
							_1) {
						var _2 = this.creator, _3 = _2.operationsPalette, _4 = _3 ? _3.data
								: null, _5 = _2.trimOperationsTreeData(_4, _1);
						return {
							name : _1 ? "inputDataPath" : "dataPath",
							title : _1 ? "Input DataPath" : "DataPath",
							isInput : _1,
							type : "DataPathItem",
							operationsPalette : _3,
							operationsTreeData : _5
						}
					},
					isc.A.getClassSwitcher = function isc_ComponentEditor_getClassSwitcher() {
						var _1 = isc.DS.get(this.dataSource), _2 = isc.ClassFactory
								.getClass(_1.ID);
						if (!_2)
							return null;
						return {
							name : "classSwitcher",
							title : this.componentTypeTitle,
							defaultValue : _2.getClassName(),
							type : "select",
							valueMap : this.getClassSwitcherValueMap(_1, _2)
						}
					},
					isc.A.getClassSwitcherValueMap = function isc_ComponentEditor_getClassSwitcherValueMap(
							_1, _2) {
						var _3, _4 = [];
						if (_2)
							_3 = this.getInheritanceChain(_2, _1);
						if (!_3)
							return null;
						for ( var i = 0; i < _3.length; i++) {
							var _6 = isc.DS.getNearestSchema(_3[i]
									.getClassName()), _7 = _6.substituteClasses;
							if (_6.createStandalone != false) {
								if (!_4.contains(_3[i].getClassName())) {
									_4.add(_3[i].getClassName())
								}
							}
							if (!_7)
								continue;
							var _8 = _7.split(",");
							for ( var i = 0; i < _8.length; i++) {
								_8[i] = _8[i].trim();
								if (!_4.contains(_8[i]))
									_4.add(_8[i])
							}
						}
						_4.sort();
						return _4
					},
					isc.A.createMethodGroups = function isc_ComponentEditor_createMethodGroups(
							_1, _2) {
						var _3 = isc.ClassFactory.getClass(_2.ID);
						this.$46e = [];
						var _4 = this.$694 == null ? this.basicMode : this.$694;
						if (!_4
								&& _3
								&& _3._stringMethodRegistry
								&& !isc.isAn
										.emptyObject(_3._stringMethodRegistry)) {
							var _5 = this.getInheritanceChain(_3, _2), _6, _7 = [], _8, _9 = {};
							for ( var i = 0; i < _5.length; i++) {
								var _11 = _5[i];
								_6 = isc.getKeys(_11._stringMethodRegistry);
								_8 = _6.duplicate()
								_8.removeList(_7);
								_7 = _6;
								if (_8.length == 0)
									continue;
								var _12 = (_11 == isc.Canvas ? "Basic" : _11
										.getClassName())
										+ " Methods";
								_9[_12] = [];
								for ( var j = 0; j < _8.length; j++) {
									var _14 = _8[j];
									var _15 = "method:" + _11.getClassName()
											+ "." + _14, _16 = isc.jsdoc
											.getDocItem(_15);
									if (!_16) {
										if (!_2.methods
												|| !_2.methods
														.find("name", _14)) {
											continue
										}
									}
									if (_16
											&& isc.jsdoc.getAttribute(_16,
													"deprecated"))
										continue;
									var _17 = this.getMethodField(_8[j]);
									_9[_12].add(_17)
								}
								if (_9[_12].length == 0) {
									delete _9[_12];
									delete _1[_12]
								}
							}
							var _18 = isc.getKeys(_9).reverse();
							for ( var i = 0; i < _18.length; i++) {
								_1[_18[i]] = _9[_18[i]]
							}
							return true
						}
						if (_2.methods && _2.methods.length > 0) {
							var _19 = _1[_2.ID + _4 ? " Basic" : " Methods"] = [];
							for ( var i = 0; i < _2.methods.length; i++) {
								var _20 = _2.methods[i];
								if (_4 && !_20.basic)
									continue;
								var _17 = this.getMethodField(_20.name);
								_19.add(_17)
							}
							return true
						}
						return false
					},
					isc.A.getInheritanceChain = function isc_ComponentEditor_getInheritanceChain(
							_1, _2) {
						var _3 = [], _4 = this.$du(_2.showSuperClassEvents,
								this.showSuperClassEvents);
						if (_4 && (_1.isA("Canvas") || _1.isA("FormItem"))) {
							for ( var _5 = _1; _5 != isc.Class; _5 = _5
									.getSuperClass()) {
								_3.add(_5)
							}
						}
						_3.reverse();
						return _3
					},
					isc.A.getMethodField = function isc_ComponentEditor_getMethodField(
							_1) {
						var _2 = isc.clone(this.handlerFieldBase);
						_2[this.fieldIdProperty] = _1;
						_2.type = this.canEditExpressions ? "expression"
								: "action";
						this.$46e.add(_2);
						return _2
					},
					isc.A.clearComponent = function isc_ComponentEditor_clearComponent() {
						var _1 = this.currentComponent;
						if (_1 == null)
							return;
						delete this.currentComponent;
						delete this.dataSource;
						this.setFields([])
					},
					isc.A.editComponent = function isc_ComponentEditor_editComponent(
							_1, _2) {
						var _3 = _1.type, _2 = _2 || _1.liveObject;
						if (_2.useCustomSchema)
							_3 = _2.useCustomSchema;
						this.currentComponent = _1;
						if (this.logIsInfoEnabled("editing")) {
							this.logInfo("Editing component of type: " + _3
									+ ", initData: " + this.echo(_1.initData)
									+ ", liveObject: " + this.echoLeaf(_2),
									"editing")
						}
						if (_1.advancedMode)
							this.$694 = false;
						this.setDataSource(_3);
						var _4 = {}, _5 = this.$46d;
						if (this.$46e) {
							_5 = _5.concat(this.$46e)
						}
						var _6 = (!_2 || !_2.getEditableProperties) ? _1.initData
								: _2.getEditableProperties(_5);
						for ( var i = 0; i < _5.length; i++) {
							var _8 = _5[i];
							if (_8.advanced) {
								_8.showIf = this.$46f
							}
							if (!_8.name)
								continue;
							var _9 = _8.name, _10 = _6[_9];
							var _11;
							if (_10 === _11)
								continue;
							if (isc.isA.Function(_10)) {
								if (!_2.getClass)
									continue;
								var _12 = _2.getClass().getInstanceProperty(_9);
								if (_12 == _10)
									continue
							}
							_4[_9] = _10
						}
						if (this.logIsDebugEnabled("editing")) {
							this.logDebug("Live values: " + this.echo(_4),
									"editing")
						}
						this.setValues(_4);
						if (_1.initData.dataPath && this.getItem("dataPath")) {
							this.getItem("dataPath").setDataPathProperties(_1)
						}
						if (_1.initData.inputDataPath
								&& this.getItem("inputDataPath")) {
							this.getItem("inputDataPath")
									.setDataPathProperties(_1)
						}
					},
					isc.A.$46f = function isc_ComponentEditor__falseFunc() {
						return false
					},
					isc.A.wrapEditorColumns = function isc_ComponentEditor_wrapEditorColumns() {
						if (!this.items)
							return;
						var _1 = 0;
						for ( var i = 0; i < this.items.length; i++) {
							var _3 = this.items[i];
							if (_3.visible && !_3.advanced)
								_1++
						}
						if (_1 > 10)
							this.numCols = 4;
						if (_1 > 20)
							this.numCols = 6
					},
					isc.A.titleHoverHTML = function isc_ComponentEditor_titleHoverHTML(
							_1) {
						if (isc.jsdoc.hasData()) {
							var _2 = isc.jsdoc.hoverHTML(this.dataSource,
									_1.name);
							if (!_2) {
								if (this.showMethods) {
									var _3 = isc.jsdoc.docItemForDSMethod(
											this.dataSource, _1.name);
									if (_3)
										_2 = isc.MethodFormatter.hoverHTML(_3)
								} else {
									var _4 = isc.jsdoc.docItemForDSField(
											this.dataSource, _1.name);
									if (_4)
										_2 = isc.AttrFormatter.hoverHTML(_4)
								}
							}
							if (_2)
								return _2
						}
						return "<nobr><code><b>" + _1.name
								+ "</b></code> (no doc available)</nobr>"
					},
					isc.A.getEditorType = function isc_ComponentEditor_getEditorType(
							_1) {
						if (_1 && _1.type == "ValueMap")
							return "ValueMapItem";
						var _2 = this.Super("getEditorType", arguments);
						_2 = isc.FormItemFactory.getItemClass(_2)
								.getClassName();
						var _3 = "T" + _2;
						if (isc[_3] != null && isc.isA.FormItem(isc[_3]))
							return _3;
						return _2
					});
	isc.B._maxIndex = isc.C + 15;
	isc.defineClass("Wizard", "VLayout");
	isc.A = isc.Wizard.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.A.stepInstructionsDefaults = {
		_constructor : "Label",
		contents : "Instructions",
		padding : 10,
		height : 20
	};
	isc.A.stepPaneDefaults = {
		_constructor : "VLayout",
		padding : 10
	};
	isc.A.showStepIndicator = false;
	isc.A.stepIndicatorDefaults = {
		_constructor : "HLayout",
		height : 22,
		layoutMargin : 0,
		layoutLeftMargin : 10,
		membersMargin : 2
	};
	isc.A.stepIndicatorItems = [];
	isc.A.stepButtonDefaults = {
		_constructor : "Img",
		layoutAlign : "center",
		showRollOver : false,
		height : 18,
		width : 18
	};
	isc.A.stepSeparatorDefaults = {
		_constructor : "Img",
		layoutAlign : "center",
		height : 16,
		width : 16,
		src : "[SKIN]/TreeGrid/opener_closed.gif"
	};
	isc.A.navButtonsDefaults = {
		_constructor : "ToolStrip",
		height : 22,
		layoutMargin : 5,
		membersMargin : 10
	};
	isc.A.navButtonsItems = [ "previousButton", "nextButton", "finishButton",
			"cancelButton" ];
	isc.A.previousButtonDefaults = {
		_constructor : "Button",
		layoutAlign : "center",
		title : "Previous",
		click : "this.creator.previousStep()",
		visibility : "hidden"
	};
	isc.A.nextButtonDefaults = {
		_constructor : "Button",
		layoutAlign : "center",
		title : "Next",
		click : "this.creator.nextStep()"
	};
	isc.A.finishButtonDefaults = {
		_constructor : "Button",
		layoutAlign : "center",
		title : "Finish",
		click : "this.creator.finished()",
		visibility : "hidden"
	};
	isc.A.cancelButtonDefaults = {
		_constructor : "Button",
		layoutAlign : "center",
		title : "Cancel",
		click : "this.creator.cancel()"
	};
	isc.A.autoChildParentMap = {
		nextButton : "navButtons",
		previousButton : "navButtons",
		finishButton : "navButtons"
	};
	isc.A.$46g = "_stepButton_";
	isc.B.push(isc.A.initWidget = function isc_Wizard_initWidget() {
		this.Super("initWidget");
		this.createSteps();
		this.addAutoChild("stepInstructions");
		this.addAutoChild("stepPane");
		this.addAutoChild("navButtons");
		this.addAutoChildren(this.navButtonsItems, this.navButtons);
		if (this.showStepIndicator) {
			this.addAutoChild("stepIndicator");
			for ( var i = 0; i < this.steps.length; i++) {
				var _2 = this.steps[i].stepName, _3 = {
					src : _2
				};
				var _4 = this.createAutoChild("stepButton", _3);
				this.stepIndicator.addMember(_4);
				this.steps[i].$46h = _4;
				if (i + 1 < this.steps.length) {
					this.stepIndicator.addMember(this
							.createAutoChild("stepSeparator"))
				}
			}
			this.navButtons.addMember(this.stepIndicator, 0)
		}
		this.goToStep(0, true)
	}, isc.A.draw = function isc_Wizard_draw(_1) {
		var _2 = this.Super("draw", arguments);
		this.updateButtons();
		return _2
	}, isc.A.createSteps = function isc_Wizard_createSteps(_1) {
		if (!_1)
			_1 = this.steps;
		if (!_1)
			return;
		if (!isc.isAn.Array(_1))
			_1 = [ _1 ];
		for ( var i = 0; i < _1.length; i++) {
			_1[i] = isc.WizardStep.create(_1[i], {
				wizard : this
			})
		}
	}, isc.A.getStep = function isc_Wizard_getStep(_1) {
		return isc.Class.getArrayItem(_1, this.steps)
	}, isc.A.getCurrentStep = function isc_Wizard_getCurrentStep() {
		return this.getStep(this.currentStepNum)
	}, isc.A.getCurrentStepIndex = function isc_Wizard_getCurrentStepIndex() {
		return this.currentStepNum
	}, isc.A.getStepIndex = function isc_Wizard_getStepIndex(_1) {
		return isc.Class.getArrayItemIndex(_1, this.steps)
	}, isc.A.getStepPane = function isc_Wizard_getStepPane(_1) {
		return this.getStep(_1).pane
	}, isc.A.goToStep = function isc_Wizard_goToStep(_1, _2) {
		if (!_2) {
			if (!this.getCurrentStep().exitStep(_1))
				return;
			this.getStepPane(this.currentStepNum).hide()
		}
		var _3 = this.getStep(_1);
		_3.enterStep(this.currentStepNum);
		this.currentStepNum = this.getStepIndex(_3);
		var _4 = this.getStepPane(_1);
		if (_3.instructions)
			this.stepInstructions.setContents(_3.instructions);
		else
			this.stepInstructions.hide();
		this.stepPane.addMember(_4, 0);
		_4.show();
		this.updateButtons()
	}, isc.A.go = function isc_Wizard_go(_1) {
		var _2 = this.getStepIndex(this.currentStepNum);
		_2 += _1;
		this.goToStep(this.getStep(_2))
	}, isc.A.nextStep = function isc_Wizard_nextStep() {
		var _1 = this.getStep(this.currentStepNum);
		if (_1.hasNextStep())
			this.goToStep(_1.getNextStep());
		else
			this.go(1)
	}, isc.A.previousStep = function isc_Wizard_previousStep() {
		var _1 = this.getStep(this.currentStepNum);
		if (_1.hasPreviousStep())
			this.goToStep(_1.getPreviousStep());
		else
			this.go(-1)
	}, isc.A.finished = function isc_Wizard_finished() {
		this.resetWizard()
	}, isc.A.cancel = function isc_Wizard_cancel() {
		this.resetWizard()
	}, isc.A.updateButtons = function isc_Wizard_updateButtons() {
		var _1 = this.getStepIndex(this.currentStepNum), _2 = this
				.getCurrentStep();
		if (this.stepIndicator) {
			for ( var i = 0; i < this.steps.length; i++) {
				var _4 = this.steps[i].$46h;
				if (_1 > i) {
					_4.setState("")
				} else if (_1 == i) {
					_4.setState("Down")
				} else {
					_4.setState("Disabled")
				}
			}
		}
		if (_1 == 0 || this.forwardOnly || !_2.hasPreviousStep())
			this.previousButton.hide();
		else
			this.previousButton.show();
		if (!_2.hasNextStep() || _1 == this.steps.length - 1) {
			this.nextButton.hide();
			this.finishButton.show()
		} else {
			this.nextButton.show();
			this.finishButton.hide()
		}
	}, isc.A.resetWizard = function isc_Wizard_resetWizard() {
		this.goToStep(0)
	});
	isc.B._maxIndex = isc.C + 16;
	isc
			.defineClass("WizardStep")
			.addMethods(
					{
						enterStep : function(_1) {
						},
						exitStep : function(_1) {
							return true
						},
						hasNextStep : function() {
							for ( var i = this.wizard.getStepIndex(this.ID) + 1; i < this.wizard.steps.length; i++)
								if (!this.wizard.getStep(i).hidden)
									return true;
							return false
						},
						getNextStep : function() {
							for ( var i = this.wizard.getStepIndex(this.ID) + 1; i < this.wizard.steps.length; i++)
								if (!this.wizard.getStep(i).hidden)
									return i;
							return -1
						},
						hasPreviousStep : function() {
							for ( var i = this.wizard.getStepIndex(this.ID) - 1; i >= 0; i--)
								if (!this.wizard.getStep(i).hidden)
									return true;
							return false
						},
						getPreviousStep : function() {
							for ( var i = this.wizard.getStepIndex(this.ID) - 1; i >= 0; i--)
								if (!this.wizard.getStep(i).hidden)
									return i;
							return -1
						},
						show : function() {
							this.hidden = false;
							this.wizard.updateButtons()
						},
						hide : function() {
							this.hidden = true;
							this.wizard.updateButtons();
							if (this.wizard.getCurrentStep() == this) {
								var _1 = this.getPreviousStep();
								if (_1 == -1)
									_1 = this.getNextStep();
								this.wizard.goToStep(_1)
							}
						}
					});
	isc.DataSource
			.create({
				ID : "isc_XMethodsServices",
				dataURL : "shortServiceListing.xml",
				recordName : "service",
				recordXPath : "/default:inspection/default:service",
				fields : [
						{
							name : "abstract",
							title : "Description"
						},
						{
							name : "xMethodsPage",
							title : "Site",
							type : "link",
							width : 50,
							valueXPath : ".//wsilxmethods:serviceDetailPage/@location"
						},
						{
							name : "wsdlURL",
							title : "WSDL",
							type : "link",
							width : 50,
							valueXPath : "default:description[@referencedNamespace='http://schemas.xmlsoap.org/wsdl/']/@location"
						} ]
			});
	isc.defineClass("DSWizardBase", "VLayout");
	isc.A = isc.DSWizardBase.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.A.autoChildParentMap = {
		nextButton : "navToolbar",
		previousButton : "navToolbar",
		finishButton : "navToolbar"
	};
	isc.B
			.push(
					isc.A.initWidget = function isc_DSWizardBase_initWidget() {
						this.Super("initWidget");
						this.addAutoChild("stepInstructions", {
							contents : "Instructions",
							padding : 4,
							height : 20,
							wrap : false,
							overflow : "visible"
						}, isc.Label);
						this.addAutoChild("navToolbar", {
							height : 22,
							layoutMargin : 10,
							membersMargin : 10
						}, isc.HLayout);
						this.addAutoChild("previousButton", {
							title : "< Previous",
							click : "this.creator.previousPage()",
							visibility : "hidden"
						}, isc.Button);
						this.navToolbar.addMember(isc.LayoutSpacer.create());
						this.addAutoChild("nextButton", {
							title : "Next >",
							click : "this.creator.nextPage()",
							disabled : true,
							setDisabled : function(_2) {
								var _1 = this.Super('setDisabled', arguments);
								this.creator.$46i(_2)
							}
						}, isc.Button);
						this.addAutoChild("finishButton", {
							title : "Finish",
							click : "this.creator.finish()",
							visibility : "hidden"
						}, isc.Button);
						this.goToPage(0, true)
					},
					isc.A.getPage = function isc_DSWizardBase_getPage(_1) {
						return isc.Class.getArrayItem(_1, this.pages)
					},
					isc.A.getCurrentPage = function isc_DSWizardBase_getCurrentPage() {
						return this.getPage(this.currentPageNum)
					},
					isc.A.getPageIndex = function isc_DSWizardBase_getPageIndex(
							_1) {
						return isc.Class.getArrayItemIndex(_1, this.pages)
					},
					isc.A.getPageView = function isc_DSWizardBase_getPageView(
							_1, _2) {
						var _3 = this.getPage(_1), _4 = _3.ID;
						if (!_4)
							return _3.view;
						if (_2) {
							var _5 = "enter" + _4;
							if (this[_5])
								this[_5](_3, _4);
							else
								this.enterPage(_3, _4)
						}
						this.logWarn("for page: "
								+ this.echoLeaf(_1)
								+ " got pageId: "
								+ _4
								+ (_2 && this[_5] ? " called enter function: "
										+ _5 : "") + ", view is: " + _3.view);
						return _3.view
					},
					isc.A.enterPage = function isc_DSWizardBase_enterPage(_1,
							_2) {
					},
					isc.A.goToPage = function isc_DSWizardBase_goToPage(_1, _2) {
						if (!_2) {
							this.getPageView(this.currentPageNum).hide()
						}
						var _3 = this.getPage(_1);
						this.currentPageNum = this.getPageIndex(_3);
						var _4 = this.getPageView(_1, true);
						if (_3.instructions)
							this.stepInstructions.setContents(_3.instructions);
						else
							this.stepInstructions.hide();
						this.addMember(_4, 1);
						_4.show();
						this.updateButtons()
					},
					isc.A.go = function isc_DSWizardBase_go(_1) {
						var _2 = this.getPageIndex(this.currentPageNum);
						_2 += _1;
						this.goToPage(this.getPage(_2))
					},
					isc.A.nextPage = function isc_DSWizardBase_nextPage() {
						var _1 = this.getPage(this.currentPageNum);
						if (_1.nextPage)
							this.goToPage(_1.nextPage);
						else
							this.go(1)
					},
					isc.A.previousPage = function isc_DSWizardBase_previousPage() {
						var _1 = this.getPage(this.currentPageNum);
						if (_1.previousPage)
							this.goToPage(_1.previousPage);
						else
							this.go(-1)
					},
					isc.A.finish = function isc_DSWizardBase_finish() {
						this.hide();
						this.resetWizard()
					},
					isc.A.updateButtons = function isc_DSWizardBase_updateButtons() {
						var _1 = this.getPageIndex(this.currentPageNum);
						if (_1 == 0)
							this.previousButton.hide();
						else
							this.previousButton.show();
						if (this.getPage(_1).endPage
								|| _1 == this.pages.length - 1) {
							this.nextButton.hide();
							this.finishButton.show()
						} else {
							this.nextButton.setDisabled(this
									.nextButtonIsDisabled(_1));
							this.nextButton.show();
							this.finishButton.hide()
						}
					},
					isc.A.$46i = function isc_DSWizardBase__nextButtonDisabled(
							_1) {
						if (!this.$46j)
							this.$46j = [];
						this.$46j[this.currentPageNum] = !_1
					},
					isc.A.nextButtonIsDisabled = function isc_DSWizardBase_nextButtonIsDisabled(
							_1) {
						return this.$46j ? !this.$46j[_1] : true
					},
					isc.A.resetWizard = function isc_DSWizardBase_resetWizard() {
						delete this.$46j;
						this.goToPage(0)
					});
	isc.B._maxIndex = isc.C + 15;
	isc.defineClass("DSWizard", "DSWizardBase");
	isc.A = isc.DSWizard.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.A.pages = [
			{
				ID : "StartPage",
				instructions : "选择绑定数据源"
			},
			{
				ID : "PickOperationPage",
				instructions : "Select a public Web Service, or enter a WSDL file URL.  Then select"
						+ " the operation to invoke"
			},
			{
				ID : "CallServicePage",
				instructions : "Use the provided form to invoke the web service and obtain a sample"
						+ " result, then select an approriate element set for list binding"
			},
			{
				ID : "BindingPage",
				instructions : "Below is a default binding to a ListGrid.  Use the field editor to "
						+ "customize the binding",
				endPage : true
			},
			{
				ID : "SFPickEntityPage",
				instructions : "Choose an object type you would like to use in SmartClient applications"
			},
			{
				ID : "SFDonePage",
				instructions : "Below is an example of a grid bound to the chosen SForce Object",
				endPage : true
			},
			{
				ID : "KapowPickRobotPage",
				instructions : "Choose the Kapow Robot(s) you would like to use in SmartClient applications"
			} ];
	isc.A.servicePickerDefaults = {
		recordClick : function(_1, _2, _3) {
			var _4 = this.getRawCellValue(_2, _3, this.getFieldNum("wsdlURL"));
			this.logWarn("wsdlURL is: " + _4);
			this.creator.fetchWSDL(_4)
		}
	};
	isc.A.operationPickerDefaults = {
		recordClick : function(_1, _2, _3) {
			var _4 = this.getRawCellValue(_2, _3, this.getFieldNum("name"));
			this.creator.wsdlDoc = this.data.document;
			this.creator.operationName = _4;
			this.creator.nextButton.enable()
		},
		alternateRecordStyles : true
	};
	isc.B
			.push(
					isc.A.enterStartPage = function isc_DSWizard_enterStartPage(
							_1) {
						if (!this.dsTypePicker) {
							this.createDSTypePicker();
							_1.view = this.dsTypePicker
						}
						this.nextButton.setDisabled(this.dsTypePicker
								.getValue("dsType") == null)
					},
					isc.A.createDSTypePicker = function isc_DSWizard_createDSTypePicker() {
						this.dsTypePicker = this.createAutoChild(
								"dsTypePicker", {
									layoutAlign : "center",
									width : 350,
									showHeader : false,
									selectionType : "single",
									leaveScrollbarGap : false,
									width : 300,
									showAllRecords : true,
									bodyOverflow : "visible",
									overflow : "visible",
									selectionChanged : function() {
										this.creator.nextButton
												.setDisabled(!this
														.anySelected())
									},
									getValue : function() {
										var _1 = this.getSelectedRecord();
										if (!_1)
											return null;
										return _1.name
									},
									clearValues : function() {
										this.deselectAllRecords()
									},
									defaultEditContext : isc.EditPane.create({
										height : 0
									}),
									recordDoubleClick : function() {
										this.creator.nextPage()
									}
								}, isc.TreePalette);
						var _2 = isc.DataSource.create({
							recordXPath : "/PaletteNodes/PaletteNode",
							fields : {
								name : {
									name : "name",
									type : "text",
									length : 8,
									required : true
								},
								title : {
									name : "title",
									type : "text",
									title : "Title",
									length : 128,
									required : true
								},
								className : {
									name : "className",
									type : "text",
									title : "Class Name",
									length : 128,
									required : true
								},
								icon : {
									name : "icon",
									type : "image",
									title : "Icon Filename",
									length : 128
								},
								iconWidth : {
									name : "iconWidth",
									type : "number",
									title : "Icon Width"
								},
								iconHeight : {
									name : "iconHeight",
									type : "number",
									title : "Icon Height"
								},
								iconSize : {
									name : "iconSize",
									type : "number",
									title : "Icon Size"
								},
								showDropIcon : {
									name : "showDropIcon",
									type : "boolean",
									title : "Show Drop Icon"
								},
								defaults : {
									name : "defaults",
									type : "Canvas",
									propertiesOnly : true
								},
								children : {
									name : "children",
									type : "paletteNode",
									multiple : true
								}
							}
						});
						if (this.callingBuilder) {
							_2.dataURL = this.callingBuilder.workspacePath
									+ "/../dataSourceWizards.xml";
							var _3 = this;
							_2.fetchData({}, function(_4, _5) {
								_3.fetchWizardsReply(_5);
								_3.openWizardTree()
							})
						}
					},
					isc.A.fetchWizardsReply = function isc_DSWizard_fetchWizardsReply(
							_1) {
						this.dsTypePicker.data.addList(_1,
								this.dsTypePicker.data.getRoot())
					},
					isc.A.openWizardTree = function isc_DSWizard_openWizardTree(
							_1) {
						var _2 = this.dsTypePicker.data;
						_2.openAll()
					},
					isc.A.nextPage = function isc_DSWizard_nextPage() {
						var _1 = this.dsTypePicker.getValue(), _2 = this.dsTypePicker
								.getSelectedRecord();
						_3 = this;
						this.dsTypeRecord = _2;
						if (this.currentPageNum == 0) {
							if (_2.wizardConstructor) {
								if (!_2.wizardDefaults) {
									_2.wizardDefaults = {}
								}
								_2.wizardDefaults.width = "80%";
								_2.wizardDefaults.height = "80%";
								_2.wizardDefaults.autoCenter = true;
								_2.wizardDefaults.showDataView = true;
								this.dsTypePicker.defaultEditContext
										.requestLiveObject(_2, function(_10) {
											_3.showDSEditor(_10, true, _9)
										}, this.dsTypePicker);
								if (this.callingBuilder)
									this.callingBuilder.wizardWindow.hide();
								return
							}
							if (_2 && _2.className == "JavaBean") {
								var _3 = this, _4 = _2 ? _2.wizardDefaults : {};
								if (!_4 || !_4.serverConstructor) {
									isc
											.say(
													"NOTE: This wizard <b>does not generate a fully functioning "
															+ "DataSource</b>; it creates a DataSource descriptor (.ds.xml file) which "
															+ "is ready to be loaded and bound to UI components, but does not provide "
															+ "CRUD functionality (search and editing of objects)."
															+ "<P>"
															+ "If you are using SQL or Hibernate, use the SQL or Hibernate wizards "
															+ "instead to generate a fully functional DataSource.  Otherwise, read the "
															+ "<a target='_blank' "
															+ "href='http://localhost:8080/isomorphic/system/reference/SmartClient_Reference.html#group..clientServerIntegration'>"
															+ "Client-Server Integration</a> topic in the <i>SmartClient Reference</i> "
															+ "to learn how to create a custom DataSource connector.",
													function() {
														_3.startJavaBeanWizard(
																_3, _2)
													});
									return
								}
								this.startJavaBeanWizard(this, _2);
								return
							}
							if (_1 == "sforce") {
								var _5 = this, _6 = isc.WebService
										.get("urn:partner.soap.sforce.com");
								_6.ensureLoggedIn(function() {
									_5.goToPage("SFPickEntityPage")
								}, true);
								return
							} else if (_1 == "kapow") {
								var _5 = this;
								if (!this.robotServerPicker)
									this.robotServerPicker = isc.RobotServerPicker
											.create({
												robotServerSelected : function() {
													_5
															.goToPage("KapowPickRobotPage")
												}
											});
								this.robotServerPicker.show();
								return
							} else if (_1 == "webService") {
								var _5 = this;
								var _7 = isc.IButton.create({
									autoShow : false,
									title : "Next",
									autoFit : true,
									click : function() {
										_5.servicePicker.hide();
										_5.pickOperation()
									}
								});
								if (!this.servicePicker)
									this.servicePicker = isc.Dialog
											.create({
												title : "Enter WSDL Webservice URL",
												isModal : true,
												autoShow : false,
												autoSize : true,
												autoCenter : true,
												bodyDefaults : {
													padding : 10
												},
												items : [
														isc.DynamicForm
																.create({
																	autoShow : false,
																	values : {
																		serviceURL : "http://"
																	},
																	itemKeyPress : function(
																			_10,
																			_11) {
																		if (_11 == 'Enter') {
																			_7
																					.click()
																		}
																	},
																	items : [ {
																		name : "serviceURL",
																		title : "WSDL URL",
																		type : "text",
																		width : 400
																	} ]
																}),
														isc.LayoutSpacer
																.create({
																	height : 10
																}),
														isc.HLayout
																.create({
																	height : 1,
																	membersMargin : 5,
																	members : [
																			_7,
																			isc.IButton
																					.create({
																						autoShow : false,
																						title : "Cancel",
																						autoFit : true,
																						click : function() {
																							_5.servicePicker
																									.hide()
																						}
																					}) ]
																}) ]
											});
								this.servicePicker.show();
								return
							} else if (_1 != "webService") {
								var _8, _9;
								if (_1.contains("Hibernate")) {
									_9 = "Each field you enter below corresponds to a database column "
											+ "of the same name.  The table name will be the same as the DataSource ID by default, or you "
											+ "may enter a Table Name below.  Hibernate database settings are in "
											+ "[webroot]/WEB-INF/classes/hibernate.cfg.xml"
									_8 = {
										dataFormat : "iscServer",
										serverType : "hibernate"
									}
								} else if (_1.contains("SQL")) {
									_9 = "Each field you enter below corresponds to a database column "
											+ "of the same name.  The table name will be the same as the DataSource ID by default, or you "
											+ "may enter a Table Name below.  By default, the default DataBase shown in the Admin Console "
											+ "will be used, or you may enter \"Database Name\" below.";
									_8 = {
										dataFormat : "iscServer",
										serverType : "sql"
									}
								} else if (_1 == "simpleXML") {
									_9 = "For \"dataURL\", enter a URL which will return XML data.<P>"
											+ "For \"recordXPath\", enter an XPath that will select the XML tags you wish to use as rows. "
											+ "For example, if the tag you want is named \"Person\", a recordXPath of \"//Person\" will "
											+ "work for most simple XML formats.<P>"
											+ "Enter fields named after the subelements and attributes of the tag used for rows.  Click "
											+ "the \"More\" button to see more field properties and documentation, particularly \"valueXPath\"";
									_8 = {
										dataFormat : "xml"
									}
								} else if (_1 == "json") {
									_9 = "For \"dataURL\", enter a URL which will return JSON data.<P>"
											+ "For \"recordXPath\", enter an XPath to an Array of Objects in the JSON data, then enter fields for each property of those Objects which you want to display, and its type.<P>"
											+ "Click the \"More\" button to see more field properties and documentation, particularly \"valueXPath\"";
									_8 = {
										dataFormat : "json"
									}
								} else if (_1 == "rss") {
									_9 = "Enter the URL of the RSS feed as \"dataURL\" below, then add or remove fields.";
									_8 = {
										dataFormat : "xml",
										recordXPath : "//default:item|//item",
										fields : [ {
											name : "title",
											title : "Title"
										}, {
											name : "link",
											title : "Story",
											type : "link"
										}, {
											name : "description",
											title : "Description"
										}, {
											name : "pubDate",
											title : "Published"
										} ]
									}
								}
								this.showDSEditor(_8, true, _9);
								return
							}
						}
						this.Super("nextPage")
					},
					isc.A.pickOperation = function isc_DSWizard_pickOperation() {
						isc.showPrompt("Loading WSDL...");
						isc.XML.loadWSDL(this.servicePicker.items[0]
								.getValue("serviceURL"), this.getID()
								+ ".webServiceLoaded(service)", null, true)
					},
					isc.A.webServiceLoaded = function isc_DSWizard_webServiceLoaded(
							_1) {
						isc.clearPrompt();
						if (_1) {
							this.servicePicker.items[0].setValue("serviceURL",
									"http://");
							var _2 = this.callingBuilder;
							if (!_2.operationsPalette) {
								if (_2.showRightStack != false) {
									_2.showOperationsPalette = true;
									_2.addAutoChild("operationsPalette");
									_2.rightStack.addSection({
										title : "Operations",
										autoShow : true,
										items : [ _2.operationsPalette ]
									}, 1)
								}
								for ( var i = 0; i < _1.portTypes.length; i++) {
									var _4 = _1.portTypes[i];
									for ( var j = 0; j < _4.operation.length; j++) {
										var _6 = _4.operation[j];
										var _7 = {
											operationName : _6.name,
											serviceNamespace : _1.serviceNamespace,
											serviceName : _1.serviceName,
											serviceDescription : _1.serviceName
													|| _1.serviceNamespace,
											portTypeName : _4.portTypeName,
											location : _1.location
										}
										_2.addWebService(_1, _7)
									}
								}
							}
							_2.wizardWindow.hide()
						}
					},
					isc.A.fetchWSDL = function isc_DSWizard_fetchWSDL(_1) {
						this.wsdlURL = _1;
						if (_1 != null) {
							if (isc.isA.ResultSet(this.operationPicker.data)) {
								this.operationPicker.data.invalidateCache()
							}
							this.operationPicker.fetchData(null, null, {
								dataURL : _1
							})
						}
					},
					isc.A.enterCallServicePage = function isc_DSWizard_enterCallServicePage(
							_1) {
						var _2 = this.wsdlURL;
						isc.xml.loadWSDL(_2, this.getID() + ".$46k(service)");
						if (this.serviceInput != null)
							return;
						var _3 = this.createAutoChild("callServicePage", {
							visibilityMode : "multiple"
						}, isc.SectionStack);
						_1.view = _3;
						this.serviceInput = this.createAutoChild(
								"serviceInput", {}, isc.DynamicForm);
						var _4 = this.createAutoChild("callServiceButton", {
							title : "Call Service",
							click : "this.creator.callService()",
							resizeable : false
						}, isc.Button);
						_3.addSection({
							title : "Service Inputs",
							autoShow : true,
							items : [ this.serviceInput, _4 ]
						});
						this.requestEditor = this.createAutoChild(
								"requestEditor", {
									height : 250,
									fields : [ {
										name : "useEditedMessage",
										title : "Use Edited Message",
										type : "checkbox",
										defaultValue : false
									}, {
										name : "requestBody",
										showTitle : false,
										type : "textArea",
										width : "*",
										height : "*",
										colSpan : "*"
									} ]
								}, isc.DynamicForm);
						_3.addSection({
							title : "Request Editor",
							items : [ this.requestEditor ]
						});
						this.serviceOutput = this.createAutoChild(
								"serviceOutput", {
									showHeader : false,
									wrapCells : true,
									fixedRecordHeights : false
								}, isc.DOMGrid);
						_3.addSection({
							title : "Service Output",
							autoShow : true,
							items : [ this.serviceOutput ]
						});
						this.expressionForm = this.createAutoChild(
								"expressionForm", {
									numCols : 4,
									colWidths : [ 120, 150, "*", 50 ],
									items : [ {
										name : "selectBy",
										title : "Select Records By",
										width : "*",
										valueMap : {
											tagName : "Tag Name",
											xpath : "XPath Expression"
										},
										defaultValue : "xpath"
									}, {
										name : "expression",
										showTitle : false,
										width : "*"
									}, {
										type : "button",
										title : "Select",
										width : "*",
										startRow : false,
										click : "form.creator.selectNodes()"
									} ]
								}, isc.DynamicForm);
						this.selectedNodesView = this.createAutoChild(
								"selectedNodesView", {
									showHeader : false,
									showRoot : false,
									wrapCells : true,
									fixedRecordHeights : false
								}, isc.DOMGrid);
						_3.addSection({
							title : "Select Elements",
							autoShow : true,
							items : [ this.expressionForm,
									this.selectedNodesView ]
						})
					},
					isc.A.$46k = function isc_DSWizard__wsdlLoaded(_1) {
						this.service = _1;
						this.serviceInput.setDataSource(this.service
								.getInputDS(this.operationName))
					},
					isc.A.callService = function isc_DSWizard_callService() {
						if (!this.serviceInput.validate())
							return;
						var _1 = this.serviceInput.dataSource, _2 = this.serviceInput
								.getValuesAsCriteria(), _3 = this.serviceInputs = _1
								.getServiceInputs({
									data : _2
								});
						if (this.requestEditor) {
							if (this.requestEditor.getValue("useEditedMessage")) {
								var _4 = this.requestEditor
										.getValue("requestBody");
								_3.requestBody = _4
							} else {
								this.requestEditor.setValue("requestBody",
										_3.requestBody)
							}
						}
						_3.callback = this.getID()
								+ ".serviceOutput.setRootElement(xmlDoc.documentElement)";
						isc.xml.getXMLResponse(_3)
					},
					isc.A.selectNodes = function isc_DSWizard_selectNodes() {
						var _1 = this.expressionForm, _2 = this.serviceOutput.rootElement, _3;
						this.selectBy = _1.getValue("selectBy");
						if (this.selectBy == "xpath") {
							this.recordName = null;
							this.recordXPath = _1.getValue("expression");
							_3 = isc.xml.selectNodes(_2, this.recordXPath)
						} else {
							this.recordXPath = null;
							this.recordName = _1.getValue("expression");
							var _4 = _2.getElementsByTagName(this.recordName);
							_3 = [];
							for ( var i = 0; i < _4.length; i++)
								_3.add(_4[i])
						}
						this.selectedNodesView.setRootElement({
							childNodes : _3
						});
						this.selectedNodes = _3;
						this.nextButton.enable()
					},
					isc.A.enterBindingPage = function isc_DSWizard_enterBindingPage(
							_1) {
						var _2 = this.selectedNodesView.data, _3 = _2.get(0).$9b, _4 = _3
								.getAttribute("xsi:type")
								|| _3.tagName;
						if (_4.contains(":"))
							_4 = _4.substring(_4.indexOf(":") + 1);
						var _5 = this.outputDS = isc.DS.get(_4);
						this.logWarn("nodeType is: " + _4 + ", ds is: " + _5);
						this.boundGrid = this.createAutoChild("boundGrid", {
							dataSource : _5,
							data : this.selectedNodes,
							alternateRecordStyles : true
						}, isc.ListGrid)
						_1.view = this.boundGrid
					},
					isc.A.enterKapowPickRobotPage = function isc_DSWizard_enterKapowPickRobotPage(
							_1) {
						if (!this.kapowRobotList) {
							this.kapowRobotList = this
									.createAutoChild(
											"kapowRobotList",
											{
												selectionChanged : function() {
													var _2 = this
															.getSelectedRecord() != null;
													this.creator.nextButton
															.setDisabled(!_2)
												}
											}, isc.ListGrid);
							_1.view = this.kapowRobotList
						}
						isc.XJSONDataSource.create({
							ID : "kapowRobotListDS",
							callbackParam : "json.callback",
							dataURL : robotServerURL
									+ "/ISCVBListAllRobots?format=JSON",
							fields : [ {
								name : "name",
								title : "Robot"
							}, {
								name : "type",
								title : "Type"
							} ],
							transformResponse : function(_6) {
								var _3 = [];
								for ( var i = 0; i < _6.data.length; i++) {
									var _5 = _6.data[i];
									if (_5.name.startsWith("ISCVB"))
										continue;
									_3.add(_5)
								}
								_6.data = _3;
								_6.totalRows = _6.data.length;
								_6.endRow = _6.data.length - 1;
								return _6
							}
						});
						this.kapowRobotList.setDataSource(kapowRobotListDS);
						this.kapowRobotList.fetchData()
					},
					isc.A.kapowFinish = function isc_DSWizard_kapowFinish() {
						var _1 = this.kapowRobotList.getSelection();
						for ( var i = 0; i < _1.length; i++) {
							var _3 = _1[i];
							isc.XMLTools.loadXML(robotServerURL + "/admin/"
									+ _3.name + ".robot", this.getID()
									+ ".kapowRobotLoaded(xmlDoc,'" + _3.name
									+ "','" + _3.type + "')")
						}
					},
					isc.A.saveDataSource = function isc_DSWizard_saveDataSource(
							_1) {
						var _2 = _1.getClassName();
						var _3;
						if (isc.DS.isRegistered(_2)) {
							_3 = isc.DS.get(_2)
						} else {
							_3 = isc.DS.get("DataSource");
							_1._constructor = _2
						}
						var _4 = _3.xmlSerialize(_1);
						 _4 =("<?xml version=\"1.0\" encoding=\"GB2312\"?>"+_4);
						this.logWarn("saving DS with XML: " + _4);
						isc.DMI.callBuiltin({
							methodName : "saveSharedXML",
							arguments : [ "DS", _1.ID, _4 ]
						})
					},
					isc.A.kapowRobotLoaded = function isc_DSWizard_kapowRobotLoaded(
							_1, _2, _3) {
						this.logInfo("loaded robot: " + _2);
						var _4 = isc.xml
								.selectNodes(
										_1,
										"//property[@name='startModelObjects']/element[@class='kapow.robot.common.domain.Entity']/property");
						_4 = isc.xml.toJS(_4);
						var _5 = [];
						for ( var i = 0; i < _4.length; i++) {
							var _7 = _4[i];
							if (!_7.xmlTextContent)
								continue;
							_5.add({
								name : _7.xmlTextContent,
								type : this.fieldTypeForJavaClass(_7["class"])
							})
						}
						this
								.logWarn("Robot: " + _2
										+ " - derived outputFields: "
										+ isc.echoAll(_5));
						var _8;
						if (_5.length) {
							_8 = isc.DataSource.create({
								ID : _2 + "DS",
								callbackParam : "json.callback",
								dataURL : robotServerURL + "/" + _2
										+ "?format=JSON",
								noAutoFetch : true,
								fields : _5,
								dataFormat : "json",
								dataTransport : "scriptInclude"
							})
						} else if (_3 == "rss") {
							var _8 = isc.DataSource.create({
								ID : _2 + "DS",
								dataURL : robotServerURL + "/" + _2,
								recordXPath : "//default:item",
								noAutoFetch : true,
								fields : [ {
									name : "title"
								}, {
									name : "link",
									type : "link"
								}, {
									name : "description"
								}, {
									name : "created"
								}, {
									name : "category"
								}, {
									name : "email"
								}, {
									name : "name"
								}, {
									name : "rights"
								} ]
							})
						}
						if (_8) {
							this.callingBuilder.addDataSource(_8);
							this.saveDataSource(_8)
						}
						var _9 = isc.xml
								.selectNodes(
										_1,
										"//property[@name='queryParameters']/element[@class='kapow.robot.common.domain.Entity']/property");
						_9 = isc.xml.toJS(_9);
						var _10 = [];
						for ( var i = 0; i < _9.length; i++) {
							var _7 = _9[i];
							if (!_7.xmlTextContent)
								continue;
							if (_7.name && _7.name.startsWith("value"))
								continue;
							_10.add({
								name : _7.xmlTextContent,
								type : this.fieldTypeForJavaClass(_7["class"])
							})
						}
						this
								.logWarn("Robot: " + _2
										+ " - derived inputFields: "
										+ isc.echoAll(_10));
						if (_10.length) {
							var _11 = isc.DataSource.create({
								ID : _2 + "InputDS",
								type : "generic",
								fields : _10
							});
							this.callingBuilder.addDataSource(_11);
							this.saveDataSource(_11)
						}
						if (this.callingBuilder)
							this.callingBuilder.wizardWindow.hide();
						this.resetWizard()
					},
					isc.A.fieldTypeForJavaClass = function isc_DSWizard_fieldTypeForJavaClass(
							_1) {
						switch (_1) {
						case "java.lang.Boolean":
							return "boolean";
						case "java.util.Date":
							return "date";
						case "java.lang.Byte":
						case "java.lang.Short":
						case "java.lang.Integer":
						case "java.lang.Long":
						case "java.lang.BigInteger":
							return "integer";
						case "java.lang.Float":
						case "java.lang.Double":
						case "java.lang.BigDecimal":
							return "float";
						default:
							return "text"
						}
					},
					isc.A.enterSFPickEntityPage = function isc_DSWizard_enterSFPickEntityPage(
							_1) {
						this.sfService = isc.WebService
								.get("urn:partner.soap.sforce.com");
						if (!this.sfEntityList) {
							this.sfEntityList = this
									.createAutoChild(
											"sfEntityList",
											{
												fields : [ {
													name : "objectType",
													title : "Object Type"
												} ],
												selectionChanged : function() {
													var _2 = this
															.getSelectedRecord() != null;
													this.creator.nextButton
															.setDisabled(!_2)
												}
											}, isc.ListGrid);
							_1.view = this.sfEntityList
						}
						this.sfService.getEntityList({
							target : this,
							methodName : "getEntityListReply"
						})
					},
					isc.A.getEntityListReply = function isc_DSWizard_getEntityListReply(
							_1) {
						var _2 = [];
						for ( var i = 0; i < _1.length; i++) {
							_2.add({
								objectType : _1[i]
							})
						}
						this.sfEntityList.setData(_2)
					},
					isc.A.enterSFDonePage = function isc_DSWizard_enterSFDonePage(
							_1) {
						var _2 = this.sfEntityList.getSelectedRecord().objectType;
						if (!this.sfGrid) {
							this.sfGrid = this.createAutoChild("sfGrid", {},
									isc.ListGrid)
						}
						this.sfService.getEntity(_2, {
							target : this,
							methodName : "showSFBoundGrid"
						});
						_1.view = this.sfGrid
					},
					isc.A.showSFBoundGrid = function isc_DSWizard_showSFBoundGrid(
							_1) {
						this.sfGrid.setDataSource(_1);
						this.sfGrid.fetchData()
					},
					isc.A.sfFinish = function isc_DSWizard_sfFinish() {
						this.showDSEditor(this.sfGrid.dataSource, true,
								"You can remove fields below to prevent them from being shown, "
										+ "and alter user-visible titles.")
					},
					isc.A.finish = function isc_DSWizard_finish() {
						if (this.getCurrentPage().ID == "SFDonePage")
							return this.sfFinish();
						if (this.getCurrentPage().ID == "KapowPickRobotPage")
							return this.kapowFinish();
						this.logWarn("passing output DS: "
								+ this.echo(this.outputDS));
						var _1 = this.service.getFetchDS(this.operationName,
								this.outputDS);
						_1.recordXPath = this.recordXPath;
						_1.recordName = this.recordName;
						_1.fetchSchema.defaultCriteria = isc.addProperties({},
								this.serviceInput.getValues());
						this.logWarn("created DataSource with props: "
								+ this.echo(_1));
						this.showDSEditor(_1)
					},
					isc.A.showDSEditor = function isc_DSWizard_showDSEditor(_1,
							_2, _3) {
						this.callingBuilder.showDSEditor(_1, _2, _3);
						this.callingBuilder.wizardWindow.hide();
						this.resetWizard()
					},
					isc.A.closeClick = function isc_DSWizard_closeClick() {
						this.Super("closeClick", arguments);
						this.resetWizard()
					},
					isc.A.resetWizard = function isc_DSWizard_resetWizard() {
						if (this.dsTypePicker)
							this.dsTypePicker.clearValues();
						if (this.servicePicker && this.servicePicker.selection)
							this.servicePicker.selection.deselectAll();
						if (this.operationPicker)
							this.operationPicker.setData([]);
						if (this.callServicePage) {
							this.serviceInput.clearValues();
							this.serviceOutput.setData([]);
							this.expressionForm.clearValues();
							this.selectedNodesView.setData([])
						}
						this.Super("resetWizard", arguments)
					},
					isc.A.startJavaBeanWizard = function isc_DSWizard_startJavaBeanWizard(
							_1, _2) {
						isc
								.askForValue(
										"Enter the name of the JavaBean for which you want to generate a DataSource.",
										function(_3) {
											_1.continueJavaBeanWizard(_1, _2,
													_3)
										}, {
											width : 400
										})
					},
					isc.A.continueJavaBeanWizard = function isc_DSWizard_continueJavaBeanWizard(
							_1, _2, _3) {
						if (_3) {
							_1.getJavaBeanDSConfig(_1, _2, _3)
						}
					},
					isc.A.getJavaBeanDSConfig = function isc_DSWizard_getJavaBeanDSConfig(
							_1, _2, _3) {
						if (_3 != null) {
							isc.DMI.call("isc_builtin",
									"com.isomorphic.tools.BuiltinRPC",
									"getDataSourceConfigFromJavaClass", _3,
									function(_4) {
										_1.finishJavaBeanWizard(_1, _2, _3, _4)
									})
						}
					},
					isc.A.finishJavaBeanWizard = function isc_DSWizard_finishJavaBeanWizard(
							_1, _2, _3, _4) {
						var _5 = _4.data.dsConfig ? _4.data.dsConfig : null;
						if (isc.isAn.Object(_5)) {
							if (_2.wizardDefaults)
								isc.addProperties(_5, _2.wizardDefaults);
							_1.showDSEditor(_5, true)
						} else {
							isc.say(_5)
						}
					});
	isc.B._maxIndex = isc.C + 31;
	isc.defineClass("SchemaViewer", "VLayout");
	isc.A = isc.SchemaViewer;
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.B
			.push(isc.A.getTreeFromService = function isc_c_SchemaViewer_getTreeFromService(
					_1) {
				return isc.Tree
						.create({
							service : _1,
							nameProperty : "$46l",
							titleProperty : "name",
							loadChildren : function(_12) {
								if (this.isLoaded(_12))
									return;
								if (_12 == this.root
										&& isc.isA.WebService(this.service)) {
									var _2 = this.service.getOperations();
									_2.setProperty("type", "Operation");
									this.addList(_2, _12)
								} else if (_12 == this.root
										&& isc.isA.SchemaSet(this.service)) {
									var _3 = this.service;
									for ( var i = 0; i < _3.schema.length; i++) {
										this.add(this
												.getSchemaNode(_3.schema[i]),
												this.root)
									}
								} else if (_12.inputMessage) {
									var _5 = this.getMessageNode(_12, true);
									if (_5 != null)
										this.add(_5, _12);
									_5 = this.getMessageNode(_12, false);
									if (_5 != null)
										this.add(_5, _12)
								} else if (_12.isComplexType) {
									var _6 = _12.liveSchema;
									for ( var _7 in _6.getFields()) {
										var _8 = _6.getField(_7);
										if (!_6.fieldIsComplexType(_7)) {
											this.add(isc.addProperties({}, _8),
													_12)
										} else {
											var _9 = _6.getSchema(_8.type);
											var _10 = this.getSchemaNode(_9,
													_8.name, _8.xmlMaxOccurs);
											this.add(_10, _12)
										}
									}
								}
								this.setLoadState(_12, isc.Tree.LOADED)
							},
							isFolder : function(_10) {
								return (_10 == this.root || _10.inputMessage || _10.isComplexType)
							},
							getSchemaNode : function(_9, _7, _12) {
								var _3 = isc.SchemaSet.get(_9.schemaNamespace), _8 = _9
										.getField(_7), _10 = {
									name : _7 || _9.tagName || _9.ID,
									type : _9.ID,
									isComplexType : true,
									xmlMaxOccurs : _12,
									liveSchema : _9,
									namespace : _9.schemaNamespace,
									location : _3 ? _3.location : null
								};
								return _10
							},
							getMessageNode : function(_12, _13) {
								var _11 = _13 ? this.service
										.getRequestMessage(_12) : this.service
										.getResponseMessage(_12);
								if (!_11)
									return;
								return {
									name : _11.ID,
									type : _11.ID,
									isComplexType : true,
									liveSchema : _11
								}
							}
						})
			});
	isc.B._maxIndex = isc.C + 1;
	isc.A = isc.SchemaViewer.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.A.showTestUI = true;
	isc.A.operationIcon = "[SKINIMG]/SchemaViewer/operation.png";
	isc.A.complexTypeIcon = "[SKINIMG]/SchemaViewer/complexType.gif";
	isc.A.simpleTypeIcon = "[SKINIMG]/SchemaViewer/simpleType.png";
	isc.B
			.push(
					isc.A.setWsdlURL = function isc_SchemaViewer_setWsdlURL(_1) {
						this.wsdlURL = _1;
						this.urlForm.setValue("url", _1)
					},
					isc.A.getWsdlURLs = function isc_SchemaViewer_getWsdlURLs() {
						var _1 = isc.WebService.services
								.getProperty("serviceNamespace"), _2 = this.wsdlURLs;
						if (_2 == null && _1.length == 0)
							return;
						if (_2 == null)
							_2 = [];
						_2.addList(_1);
						return _2
					},
					isc.A.initWidget = function isc_SchemaViewer_initWidget() {
						this.Super("initWidget", arguments);
						this.createChildren()
					},
					isc.A.createChildren = function isc_SchemaViewer_createChildren() {
						var _1 = this.getWsdlURLs();
						this
								.addAutoChild(
										"urlForm",
										{
											numCols : 4,
											colWidths : [ 100, "*", 100, 100 ],
											itemHoverWidth : 300,
											saveOnEnter : true,
											saveData : function() {
												this.creator.fetchSchema()
											},
											items : [
													{
														name : "url",
														title : "WSDL",
														width : "*",
														defaultValue : this.wsdlURL,
														editorType : (_1 != null ? "ComboBoxItem"
																: "TextItem"),
														autoComplete : (_1 != null ? "smart"
																: null),
														showAllOptions : true,
														textMatchStyle : "substring",
														valueMap : _1
													},
													{
														type : "submit",
														title : "Show Messages",
														startRow : false,
														colSpan : 1,
														endRow : false,
														width : "*"
													},
													{
														showTitle : false,
														startRow : false,
														width : "*",
														formItemType : "pickTree",
														shouldSaveValue : false,
														buttonProperties : {
															unselectedTitle : "Download",
															itemSelected : function(
																	_2) {
																this.canvasItem.form.creator
																		.download(_2.name);
																return false
															}
														},
														valueTree : isc.Tree
																.create({
																	root : {
																		name : "download",
																		title : "Download",
																		children : [
																				{
																					name : "js",
																					title : "as JS"
																				},
																				{
																					name : "xml",
																					title : "as XML"
																				} ]
																	}
																}),
														icons : [ {
															src : "[SKIN]/actions/help.png",
															width : 16,
															height : 16,
															prompt : "You can use the <b>Download</b> feature to download a SmartClient"
																	+ " WebService definition for the specified WSDL file in either XML"
																	+ " or JS format.  <p>You can achieve the same result by calling"
																	+ " <i>XMLTools.loadWSDL()</i> or by using the <code>&lt;isomorphic"
																	+ ":loadWSDL&gt;</code> JSP tag, however, for non-Java backends or"
																	+ " for production use, a .js file should be obtained from this"
																	+ " interface and loaded via &lt;SCRIPT SRC=&gt; either individually"
																	+ " or combined with other files.  <p>See the reference documentation"
																	+ " for details.",
															click : "isc.say(this.prompt)"
														} ]
													} ]
										}, isc.DynamicForm);
						this
								.addMember(isc.VLayout
										.create({
											autoDraw : false,
											members : [
													isc.HLayout
															.create({
																autoDraw : false,
																members : [
																		this
																				.addAutoChild(
																						"treeGrid",
																						{
																							fields : [
																									{
																										treeField : true
																									},
																									{
																										name : "type",
																										title : "Type",
																										width : 140
																									},
																									{
																										name : "xmlMaxOccurs",
																										title : "#",
																										width : 35
																									},
																									{
																										name : "namespace",
																										title : "NS",
																										width : 35,
																										showHover : true,
																										hoverHTML : function(
																												_2,
																												_3) {
																											return "<NOBR>"
																													+ _3
																													+ "<NOBR>"
																										}
																									},
																									{
																										name : "location",
																										title : "URL",
																										width : 35,
																										showHover : true,
																										hoverHTML : function(
																												_2,
																												_3) {
																											return "<NOBR>"
																													+ _3
																													+ "<NOBR>"
																										},
																										recordClick : function(
																												_2,
																												_3) {
																											_2.creator
																													.setWsdlURL(_3.location);
																											_2.creator
																													.fetchSchema()
																										}
																									} ],
																							nodeClick : function(
																									_2,
																									_3,
																									_4) {
																								if (this.creator.showTestUI) {
																									this.creator
																											.updateInputStack(_3)
																								}
																							},
																							getIcon : function(
																									_2) {
																								if (_2.type == "Operation")
																									return this.creator.operationIcon;
																								else if (_2.isComplexType)
																									return this.creator.complexTypeIcon;
																								else
																									return this.creator.simpleTypeIcon
																							},
																							showResizeBar : true
																						},
																						isc.TreeGrid),
																		isc.VLayout
																				.create({
																					visibility : (this.showTestUI ? "inherit"
																							: "hidden"),
																					members : [
																							this
																									.addAutoChild(
																											"inputStack",
																											{
																												overflow : "auto",
																												visibilityMode : "multiple",
																												autoDraw : false,
																												sections : [ {
																													showHeader : true,
																													title : "Input Message (Body)",
																													items : [ this
																															.addAutoChild(
																																	"inputBodyForm",
																																	{
																																		useFlatFields : true
																																	},
																																	isc.DynamicForm) ]
																												} ]
																											},
																											isc.SectionStack),
																							isc.IButton
																									.create({
																										creator : this,
																										autoDraw : false,
																										title : "Invoke",
																										click : function() {
																											this.creator
																													.updateResponseTree()
																										}
																									}) ]
																				}) ]
															}),
													this
															.addAutoChild(
																	"responseStack",
																	{
																		visibility : (this.showTestUI ? "inherit"
																				: "hidden"),
																		autoDraw : false,
																		visibilityMode : "multiple",
																		sections : [ this
																				.getResponseSectionConfig() ]
																	},
																	isc.SectionStack) ]
										}))
					},
					isc.A.download = function isc_SchemaViewer_download(_1) {
						var _2 = this.urlForm.getValue("url");
						if (!_2) {
							isc.warn("Please type in a WSDL URL");
							return
						}
						var _3 = _2.replace(/(.*\/)?(.*)/, "$2").replace(
								/(.*?)\?.*/, "$1").replace(/(.*)\..*/, "$1")
								+ "." + _1;
						isc.DMI.callBuiltin({
							methodName : "downloadWSDL",
							arguments : [ _2, _1, _3 ],
							requestParams : {
								showPrompt : false,
								useXmlHttpRequest : false,
								timeout : 0
							}
						})
					},
					isc.A.fetchSchema = function isc_SchemaViewer_fetchSchema() {
						var _1 = this.urlForm.getValue("url");
						if (_1 == null || _1 == "")
							return;
						if (isc.WebService.get(_1))
							return this
									.fetchSchemaReply(isc.WebService.get(_1));
						isc.RPCManager.addClassProperties({
							defaultPrompt : "Loading WSDL Schema",
							showPrompt : true
						})
						isc.xml.loadWSDL(_1, {
							target : this,
							methodName : "fetchSchemaReply"
						}, null, true, {
							captureXML : true
						})
					},
					isc.A.fetchSchemaReply = function isc_SchemaViewer_fetchSchemaReply(
							_1) {
						isc.RPCManager.addClassProperties({
							defaultPrompt : "Contacting Server..."
						});
						this.service = _1;
						delete this.operationName;
						var _2 = isc.SchemaViewer.getTreeFromService(_1);
						this.treeGrid.setData(_2);
						this.clearInputStack();
						this.clearResponseTree()
					},
					isc.A.clearInputStack = function isc_SchemaViewer_clearInputStack() {
						var _1 = this.inputStack, _2 = _1.sections.duplicate(), _3 = [];
						for ( var i = 0; i < _2.length; i++) {
							if (_2[i].isHeaderSection)
								_1.removeSection(_2[i])
						}
						this.inputBodyForm.hide();
						this.inputBodyForm.clearValues()
					},
					isc.A.updateInputStack = function isc_SchemaViewer_updateInputStack(
							_1) {
						this.clearInputStack();
						var _2 = _1;
						while (_2.type != "Operation") {
							_2 = this.treeGrid.data.getParent(_2)
						}
						if (!_2)
							return;
						var _3 = _2.name;
						this.operationName = _3;
						var _4 = this.service.getInputHeaderSchema(_3);
						if (_4 != null) {
							var _5 = 0;
							for ( var _6 in _4) {
								var _7 = _4[_6], _8;
								if (isc.isA.DataSource(_7)) {
									_8 = isc.DynamicForm.create({
										useFlatFields : true,
										dataSource : _7
									})
								} else {
									_8 = isc.DynamicForm.create({
										$46m : true,
										fields : [ _7 ]
									})
								}
								this.inputStack.addSection({
									showHeader : true,
									isHeaderSection : true,
									schemaName : _6,
									title : "Header: " + _6,
									items : [ _8 ]
								}, _5);
								_5 += 1
							}
						}
						var _9 = this.service.getInputDS(_3);
						this.inputBodyForm.setDataSource(_9);
						if (!this.inputBodyForm.isVisible())
							this.inputBodyForm.show()
					},
					isc.A.updateResponseTree = function isc_SchemaViewer_updateResponseTree() {
						if (this.operationName == null)
							return;
						var _1 = this.inputBodyForm.getValues(), _2, _3 = this.service;
						for ( var i = 0; i < this.inputStack.sections.length; i++) {
							var _5 = this.inputStack.sections[i];
							if (!_5.isHeaderSection)
								continue;
							if (_2 == null)
								_2 = {};
							var _6 = _5.items[0];
							if (_6.$46m) {
								_2[_5.schemaName] = _6.getValue(_6.getItem(0))
							} else {
								_2[_5.schemaName] = _6.getValues()
							}
						}
						if (this.logIsDebugEnabled())
							this.logDebug("operation:" + this.operationName
									+ ", body params:" + this.echoAll(_1)
									+ ", headerParams:" + this.echoAll(_2));
						_3
								.callOperation(
										this.operationName,
										_1,
										null,
										this.getID()
												+ ".setResponseTreeDoc(xmlDoc, rpcResponse, wsRequest)",
										{
											willHandleError : true,
											headerData : _2,
											useFlatFields : true,
											useFlatHeaderFields : true
										})
					},
					isc.A.getResponseSectionConfig = function isc_SchemaViewer_getResponseSectionConfig() {
						return {
							expanded : true,
							title : "Service Response",
							headerControls : [
									isc.LayoutSpacer.create(),
									isc.IButton
											.create({
												width : 200,
												title : "Generate Sample Response",
												creator : this,
												click : function() {
													if (!this.creator.operationName)
														return;
													var _1 = this.creator.service
															.getSampleResponse(this.creator.operationName);
													_1 = isc.XMLTools
															.parseXML(_1);
													this.creator
															.setResponseTreeDoc(_1);
													this.creator.responseStack
															.setSectionTitle(0,
																	"Service Response [Generated Sample]");
													return false
												},
												height : 16,
												layoutAlign : "center",
												extraSpace : 4,
												autoDraw : false
											}),
									isc.IButton
											.create({
												width : 200,
												title : "Generate Sample Request",
												creator : this,
												click : function() {
													if (!this.creator.operationName)
														return;
													var _1 = this.creator.service
															.getSampleRequest(this.creator.operationName);
													_1 = isc.XMLTools
															.parseXML(_1);
													this.creator
															.showSampleRequest(_1);
													return false
												},
												height : 16,
												layoutAlign : "center",
												extraSpace : 4,
												autoDraw : false
											}) ],
							items : []
						}
					},
					isc.A.setResponseTreeDoc = function isc_SchemaViewer_setResponseTreeDoc(
							_1, _2, _3) {
						if (_2 && _2.status < 0) {
							var _4;
							if (_2.httpResponseCode == 500) {
								_4 = _1.selectNodes("//faultstring");
								if (_4 != null)
									_4 = isc.XML.toJS(_4);
								if (_4.length == 0)
									_4 = null
							}
							if (_4) {
								isc
										.warn("<b>Server Returned HTTP Code 500 (Internal Error)</b>"
												+ (_4 && _4.length > 0 ? ("<br><br>" + _4
														.join("<br>"))
														: ""))
							} else {
								isc.RPCManager.handleError(_2, _3)
							}
							return
						}
						this.logInfo("showing a tree response");
						if (this.logIsDebugEnabled())
							this.logDebug("response data:" + this.echoAll(_1));
						this.clearSampleRequest();
						this.xmlDoc = _1;
						var _5 = isc.DOMTree.create({
							rootElement : _1.documentElement
						});
						if (this.responseTree) {
							this.responseTree.setData(_5)
						} else {
							this.addAutoChild("responseTree", {
								data : _5
							}, isc.DOMGrid)
						}
						if (!this.showingResponseTree) {
							this.responseStack.removeSection(0);
							this.responseStack.addSection(isc.addProperties(
									this.getResponseSectionConfig(), {
										items : [ this.responseTree ]
									}), 0)
						}
						this.showingResponseTree = true
					},
					isc.A.clearResponseTree = function isc_SchemaViewer_clearResponseTree() {
						this.clearSampleRequest();
						if (!this.showingResponseTree)
							return;
						this.responseStack.removeSection(0);
						this.responseStack.addSection(this
								.getResponseSectionConfig())
						delete this.showingResponseTree
					},
					isc.A.showSampleRequest = function isc_SchemaViewer_showSampleRequest(
							_1) {
						this.logInfo("showing a sample request");
						if (this.logIsDebugEnabled())
							this.logDebug("sample request data:"
									+ this.echoAll(_1));
						var _2 = isc.DOMTree.create({
							rootElement : _1.documentElement
						});
						if (!this.showingSampleRequest) {
							this.responseStack.addSection({
								isSampleRequest : true,
								expanded : true,
								resizable : true,
								title : "Generated Sample Service Request",
								items : [ this.addAutoChild("requestTree", {
									data : _2
								}, isc.DOMGrid) ]
							})
						} else {
							this.requestTree.setData(_2)
						}
						this.showingSampleRequest = true
					},
					isc.A.clearSampleRequest = function isc_SchemaViewer_clearSampleRequest() {
						if (this.showingSampleRequest) {
							for ( var i = 0; i < this.responseStack.sections.length; i++) {
								if (this.responseStack.sections[i].isSampleRequest) {
									this.responseStack.removeSection(i);
									break
								}
							}
						}
						delete this.showingSampleRequest
					});
	isc.B._maxIndex = isc.C + 15;
	isc.ClassFactory.defineClass("DatabaseBrowser", "Window");
	isc.A = isc.DatabaseBrowser.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.A.orientation = "vertical";
	isc.A.title = "Database Browser";
	isc.A.width = "90%";
	isc.A.height = "90%";
	isc.A.isModal = true;
	isc.A.showModalMask = true;
	isc.A.canDragResize = true;
	isc.A.serverType = "sql";
	isc.A.schemaTreeConstructor = "ListGrid";
	isc.A.schemaTreeDefaults = {
		autoParent : "schemaView",
		dbBrowser : this.creator,
		dataSource : isc.DataSource.create({
			ID : "$84u",
			clientOnly : true,
			fields : [ {
				name : "name",
				title : "Name"
			}, {
				name : "type",
				title : "Type",
				width : 60,
				valueMap : [ "table", "view" ]
			} ]
		}),
		showFilterEditor : true,
		filterOnKeypress : true,
		canExpandRecords : true,
		detailDefaults : {
			_constructor : "ListGrid",
			autoFitData : "vertical",
			autoFitMaxRecords : 8,
			showResizeBar : true
		},
		getExpansionComponent : function(_1) {
			var _2 = this.createAutoChild("detail", {
				sortField : "primaryKey",
				sortDirection : "descending",
				defaultFields : [ {
					name : "name",
					title : "Column",
					formatCellValue : function(_3, _1) {
						if (_1.primaryKey)
							return "<b>" + _3 + "</b>";
						return _3
					}
				}, {
					name : "type",
					title : "Type",
					width : 50
				}, {
					name : "length",
					title : "Length",
					width : 45
				}, {
					name : "primaryKey",
					title : "PK",
					type : "boolean",
					showIf : "false",
					width : 22
				} ]
			});
			isc.DMI.call("isc_builtin", "com.isomorphic.tools.BuiltinRPC",
					"getFieldsFromTable", _1.name, this.schema,
					this.serverType, this.creator.dbName, function(_3, _4) {
						_2.setData(_4)
					});
			return _2
		},
		selectionChanged : function(_1, _2) {
			if (_2) {
				var _3 = _1.name;
				if (_3 && _3 != this.creator.$64p) {
					this.creator.getDataSourceFromTable(_3);
					this.creator.populateDataViewHeader()
				}
			}
		}
	};
	isc.A.schemaRefreshButtonDefaults = {
		_constructor : "Img",
		size : 16,
		src : "[SKIN]/actions/refresh.png",
		click : "this.creator.getDatabaseTables()"
	};
	isc.A.databaseListConstructor = "ListGrid";
	isc.A.databaseListDefaults = {
		height : 150,
		autoParent : "schemaView",
		dataSource : isc.DataSource.create({
			ID : "$84v",
			clientOnly : true,
			fields : [ {
				name : "dbName",
				title : "Name"
			}, {
				name : "dbStatus",
				title : "Status"
			}, {
				name : "dbProductName",
				title : "Product Name"
			}, {
				name : "dbProductVersion",
				title : "Product Version"
			} ]
		}),
		defaultFields : [ {
			name : "dbName"
		}, {
			name : "dbStatus"
		} ],
		sortField : "dbName",
		showFilterEditor : true,
		filterOnKeypress : true,
		canDragSelectText : true,
		selectionChanged : function(_1, _2) {
			if (_2) {
				this.creator.clearSchemaTree();
				this.creator.dbName = _1.dbName;
				this.creator.getDatabaseTables()
			}
		},
		canHover : true,
		cellHoverHTML : function(_1) {
			if (!this.hoverDV)
				this.hoverDV = isc.DetailViewer.create({
					dataSource : this.dataSource,
					width : 200,
					autoDraw : false
				});
			this.hoverDV.setData(_1);
			return this.hoverDV.getInnerHTML()
		}
	};
	isc.A.dbListConfigButtonDefaults = {
		_constructor : "Img",
		size : 16,
		src : "database_gear.png",
		click : "this.creator.configureDatabases()"
	};
	isc.A.dbListRefreshButtonDefaults = {
		_constructor : "Img",
		size : 16,
		src : "[SKIN]/actions/refresh.png",
		click : "this.creator.getDefinedDatabases()"
	};
	isc.A.dataGridConstructor = "ListGrid";
	isc.A.dataGridDefaults = {
		canDragSelectText : true,
		showFilterEditor : true,
		autoFitFieldWidths : true,
		autoFitWidthApproach : "title",
		autoParent : "dataView"
	};
	isc.A.showSelectButton = true;
	isc.A.selectButtonConstructor = "Button";
	isc.A.selectButtonDefaults = {
		title : "Next >",
		enabled : false,
		autoParent : "outerLayout"
	};
	isc.A.outerLayoutDefaults = {
		_constructor : isc.VLayout,
		width : "100%",
		height : "100%",
		autoSize : true,
		autoDraw : true,
		autoParent : "body"
	};
	isc.A.innerLayoutDefaults = {
		_constructor : isc.HLayout,
		width : "100%",
		height : "100%",
		autoDraw : true,
		autoParent : "outerLayout"
	};
	isc.A.showSchemaView = true;
	isc.A.schemaViewDefaults = {
		_constructor : isc.SectionStack,
		visibilityMode : "multiple",
		autoParent : "innerLayout"
	};
	isc.A.showDataView = true;
	isc.A.dataViewDefaults = {
		_constructor : isc.SectionStack,
		width : "65%",
		height : "100%",
		autoParent : "innerLayout"
	};
	isc.B
			.push(isc.A.configureDatabases = function isc_DatabaseBrowser_configureDatabases() {
				var _1 = this;
				var _2 = isc.DBConfigurator.showWindow({
					width : this.getVisibleWidth() - 50,
					height : this.getVisibleHeight() - 50,
					autoCenter : true,
					isModal : true,
					closeClick : function() {
						this.destroy();
						_1.getDefinedDatabases()
					}
				})
			});
	isc.B._maxIndex = isc.C + 1;
	isc.A = isc.DatabaseBrowser.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.B
			.push(
					isc.A.initWidget = function isc_DatabaseBrowser_initWidget() {
						this.Super("initWidget", arguments);
						this.title = "Database Browser - "
								+ this.serverType.toUpperCase();
						this.createChildren()
					},
					isc.A.createChildren = function isc_DatabaseBrowser_createChildren() {
						this.Super("createChildren");
						this.body.hPolicy = "fill";
						this.body.vPolicy = "fill";
						this.addAutoChild("outerLayout");
						this.addAutoChild("innerLayout", null, null,
								this.outerLayout);
						this.addAutoChild("schemaView", {
							showResizeBar : this.showDataView
						}, null, this.innerLayout);
						this.databaseList = this
								.createAutoChild("databaseList");
						this.dbListConfigButton = this
								.createAutoChild("dbListConfigButton");
						this.dbListRefreshButton = this
								.createAutoChild("dbListRefreshButton");
						if (this.serverType == "sql") {
							this.schemaView.addSection({
								title : "Databases",
								showHeader : true,
								expanded : true,
								hidden : false,
								items : [ this.databaseList ],
								controls : [ this.dbListConfigButton,
										this.dbListRefreshButton ]
							})
						}
						this.addAutoChild("dataView", null, null,
								this.innerLayout);
						this.dataView.addSection({
							autoDraw : true,
							showHeader : true,
							expanded : true,
							hidden : false
						});
						this.dataStack = this.dataView.sections[0];
						this.schemaTree = this.createAutoChild("schemaTree");
						this.schemaRefreshButton = this
								.createAutoChild("schemaRefreshButton");
						this.schemaView.addSection({
							title : "Tables & Views",
							showHeader : true,
							expanded : true,
							hidden : false,
							items : [ this.schemaTree ],
							controls : [ this.schemaRefreshButton ]
						});
						var _1 = this;
						this.dataGrid = this.createAutoChild("dataGrid");
						this.dataStack.addItem(this.dataGrid);
						this.outerLayout.addMember(isc.LayoutSpacer.create({
							height : "10"
						}));
						this.addAutoChild("selectButton", {
							click : function() {
								_1.hide();
								_1.$64q.defaults = _1
										.getGeneratedDataSourceObject();
								_1.fireCallback(_1.$64r, "node", [ _1.$64q ])
							}
						}, null, this.outerLayout);
						this.delayCall("getDefinedDatabases")
					},
					isc.A.getDefinedDatabases = function isc_DatabaseBrowser_getDefinedDatabases() {
						if (this.serverType == "hibernate") {
							this.databaseList.hide();
							this.dbName = null;
							this.getDatabaseTables()
						} else {
							isc.DMI
									.call({
										appID : "isc_builtin",
										className : "com.isomorphic.tools.AdminConsole",
										methodName : "getDefinedDatabases",
										arguments : [ true ],
										callback : this.getID()
												+ ".populateDatabaseList(data)",
										requestParams : {
											showPrompt : true,
											promptStyle : "dialog",
											prompt : "Loading available databases..."
										}
									})
						}
					},
					isc.A.getDatabaseTables = function isc_DatabaseBrowser_getDatabaseTables() {
						var _1 = this;
						var _2 = this.includeSubstring;
						if (_2 && !isc.isAn.Array(_2))
							_2 = [ _2 ];
						var _3 = this.excludeSubstring;
						if (_3 && !isc.isAn.Array(_3))
							_3 = [ _3 ];
						isc.DMI.call({
							appID : "isc_builtin",
							className : "com.isomorphic.tools.BuiltinRPC",
							methodName : "getTables",
							arguments : [ this.serverType, this.dbName, true,
									true, this.catalog, this.schema, _2, _3 ],
							callback : function(_4) {
								_1.populateSchemaTree(_4.data)
							},
							requestParams : {
								showPrompt : true,
								promptStyle : "dialog",
								prompt : "Loading schema..."
							}
						})
					},
					isc.A.populateDatabaseList = function isc_DatabaseBrowser_populateDatabaseList(
							_1) {
						this.databaseList.dataSource.setCacheData(_1);
						var _2 = {
							dbStatus : "OK"
						};
						this.databaseList.setFilterEditorCriteria(_2);
						this.databaseList.filterData(_2)
					},
					isc.A.clearSchemaTree = function isc_DatabaseBrowser_clearSchemaTree(
							_1) {
						this.schemaTree.setData([]);
						this.$64p = null;
						this.populateDataViewHeader()
					},
					isc.A.populateSchemaTree = function isc_DatabaseBrowser_populateSchemaTree(
							_1) {
						for ( var i = 0; i < _1.length; i++) {
							_1[i].name = _1[i].TABLE_NAME;
							_1[i].type = _1[i].TABLE_TYPE.toLowerCase();
							_1[i].isFolder = true;
							_1[i].customIcon = "[SKIN]../DatabaseBrowser/data.png"
						}
						this.schemaTree.dataSource.setCacheData(_1);
						this.schemaTree.filterData();
						if (this.schemaTreeTitle) {
							this.populateSchemaTreeHeader()
						}
						this.tablesRetrieved = true
					},
					isc.A.populateSchemaTreeHeader = function isc_DatabaseBrowser_populateSchemaTreeHeader() {
					},
					isc.A.populateDataViewHeader = function isc_DatabaseBrowser_populateDataViewHeader() {
						if (this.$64p) {
							this.dataGridTitle = "Data from table " + this.$64p;
							this.dataGrid.setShowHeader(true)
						} else {
							this.dataGridTitle = "No table selected";
							this.dataGrid.setDataSource(null);
							this.dataGrid.setFields([ {
								name : "placeholder",
								title : " "
							} ])
						}
						this.dataStack.setTitle(this.dataGridTitle)
					},
					isc.A.getDataSourceFromTable = function(tableName) {
						var dbBrowser = this;
						dbBrowser.$64p = tableName;
						dbBrowser.selectButton.setDisabled(false);
						isc.DMI
								.call(
										"isc_builtin",
										"com.isomorphic.tools.BuiltinRPC",
										"getDataSourceJSONFromTable",
										tableName,
										this.serverType,
										this.dbName,
										tableName + "$64s",
										function(rpcResponse, data) {
											var temp = "dbBrowser.generatedDataSourceObject = "
													+ data;
											eval(temp);
											var gdsoFields = dbBrowser.generatedDataSourceObject.fields, originalFieldsCopy = [];
											for ( var i = 0; i < gdsoFields.length; i++) {
												originalFieldsCopy[i] = isc
														.addProperties({},
																gdsoFields[i])
											}
											dbBrowser.generatedDataSource = isc.DataSource
													.create(dbBrowser.generatedDataSourceObject);
											dbBrowser.generatedDataSourceObject.fields = originalFieldsCopy;
											if (dbBrowser.showDataView) {
												dbBrowser.dataGrid
														.setDataSource(dbBrowser.generatedDataSource);
												dbBrowser.dataGrid.fetchData()
											}
										})
					},
					isc.A.getGeneratedDataSource = function isc_DatabaseBrowser_getGeneratedDataSource() {
						return this.generatedDataSource
					},
					isc.A.getGeneratedDataSourceObject = function isc_DatabaseBrowser_getGeneratedDataSourceObject() {
						return this.generatedDataSourceObject
					},
					isc.A.getResults = function isc_DatabaseBrowser_getResults(
							_1, _2, _3) {
						this.$64r = _2;
						this.$64q = _1
					});
	isc.B._maxIndex = isc.C + 13;
	isc.ClassFactory.defineClass("HibernateBrowser", "Window");
	isc.A = isc.HibernateBrowser.getPrototype();
	isc.A.orientation = "vertical";
	isc.A.width = "90%";
	isc.A.height = "90%";
	isc.A.isModal = true;
	isc.A.showModalMask = true;
	isc.A.canDragResize = true;
	isc.A.showMappingTree = true;
	isc.A.mappingTreeConstructor = "TreeGrid";
	isc.A.mappingTreeDefaults = {
		autoParent : "mappingView",
		showConnectors : true,
		showOpenIcons : false,
		showDropIcons : false,
		customIconProperty : "customIcon",
		fields : [ {
			name : "name",
			title : "Name",
			width : "60%",
			showHover : true
		}, {
			name : "type",
			title : "Type"
		}, {
			name : "primaryKey",
			title : "PK",
			type : "boolean",
			width : "10%"
		}, {
			name : "length",
			title : "Length",
			type : "number"
		} ],
		selectionChanged : function(_1, _2) {
			if (_2) {
				var _3 = this.data.getLevel(_1) == 1 ? _1.name : this.data
						.getParent(_1).name;
				if (_3 && _3 != this.creator.$64t) {
					this.creator.getDataSourceFromMapping(_3);
					this.creator.populateDataViewHeader()
				}
			}
		},
		openFolder : function(_1) {
			if (this.data.getLevel(_1) > 1) {
				return this.Super("openFolder", arguments)
			}
			this.Super("openFolder", arguments);
			var _2 = this;
			var _3 = _1.name;
			isc.DMI.call("isc_builtin", "com.isomorphic.tools.BuiltinRPC",
					"getBeanFields", _3, function(_4) {
						_2.populateFields(_1, _4.data)
					})
		},
		getValueIcon : function(_1, _2, _3) {
			if (_3.type == "entity") {
				return null
			} else {
				return this.Super("getValueIcon", arguments)
			}
		},
		populateFields : function(_1, _2) {
			var _3 = isc.clone(_2)
			_1.children = [];
			for ( var i = 0; i < _3.length; i++) {
				_3[i].children = [];
				_3[i].customIcon = "[SKIN]../DatabaseBrowser/column.png"
			}
			this.data.addList(_3, _1)
		}
	};
	isc.A.dataGridConstructor = "ListGrid";
	isc.A.dataGridDefaults = {};
	isc.A.title = "Hibernate Browser";
	isc.A.showSelectButton = true;
	isc.A.selectButtonConstructor = "Button";
	isc.A.selectButtonDefaults = {
		title : "Next >",
		enabled : false,
		autoParent : "outerLayout"
	};
	isc.A.outerLayoutDefaults = {
		_constructor : isc.VLayout,
		width : "100%",
		height : "100%",
		autoSize : true,
		autoDraw : true,
		autoParent : "body"
	};
	isc.A.innerLayoutDefaults = {
		_constructor : isc.HLayout,
		width : "100%",
		height : "100%",
		autoDraw : true,
		autoParent : "outerLayout"
	};
	isc.A.showMappingView = true;
	isc.A.mappingViewDefaults = {
		_constructor : isc.SectionStack,
		autoParent : "innerLayout"
	};
	isc.A.showDataView = true;
	isc.A.dataViewDefaults = {
		_constructor : isc.SectionStack,
		width : "65%",
		height : "100%",
		autoParent : "innerLayout"
	};
	isc.A = isc.HibernateBrowser.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.B
			.push(
					isc.A.initWidget = function isc_HibernateBrowser_initWidget() {
						this.Super("initWidget", arguments);
						this.createChildren()
					},
					isc.A.createChildren = function isc_HibernateBrowser_createChildren() {
						this.Super("createChildren");
						this.body.hPolicy = "fill";
						this.body.vPolicy = "fill";
						var _1 = this;
						this.addAutoChild("outerLayout");
						this.addAutoChild("innerLayout", null, null,
								this.outerLayout);
						this.addAutoChild("mappingView", {
							showResizeBar : this.showDataView,
							title : "Hibernate Mappings"
						}, null, this.innerLayout);
						this.mappingView.addSection({
							autoDraw : true,
							showHeader : true,
							expanded : true,
							hidden : false,
							title : "Hibernate Mappings"
						});
						this.mappingStack = this.mappingView.sections[0];
						this.addAutoChild("dataView", null, null,
								this.innerLayout);
						this.dataView.addSection({
							autoDraw : true,
							showHeader : true,
							expanded : true,
							hidden : false
						});
						this.dataStack = this.dataView.sections[0];
						this.mappingTree = this.createAutoChild("mappingTree");
						this.mappingStack.addItem(this.mappingTree);
						var _2 = this.includeSubstring;
						if (_2 && !isc.isAn.Array(_2))
							_2 = [ _2 ];
						var _3 = this.excludeSubstring;
						if (_3 && !isc.isAn.Array(_3))
							_3 = [ _3 ];
						isc.DMI.call("isc_builtin",
								"com.isomorphic.tools.BuiltinRPC",
								"getHibernateBeans", _2, _3, true,
								function(_4) {
									_1.populateMappingTree(_4.data)
								});
						this.dataGrid = this.createAutoChild("dataGrid");
						this.dataStack.addItem(this.dataGrid);
						this.outerLayout.addMember(isc.LayoutSpacer.create({
							height : "10"
						}));
						this.addAutoChild("selectButton", {
							click : function() {
								_1.hide();
								_1.$64q.defaults = _1
										.getGeneratedDataSourceObject();
								_1.fireCallback(_1.$64r, "node", [ _1.$64q ])
							}
						}, null, this.outerLayout)
					},
					isc.A.populateMappingTree = function isc_HibernateBrowser_populateMappingTree(
							_1) {
						for ( var i = 0; i < _1.length; i++) {
							_1[i].name = _1[i].entityName;
							_1[i].type = "entity";
							_1[i].isFolder = true;
							_1[i].customIcon = "[SKIN]../DatabaseBrowser/data.png"
						}
						this.mappingTree.setData(isc.Tree.create({
							modelType : "children",
							root : {
								children : _1
							}
						}));
						if (_1.length == 0) {
							this
									.populateMappingTreeHeader("No Hibernate entities configured")
						}
						this.tablesRetrieved = true
					},
					isc.A.populateMappingTreeHeader = function isc_HibernateBrowser_populateMappingTreeHeader(
							_1) {
						this.mappingStack.setTitle(_1)
					},
					isc.A.populateDataViewHeader = function isc_HibernateBrowser_populateDataViewHeader() {
						this.dataGridTitle = "Data from entity " + this.$64t;
						this.dataStack.setTitle(this.dataGridTitle)
					},
					isc.A.getDataSourceFromMapping = function(entityName) {
						var hbBrowser = this;
						hbBrowser.$64t = entityName;
						hbBrowser.selectButton.setEnabled(true);
						isc.DMI
								.call(
										"isc_builtin",
										"com.isomorphic.tools.BuiltinRPC",
										"getDataSourceJSONFromHibernateMapping",
										entityName,
										entityName + "-hibernateBrowser",
										function(rpcResponse, data) {
											var temp = "hbBrowser.generatedDataSourceObject = "
													+ data;
											eval(temp);
											hbBrowser.generatedDataSource = isc.DataSource
													.create(hbBrowser.generatedDataSourceObject);
											if (hbBrowser.showDataView) {
												hbBrowser.dataGrid
														.setDataSource(hbBrowser.generatedDataSource);
												hbBrowser.dataGrid.fetchData()
											}
										})
					},
					isc.A.getGeneratedDataSource = function isc_HibernateBrowser_getGeneratedDataSource() {
						return this.generatedDataSource
					},
					isc.A.getGeneratedDataSourceObject = function isc_HibernateBrowser_getGeneratedDataSourceObject() {
						return this.generatedDataSourceObject
					},
					isc.A.getResults = function isc_HibernateBrowser_getResults(
							_1, _2, _3) {
						this.$64r = _2;
						this.$64q = _1
					});
	isc.B._maxIndex = isc.C + 9;
	isc.defineClass("SelectionOutline", "Class");
	isc.A = isc.SelectionOutline;
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.A.borderStyle = "1px dashed #44ff44";
	isc.A.flashBorderStyle = "1px dashed white";
	isc.A.flashCount = 7;
	isc.A.flashInterval = 300;
	isc.A.showLabel = true;
	isc.A.labelSnapTo = "TL";
	isc.A.labelSnapEdge = "BL";
	isc.A.labelSnapOffset = -2;
	isc.A.labelBackgroundColor = "#44ff44";
	isc.A.labelOpacity = 100;
	isc.B
			.push(
					isc.A.select = function isc_c_SelectionOutline_select(_1,
							_2, _3, _4) {
						var _5 = _1;
						if (isc.isA.String(_1))
							_5 = window[_1];
						if (!isc.isA.Canvas(_5) && !isc.isA.FormItem(_5)) {
							this
									.logInfo("Cannot hilite "
											+ _1
											+ " - it is neither a Canvas nor a FormItem");
							return
						}
						if (_3 == null)
							_3 = true;
						if (_5 == this.$70d
								&& ((_3 && this.$71w) || (!_3 && !this.$71w))) {
							if (!this.$70z)
								this.showOutline();
							return
						}
						this.logInfo("Selection changing from " + this.$70d
								+ " to " + _5, "selectionOutline");
						this.deselect();
						if (!this.$70b) {
							this.$70c(_5, _4, _3)
						}
						if (_3 || (_3 == null && this.showLabel)) {
							if (this.$70b.label == null)
								this.$70e();
							this.$70b.label.setContents(_4 || "<b>"
									+ _5.toString() + "</b>");
							this.$71w = true
						} else {
							this.$70b.label = null;
							this.$71w = false
						}
						this.$70d = _5;
						this.$70f();
						this.delayCall("$70h", [], 0);
						this.delayCall("showOutline", [], 0);
						if (_5.moved) {
							this.$f0
									.observe(_5, "moved",
											"isc.Timer.setTimeout('isc.SelectionOutline.$70h()',0)")
						}
						if (_5.resized) {
							this.$f0
									.observe(_5, "resized",
											"isc.Timer.setTimeout('isc.SelectionOutline.$71o()',0)")
						}
						var _6 = isc.isA.FormItem(_5) ? _5.form : _5;
						while (_6) {
							if (_6.scrolled) {
								this.$f0.observe(_6, "scrolled",
										"isc.SelectionOutline.$70h()")
							}
							_6 = _6.parentElement
						}
						if (_5.hide) {
							this.$f0.observe(_5, "hide",
									"isc.SelectionOutline.hideOutline()")
						}
						if (_5.destroy) {
							this.$f0.observe(_5, "destroy",
									"isc.SelectionOutline.hideOutline()")
						}
						if (_2 != false)
							this.$70i()
					},
					isc.A.deselect = function isc_c_SelectionOutline_deselect() {
						if (this.$70b)
							this.hideOutline();
						if (this.$f0 && this.$70d) {
							this.$f0.ignore(this.$70d, "moved");
							this.$f0.ignore(this.$70d, "resized");
							this.$f0.ignore(this.$70d, "hide");
							this.$f0.ignore(this.$70d, "destroy");
							var _1 = isc.isA.FormItem(this.$70d) ? this.$70d.form
									: this.$70d;
							while (_1) {
								this.$f0.ignore(_1, "scrolled");
								_1 = _1.parentElement
							}
						}
						this.$70d = null
					},
					isc.A.getSelectedObject = function isc_c_SelectionOutline_getSelectedObject() {
						return this.$70d
					},
					isc.A.$70c = function isc_c_SelectionOutline__createOutline(
							_1, _2, _3) {
						var _4 = {
							autoDraw : false,
							overflow : "hidden",
							border : this.borderStyle,
							padding : 0
						}
						this.$70b = {
							top : isc.Canvas.create(isc.addProperties(_4, {
								snapTo : "T",
								snapEdge : "B",
								width : "100%",
								height : 2
							})),
							left : isc.Canvas.create(isc.addProperties(_4, {
								snapTo : "L",
								snapEdge : "R",
								width : 2,
								height : "100%"
							})),
							bottom : isc.Canvas.create(isc.addProperties(_4, {
								snapTo : "B",
								snapEdge : "T",
								width : "100%",
								height : 2
							})),
							right : isc.Canvas.create(isc.addProperties(_4, {
								snapTo : "R",
								snapEdge : "L",
								width : 2,
								height : "100%"
							}))
						}
						this.$f0 = isc.Class.create()
					},
					isc.A.$70e = function isc_c_SelectionOutline__createLabel() {
						if (this.$70j) {
							this.$70b.label = this.$70j;
							return
						}
						this.$70j = this.$70b.label = isc.Label
								.create({
									autoDraw : true,
									top : -100,
									left : -100,
									autoFit : true,
									autoFitDirection : "both",
									padding : 2,
									wrap : false,
									isMouseTransparent : true,
									backgroundColor : this.labelBackgroundColor,
									opacity : this.labelOpacity,
									snapTo : this.labelSnapTo,
									snapEdge : this.labelSnapEdge,
									snapOffsetTop : this.labelSnapOffset,
									mouseOver : function() {
										if (this.$701) {
											isc.Timer.clear(this.$71a);
											isc.SelectionOutline.$70h();
											this.$701 = false
										} else {
											var _1 = this;
											this.$71b = isc.Timer.setTimeout(
													function() {
														_1.$71c()
													}, 300)
										}
									},
									mouseOut : function() {
										if (this.$71b) {
											isc.Timer.clear(this.$71b);
											delete this.$71b
										}
									},
									$71c : function() {
										isc.Timer.clear(this.$71a);
										this.$701 = true;
										this
												.animateMove(
														null,
														(this.getPageTop() + this
																.getVisibleHeight())
																- isc.SelectionOutline.labelSnapOffset,
														null, 200);
										this.$71a = isc.Timer
												.setTimeout(
														function() {
															isc.SelectionOutline
																	.$70h();
															if (isc.SelectionOutline.$70b.label) {
																isc.SelectionOutline.$70b.label.$701 = false
															}
														}, 3000)
									}
								})
					},
					isc.A.$71o = function isc_c_SelectionOutline__resizeOutline() {
						this.logInfo("Resizing selected object " + this.$70d,
								"selectionOutline");
						this.$71p()
					},
					isc.A.$70h = function isc_c_SelectionOutline__moveOutline() {
						this.logInfo("Moving selected object " + this.$70d,
								"selectionOutline");
						this.$71p()
					},
					isc.A.$71p = function isc_c_SelectionOutline__refreshOutline() {
						if (!this.$70d || this.$70d.destroyed
								|| this.$70d.destroying)
							return;
						this.$70b.top.resizeTo(this.$70d.getVisibleWidth(),
								this.$70b.top.height);
						this.$70b.bottom.resizeTo(this.$70d.getVisibleWidth(),
								this.$70b.bottom.height);
						this.$70b.left.resizeTo(this.$70b.left.width, this.$70d
								.getVisibleHeight());
						this.$70b.right.resizeTo(this.$70b.right.width,
								this.$70d.getVisibleHeight());
						var _1 = isc.isA.Canvas(this.$70d);
						for ( var _2 in this.$70b) {
							var _3 = this.$70b[_2];
							if (_3 == null)
								continue;
							if (_1) {
								isc.Canvas.snapToEdge(this.$70d, _3.snapTo, _3,
										_3.snapEdge, this.$70d)
							} else {
								isc.Canvas.snapToEdge(this.$70d.getPageRect(),
										_3.snapTo, _3, _3.snapEdge)
							}
						}
						if (isc.EditContext && !isc.EditContext.$53r) {
							isc.EditContext.positionDragHandle()
						}
					},
					isc.A.$70i = function isc_c_SelectionOutline__flashOutline() {
						var _1 = [ this.borderStyle, this.flashBorderStyle ];
						for ( var i = 0; i < this.flashCount; i++) {
							isc.Timer.setTimeout({
								target : this,
								methodName : "$70k",
								args : [ _1[i % 2] ]
							}, (this.flashInterval * i))
						}
					},
					isc.A.$70f = function isc_c_SelectionOutline__resetOutline() {
						this.$70k(this.borderStyle)
					},
					isc.A.$70k = function isc_c_SelectionOutline__setOutline(_1) {
						for ( var _2 in this.$70b) {
							if (_2 == "label")
								continue;
							var _3 = this.$70b[_2];
							_3.setBorder(_1)
						}
					},
					isc.A.hideOutline = function isc_c_SelectionOutline_hideOutline() {
						if (!this.$70b)
							return;
						for ( var _1 in this.$70b) {
							if (this.$70b[_1])
								this.$70b[_1].hide()
						}
						this.$70z = false
					},
					isc.A.showOutline = function isc_c_SelectionOutline_showOutline() {
						if (!this.$70b || !this.getSelectedObject())
							return;
						for ( var _1 in this.$70b) {
							if (this.$70b[_1])
								this.$70b[_1].show()
						}
						this.$70z = true
					});
	isc.B._maxIndex = isc.C + 13;
	isc.ClassFactory.defineClass("Repo", "Class");
	isc.A = isc.Repo.getPrototype();
	isc.A.objectFormat = "js";
	isc.A = isc.Repo.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.B.push(isc.A.init = function isc_Repo_init() {
		this.initDataSource()
	}, isc.A.initDataSource = function isc_Repo_initDataSource() {
		if (this.dataSource && !isc.isA.DataSource(this.dataSource))
			this.dataSource = isc.DS.getDataSource(this.dataSource)
	}, isc.A.destroy = function isc_Repo_destroy() {
	}, isc.A.loadObjects = function isc_Repo_loadObjects(_1, _2) {
	}, isc.A.loadObject = function isc_Repo_loadObject(_1, _2) {
	}, isc.A.saveObject = function isc_Repo_saveObject(_1, _2, _3) {
	}, isc.A.showLoadUI = function isc_Repo_showLoadUI(_1, _2) {
	}, isc.A.showSaveUI = function isc_Repo_showSaveUI(_1, _2, _3) {
	}, isc.A.isActive = function isc_Repo_isActive() {
		if (this.$481 && this.$481.isVisible())
			return true;
		if (this.$48w && this.$48w.isVisible())
			return true;
		return false
	}, isc.A.customFormatToJS = function isc_Repo_customFormatToJS(_1) {
		return _1
	});
	isc.B._maxIndex = isc.C + 10;
	isc.Repo.addClassProperties({})
	isc.Repo.registerStringMethods({});
	isc.ClassFactory.defineClass("ViewRepo", "Repo");
	isc.A = isc.ViewRepo.getPrototype();
	isc.A.dataSource = "Filesystem";
	isc.A.idField = "name";
	isc.A.viewNameField = "name";
	isc.A.objectField = "contents";
	isc.A.objectFormat = "xml";
	isc.A = isc.ViewRepo.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.B
			.push(
					isc.A.loadObjects = function isc_ViewRepo_loadObjects(_1,
							_2) {
						this.initDataSource();
						var _3 = this.dataSource, _4 = this;
						_3.fetchData(_1 ? _1.criteria : null, function(_5) {
							_4.loadObjectsReply(_5.data, _1, _2)
						})
					},
					isc.A.loadObjectsReply = function isc_ViewRepo_loadObjectsReply(
							_1, _2, _3) {
						this.fireCallback(_3, "objects, context", [ _1, _3 ])
					},
					isc.A.loadObject = function isc_ViewRepo_loadObject(_1, _2) {
						this.initDataSource();
						var _3 = this.dataSource, _4 = this;
						_3.fetchData(_1 ? _1.criteria : null, function(_5) {
							_4.loadObjectReply(_5.data, _1, _2)
						}, {
							operationId : "loadFile"
						})
					},
					isc.A.loadObjectReply = function isc_ViewRepo_loadObjectReply(
							_1, _2, _3) {
						var _4 = isc.isAn.Array(_1) ? _1[0] : _1, _5 = _4[this.objectField];
						if (this.objectFormat == "custom") {
							_5 = this.customFormatToJS(_5)
						}
						_2[this.idField] = _2.fileName = _4[this.idField];
						_2[this.viewNameField] = _2.screenName = _4[this.viewNameField];
						if (_2.screenName.indexOf(".") > 0)
							_2.screenName = _2.screenName.substring(0,
									_2.screenName.indexOf("."));
						_2[this.objectField] = _5;
						_2.record = _4;
						this.fireCallback(_3, "contents,context", [ _5, _2 ])
					},
					isc.A.createLoadDialog = function isc_ViewRepo_createLoadDialog(
							_1) {
						var _2 = isc.TLoadFileDialog.create({
							directoryListingProperties : {
								canEdit : false
							},
							title : "Load View",
							initialDir : _1.caller.workspacePath,
							rootDir : _1.caller.workspacePath,
							fileFilter : ".xml$",
							actionStripControls : [ "spacer:10", "pathLabel",
									"previousFolderButton", "spacer:10",
									"upOneLevelButton", "spacer:10",
									"refreshButton", "spacer:2" ]
						});
						_2.show();
						_2.hide();
						return _2
					},
					isc.A.showLoadUI = function isc_ViewRepo_showLoadUI(_1, _2) {
						var _3 = this;
						if (!this.$481) {
							this.$481 = isc.TLoadFileDialog.create({
								directoryListingProperties : {
									canEdit : false
								},
								title : "Load View",
								initialDir : _1.caller.workspacePath,
								rootDir : _1.caller.workspacePath,
								fileFilter : ".xml$",
								actionStripControls : [ "spacer:10",
										"pathLabel", "previousFolderButton",
										"spacer:10", "upOneLevelButton",
										"spacer:10", "refreshButton",
										"spacer:2" ],
								loadFile : function(_5) {
									var _4 = _5;
									if (_4.endsWith(".jsp")
											|| _4.endsWith(".xml")) {
										_4 = _4.substring(0, _4
												.lastIndexOf("."))
									}
									_3.loadObject(isc.addProperties({},
											this.$76a, {
												criteria : {
													path : this.currentDir
															+ "/" + _5
												}
											}), this.$76b);
									this.hide()
								}
							})
						} else {
							this.$481.directoryListing.data.invalidateCache()
						}
						this.$481.$76a = _1;
						this.$481.$76b = _2;
						this.$481.show()
					},
					isc.A.saveObject = function isc_ViewRepo_saveObject(_1, _2,
							_3) {
						var _4 = _2.fileName, _5 = _4.lastIndexOf("."), _6 = _1, _7 = _2.caller;
						this.initDataSource();
						_6 = _6
								.replaceAll("dataSource=\"ref:",
										"dataSource=\"");
						if (_5 != null
								&& (_4.endsWith(".jsp") || _4.endsWith(".xml"))) {
							_4 = _4.substring(0, _5)
						}
						var _8 = _4.lastIndexOf("/");
						var _9 = _8 >= 0 ? _4.substring(_8 + 1) : _4, _10 = _7.workspacePath
								+ "/" + _9, _11 = _10 + ".xml", _12 = this.dataSource;
						_2.screenName = _9;
						_12.updateData({
							path : _11,
							contents : _6
						}, null, {
							operationId : "saveFile",
							showPrompt : !_2.suppressPrompt
						});
						
						
						var _13 =  '<%@ page contentType="text/html; charset=GB2312"%>\n'
								+'<%@ taglib uri="/WEB-INF/iscTaglib.xml" prefix="isomorphic" %>\n'
								+ '<HTML><HEAD><TITLE>\n'
								+ _9
								+ '</TITLE>\n'
								+ '<isomorphic:loadISC skin="'
								//+ _7.skin
								+ "Enterprise"
								+ '"'
								+ (_7.modulesDir ? 'modulesDir="'
										+ _7.modulesDir + '"' : "")
								+ (_2.additionalModules ? (' includeModules="'
										+ _2.additionalModules + '"') : "")
								+ '/>\n </HEAD>'
								+'<%\n'
								+'String businessId = request.getParameter("businessId");\n'
								+'String workItemId = request.getParameter("workItemId");\n'
								+'String theme = request.getParameter("theme");\n'
								+'String processInsId = request.getParameter("processInsId");\n'
								+'%>'
								+'<BODY onload=\'loadInitFunction()\'>\n'
								+'<input type="hidden" id="theme"  value="<%=theme %>"/>\n'
								+'<input type="hidden" id="workItemId" name="workItemId" value="<%=workItemId %>"/>\n'
								+'<input type="hidden" id="processInsId" name="processInsId" value="<%=processInsId %>"/>\n'
								+'<input type="hidden" name="businessId" id="businessId" value="<%=businessId%>" />\n';
						for ( var i = 0; i < _7.globalDependencies.deps.length; i++) {
							var _15 = _7.globalDependencies.deps[i];
							if (_15.type == "js") {
								_13 += '<SCRIPT SRC='
										+ (_15.url.startsWith("/") ? _7.webRootRelWorkspace
												: _7.basePathRelWorkspace + "/")
										+ _15.url + '  charset="UTF-8"></SCRIPT>\n'
							} else if (_15.type == "schema") {
								_13 += '<SCRIPT>\n var paramProcessInsId = document.getElementById("processInsId").value;\n <isomorphic:loadDS name="'
										+ _15.id + '"/></SCRIPT>\n'
							} else if (_15.type == "ui") {
								_13 += '<SCRIPT>\n<isomorphic:loadUI name="'
										+ _15.id + '"/></SCRIPT>\n'
							} else if (_15.type == "css") {
								_13 += '<LINK REL="stylesheet" TYPE="text/css" HREF='
										+ (_15.url.startsWith("/") ? _7.webRootRelWorkspace
												: _7.basePathRelWorkspace + "/")
										+ _15.url + '>\n'
							}
						}
							_13 += '<SCRIPT SRC=/isomorphic/system/customerjs/loadInitFunction.js  charset="UTF-8"></SCRIPT>\n'
						_13 += '<SCRIPT>\n' + 'isc.Page.setAppImgDir("'
								+ _7.basePathRelWorkspace + '/graphics/");\n'
								+ '<isomorphic:XML>\n' + _6
								+ '\n</isomorphic:XML>' + '</SCRIPT>\n'
								+ '</BODY></HTML>';
						_7.projectComponents.$48x = _9;
						var _16 = _10 + ".jsp";
						
						_12.updateData({
							path : _16,
							contents : _13
						}, function() {
							if (_3) {
								isc.Class.fireCallback(_3, "success,context", [
										true, _2 ])
							}
							if (_2.suppressPrompt)
								return;
							var _17 = window.location.href;
							if (_17.indexOf("?") > 0)
								_17 = _17.substring(0, _17.indexOf("?"));
							_17 = _17.substring(0, _17.lastIndexOf("/"));
							_17 += (_17.endsWith("/") ? "" : "/")
									+ _7.workspaceURL + _9 + ".jsp";
							isc.say("Your screen can be accessed at:<P>"
									+ "<a target=_blank href='" + _17 + "'>"
									+ _17 + "</a>")
						}, {
							operationId : "saveFile",
							showPrompt : !_2.suppressPrompt
						});
						


						
						if (_7.saveURL) {
							isc.RPCManager.send(null, null, {
								actionURL : _7.saveURL,
								useSimpleHttp : true,
								showPrompt : !_2.suppressPrompt,
								params : {
									screen : _6
								}
							})
						}
					},
					isc.A.showSaveUI = function isc_ViewRepo_showSaveUI(_1, _2,
							_3) {
						var _4 = _2.caller, _5 = this, _6 = _1, _7 = (_2.saveAs ? ""
								: _2.screenName), _8 = _3;
						if (!this.$48w) {
							this.$48w = isc.TSaveFileDialog.create({
								title : "Save View",
								fileFilter : ".xml$",
								visibility : "hidden",
								actionStripControls : [ "spacer:10",
										"pathLabel", "previousFolderButton",
										"spacer:10", "upOneLevelButton",
										"spacer:10", "refreshButton",
										"spacer:2" ],
								directoryListingProperties : {
									canEdit : false
								},
								initialDir : _4.workspacePath,
								rootDir : _4.workspacePath,
								saveFile : function(_9) {
									_5.saveObject(this.$76c, isc.addProperties(
											this.$76d, {
												fileName : _9
											}), this.$76e);
									this.hide()
								}
							})
						} else {
							this.$48w.directoryListing.data.invalidateCache()
						}
						this.$48w.$76c = _6;
						this.$48w.$76d = _2;
						this.$48w.$76e = _3;
						if (_7 && _7 != "") {
							return this.$48w.saveFile(_7)
						}
						this.$48w.show()
					});
	isc.B._maxIndex = isc.C + 8;
	isc.ClassFactory.defineClass("DSViewRepo", "Repo");
	isc.A = isc.DSViewRepo.getPrototype();
	isc.A.idField = "id";
	isc.A.viewNameField = "viewName";
	isc.A.objectField = "object";
	isc.A = isc.DSViewRepo.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.B
			.push(
					isc.A.loadObjects = function isc_DSViewRepo_loadObjects(_1,
							_2) {
						if (!this.dataSource) {
							this.logWarn("No dataSource available in "
									+ this.getClassName() + ".loadObjects");
							return
						}
						this.initDataSource();
						var _3 = this.dataSource, _4 = this;
						_3.fetchData(_1.criteria, function(_5) {
							_4.loadObjectsReply(_5.data, _1, _2)
						})
					},
					isc.A.loadObjectsReply = function isc_DSViewRepo_loadObjectsReply(
							_1, _2, _3) {
						this.fireCallback(_3, "data, context", [ _1, _2 ])
					},
					isc.A.loadObject = function isc_DSViewRepo_loadObject(_1,
							_2) {
						if (!this.dataSource) {
							this.logWarn("No dataSource available in "
									+ this.getClassName() + ".loadObject");
							return
						}
						this.initDataSource();
						var _3 = this, _4 = this.dataSource;
						_4.fetchData(_1.criteria, function(_5) {
							_3.loadObjectReply(_5.data, _1, _2)
						})
					},
					isc.A.loadObjectReply = function isc_DSViewRepo_loadObjectReply(
							_1, _2, _3) {
						var _4 = isc.isAn.Array(_1) ? _1[0] : _1, _5 = _4[this.objectField];
						if (this.objectFormat == "custom") {
							_5 = this.customFormatToJS(_5)
						}
						_2[this.idField] = _4[this.idField];
						_2[this.viewNameField] = _2.screenName = _4[this.viewNameField];
						_2[this.objectField] = _5;
						_2.record = _4;
						this.fireCallback(_3, "contents,context", [ _5, _2 ])
					},
					isc.A.saveObject = function isc_DSViewRepo_saveObject(_1,
							_2, _3) {
						if (!this.dataSource) {
							this.logWarn("No dataSource available in "
									+ this.getClassName() + ".saveObject");
							return
						}
						this.initDataSource();
						var _4 = this, _5 = this.dataSource;
						_1 = _1
								.replaceAll("dataSource=\"ref:",
										"dataSource=\"");
						var _6 = {};
						if (_2[this.idField])
							_6[this.idField] = _2[this.idField];
						_6[this.viewNameField] = _2[this.viewNameField];
						_6[this.objectField] = _1;
						if (!_6[this.idField]) {
							_5.addData(_6, function(_7) {
								_4.saveObjectReply(_7, _3, _2)
							})
						} else {
							_5.updateData(_6, function(_7) {
								_4.saveObjectReply(_7, _3, _2)
							})
						}
					},
					isc.A.saveObjectReply = function isc_DSViewRepo_saveObjectReply(
							_1, _2, _3) {
						if (_2)
							this.fireCallback(_2, "success", [ true ])
					},
					isc.A.showLoadUI = function isc_DSViewRepo_showLoadUI(_1,
							_2) {
						var _3 = this;
						if (!this.$481) {
							this.$481 = isc.TLoadFileDialog
									.create({
										showPreviousFolderButton : false,
										showUpOneLevelButton : false,
										showCreateNewFolderButton : false,
										actionFormProperties : {
											process : function() {
												if (this.validate())
													this.creator
															.recordSelected(this.creator.directoryListing.$48r)
											}
										},
										directoryListingProperties : {
											canEdit : false,
											dataSource : this.dataSource,
											fields : [ {
												name : _3.idField,
												width : 0
											}, {
												name : _3.viewNameField,
												width : "*"
											} ],
											recordDoubleClick : function(_4, _5) {
												if (_5.isFolder) {
													this.creator
															.setDir(_5.path)
												} else {
													this.creator
															.recordSelected(_5)
												}
												return false
											}
										},
										dataSource : this.dataSource,
										title : "Load View",
										fileFilter : ".xml$",
										actionStripControls : [ "spacer:10",
												"pathLabel",
												"previousFolderButton",
												"spacer:10",
												"upOneLevelButton",
												"spacer:10", "refreshButton",
												"spacer:2" ],
										recordSelected : function(_4) {
											this.$76a.criteria = {
												record : _4
											};
											this.$76a.criteria[_3.idField] = _4[_3.idField];
											_3.loadObject(this.$76a, this.$76b);
											this.hide()
										}
									})
						} else {
							this.$481.directoryListing.data.invalidateCache()
						}
						this.$481.$76a = _1;
						this.$481.$76b = _2;
						this.$481.show()
					},
					isc.A.showSaveUI = function isc_DSViewRepo_showSaveUI(_1,
							_2, _3) {
						var _4 = this;
						if (_2.screenName) {
							this.saveObject(_1, _2, _3);
							return
						}
						if (!this.$48w) {
							this.$48w = isc.TSaveFileDialog
									.create({
										title : "Save File",
										actionButtonTitle : "Save DataSourceaaaaa",
										showPreviousFolderButton : false,
										showUpOneLevelButton : false,
										showCreateNewFolderButton : false,
										actionFormProperties : {
											process : function() {
												if (this.validate())
													this.creator
															.recordSelected(this.creator.directoryListing.$48r)
											}
										},
										directoryListingProperties : {
											canEdit : false,
											dataSource : this.dataSource,
											fields : [ {
												name : _4.idField,
												width : 0
											}, {
												name : _4.viewNameField,
												width : "*"
											} ],
											recordDoubleClick : function(_5, _6) {
												if (_6.isFolder) {
													this.creator
															.setDir(_6.path)
												} else {
													this.creator
															.recordSelected(_6)
												}
												return false
											}
										},
										dataSource : this.dataSource,
										title : "Load View",
										fileFilter : ".xml$",
										actionStripControls : [ "spacer:10",
												"pathLabel",
												"previousFolderButton",
												"spacer:10",
												"upOneLevelButton",
												"spacer:10", "refreshButton",
												"spacer:2" ],
										recordSelected : function(_5) {
											var _2 = this.$76d;
											if (_5) {
												_2.criteria[_4.idField] = _5[_4.idField];
												_2.record = _5;
												_2[_4.idField] = _5[_4.idField];
												_2[_4.viewNameField] = _5[_4.viewNameField]
											} else {
												_2[_4.viewNameField] = this.actionForm
														.getValue("fileName");
												_2[_4.idField] = null
											}
											_4.saveObject(this.$76f, _2,
													this.$76e);
											this.hide()
										}
									})
						} else {
							this.$48w.directoryListing.data.invalidateCache()
						}
						this.$48w.$76f = _1;
						this.$48w.$76d = _2;
						this.$48w.$76e = _3;
						this.$48w.show()
					});
	isc.B._maxIndex = isc.C + 8;
	isc.ClassFactory.defineClass("DSRepo", "Repo");
	isc.DSRepo.addProperties({})
	isc.A = isc.DSRepo.getPrototype();
	isc.B = isc._allFuncs;
	isc.C = isc.B._maxIndex;
	isc.D = isc._funcClasses;
	isc.D[isc.C] = isc.A.Class;
	isc.B.push(isc.A.loadObjects = function isc_DSRepo_loadObjects(_1, _2) {
		var _3 = this;
		if (!this.dataSource) {
			isc.DMI.call({
				appID : "isc_builtin",
				className : "com.isomorphic.tools.BuiltinRPC",
				methodName : "getDefinedDataSources",
				args : [],
				callback : function(_4) {
					_3.loadObjectsReply(_4.data, _1, _2)
				}
			})
		} else {
			this.initDataSource();
			this.dataSource.fetchData(_1 ? _1.criteria : null, function(_4) {
				_3.loadObjectsReply(_4.data, _1, _2)
			})
		}
	},
			isc.A.loadObjectsReply = function isc_DSRepo_loadObjectsReply(_1,
					_2, _3) {
				this.fireCallback(_3, "objects, context", [ _1, _2 ])
			});
	isc.B._maxIndex = isc.C + 2;
	if (!isc.TScrollbar)
		isc.defineClass("TScrollbar", "Scrollbar");
	if (!isc.TPropertySheet)
		isc.defineClass("TPropertySheet", "PropertySheet");
	if (!isc.TSectionItem)
		isc.defineClass("TSectionItem", "SectionItem");
	if (!isc.TSectionStack)
		isc.defineClass("TSectionStack", "SectionStack");
	if (!isc.TSectionHeader)
		isc.defineClass("TSectionHeader", "SectionHeader");
	if (!isc.TImgSectionHeader)
		isc.defineClass("TImgSectionHeader", "ImgSectionHeader");
	if (!isc.TButton)
		isc.defineClass("TButton", "StretchImgButton");
	if (!isc.TAutoFitButton)
		isc.defineClass("TAutoFitButton", "TButton");
	if (!isc.TMenuButton)
		isc.defineClass("TMenuButton", "MenuButton");
	if (!isc.TMenu)
		isc.defineClass("TMenu", "Menu");
	if (!isc.TTabSet)
		isc.defineClass("TTabSet", "TabSet")
	if (!isc.TTreePalette)
		isc.defineClass("TTreePalette", "TreePalette");
	if (!isc.TEditTree)
		isc.defineClass("TEditTree", "EditTree");
	if (!isc.THTMLFlow)
		isc.defineClass("THTMLFlow", "HTMLFlow");
	if (!isc.TComponentEditor)
		isc.defineClass('TComponentEditor', 'ComponentEditor');
	if (!isc.TDynamicForm)
		isc.defineClass('TDynamicForm', 'DynamicForm');
	if (!isc.TLayout)
		isc.defineClass('TLayout', 'Layout');
	if (!isc.TListPalette)
		isc.defineClass('TListPalette', 'ListPalette');
	if (!isc.TSaveFileDialog)
		isc.defineClass("TSaveFileDialog", "SaveFileDialog");
	isc._moduleEnd = isc._Tools_end = (isc.timestamp ? isc.timestamp()
			: new Date().getTime());
	if (isc.Log && isc.Log.logIsInfoEnabled('loadTime'))
		isc.Log.logInfo('Tools module init time: '
				+ (isc._moduleEnd - isc._moduleStart) + 'ms', 'loadTime');
	delete isc.definingFramework;
} else {
	if (window.isc && isc.Log && isc.Log.logWarn)
		isc.Log.logWarn("Duplicate load of module 'Tools'.");
}

/*
 * 
 * SmartClient Ajax RIA system Version v8.2p_2012-10-08/EVAL Development Only
 * (2012-10-08)
 * 
 * Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
 * "SmartClient" is a trademark of Isomorphic Software, Inc.
 * 
 * LICENSE NOTICE INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE
 * OF ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file without
 * an accompanying Isomorphic Software license file, please contact
 * licensing@isomorphic.com for details. Unauthorized copying and use of this
 * software is a violation of international copyright law.
 * 
 * DEVELOPMENT ONLY - DO NOT DEPLOY This software is provided for evaluation,
 * training, and development purposes only. It may include supplementary
 * components that are not licensed for deployment. The separate DEPLOY package
 * for this release contains SmartClient components that are licensed for
 * deployment.
 * 
 * PROPRIETARY & PROTECTED MATERIAL This software contains proprietary materials
 * that are protected by contract and intellectual property law. You are
 * expressly prohibited from attempting to reverse engineer this software or
 * modify this software for human readability.
 * 
 * CONTACT ISOMORPHIC For more information regarding license rights and
 * restrictions, or to report possible license violations, please contact
 * Isomorphic Software by email (licensing@isomorphic.com) or web
 * (www.isomorphic.com).
 * 
 */

