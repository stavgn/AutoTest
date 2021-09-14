#!/bin/bash

SERVICES_ROOT="./services"
SERVICES=("ApiGateway" "FlowService" "QueueManagerService")

APPS_ROOT="./apps"
APPS=("simulator")

(cd ./packages/clientlib;yarn build)

for i in "${!SERVICES[@]}"; do 
  cp -r ./packages  "${SERVICES_ROOT}/${SERVICES[i]}"
done

for i in "${!APPS[@]}"; do 
  cp -r ./packages  "${APPS_ROOT}/${APPS[i]}"
done

#docker compose build flow simulator
docker compose up  #--force-recreate #--build

for i in "${!SERVICES[@]}"; do 
  rm -rf "${SERVICES_ROOT}/${SERVICES[i]}/packages"
done


for i in "${!SERVICES[@]}"; do 
  rm -rf "${APPS_ROOT}/${APPS[i]}/packages"
done
