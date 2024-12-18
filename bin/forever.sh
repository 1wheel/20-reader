#!/bin/bash

# kill previous forever instance
kill -9 $(pgrep -f ${BASH_SOURCE[0]} | grep -v $$)

# kill previous server instance
kill -9 $(lsof -t -i:3001 -sTCP:LISTEN)

# restart server on error
while true
do
  yarn run build && yarn run preview
  sleep 1
done