<%@ page contentType="text/html; charset=GB2312"%>
<%@ taglib uri="/WEB-INF/iscTaglib.xml" prefix="isomorphic" %>
<HTML><HEAD><TITLE>
searchList</TITLE>
<jsp:include page="/isomorphic/system/customerjs/common.jsp" flush="true"/>
</HEAD>
<BODY>
<SCRIPT>
 <isomorphic:loadDS name="PageTools"/></SCRIPT>
<SCRIPT SRC=<%=request.getContextPath()%>/isomorphic/system/customerjs/ISC_PageTools.js  charset="UTF-8"></SCRIPT>
<SCRIPT>
isc.Page.setAppImgDir("../graphics/");
<isomorphic:XML>
<ToolStripButton ID="ToolStripButton0" autoDraw="false">    <title>新增</title>    <click> <![CDATA[    DynamicForm0.editNewRecord();
Window1.show();
]]></click></ToolStripButton>

<ToolStripButton ID="ToolStripButton1" autoDraw="false">    <title>修改</title>    <click> <![CDATA[    var obj = ListGrid0.getSelectedRecord();
if(obj == undefined) {
	isc.say('请选择一条记录');
	return false;
} else if (obj.processInsId != null && obj.processInsId != '') {
	isc.say('该数据已提交审核，不能修改！');
	return false;
} else {
DynamicForm1.setValues(obj)
}
Window2.show();
]]></click></ToolStripButton>

<ToolStripButton ID="ToolStripButton2" autoDraw="false">    <title>详情</title>    <click> <![CDATA[    var obj = ListGrid0.getSelectedRecord();
if(obj == undefined) {
	isc.say('请选择一条记录');
	return false;
} else {
DetailViewer0.setData(obj)
}
Window6.show();
]]></click></ToolStripButton>

<ToolStripButton ID="ToolStripButton3" autoDraw="false">    <title>删除</title>    <click> <![CDATA[    var record = ListGrid0.getSelectedRecord();
if (record == undefined) {
	isc.say('请选择一条记录');
} else if (record.processInsId != null && record.processInsId != '') {
	isc.say('该数据已提交审核，不能删除！');
	return false;
} else {
	isc.say('确认删除吗？',
	function(data) {
		if (true == data) {
ListGrid0.removeSelectedData();
		}
	})
}
]]></click></ToolStripButton>

<ToolStrip ID="ToolStrip0" autoDraw="false">    <members><Canvas ref="ToolStripButton0"/><Canvas ref="ToolStripButton1"/><Canvas ref="ToolStripButton2"/><Canvas ref="ToolStripButton3"/>    </members>    <visibilityMode>multiple</visibilityMode></ToolStrip>

<DataSource>    <loadID>A1</loadID></DataSource>

<ListGrid dataSource="A1" ID="ListGrid0" autoDraw="false">    <fields>        <ListGridField name="name" title="姓名"/>        <ListGridField name="age" title="年龄"/>        <ListGridField name="address" title="地址"/>        <ListGridField name="memo" title="备注"/>        <ListGridField name="printWord" title="下载"/>        <ListGridField name="createTime" title="创建时间"/>    </fields>    <autoFetchData>true</autoFetchData>    <recordDoubleClick>var obj = ListGrid0.getSelectedRecord();
if(obj == undefined) {
	isc.say('请选择一条记录');
	return false;
} else {
DetailViewer0.setData(obj)
}
Window6.show();
</recordDoubleClick></ListGrid>

<DataView ID="DataView0" overflow="hidden" autoDraw="true">    <members><Canvas ref="ToolStrip0"/><Canvas ref="ListGrid0"/>    </members>    <width>100%</width>    <height>100%</height></DataView>

<DynamicForm numCols="4" dataSource="A1" ID="DynamicForm0" autoDraw="false">    <fields>        <FormItem name="name" title="姓名" constructor="TextItem">            <required>true</required>        </FormItem>        <FormItem name="age" title="年龄" constructor="TextItem"/>        <FormItem name="address" title="地址" constructor="TextItem"/>        <FormItem name="memo" title="备注" constructor="TextItem"/>        <FormItem name="SubmitItem0" title="提交" constructor="SubmitItem">            <align>right</align>            <colSpan>2</colSpan>            <rowSpan>2</rowSpan>            <click> <![CDATA[var flag = DynamicForm0.validate();
if(flag == true) {
Window1.hide();
}
]]></click>        </FormItem>        <FormItem name="ResetItem0" title="重置" constructor="ResetItem"/>    </fields></DynamicForm>

<Window ID="Window1" autoDraw="false">    <autoCenter>true</autoCenter>    <isModal>true</isModal>    <title>新增</title>    <items><Canvas ref="DynamicForm0"/>    </items>    <width>400</width>    <height>120</height>    <showShadow>false</showShadow></Window>

<DynamicForm numCols="4" dataSource="A1" ID="DynamicForm1" autoDraw="false">    <fields>        <FormItem name="name" title="姓名" constructor="TextItem"/>        <FormItem name="age" title="年龄" constructor="TextItem"/>        <FormItem name="address" title="地址" constructor="TextItem"/>        <FormItem name="memo" title="备注" constructor="TextItem"/>        <FormItem name="SubmitItem0" title="提交" constructor="SubmitItem">            <align>right</align>            <colSpan>2</colSpan>            <rowSpan>2</rowSpan>            <click> <![CDATA[    var flag = DynamicForm1.validate();
if(flag == true) {
Window2.hide();
}
]]></click>        </FormItem>        <FormItem name="ResetItem1" title="重置" constructor="ResetItem"/>    </fields></DynamicForm>

<Window ID="Window2" autoDraw="false">    <autoCenter>true</autoCenter>    <title>修改</title>    <items><Canvas ref="DynamicForm1"/>    </items>    <width>400</width>    <height>120</height>    <showShadow>false</showShadow></Window>

<DetailViewer dataSource="A1" ID="DetailViewer0" autoDraw="false">    <fields>        <DetailViewerField name="name" title="姓名"/>        <DetailViewerField name="age" title="年龄"/>        <DetailViewerField name="address" title="地址"/>        <DetailViewerField name="memo" title="备注"/>    </fields></DetailViewer>

<IButton ID="IButton0" autoDraw="false">    <title>关闭</title>    <layoutAlign>center</layoutAlign>    <click> <![CDATA[    Window6.hide();
]]></click></IButton>

<Window ID="Window6" autoDraw="false">    <autoCenter>true</autoCenter>    <isModal>true</isModal>    <title>详情</title>    <items><Canvas ref="DetailViewer0"/><Canvas ref="IButton0"/>    </items>    <width>400</width>    <height>150</height>    <showShadow>false</showShadow></Window>


</isomorphic:XML></SCRIPT>
</BODY></HTML>