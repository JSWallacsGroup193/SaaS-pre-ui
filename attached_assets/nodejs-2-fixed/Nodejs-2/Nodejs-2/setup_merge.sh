#!/bin/bash
set -e
echo "=== Auto install, build, start ==="
yarn install --frozen-lockfile || yarn install
yarn build
yarn start
