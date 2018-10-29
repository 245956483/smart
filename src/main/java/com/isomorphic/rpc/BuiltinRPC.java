/*     */ package com.isomorphic.rpc;
/*     */ 
/*     */ import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.log4j.Level;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.isomorphic.base.Base;
import com.isomorphic.base.Config;
import com.isomorphic.collections.DataTypeMap;
import com.isomorphic.interfaces.InterfaceProvider;
import com.isomorphic.io.ISCFile;
import com.isomorphic.io.SequenceReader;
import com.isomorphic.js.JSTranslater;
import com.isomorphic.log.RevolvingMemoryAppender;
import com.isomorphic.servlet.ProxyHttpServletResponse;
import com.isomorphic.servlet.ProxyServletOutputStream;
import com.isomorphic.servlet.RequestContext;
import com.isomorphic.servlet.ServletTools;
import com.isomorphic.store.DataStructCache;
import com.isomorphic.taglib.LoadWSDLTag;
import com.isomorphic.util.DataTools;
import com.isomorphic.util.IOUtil;
import com.isomorphic.xml.XML;
import com.isomorphic.xml.XMLParsingException;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSchException;

import net.sf.json.JSONArray;
/*     */ 
/*     */ public class BuiltinRPC extends Base
/*     */ {
/*  70 */   protected static com.isomorphic.log.Logger log = new com.isomorphic.log.Logger(BuiltinRPC.class.getName());
/*     */ 
/* 637 */   public static String cssStylenameSuffix = "$style";

/*     */   public static void downloadWSDL(String url, String format, String fileName, RPCManager rpc, HttpServletRequest request, HttpServletResponse response)
/*     */     throws Exception
/*     */   {
/*  93 */     rpc.doCustomResponse();
/*  94 */     RequestContext.setNoCacheHeaders(response);
/*  95 */     response.setContentType(DataTools.mimeTypeForFileName(fileName));
/*  96 */     response.addHeader("content-disposition", "attachment; " + rpc.encodeParameter("fileName", fileName));
/*     */ 
/*  98 */     XML.loadWSDL(LoadWSDLTag.getAbsoluteURL(url, null), format, response.getWriter());
/*     */   }
/*     */ 
/*     */   public static void downloadClientContent(String fileContents, String fileName, String mimeType, RPCManager rpc, HttpServletRequest request, HttpServletResponse response)
/*     */     throws Exception
/*     */   {
/* 119 */     rpc.doCustomResponse();
/* 120 */     RequestContext.setNoCacheHeaders(response);
/* 121 */     response.setContentType(mimeType);
/* 122 */     response.addHeader("content-disposition", "attachment; " + rpc.encodeParameter("fileName", fileName));
/*     */ 
/* 124 */     Writer writer = response.getWriter();
/* 125 */     if (log.isDebugEnabled()) {
/* 126 */       log.debug("downloadClientContent() writing fileContents: " + fileContents);
/*     */     }
/* 128 */     writer.write(fileContents);
/* 129 */     writer.flush();
/* 130 */     writer.close();
/*     */   }
/*     */ 
/*     */   public static RPCResponse xmlToJS(String xmlString)
/*     */     throws Exception
/*     */   {
/* 149 */     StringWriter out = new StringWriter();
/*     */     try
/*     */     {
/* 152 */       XML.toJS(new StringReader(xmlString), out);
/*     */     } catch (XMLParsingException e) {
/* 154 */       log.info("Error parsing inbound XML - assuming multiple top-level elements and retrying with wrapper tag.");
/*     */ 
/* 156 */       Reader reader = new SequenceReader("<isomorphicXML xmlns:xsi=\"nativeType\">", new StringReader(xmlString), "</isomorphicXML>");
/*     */ 
/* 159 */       out = new StringWriter();
/* 160 */       XML.toJS(reader, out);
/*     */     }
/*     */ 
/* 164 */     return new RPCResponse(out.toString());
/*     */   }
/*     */ 
/*     */   public static RPCResponse uploadProgressCheck(HttpSession session, String formID)
/*     */     throws Exception
/*     */   {
/* 184 */     Map responseData = new HashMap();
/* 185 */     responseData.put("formID", formID);
/*     */ 
/* 187 */     List errors = (List)session.getAttribute("errors");
/* 188 */     if (errors != null) responseData.put("errors", errors);
/*     */ 
/* 190 */     responseData.put("bytesSoFar", session.getAttribute("bytesSoFar"));
/* 191 */     responseData.put("totalBytes", session.getAttribute("totalBytes"));
/*     */ 
/* 193 */     return new RPCResponse(responseData);
/*     */   }
/*     */ 
/*     */   public static RPCResponse deleteFile(String path)
/*     */     throws Exception
/*     */   {
/* 210 */     path = ISCFile.canonicalizePath(Config.expandPathVariables(path));
/*     */ 
/* 212 */     log.debug("Deleting: " + path);
/*     */ 
/* 214 */     File file = new File(path);
/* 215 */     if (file.exists()) file.delete();
/*     */ 
/* 217 */     RPCResponse response = new RPCResponse();
/* 218 */     return response;
/*     */   }
/*     */ 
/*     */   public static RPCResponse saveFile(String path, String data)
/*     */     throws Exception
/*     */   {
/* 236 */     path = ISCFile.canonicalizePath(Config.expandPathVariables(path));
/*     */ 
/* 238 */     log.debug("Saving: " + path);
/*     */ 
/* 240 */     File file = new File(path);
/* 241 */     if (file.exists()) {
/* 242 */       file.delete();
/*     */     } else {
/* 244 */       File dir = file.getParentFile();
/* 245 */       if (!dir.exists()) {
/* 246 */         dir.mkdirs();
/*     */       }
/*     */     }

		FileInputStream inputStream = new FileInputStream(data); 

/*     */ InputStreamReader myreader = new InputStreamReader( 
		 inputStream, "utf-8");
/* 250 */    // IOUtil.copyCharacterStreams(new StringReader(data), new FileWriter(file));
/*     */  IOUtil.copyCharacterStreams(myreader, new FileWriter(file));
/* 252 */     RPCResponse response = new RPCResponse();
/* 253 */     return response;
/*     */   }
/*     */ 
/*     */   public static RPCResponse appendToFile(String path, String data)
/*     */     throws Exception
/*     */   {
/* 270 */     path = ISCFile.canonicalizePath(Config.expandPathVariables(path));
/*     */ 
/* 272 */     log.debug("Appending to: " + path);
/*     */ 
/* 274 */     File file = new File(path);
/*     */ 
/* 276 */     IOUtil.copyCharacterStreams(new StringReader(data), new FileWriter(file, true));
/*     */ 
/* 278 */     RPCResponse response = new RPCResponse();
/* 279 */     return response;
/*     */   }
/*     */ 
/*     */   public static RPCResponse loadFile(String path)
/*     */     throws Exception
/*     */   {
/* 296 */     path = ISCFile.canonicalizePath(Config.expandPathVariables(path));
/*     */ 
/* 298 */     log.debug("Loading: " + path);
/*     */ 
/* 301 */     File file = new File(path);
/* 302 */     StringWriter sw = new StringWriter();
/* 303 */     IOUtil.copyCharacterStreams(new FileReader(file), sw);
/*     */ 
/* 305 */     RPCResponse response = new RPCResponse();
/* 306 */     response.setData(sw.toString());
/*     */ 
/* 308 */     return response;
/*     */   }
/*     */ 
/*     */   public static Map getAvailableScriptEngines()
/*     */     throws Exception
/*     */   {
/* 314 */     return Scripting.getAvailableScriptEngines();
/*     */   }
/*     */ 
/*     */   public static RPCResponse evalGroovyScript(DataTypeMap data) throws Exception
/*     */   {
/* 319 */     return Scripting.evalGroovyScript(data);
/*     */   }
/*     */ 
/*     */   public static RPCResponse evalServerScript(DataTypeMap data) throws Exception {
/* 323 */     return Scripting.evalServerScript(data);
/*     */   }
/*     */ 
/*     */   public static RPCResponse devConsoleEvalServerScript(RequestContext context, DataTypeMap data)
/*     */     throws Exception
/*     */   {
/* 330 */     return Scripting.devConsoleEvalServerScript(context, data);
/*     */   }
/*     */ 
/*     */   public static RPCResponse evalJava(String javaCode, RequestContext context)
/*     */     throws Exception
/*     */   {
/* 351 */     if (ISCFile.inContainerIOMode()) {
/* 352 */       throw new Exception("Can't execute Java code in container-IO mode - to fix, explicitly set webRoot in server.properties");
/*     */     }
/*     */ 
/* 356 */     String webRoot = config.getPath("webRoot");
/*     */ 
/* 358 */     String tmpPath = "/tools/devConsoleEval.jsp";
/*     */ 
/* 360 */     File tmpJSP = new File(webRoot + tmpPath);
/* 361 */     if (tmpJSP.exists()) tmpJSP.delete();
/* 362 */     tmpJSP.createNewFile();
/*     */ 
/* 364 */     File header = new File(webRoot + "/shared/jsp/evalJavaHeader.jsp");
/* 365 */     File footer = new File(webRoot + "/shared/jsp/evalJavaFooter.jsp");
/*     */ 
/* 367 */     FileWriter fw = new FileWriter(tmpJSP);
/*     */ 
/* 369 */     if (header.exists()) IOUtil.copyCharacterStreams(new FileReader(header), fw);
/* 370 */     IOUtil.copyCharacterStreams(new StringReader(javaCode), fw);
/* 371 */     if (footer.exists()) IOUtil.copyCharacterStreams(new FileReader(footer), fw);
/*     */ 
/* 373 */     ByteArrayOutputStream wrapBuf = new ByteArrayOutputStream();
/* 374 */     ProxyHttpServletResponse wrapResponse = new ProxyHttpServletResponse(context.response, new ProxyServletOutputStream(wrapBuf), "evalJava");
/*     */ 
/* 377 */     RPCResponse response = new RPCResponse();
/*     */     try
/*     */     {
/* 380 */       ServletTools.include(context.servletContext, context.request, wrapResponse, tmpPath);
/*     */       try { wrapResponse.flushBuffer(); } catch (Exception ignored) {
/* 382 */       }wrapBuf.flush();
/* 383 */       response.setData(wrapBuf.toString());
/* 384 */       response.setStatus(RPCResponse.STATUS_SUCCESS);
/*     */     } catch (Throwable t) {
/* 386 */       response.setData(t.toString());
/* 387 */       response.setStatus(RPCResponse.STATUS_FAILURE);
/*     */     }
/* 389 */     return response;
/*     */   }
/*     */ 
/*     */   public static RPCResponse loadSharedXML(String type, String ID)
/*     */     throws Exception
/*     */   {
/* 434 */     boolean returnXML = true;
/* 435 */     boolean returnJS = true;
/*     */ 
/* 437 */     Map responseData = new HashMap();
/* 438 */     responseData.put("type", type);
/* 439 */     responseData.put("ID", ID);
/*     */     try
/*     */     {
/* 442 */       String typeName = getTypeNameForExtension(type);
/* 443 */       if (typeName == null) throw new Exception("Unknown type: " + type);
/*     */ 
/* 445 */       log.debug("loadSharedXML - ID: " + ID + " typeName: " + typeName + " type: " + type);
/* 446 */       String path = DataStructCache.getInstanceFile(ID, typeName, type);
/* 447 */       log.warn("looking for: " + path);
/* 448 */       if (path == null) throw new Exception("Can't find " + type + " " + ID);
/*     */ 
/* 450 */       ISCFile file = new ISCFile(path);
/*     */ 
/* 452 */       if (!file.exists()) throw new Exception("Can't find " + type + " " + ID);
/*     */ 
/* 454 */       String xml = DataTools.fileContentsAsString(file);
/* 455 */       if (returnXML) {
/* 456 */         responseData.put("xml", xml);
/*     */       }
/*     */ 
/* 459 */       if (returnJS) {
/* 460 */         Reader reader = new StringReader(xml);
/* 461 */         StringWriter sw = new StringWriter();
/* 462 */         XML.toJS(reader, sw);
/*     */ 
/* 464 */         responseData.put("js", sw.toString());
/*     */       }
/*     */     }
/*     */     catch (Exception e) {
/* 468 */       responseData.put("error", e.toString());
/*     */     }
/*     */ 
/* 471 */     return new RPCResponse(responseData);
/*     */   }
/*     */   public static RPCResponse saveSharedXML(String type, String ID, String contents)
/*     */     throws Exception
/*     */   {
/* 514 */     Map responseData = new HashMap();
/* 515 */     responseData.put("type", type);
/* 516 */     responseData.put("ID", ID);
/*     */ 
/* 518 */     String error = null;
/*     */     try {
/* 520 */       if (ISCFile.inContainerIOMode()) {
/* 521 */         throw new Exception("SmartClient server running in Container-IO mode - unable to save.");
/*     */       }
/* 523 */       String typeName = getTypeNameForExtension(type);
/* 524 */       if (typeName == null) throw new Exception("Unknown type: " + type);
/*     */ 
/* 526 */       log.debug("saveSharedXML - ID: " + ID + " typeName: " + typeName + " type: " + type);
/*     */ 
/* 528 */       String path = DataStructCache.getInstanceFile(ID, typeName, type);
/*     */ 
/* 530 */       if (path == null)
/*     */       {
/* 532 */         List paths = config.getCommaSeparatedList("project." + typeName);
/* 533 */         path = (String)paths.get(0);
/* 534 */         if (path == null) throw new Exception("Unable to determine default storage path for type: " + type + " was looking for config param: project." + typeName);
/*     */ 
/* 536 */         path = path + "/" + ID + "." + type.toLowerCase() + ".xml";
/*     */       }
/*     */ 
/* 540 */       log.warn("Saving " + type + " " + ID + " at location: " + path);
/* 541 */       File file = new File(path);
/*     */ 
/* 547 */       if (file.exists()) file.delete();
/* 548 */       file.createNewFile();
/*     */ 
/* 555 */       IOUtil.copyCharacterStreams(new StringReader(contents), new FileWriter(file));
				//判断是否有生成Id标识 修改ds.xml
				modifyDsXml(path);
/*     */     } catch (Exception e) {
/* 557 */       responseData.put("error", e.toString());
/*     */     }
/*     */ 
/* 560 */     return new RPCResponse(responseData);
/*     */   }
			//判断是否有生成Id标识 修改ds.xml
		    private static void modifyDsXml(String path) {
		         File xmlFile = new File(path);
		         DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		         DocumentBuilder dBuilder;
		             try {
		            	 	 dBuilder = dbFactory.newDocumentBuilder();
						  	 Document doc = dBuilder.parse(xmlFile);
				             doc.getDocumentElement().normalize();
				             
				             NodeList fields = doc.getElementsByTagName("field");
				             Node node = doc.getElementsByTagName("fields").item(0);
				             Element emp = null;
				             //loop for each employee
				             //防止在修改ds文件时，重复添加
				             List<String> listName = new ArrayList<String>();
				             for(int i=0; i<fields.getLength();i++){
				                 emp = (Element) fields.item(i);
			                	 String name = emp.getAttribute("name");
			                	 listName.add(name);
				             }
				             for(int i=0; i<fields.getLength();i++){
				                 emp = (Element) fields.item(i);
				                 String isAddId = emp.getAttribute("isAddId");
				                 String type = emp.getAttribute("type");
				                 String length = emp.getAttribute("length");
				                 //不能添加子标签 要加属性
				                 if(null == type || "".equals(type)) {
				                	 Attr attr = doc.createAttribute("type");
				                	 attr.setValue("text");
				                	 emp.setAttributeNode(attr);
				                	 if(null == length || "".equals(length)) {
					                	 Attr attr1 = doc.createAttribute("length");
					                	 attr1.setValue("255");
					                	 emp.setAttributeNode(attr1);
					                 }
				                 }
				                /* if(flag && "text".equals(type)) {
				                	 if(null == length || "".equals(length)) {
				                		 flag = true;
				                		 emp.setAttribute("length", "255");
					                 }
				                 }*/
				                 if("true".equals(isAddId)) {
				                	 String name = emp.getAttribute("name");
				                	 if(!listName.contains(name+"_id")) {
				                		 Element addElementId = doc.createElement("field");
					                	 addElementId.setAttribute("name", name+"_id");
					                	 addElementId.setAttribute("type", "text");
					                	 addElementId.setAttribute("length", "40");
					                	 addElementId.setAttribute("title", "系统创建,请勿修改、删除");
					                	 addElementId.setAttribute("hidden", "true");
					                	 node.appendChild(addElementId);
				                	 } 
				                 }
				                 
				                 //添加正则表达式校验
				                 String definedValidator = emp.getAttribute("definedValidator");
				                 if(!"".equals(definedValidator)) {
				                	 NodeList childList = emp.getChildNodes();
				                	 for (int j = 0; j < childList.getLength(); j++) {
				                		 String nodeName = childList.item(j).getNodeName();
				                		 if("validators".equals(nodeName)) {
				                			 emp.removeChild(childList.item(j));
				                			 break;
				                		 }
				                	 }
			                		 String expression = definedValidator.split("SmartClient")[0];
					                 String errorMessage = definedValidator.split("SmartClient")[1];
					                 Node validatorsNode = doc.createElement("validators");
					                 Node validatorNode = doc.createElement("validator");
					                 Node typeNode = doc.createElement("type");
					                 typeNode.setTextContent("regexp");
					                 Node expressionNode = doc.createElement("expression");
					                 expressionNode.setTextContent(expression);
					                 Node errorMessageNode = doc.createElement("errorMessage");
					                 errorMessageNode.setTextContent(errorMessage);
					                 
					                 validatorNode.appendChild(typeNode);
					                 validatorNode.appendChild(expressionNode);
					                 validatorNode.appendChild(errorMessageNode);
					                 validatorsNode.appendChild(validatorNode);
					                 emp.appendChild(validatorsNode);
				                 } else {//如果为空时，判断如果有validators子节点 ，则移除
				                	 NodeList childList = emp.getChildNodes();
				                	 boolean flag = true;
				                	 for (int j = 0; j < childList.getLength(); j++) {
				                		 String nodeName = childList.item(j).getNodeName();
				                		 if("validators".equals(nodeName)) {
				                			 emp.removeChild(childList.item(j));
				                			 break;
				                		 }
				                	 }
				                 }
				             }

				             //write the updated document to file or console
				             doc.getDocumentElement().normalize();
				             TransformerFactory transformerFactory = TransformerFactory.newInstance();
				             Transformer transformer;
				             transformer = transformerFactory.newTransformer();
							 DOMSource source = new DOMSource(doc);
				             StreamResult result = new StreamResult(new File(path));
				             //设置编码类型
				             transformer.setOutputProperty(OutputKeys.ENCODING, "GB2312");
				             transformer.transform(source, result);
				             System.out.println("XML file updated successfully");
					} catch (ParserConfigurationException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					} catch (TransformerConfigurationException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (TransformerException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (SAXException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		    }
		    private static void modifyDsXmlCopy(File src, File target) {
		    	InputStream in = null;
		  		OutputStream out = null;
		  		try {
		  			in = new BufferedInputStream(new FileInputStream(src),
		  					4 * 1024);
		  			out = new BufferedOutputStream(new FileOutputStream(target),
		  					4 * 1024);
		  			byte[] bs = new byte[4 * 1024];
		  			int i;
		  			while ((i = in.read(bs)) > 0) {
		  				out.write(bs, 0, i);
		  			}
		  		} catch (FileNotFoundException e) {
		  			e.printStackTrace();
		  		} catch (IOException e) {
		  			e.printStackTrace();
		  		} finally {
		  			try {
		  				if (in != null)
		  					in.close();
		  				if (out != null)
		  					out.close();
		  			} catch (IOException e) {
		  				e.printStackTrace();
		  			}
		  		}
		    }
/*     */   private static String getTypeNameForExtension(String type) {
/* 563 */     String typeName = null;
/* 564 */     if ("DS".equals(type)) typeName = "datasources";
/* 565 */     else if ("APP".equals(type)) typeName = "apps";
/* 566 */     else if ("UI".equals(type)) typeName = "ui";
/* 567 */     return typeName;
/*     */   }
/*     */ 
/*     */   public static List getLogNames()
/*     */     throws Exception
/*     */   {
/* 582 */     return RevolvingMemoryAppender.getLogNames();
/*     */   }
/*     */ 
/*     */   public static List getLogEntries(String logName)
/*     */     throws Exception
/*     */   {
/* 597 */     List logEntries = RevolvingMemoryAppender.getLogEntries(logName);
/*     */ 
/* 599 */     synchronized (logEntries) {
/* 600 */       logEntries = new ArrayList(logEntries);
/*     */     }
/* 602 */     return logEntries;
/*     */   }
/*     */ 
/*     */   public static void setLogThreshold(String category, String threshold) {
/* 606 */     com.isomorphic.log.Logger.getHierarchy().getLogger(category).setLevel(Level.toLevel(threshold));
/* 607 */     log.info("Category " + category + " now at: " + threshold);
/*     */   }
/*     */ 
/*     */   public static List getLogThresholds() {
/* 611 */     List loggers = new ArrayList();
/* 612 */     for (Enumeration e = com.isomorphic.log.Logger.getHierarchy().getCurrentLoggers(); e.hasMoreElements(); ) {
/* 613 */       org.apache.log4j.Logger logger = (org.apache.log4j.Logger)e.nextElement();
/* 614 */       if (logger.getLevel() != null)
/*     */       {
/* 616 */         loggers.add(DataTools.buildMap("category", logger.getName(), "threshold", logger.getLevel().toString()));
/*     */       }
/*     */     }
/* 618 */     return loggers;
/*     */   }
/*     */ 
/*     */   public static void downloadClientExport(String recordsJson, String format, String fileName, String exportDisplay, Map settings, HttpServletResponse response, RPCManager rpc, RPCRequest request)
/*     */     throws Exception
/*     */   { 
			recordsJson = new String(recordsJson.getBytes("iso-8859-1"),"gbk");
			List records = new ArrayList(); 
			JSONArray jsonArray = JSONArray.fromObject(recordsJson);
			records = JSONArray.toList(jsonArray, Map.class);
/* 646 */     if (settings == null) settings = new HashMap();
/*     */ 
/* 656 */     if (format == null) format = (String)settings.get("exportAs");
/*     */     else {
/* 658 */       settings.put("exportAs", format);
/*     */     }
/*     */ 
/* 662 */     if ("json".equals(format)) {
/* 663 */       log.warn("Client request for 'json' format data export is not allowed for security reasons - using CSV instead");
/*     */ 
/* 665 */       format = "csv";
/*     */     }
/*     */ 
/* 668 */     if (log.isInfoEnabled()) {
/* 669 */       log.info("Export data passed to server:\n" + DataTools.prettyPrint(records));
/*     */     }
/*     */ 
/* 675 */     rpc.doCustomResponse();
/*     */ 
/* 677 */     boolean toClient = DataTools.getBoolean(settings, "exportToClient", true);
/* 678 */     boolean toFilesystem = DataTools.getBoolean(settings, "exportToFilesystem", false);
/*     */ 
/* 680 */     if ((toClient) || (toFilesystem))
/*     */     {
/* 682 */       OutputStream os1 = null; OutputStream os2 = null;
/*     */ 
/* 684 */       if (fileName == null) fileName = (String)settings.get("exportFilename");
/*     */ 
/* 686 */       if ((fileName != null) && (fileName.startsWith("/"))) fileName = fileName.substring(1);
/* 687 */       if (fileName == null) fileName = "export";
/* 688 */       if (fileName.indexOf(".") == -1) {
/* 689 */         fileName = fileName + "." + (format.equals("ooxml") ? "xlsx" : format);
/*     */       }
/*     */ 
/* 692 */       if (((records instanceof List)) && (records.size() > 0))
/*     */       {
/* 694 */         if (toClient) {
/* 695 */           String mimeType = DataExport.getMimeTypeForFormat(format);
/* 696 */           String fileNameEncoding = rpc.encodeParameter("fileName", fileName);
/* 697 */           if (exportDisplay.equals("download")) {
/* 698 */             response.addHeader("content-disposition", "attachment; " + fileNameEncoding);
/* 699 */             response.setContentType(mimeType);
/*     */           } else {
/* 701 */             response.addHeader("content-disposition", "inline; " + fileNameEncoding);
/*     */           }
/* 703 */           os1 = response.getOutputStream();
/*     */         }
/*     */ 
/* 706 */         String qname = config.getPath("export.location");
/* 707 */         if (toFilesystem) {
/* 708 */           if (qname == null) qname = "";
/* 709 */           if ((!qname.endsWith("/")) && (qname.length() > 0)) qname = qname + "/";
/* 710 */           String path = (String)settings.get("exportPath");
/* 711 */           if (path != null) qname = qname + path;
/* 712 */           if ((!qname.endsWith("/")) && (qname.length() > 0)) qname = qname + "/";
/* 713 */           if (fileName != null) qname = qname + fileName;
/* 714 */           if (os1 == null)
/* 715 */             os1 = new BufferedOutputStream(new FileOutputStream(qname));
/*     */           else {
/* 717 */             os2 = new BufferedOutputStream(new FileOutputStream(qname));
/*     */           }
/*     */         }
/*     */ 
/* 721 */         List rows = records;
/* 722 */         log.info("Generating and streaming " + format + " file...");
/*     */ 		
/* 724 */         Map firstRow = (Map)rows.get(0);
/*     */ 
/* 726 */         List columns = new ArrayList();
/*     */ 
/* 728 */         Map fieldMap = new HashMap();
/*     */ 
/* 730 */         String separator = (String)settings.get("exportTitleSeparatorChar");
/* 731 */         if (separator == null) separator = "";
/*     */ 
/* 736 */         for (Iterator rowEnum = firstRow.keySet().iterator(); rowEnum.hasNext(); ) {
/* 737 */           String column = (String)rowEnum.next();
/*     */ 
/* 739 */           if (("xls".equals(format)) || ("ooxml".equals(format)) || 
/* 740 */             (!column.endsWith(cssStylenameSuffix)))
/*     */           {
/* 742 */             String fieldTitle = column;
/* 743 */             if (format.equals("xml")) {
/* 744 */               fieldTitle = fieldTitle.replaceAll("[$&<>()\"'\\n ]", separator);
/*     */             }
/* 746 */             fieldMap.put(column, fieldTitle);
/* 747 */             columns.add(column);
/*     */           }
/*     */         }
/* 750 */         if (settings.get("exportFields") == null) {
/* 751 */           settings.put("exportFields", columns);
/*     */         }
/*     */ 
/* 754 */         DataExport exportObj = DataExport.getDataExport(settings);
/*     */ 
/* 756 */         int contentLength = 0;
/*     */         try
/*     */         {
/* 762 */           contentLength = exportObj.exportResultSet(rows.iterator(), fieldMap, os1, os2);
/*     */         } catch (Exception e) {
/* 764 */           log.warn("Exception during export - continuing anyway to avoid sending the client to a blank screen", e);
/*     */ 
/* 766 */           if (toClient) {
/* 767 */             response.getOutputStream().print("  *** Exception during export - please check server logs ***");
/*     */           }
/*     */ 
/*     */         }
/*     */ 
/* 772 */         if (toClient)
/* 773 */           response.setContentLength(contentLength);
/*     */         else {
/* 775 */           writeResponse(RPCResponse.STATUS_SUCCESS, "Successfully exported " + qname, response);
/*     */         }
/*     */ 
/* 779 */         return;
/*     */       }
/* 781 */       log.warn("Provided data was null or empty - abandoning");
/* 782 */       if (!toClient) {
/* 783 */         writeResponse(RPCResponse.STATUS_FAILURE, "Provided data was null or empty - abandoning", response);
/*     */       }
/*     */ 
/*     */     }
/*     */     else
/*     */     {
/* 791 */       log.warn("Export requested, but neither client nor filesystem specified - doing nothing");
/* 792 */       writeResponse(RPCResponse.STATUS_FAILURE, "Export requested, but neither client nor filesystem specified - we did nothing", response);
/*     */     }
/*     */   }
/*     */ 
/*     */   private static void writeResponse(int status, String data, HttpServletResponse response)
/*     */     throws Exception
/*     */   {
/* 801 */     JSTranslater jsTrans = JSTranslater.instance();
/* 802 */     Map clientResponse = new HashMap();
/* 803 */     clientResponse.put("status", Integer.valueOf(status));
/* 804 */     clientResponse.put("data", data);
/* 805 */     Writer w = response.getWriter();
/* 806 */     w.write("//isc_RPCResponseStart-->");
/* 807 */     jsTrans.toJS(clientResponse, w);
/* 808 */     w.write("//isc_RPCResponseEnd");
/*     */   }
/*     */ 
/*     */   public static void getPdfObject(String html, Map settings, HttpServletResponse response, RPCManager rpc)
/*     */     throws Exception
/*     */   {
/* 823 */     IPdfExporter pdfFactory = (IPdfExporter)InterfaceProvider.load("IPdfExporter");
/* 824 */     pdfFactory.getPdfObject(html, settings, response, rpc);
/*     */   }
/*     */ }

/* Location:           C:\Users\zwb\Desktop\isomorphic_core_rpc.jar
 * Qualified Name:     com.isomorphic.rpc.BuiltinRPC
 * JD-Core Version:    0.6.2
 */