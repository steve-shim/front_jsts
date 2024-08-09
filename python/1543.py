doc = input() # ababababa
word = input() # aba

start_index = 0
count = 0
while True:
    find_index = doc.find(word, start_index) # 존재하지 않으면 -1 반환
    print("find_index",find_index)
    if find_index < 0: 
        break
    start_index = find_index + len(word)
    print("start_index",start_index)
    count += 1

print(count)