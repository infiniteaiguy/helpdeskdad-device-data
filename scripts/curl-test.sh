#!/usr/bin/env bash
#
# Quick connectivity test against Icecat
# Usage:  ICECAT_AUTH="dXNlcjEyMzpwYXNzNDU2" ./scripts/curl-test.sh

# Fail fast if the secret isn’t set
if [[ -z "$ICECAT_AUTH" ]]; then
  echo "❌  ICECAT_AUTH env var not set" >&2
  exit 1
fi

GTIN="0194253136789"               # sample iPhone UPC – change if you like
API="https://api.openicecat.org/api/v1/product"

curl --silent \
     --header "Authorization: Basic $ICECAT_AUTH" \
     --request GET "$API?gtin=$GTIN" | jq .