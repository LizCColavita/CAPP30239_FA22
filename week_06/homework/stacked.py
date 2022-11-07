import json
import csv

f = open('a3cleanedonly2015.json')
data = json.load(f)
f.close

other = 0
shot = 0
tasered = 0
s_and_t = 0

for d in data:
    if d["Manner_of_death"] == 'Other':
        other += 1
    elif d["Manner_of_death"] == 'Shot':
        shot += 1
    elif d["Manner_of_death"] == 'Tasered':
        tasered += 1
    elif d["Manner_of_death"] == 'Shot and Tasered':
        s_and_t += 1
        
print(other, shot, tasered, s_and_t)  
