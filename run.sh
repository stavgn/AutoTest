#!/bin/bash

ROOT="./services"
SERVICES=("ApiGateway" "FlowService" "QueueManagerService")


for i in "${!SERVICES[@]}"; do 
  cp -r ./packages  "${ROOT}/${SERVICES[i]}"
done

docker compose up --force-recreate --build

for i in "${!SERVICES[@]}"; do 
  rm -rf "${ROOT}/${SERVICES[i]}/packages"
done

