#!/bin/bash
(sleep 22;open http://localhost:3000) &
docker compose up  #--force-recreate #--build
