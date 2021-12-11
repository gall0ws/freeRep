#!/bin/sh
set -x

zip -rX -FS ./freeRep.zip \
    manifest.json \
    freeRep.js \
    background.js \
    icons/*.png
