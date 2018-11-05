#!/bin/bash
npm run buildcss
rsync -avz --checksum --exclude=node_modules/ --exclude=.git/  --exclude=deploy.sh --exclude=.idea --exclude=.gitignore --exclude=*.iml --exclude=package.json --exclude=package-lock.json --exclude=public/resources/scss/ --exclude=images/banff/* ./ root@192.168.1.84:/var/www/API/
