# file-rotator

1. Put your files you want rotated in `/files`
2. Name your files `Filename_[0-9]+.ext` it is case-sensitive
3. `curl localhost:3000/Filename.ext` it will choose one of the files from the folder and return it on each request
