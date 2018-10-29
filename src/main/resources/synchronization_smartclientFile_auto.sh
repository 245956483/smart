#/!bin/bash
#Auto synchronization smartclientFile
#Author yarn
#Date   2018-7-17 18:20:26
##########################
BAK_FILE_PATH=/app/virgopt32/smartclientFile/dsCopy/workspace
WORK_FOLDER=/app/virgopt32/work/org.eclipse.virgo.kernel.deployer_3.0.2.RELEASE/staging/global/bundle/com.cserver.saas.system.smartclient/1.0.0/com.cserver.saas.system.smartclient-1.0.0.war
echo -e "\033[36m---------------------\033[0m"
date
if [ -d "$FOLDER" ]; then
  cp -rf  $BAK_FILE_PATH/ds/*      $WORK_FOLDER/shared/ds
  cp -rf  $BAK_FILE_PATH/pages/*   $WORK_FOLDER/tools/visualBuilder/workspace
  echo -e "\033[32m#The smartclientFile synchronization succeeded!!\033[0m"
else
  echo -e "\033[31m#Smartclient.war  did not start in Virgo tomcat server!!\033[0m"
fi

