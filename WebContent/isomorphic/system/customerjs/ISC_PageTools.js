isc.ClassFactory.defineClass("PageTools", "ToolStrip");
isc.PageTools.addProperties({
	curPage : 1,
	pageSize : 10,
	totalCount : 0,
	totalPage : 0,
	autoFetch : true,
	height : 20,
	grid : "",
	_this : null,
	initWidget : function() {
		this.Super("initWidget", arguments);
		if (!this.grid) {
			this.logWarn("分页控件需要传递一个'grid'参数作为分页表格！");
			return;
		}
		if (isc.isA.String(this.grid))
			this.grid = window[this.grid];
		this.align = "right";
		this.visibilityMode = "multiple";
		this._this = this;
		this.makePageToolForm();
		this.addMember(this.pageToolForm);
		this.makePagerMembers();
		this.addMember(this.pageMembers);
		this.fetchPageData();
	},
	draw : function() {
		this.Super("draw", arguments);
	},
	makePageToolForm : function() {
		this.pageToolForm = isc.DynamicForm
				.create({
					autoDraw : false,
					height : this.height,
					numCols : 9,
					cellPadding : 0,
					width : 485,
					colWidths : [50,40,60,40,100,50,50,50,45],
					fields : [
							{
								id : "iAllPage",
								name : "iAllPage",
								title : "总页数",
								_constructor : "StaticTextItem"
							},
							{
								id : "iAllCounts",
								name : "iAllCounts",
								title : "总记录数",
								_constructor : "StaticTextItem"
							},
							{
								id : "iPageSize",
								name : "iPageSize",
								title : "每页显示记录数",
								width : 50,
								valueMap:[10,20,50,100,200,600],
								changed:function(form, item, value){this.containerWidget.parentElement.pageSize = value;},
								_constructor : "SelectItem"
							},
							{
								id : "iNowPage",
								name : "iNowPage",
								title : "当前页",
								width : 40,
								type : "integer",
								value : "1",
								_constructor : "TextItem"
							},
							{
								name : "gototemp",
								title : "转向",
								startRow : false,
								endRow : false,
								click : function() {
									this.containerWidget.parentElement
											.gotoPage(this.containerWidget.parentElement.pageToolForm
													.getValue('iNowPage'));
								},
								_constructor : "ButtonItem"
							} ]
				});
	},
	makePagerMembers : function() {
		this.pageMembers = [];
		this.pageMembers.add(isc.ToolStripSeparator.create({
			autoDraw : false,
			height : this.height
		}));
		this.pageMembers.add(isc.ToolStripButton.create({
			autoDraw : false,
			title : "首页",
			click : function() {
				this.parentElement.firstPage();
			}
		}));
		this.pageMembers.add(isc.ToolStripSeparator.create({
			autoDraw : false,
			height : this.height
		}));
		this.pageMembers.add(isc.ToolStripButton.create({
			autoDraw : false,
			title : "上一页",
			click : function() {
				this.parentElement.prePage();
			}
		}));
		this.pageMembers.add(isc.ToolStripSeparator.create({
			autoDraw : false,
			height : this.height
		}));
		this.pageMembers.add(isc.ToolStripButton.create({
			autoDraw : false,
			title : "下一页",
			click : function() {
				this.parentElement.nextPage();
			}
		}));
		this.pageMembers.add(isc.ToolStripSeparator.create({
			autoDraw : false,
			height : this.height
		}));
		this.pageMembers.add(isc.ToolStripButton.create({
			autoDraw : false,
			title : "尾页",
			click : function() {
				this.parentElement.lastPage();
			}
		}));
	},
	getTotalPage : function() {
		this.totalPage = Math.ceil(this.totalCount / this.pageSize);
		if (this.totalPage == 0)
			this.totalPage = 1;
		this.pageToolForm.setValue("iAllPage", this.totalPage);
		this.pageToolForm.setValue("iAllCounts", this.totalCount);
		this.pageToolForm.setValue("iPageSize", this.pageSize);
	},
	nextPage : function() {
		this.curPage = this.curPage*1 + 1;
		this.pageToolForm.setValue("iNowPage", this.curPage);
		if (this.curPage != 1) {
			this.pageMembers[1].setDisabled(false);
			this.pageMembers[3].setDisabled(false);
		}
		if (this.curPage == this.totalPage) {
			this.pageMembers[7].setDisabled(true);
			this.pageMembers[5].setDisabled(true);
		} else {
			this.pageMembers[5].setDisabled(false);
			this.pageMembers[7].setDisabled(false);
		}
		this.fetchPageData();
	},
	prePage : function() {
		this.curPage = this.curPage*1 - 1;
		this.pageToolForm.setValue("iNowPage", this.curPage);
		if (this.curPage == 1) {
			this.pageMembers[1].setDisabled(true);
			this.pageMembers[3].setDisabled(true);
		}
		if (this.curPage != this.totalPage) {
			this.pageMembers[5].setDisabled(false);
			this.pageMembers[7].setDisabled(false);
		}
		this.fetchPageData();
	},
	firstPage : function() {
		this.curPage = 1;
		this.pageToolForm.setValue("iNowPage", this.curPage);
		if (this.curPage != this.totalPage) {
			this.pageMembers[5].setDisabled(false);
			this.pageMembers[7].setDisabled(false);
		}
		if (this.curPage == 1) {
			this.pageMembers[1].setDisabled(true);
			this.pageMembers[3].setDisabled(true);
		}
		this.fetchPageData();
	},
	lastPage : function() {
		this.curPage = this.totalPage;
		this.pageToolForm.setValue("iNowPage", this.curPage);
		if (this.curPage == this.totalPage) {
			this.pageMembers[5].setDisabled(true);
			this.pageMembers[7].setDisabled(true);
		}
		if (this.curPage != 1) {
			this.pageMembers[1].setDisabled(false);
			this.pageMembers[3].setDisabled(false);
		}
		this.fetchPageData();
	},
	isInt : function(strVar) {
		return /^\+?[1-9][0-9]*$/.test(strVar);
	},
	gotoPage : function(str) {
		if (!this.isInt(str)) {
			isc.say("请输入一个大于零的数字！");
			return;
		}
		if (str > this.totalPage) {
			isc.say("输入数字不能大于总页数！");
			this.pageToolForm.setValue("iNowPage", this.curPage);
			return;
		} else {
			this.curPage = str;
			if (parseInt(this.curPage) == parseInt(this.totalPage)) {
				this.pageMembers[1].setDisabled(false);
				this.pageMembers[3].setDisabled(false);
				this.pageMembers[5].setDisabled(true);
				this.pageMembers[7].setDisabled(true);
			} else if (this.curPage == 1) {
				this.pageMembers[1].setDisabled(true);
				this.pageMembers[3].setDisabled(true);
				this.pageMembers[5].setDisabled(false);
				this.pageMembers[7].setDisabled(false);
			} else {
				this.pageMembers[1].setDisabled(false);
				this.pageMembers[3].setDisabled(false);
				this.pageMembers[5].setDisabled(false);
				this.pageMembers[7].setDisabled(false);
			}
			this.fetchPageData();
		}
	},
	fetchPageData : function(criteria, callbackFun) {
		if (!criteria) {
			criteria = this.grid.getCriteria();
		} else {
			this.curPage = 1;
			this.pageToolForm.setValue("iNowPage", this.curPage);
		}
		if (callbackFun) {
			this.callBackFun = callbackFun;
		}
		this.grid.invalidateCache();
		this.grid.filterData(criteria, function(rpcResponse, data,
				rpcRequest) {
			var _this = rpcRequest.params.pageTool;
			_this.totalCount = rpcResponse.totalCount;
			_this.getTotalPage();
			if (parseInt(_this.curPage) == parseInt(_this.totalPage)) {
				if (_this.totalPage == 1) {
					_this.pageMembers[1].setDisabled(true);
					_this.pageMembers[3].setDisabled(true);
				} else {
					_this.pageMembers[1].setDisabled(false);
					_this.pageMembers[3].setDisabled(false);
				}
				_this.pageMembers[5].setDisabled(true);
				_this.pageMembers[7].setDisabled(true);
			} else if (_this.curPage == 1) {
				_this.pageMembers[1].setDisabled(true);
				_this.pageMembers[3].setDisabled(true);
				_this.pageMembers[5].setDisabled(false);
				_this.pageMembers[7].setDisabled(false);
			} else {
				_this.pageMembers[1].setDisabled(false);
				_this.pageMembers[3].setDisabled(false);
				_this.pageMembers[5].setDisabled(false);
				_this.pageMembers[7].setDisabled(false);
			}
			if (_this.callBackFun) {
				_this.callBackFun(rpcResponse, data, rpcRequest);
			}
		}, {
			params : {
				'currentPage' : this.curPage,
				'pageSize' : this.pageSize,
				'pageTool' : this,
				'selectLoginUser' : this.grid.selectLoginUser,
				'selectDep' : this.grid.selectDep
			}
		});
	}
});