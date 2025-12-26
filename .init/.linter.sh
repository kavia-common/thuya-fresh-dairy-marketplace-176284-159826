#!/bin/bash
cd /home/kavia/workspace/code-generation/thuya-fresh-dairy-marketplace-176284-159826/thuya_fresh_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

