#!/usr/bin/env bash

# code adapted from https://github.com/codeocelot/git-diff-lint

LINT=${LINT:="yarn eslint"}
BRANCH=${BRANCH:="refs/remotes/origin/develop"}
EXT=${EXT:="\.(js|ts)$"}

while getopts ":x:b:e:h" opt; do
  case $opt in
    x)
      LINT=$OPTARG
      ;;
    b)
      BRANCH=$OPTARG
      ;;
    e)
      EXT=$OPTARG
      ;;
    h)
      echo -e "Usage: git-diff-lint [options]\n"
      echo "Options:"
      echo -e "  -x\t lint command (default: eslint)"
      echo -e "  -b\t parent branch (default: develop)"
      echo -e "  -e\t file extension regex, (default: .(js|ts))"
      echo -e "  -h\t show this help message and exit"
      exit 0
      ;;
    \?)
      echo -e "Invalid option: $OPTARG \ngit-diff-lint -h for help" >&2
      exit 1
      ;;
    :)
      echo -e "Option -$OPTARG requires an argument\ngit-diff-lint -h for help" >&2
      exit 1
      ;;
  esac
done

DIFF=$(git diff --name-only --diff-filter=d $(git merge-base HEAD $BRANCH) | grep -E $EXT)

if [ -n "$DIFF" ]
then
  printf "Linting following changed files\n"
  printf "$DIFF\n"

  $LINT $DIFF
else
  printf "No files to lint\n"
  exit 0
fi
