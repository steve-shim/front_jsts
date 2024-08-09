"""
https://www.acmicpc.net/problem/2667
"""
import sys

from collections import deque


N = int(sys.stdin.readline())
graph = []
f = open("./test.txt", "r", encoding="utf8")
#for _ in range(N):
for line in f.readlines():
    line = ''.join(line.strip()).replace(' ','')    
    #line = sys.stdin.readline().strip()
    rows = []
    for l in line:
        rows.append(int(l))
    graph.append(rows)
f.close()


def bfs(start, graph):
    q = deque()
    q.append(start)
    graph[start[0]][start[1]] = 0
    ret = 1
    while len(q) > 0:
        (x, y) = q.popleft()
        for (dx, dy) in ((-1, 0), (1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < N and 0 <= ny < N and graph[nx][ny] == 1:
                graph[nx][ny] = 0
                ret += 1
                q.append((nx, ny))
    return ret


result = []
count = 0
for x in range(N):
    for y in range(N):
        if graph[x][y] == 1:
            ret = bfs((x, y), graph)
            count += 1
            result.append(ret)

#print(count)
for r in sorted(result):
    print(r)