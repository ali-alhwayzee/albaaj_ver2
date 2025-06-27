#!/usr/bin/env bash
# wait-for-it.sh

host="$1"
shift
cmd="$@"

until nc -z $(echo $host | cut -d: -f1) $(echo $host | cut -d: -f2); do
  echo "⏳ Waiting for $host to be available..."
  sleep 2
done

echo "✅ $host is available — executing command"
sleep 1
exec "$@"

