#!/bin/sh

ROOT_DIR=/usr/src/app/dist

echo "Replacing env constants in JS"
for file in $ROOT_DIR/assets/*.js* $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|$VITE_YOUTUBE_URL|'${VITE_YOUTUBE_URL}'|g' $file 
  sed -i 's|$VITE_YOUTUBE_API_KEY|'${VITE_YOUTUBE_API_KEY}'|g' $file
done

echo "Starting server"
http-server ./dist -p $PORT