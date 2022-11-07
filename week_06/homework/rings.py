import json

f = open('a3cleanedonly2015.json')
data = json.load(f)

# initialize variables
female = 0 
male = 0
gender_NA = 0
fled = 0
no_fled = 0
fled_NA = 0
illness = 0
no_illness = 0
illness_NA = 0

# loop through data
for d in data:
    # Gender ratio
    if d["Gender"] == "Female":
        female += 1
    elif d["Gender"] == "Male":
        male += 1
    else:
        gender_NA +=   1
    
    #fled
    if d["Flee"] == False:
        no_fled += 1
    elif d["Flee"] == True:
        fled += 1
    else:
        fled_NA += 1

    #mental illness
    if d["Mental_illness"] == False:
        no_illness += 1
    elif d["Mental_illness"] == True:
        illness += 1
    else:
        illness_NA += 1


all_rings = [{"ratio": "Gender", "values": [{"category": "Female", "count": female}, {"category": "Male", "count": male}]},
    {"ratio": "Fled", "values":[{"category": "Fled", "count": fled},{"category": "Did not Flee", "count": no_fled}]},
    {"ratio": " Mental Illness", "values": [{"category": "Yes", "count": illness}, 
    {"category": "No", "count": no_illness}]}]

with open("rings.json", "w") as outfile:
    json.dump(all_rings, outfile)