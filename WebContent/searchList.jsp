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
<ToolStripButton ID="ToolStripButton0" autoDraw="false">    <title>����</title>    <click> <![CDATA[    DynamicForm0.editNewRecord();
Window1.show();
]]></click></ToolStripButton>

<ToolStripButton ID="ToolStripButton1" autoDraw="false">    <title>�޸�</title>    <click> <![CDATA[    var obj = ListGrid0.getSelectedRecord();
if(obj == undefined) {
	isc.say('��ѡ��һ����¼');
	return false;
} else if (obj.processInsId != null && obj.processInsId != '') {
	isc.say('���������ύ��ˣ������޸ģ�');
	return false;
} else {
DynamicForm1.setValues(obj)
}
Window2.show();
]]></click></ToolStripButton>

<ToolStripButton ID="ToolStripButton2" autoDraw="false">    <title>����</title>    <click> <![CDATA[    var obj = ListGrid0.getSelectedRecord();
if(obj == undefined) {
	isc.say('��ѡ��һ����¼');
	return false;
} else {
DetailViewer0.setData(obj)
}
Window6.show();
]]></click></ToolStripButton>

<ToolStripButton ID="ToolStripButton3" autoDraw="false">    <title>ɾ��</title>    <click> <![CDATA[    var record = ListGrid0.getSelectedRecord();
if (record == undefined) {
	isc.say('��ѡ��һ����¼');
} else if (record.processInsId != null && record.processInsId != '') {
	isc.say('���������ύ��ˣ�����ɾ����');
	return false;
} else {
	isc.say('ȷ��ɾ����',
	function(data) {
		if (true == data) {
ListGrid0.removeSelectedData();
		}
	})
}
]]></click></ToolStripButton>

<ToolStrip ID="ToolStrip0" autoDraw="false">    <members><Canvas ref="ToolStripButton0"/><Canvas ref="ToolStripButton1"/><Canvas ref="ToolStripButton2"/><Canvas ref="ToolStripButton3"/>    </members>    <visibilityMode>multiple</visibilityMode></ToolStrip>

<DataSource>    <loadID>A1</loadID></DataSource>

<ListGrid dataSource="A1" ID="ListGrid0" autoDraw="false">    <fields>        <ListGridField name="name" title="����"/>        <ListGridField name="age" title="����"/>        <ListGridField name="address" title="��ַ"/>        <ListGridField name="memo" title="��ע"/>        <ListGridField name="printWord" title="����"/>        <ListGridField name="createTime" title="����ʱ��"/>    </fields>    <autoFetchData>true</autoFetchData>    <recordDoubleClick>var obj = ListGrid0.getSelectedRecord();
if(obj == undefined) {
	isc.say('��ѡ��һ����¼');
	return false;
} else {
DetailViewer0.setData(obj)
}
Window6.show();
</recordDoubleClick></ListGrid>

<DataView ID="DataView0" overflow="hidden" autoDraw="true">    <members><Canvas ref="ToolStrip0"/><Canvas ref="ListGrid0"/>    </members>    <width>100%</width>    <height>100%</height></DataView>

<DynamicForm numCols="4" dataSource="A1" ID="DynamicForm0" autoDraw="false">    <fields>        <FormItem name="name" title="����" constructor="TextItem">            <required>true</required>        </FormItem>        <FormItem name="age" title="����" constructor="TextItem"/>        <FormItem name="address" title="��ַ" constructor="TextItem"/>        <FormItem name="memo" title="��ע" constructor="TextItem"/>        <FormItem name="SubmitItem0" title="�ύ" constructor="SubmitItem">            <align>right</align>            <colSpan>2</colSpan>            <rowSpan>2</rowSpan>            <click> <![CDATA[var flag = DynamicForm0.validate();
if(flag == true) {
Window1.hide();
}
]]></click>        </FormItem>        <FormItem name="ResetItem0" title="����" constructor="ResetItem"/>    </fields></DynamicForm>

<Window ID="Window1" autoDraw="false">    <autoCenter>true</autoCenter>    <isModal>true</isModal>    <title>����</title>    <items><Canvas ref="DynamicForm0"/>    </items>    <width>400</width>    <height>120</height>    <showShadow>false</showShadow></Window>

<DynamicForm numCols="4" dataSource="A1" ID="DynamicForm1" autoDraw="false">    <fields>        <FormItem name="name" title="����" constructor="TextItem"/>        <FormItem name="age" title="����" constructor="TextItem"/>        <FormItem name="address" title="��ַ" constructor="TextItem"/>        <FormItem name="memo" title="��ע" constructor="TextItem"/>        <FormItem name="SubmitItem0" title="�ύ" constructor="SubmitItem">            <align>right</align>            <colSpan>2</colSpan>            <rowSpan>2</rowSpan>            <click> <![CDATA[    var flag = DynamicForm1.validate();
if(flag == true) {
Window2.hide();
}
]]></click>        </FormItem>        <FormItem name="ResetItem1" title="����" constructor="ResetItem"/>    </fields></DynamicForm>

<Window ID="Window2" autoDraw="false">    <autoCenter>true</autoCenter>    <title>�޸�</title>    <items><Canvas ref="DynamicForm1"/>    </items>    <width>400</width>    <height>120</height>    <showShadow>false</showShadow></Window>

<DetailViewer dataSource="A1" ID="DetailViewer0" autoDraw="false">    <fields>        <DetailViewerField name="name" title="����"/>        <DetailViewerField name="age" title="����"/>        <DetailViewerField name="address" title="��ַ"/>        <DetailViewerField name="memo" title="��ע"/>    </fields></DetailViewer>

<IButton ID="IButton0" autoDraw="false">    <title>�ر�</title>    <layoutAlign>center</layoutAlign>    <click> <![CDATA[    Window6.hide();
]]></click></IButton>

<Window ID="Window6" autoDraw="false">    <autoCenter>true</autoCenter>    <isModal>true</isModal>    <title>����</title>    <items><Canvas ref="DetailViewer0"/><Canvas ref="IButton0"/>    </items>    <width>400</width>    <height>150</height>    <showShadow>false</showShadow></Window>


</isomorphic:XML></SCRIPT>
</BODY></HTML>