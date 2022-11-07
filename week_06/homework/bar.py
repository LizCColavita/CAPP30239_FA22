import json
import csv

f = open('a3cleanedonly2015.json')
data = json.load(f)
f.close

new_england = 0
great_lakes = 0
mideast = 0
plains = 0
southwest = 0
rockies = 0
farwest = 0
southeast = 0

for d in data:
    if (d["State"] == "RI") | (d["State"] == "ME") | (d["State"] == "NH") | (d["State"] == "VT") | (d["State"] == "MA") | (d["State"] == "CT"):
        new_england += 1
    elif (d["State"] == "NY") | (d["State"] == "PA") | (d["State"] == "NJ") | (d["State"] == "DE") | (d["State"] == "DC") | (d["State"] == "MD"):
        mideast += 1
    elif (d["State"] == "MI") | (d["State"] == "IL") | (d["State"] == "IN") | (d["State"] == "OH") | (d["State"] == "WI"):
        great_lakes += 1
    elif (d["State"] == "IA") | (d["State"] == "MN") | (d["State"] == "MO") | (d["State"] == "ND") | (d["State"] == "SD") | (d["State"] == "NE") | (d["State"] == "KS"):
        plains += 1
    elif (d["State"] == "TX") | (d["State"] == "OK") | (d["State"] == "NM") | (d["State"] == "AZ"):
        southwest += 1
    elif (d["State"] == "MT") | (d["State"] == "MN") | (d["State"] == "CO") | (d["State"] == "UT") | (d["State"] == "ID"):
        rockies += 1
    elif (d["State"] == "WA") | (d["State"] == "OR") | (d["State"] == "NV") | (d["State"] == "CA") | (d["State"] == "HI") | (d["State"] == "AK"):
        farwest +=1
    else:
        southeast += 1

region = ["New England", "Mideast", "Southeast", "Great Lakes", "Plains", "Rockies", "Southwest", "Farwest"]
count = [new_england, mideast, southeast, great_lakes, plains, rockies, southwest, farwest]

with open('bar.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerows(zip(region, count))
