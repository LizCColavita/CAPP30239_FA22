import json
import csv

f = open('a3cleanedonly2015.json')
data = json.load(f)
f.close

months = ["2015-1", "2015-1", "2015-1", "2015-1", 
    "2015-5", "2015-6", "2015-7", "2015-8", 
    "2015-9", "2015-10", "2015-11", "2015-12"]
counts = [0] * 12

for d in data:
    if d["Date"][0:2] == "1/":
        counts[0] += 1
    elif d["Date"][0] == "2":
        counts[1] += 1
    elif d["Date"][0] == "3":
        counts[2] += 1
    elif d["Date"][0] == "4":
        counts[3] += 1
    elif d["Date"][0] == "5":
        counts[4] += 1
    elif d["Date"][0] == "6":
        counts[5] += 1
    elif d["Date"][0] == "7":
        counts[6] += 1
    elif d["Date"][0] == "8":
        counts[7] += 1
    elif d["Date"][0] == "9":
        counts[8] += 1
    elif d["Date"][0:2] == "10":
        counts[9] += 1
    elif d["Date"][0:2] == "11":
        counts[10] += 1
    elif d["Date"][0:2] == "12":
        counts[11] += 1

with open('line.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerows(zip(months, counts))