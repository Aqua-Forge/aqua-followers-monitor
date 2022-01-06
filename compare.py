import json

CONFIGFILE      = "configs.json"
LAST_FOLLOWERS  = "data/last_followers.txt"
FOLLOWERS       = "data/followers.txt"
FOLLOWING       = "data/following.txt"
RESULTFILE      = "data/result.txt"

with open(CONFIGFILE) as f:
  configs = json.load(f)

with open(LAST_FOLLOWERS) as f:
  last = [line.replace('\n', '') for line in f.readlines()[1:]]

with open(FOLLOWERS) as f:
  current = [line.replace('\n', '') for line in f.readlines()[1:]]

with open(FOLLOWING) as f:
  following = [line.replace('\n', '') for line in f.readlines()[1:]]

lost = [follower for follower in last if follower not in current]
dont_follow_back = [f for f in following if f not in current]

if (configs["resultToFile"]):
  with open(RESULTFILE, "w") as f:
    f.write(f"Lost followers ({len(lost)}):\n\n")
    for l in lost:
      f.write(l + "\n")

    f.write(f"\nDont follow you back ({len(dont_follow_back)}):\n\n")
    for d in dont_follow_back:
      f.write(d + "\n")
  print(f"Results written to {RESULTFILE}")
else:
  print(f"\nLost followers ({len(lost)}):")
  print(lost)

  print(f"\nDont follow you back ({len(dont_follow_back)}):")
  print(dont_follow_back)
