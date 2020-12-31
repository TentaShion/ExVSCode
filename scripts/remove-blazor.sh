#!/bin/sh

dirPath="packages/$1/assets/wwwroot/_framework"
for file in `\find ${dirPath} -maxdepth 1 -name '*.br'`;
do
  path="${file%.*}"
  rm "${path}.br"
  rm "${path}.gz"
done
