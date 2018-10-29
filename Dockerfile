FROM tomcat:latest
RUN rm -rf /usr/local/tomcat/webapps/*
copy  target/smart.war  /usr/local/tomcat/webapps