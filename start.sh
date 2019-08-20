#!/bin/bash
npm ci --no-cache && \
npm build && \
node server.js
