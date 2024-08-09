import queue

# data = [1, 2, 'a', 'b', [1,2,3], {'a':1, 'b':2}]

# q = queue.Queue()

# for d in data: 
#     q.put(d)

# print('queue size:', q.qsize())
# for i in range(q.qsize()):
#     print(f'data: {q.get()}, queue size: {q.qsize()}')
# print('queue size:', q.qsize())

q = queue.Queue(3)

print(f'qsize: {q.qsize()}')
print(f'empty: {q.empty()} / full: {q.full()}')

q.put(1)
print(f'put data, qsize: {q.qsize()}')
print(f'empty: {q.empty()} / full: {q.full()}')

q.put(2)
print(f'put data, qsize: {q.qsize()}')
print(f'empty: {q.empty()} / full: {q.full()}')

q.put(3)
print(f'put data, qsize: {q.qsize()}')
print(f'empty: {q.empty()} / full: {q.full()}')