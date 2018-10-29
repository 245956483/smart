package com.cserver.saas.system.smartclient.utils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
public class StaticFreemarker
{
	@SuppressWarnings("rawtypes")
	public void init(String ftl, String htmlName, Map map, String fileName, HttpServletRequest req)
			throws IOException, TemplateException
	{
		Configuration freemarkerCfg = new Configuration();
		freemarkerCfg.setServletContextForTemplateLoading(req.getServletContext(), "/" + fileName);
		Template template;
		template = freemarkerCfg.getTemplate(ftl,"utf-8");
		String path = req.getServletContext().getRealPath("/");
		System.out.println(path);
		BufferedWriter buff = new BufferedWriter(new FileWriter(path + htmlName));
		File htmlFile = new File(path + htmlName);
		Writer out = new BufferedWriter(new OutputStreamWriter(	new FileOutputStream(htmlFile), "utf-8"));
		template.setEncoding("utf-8");
		template.process(map, out);
		buff.close();
		out.flush();
		out.close();
	}

}
