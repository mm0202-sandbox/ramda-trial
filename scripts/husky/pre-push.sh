#!/bin/bash

eval "$(cat .env <(echo) <(declare -x))"

delay_seconds=(
  2
  5
  10
  60
)

for delay_second in "${delay_seconds[@]}"; do
  echo "delay: ${delay_second}sec"
  curl -X POST "${JENKINS_URL}"/job/"${JENKINS_JOB_NAME}"/build?delay="${delay_second}"sec -u "${JENKINS_USER}":"${JENKINS_API_TOKEN}"
done
