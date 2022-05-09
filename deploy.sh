#/bin/bash

cd .. && rsync -a --omit-dir-times --no-perms --exclude node_modules --exclude .git 20-reader/ demo@roadtolarissa.com:20-reader/

ssh demo@roadtolarissa.com <<'ENDSSH'
  #commands to run on remote host
  cd 20-reader/ \
  && yarn \
  && kill -9 $(lsof -t -i:3001 -sTCP:LISTEN)

  yarn run build && PORT=3001 yarn run preview
ENDSSH
