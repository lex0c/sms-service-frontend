#!/bin/bash
npm ci --no-cache && \
npm build && \
cd _build && \
npm i -g http-server && \
http-server -p 4000
