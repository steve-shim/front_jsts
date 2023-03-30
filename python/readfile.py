# numbers = []
# with open("file.txt") as f:
#   group = []
#   for line in f:
#     print("line",line)
#     if line == "\n":
#       numbers.append(group)
#       group = []
#     else:
#       group.append(int(line.rstrip()))
#   # append the last group because if line == "\n" will not be True for
#   # the last group
#   print("numbers",numbers)
#   numbers.append(group)

# print("numbers",numbers)

with open("file.txt") as f:
  # split input into groups based on empty lines
  groups = f.read().rstrip().split("\n\n")
  print("groups",groups)
  # convert all the values in the groups into integers
  nums = [list(map(int, (group.split()))) for group in groups]

print("nums",nums)