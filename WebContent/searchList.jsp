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

Window1.show();
]]></click>


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
]]></click>


if(obj == undefined) {
	isc.say('��ѡ��һ����¼');
	return false;
} else {
DetailViewer0.setData(obj)
}
Window6.show();
]]></click>


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
]]></click>






if(obj == undefined) {
	isc.say('��ѡ��һ����¼');
	return false;
} else {
DetailViewer0.setData(obj)
}
Window6.show();
</recordDoubleClick>




if(flag == true) {
Window1.hide();
}
]]></click>




if(flag == true) {
Window2.hide();
}
]]></click>






]]></click>




</isomorphic:XML></SCRIPT>
</BODY></HTML>