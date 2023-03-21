from collections import Counter

counter = Counter(input().upper()) # Counter({'S': 3, 'E': 2, 'T': 1, 'V': 1, 'H': 1, 'I': 1, 'M': 1})

if len(counter) > 1 and counter.most_common()[0][1] == counter.most_common()[1][1]:
    print('?')
else:
    print(counter.most_common()[0][0])