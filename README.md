# file-rotator

### Rotate files
1. Put your files you want rotated in `/files`
2. Name your files `Filename_[0-9]+.ext` it is case-sensitive
3. `curl localhost:3000/Filename.ext` it will choose one of the files from the folder and return it on each request
4. `curl localhost:3000/Filename_0.ext` will download a specific file

### Index directories
1. Put your directory in `/files` e.g. `mkdir /files/bin`
2. Add a `.index` file `touch /files/bin/.index`
3. `curl localhost:3000/bin` will return an array of filenames
4. `curl localhost:3000/bin/file.tar.gz` will download the file