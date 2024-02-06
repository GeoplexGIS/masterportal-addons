#!/bin/bash
if [[ -z "$1" ]]
then 
    echo "Please provide a name for the addon"
else 
    mkdir $1
    cd $1
    mkdir locales components store doc tests
    mkdir locales/de locales/en
    touch index.js
    touch doc/config.json.md
fi
