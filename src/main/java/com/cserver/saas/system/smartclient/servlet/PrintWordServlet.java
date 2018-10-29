package com.cserver.saas.system.smartclient.servlet;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.cserver.saas.system.smartclient.dao.PrintWordDao;
import com.cserver.saas.system.smartclient.utils.ColumnTitle;
import com.cserver.saas.system.smartclient.utils.Constants;
import com.cserver.saas.system.smartclient.utils.StaticFreemarker;
import com.isomorphic.base.Base;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class PrintWordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public PrintWordServlet() {
		super();
	}

	public void init(ServletConfig servletConfig) throws ServletException {

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String dsId = req.getParameter("dsId");// ds文件Id
		if (null != dsId && !"".equals(dsId)) {
			PrintWordDao printWordDao = (PrintWordDao) getService(req, "printWordDao");
			String id = req.getParameter("id");// 业务表ID
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", id);
			map.put("tableName", dsId);
			String dsLocation = Constants.dsPath + dsId + ".ds.xml";
			//获取查询的列字段
			String columns = getColumn(dsLocation);
			String[] colunmArray = columns.split(",");
			map.put("columns", columns);
			try {
				List list = printWordDao.selectList(map);
				Map mapObj = new HashMap();
				if(list.size() > 0) {
					Object[] obj = (Object[]) list.get(0);
					for (int i = 0; i < colunmArray.length; i++) {
						mapObj.put(colunmArray[i], obj[i]);
					}
					try {
						Map<String, Object> responseMap = new HashMap<String, Object>();
						responseMap.put("obj", mapObj);
						
						Map<String, Object> columnMap = getColumnMap(dsLocation);
						StaticFreemarker sf = new StaticFreemarker();
						sf.init("moduleNoSuggest.ftl", dsId + ".ftl", columnMap, "doc", req);
						printWordNoSuggest(dsId + ".ftl", dsId + ".doc", responseMap, req);
						downloadFile(dsId + ".doc", req, resp, req.getServletContext().getRealPath("/") + dsId + ".doc");
					} catch (TemplateException e) {
						e.printStackTrace();
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	/***
	 * 生成word文档
	 * @param ftl
	 * @param htmlName
	 * @param map
	 * @param ins
	 * @param req
	 * @throws IOException
	 * @throws TemplateException
	 */
	public void printWord(String ftl, String htmlName, Map map, InputStream ins, HttpServletRequest req)
			throws IOException, TemplateException
	{
		Configuration freemarkerCfg = new Configuration();
		File file = new File(req.getServletContext().getRealPath("/") + ftl);
		if(file.exists()) { 
			file.delete();
		}
		file.createNewFile();
		inputstreamtofile(ins, file);
		freemarkerCfg.setDirectoryForTemplateLoading(new File(req.getServletContext().getRealPath("/")));
		Template template;
		template = freemarkerCfg.getTemplate(ftl,"utf-8");
		String path = req.getServletContext().getRealPath("/");
		BufferedWriter buff = new BufferedWriter(new FileWriter(path + htmlName));
		File htmlFile = new File(path + htmlName);
		Writer out = new BufferedWriter(new OutputStreamWriter(	new FileOutputStream(htmlFile), "utf-8"));
		template.setEncoding("utf-8");
		template.process(map, out);
		buff.close();
		out.flush();
		out.close();
	}
	
	/***
	 * 生成word文档
	 * @param ftl
	 * @param htmlName
	 * @param map
	 * @param ins
	 * @param req
	 * @throws IOException
	 * @throws TemplateException
	 */
	public void printWordNoSuggest(String ftl, String htmlName, Map map, HttpServletRequest req)
			throws IOException, TemplateException
	{
		Configuration freemarkerCfg = new Configuration();
		freemarkerCfg.setDirectoryForTemplateLoading(new File(req.getServletContext().getRealPath("/")));
		Template template;
		template = freemarkerCfg.getTemplate(ftl,"utf-8");
		String path = req.getServletContext().getRealPath("/");
		BufferedWriter buff = new BufferedWriter(new FileWriter(path + htmlName));
		File htmlFile = new File(path + htmlName);
		Writer out = new BufferedWriter(new OutputStreamWriter(	new FileOutputStream(htmlFile), "utf-8"));
		template.setEncoding("utf-8");
		template.process(map, out);
		buff.close();
		out.flush();
		out.close();
	}
	/***
	 * //先将文件服务器中上传的模板通过流 读取到本地virgo work目录
	 * @param ins
	 * @param file
	 * @throws IOException
	 */
	public void inputstreamtofile(InputStream ins, File file) throws IOException {
		OutputStream os = new FileOutputStream(file);
		int bytesRead = 0;
		byte[] buffer = new byte[8192];
		while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
			os.write(buffer, 0, bytesRead);
		}
		os.close();
		ins.close();
	}
	// 下载文件
	public void downloadFile(String fileid, HttpServletRequest req, HttpServletResponse res, String path)
			throws IOException {
		res.setContentType("text/html;charset=utf-8");
		res.setCharacterEncoding("UTF-8");
		java.io.OutputStream osOut = res.getOutputStream();
		try {
			String fileName = URLEncoder.encode(fileid, "UTF-8");
			res.setContentType("application/x-msdownload;charset=UTF-8");
			res.setHeader("Content-disposition", "attachment; filename=" + fileName);
			FileInputStream is = new FileInputStream(new File(path));
			int readLength = 0;
			byte[] readUnit = new byte[1024 * 1024];
			if (is != null) {
				while ((readLength = is.read(readUnit)) != -1) {
					osOut.write(readUnit, 0, readLength);
					osOut.flush();
				}
				is.close();
				osOut.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/***
	 * 获取表的字段
	 * 
	 * @param path
	 * @return
	 */
	private String getColumn(String path) {
		File xmlFile = new File(path);
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder;
		String columns = "";
		try {
			dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(xmlFile);
			doc.getDocumentElement().normalize();

			NodeList fields = doc.getElementsByTagName("field");
			Element emp = null;
			for (int i = 0; i < fields.getLength(); i ++) {
				emp = (Element) fields.item(i);
				String name = emp.getAttribute("name");
				String hidden = emp.getAttribute("hidden");
				if (!"true".equals(hidden) && !"flowState".equals(name) && !"flowSearch".equals(name) && !"printWord".equals(name) && !"flowManage".equals(name)) {
					columns += name + ",";
				}
				if("processInsId".equals(name)) {
					columns += name + ",";
				}
 			}
			if(columns.length() > 0) {
				columns = columns.substring(0, columns.length() -1);
			}
			return columns;
			// write the updated document to file or console
		} catch (ParserConfigurationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return columns;
	}
	
	
	/***
	 * 获取表的字段
	 * 
	 * @param path
	 * @return
	 */
	private Map<String, Object> getColumnMap(String path) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<List<ColumnTitle>> list = new ArrayList<List<ColumnTitle>>();
		File xmlFile = new File(path);
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder;
		try {
			dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(xmlFile);
			doc.getDocumentElement().normalize();

			NodeList fields = doc.getElementsByTagName("field");
			Element emp = null;
			ColumnTitle columnTitle = null;
			List<ColumnTitle> columnTitleList = new ArrayList<ColumnTitle>();
			for (int i = 0; i < fields.getLength(); i ++) {
				emp = (Element) fields.item(i);
				String name = emp.getAttribute("name");
				String title = emp.getAttribute("title");
				String hidden = emp.getAttribute("hidden");
				if (!"true".equals(hidden) && !"flowState".equals(name) && !"flowSearch".equals(name) && !"printWord".equals(name) && !"flowManage".equals(name)) {
					columnTitle = new ColumnTitle();
					columnTitle.setName(name);
					columnTitle.setTitle(title);
					columnTitleList.add(columnTitle);
				}
			}
			for (int i = 0; i < columnTitleList.size(); i += 2) {
				List<ColumnTitle> columnList = new ArrayList<ColumnTitle>();
				columnTitle = columnTitleList.get(i);
				String name = columnTitle.getName();
				
				columnTitle.setName("${obj." + name + "?if_exists}");
				columnList.add(columnTitle);
				
				if ((i + 1) < columnTitleList.size()) {
					columnTitle = columnTitleList.get(i +1);
					String name1 = columnTitle.getName();
					columnTitle.setName("${obj." + name1 + "?if_exists}");
					columnList.add(columnTitle);
				}
				list.add(columnList);

			}
			List<ColumnTitle> columnListLast = list.get(list.size() - 1);
			if (columnListLast.size() == 1) {
				columnTitle = new ColumnTitle();
				columnTitle.setName("");
				columnTitle.setTitle("");
				columnListLast.add(columnTitle);
				list.remove(list.size() - 1);
				list.add(columnListLast);
			}
			map.put("columnList", list);
			return map;
			// write the updated document to file or console
		} catch (ParserConfigurationException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	private Object getService(HttpServletRequest request, String serviceName) {
		ApplicationContext ctx = (ApplicationContext) request.getSession().getServletContext()		
        							.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);		
		return ctx.getBean(serviceName);
	}
}
