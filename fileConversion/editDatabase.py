import csv
import numpy as np

def getPar (score, hole, course):
    x = -1
    if (course == "Covered Bridge Park"):
        x = 0
    elif (course == "Hanover Community Center"):
        x = 1
    elif (course == "Moore Township"):
        x = 2
    elif (course == "Camp Olympic Park"):
        x = 3
    return courseInfo[x][hole]
    
courseInfo = [["Covered Bridge Park",
                3, 3, 3, 3, 3, 3,
                3, 3, 3, 3, 3, 3,
                3, 3, 3, 3, 3, 3, 54],
                ["Hanover Community Center", 
                3, 3, 3, 3, 4, 3, 
                3, 3, 3, 3, 3, 3, 
                3, 4, 3, 4, 3, 3, 57],
                ["Moore Township", 
                3, 3, 3, 3, 3, 3, 
                3, 3, 3, 3, 3, 3, 
                4, 3, 3, 3, 3, 4, 56],
                ["Camp Olympic Park",
                3, 3, 3, 3, 3, 3,
                3, 3, 3, 3, 3, 3,
                3, 3, 3, 3, 3, 3, 54]]
rounds = []

with open('pyRounds.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        if (row[0] != 'DATE'):
            rounds.append(row)
for x in rounds:
    total = 0
    for i in range(3,21):
        total = total + int(x[i])
    x.append(f'{total}')
    course = x[2]
    for i in range(3,22):
        x.append(getPar(x[i], i - 2, course))
np.savetxt("pyRounds.csv",
        rounds,
        delimiter =", ",
        fmt ='% s')