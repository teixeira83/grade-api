#!/bin/bash

if [ "$1" == "dev" ];
then
   npx prisma migrate deploy
elif [ "$1" == "hml" ];
then
    npx prisma migrate deploy
elif [ "$1" == "prd" ];
then
    npx prisma migrate deploy
fi