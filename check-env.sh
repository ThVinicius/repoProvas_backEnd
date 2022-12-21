#!/usr/bin/env bash
export $(grep -v '^#' .env | xargs -d '\n')

if [ -z "$DATABASE_URL" ]
then
    echo "DATABASE_URL está vazia, defina-a mais tarde!" && npx tsc

else
    npx prisma migrate deploy && npx prisma db seed && npx tsc
fi