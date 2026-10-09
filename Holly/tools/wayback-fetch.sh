#!/bin/bash
for i in 1 2 3 4 5 6; do
  c=$(curl -sL -m 90 "https://web.archive.org/web/20260612174030id_/https://www.thisishollyli.com$1" -o "$2" -w "%{http_code}" 2>/dev/null)
  [ "$c" = 200 ] && [ -s "$2" ] && exit 0
  [ "$c" = 404 ] && [ $i -ge 2 ] && break
  sleep $((i*8))
done
echo "FAIL $1 ($c)"; rm -f "$2"; exit 1
