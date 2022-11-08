import json
import csv

f = open('a3cleanedonly2015.json')
data = json.load(f)
f.close

new_england = {"Region": "New England", "Black": 0, "Asian": 0, "Hispanic": 0, "Native": 0, "White": 0, "Other": 0, "Unspecified": 0}
great_lakes = {"Region": "Great Lakes", "Black": 0, "Asian": 0, "Hispanic": 0, "Native": 0, "White": 0, "Other": 0, "Unspecified": 0}
mideast = {"Region": "Mideast", "Black": 0, "Asian": 0, "Hispanic": 0, "Native": 0, "White": 0, "Other": 0, "Unspecified": 0}
plains = {"Region": "Plains", "Black": 0, "Asian": 0, "Hispanic": 0, "Native": 0, "White": 0, "Other": 0, "Unspecified": 0}
southwest = {"Region": "Southwest", "Black": 0, "Asian": 0, "Hispanic": 0, "Native": 0, "White": 0, "Other": 0, "Unspecified": 0}
rockies = {"Region": "Rockies", "Black": 0, "Asian": 0, "Hispanic": 0, "Native": 0, "White": 0, "Other": 0, "Unspecified": 0}
farwest = {"Region": "Farwest", "Black": 0, "Asian": 0, "Hispanic": 0, "Native": 0, "White": 0, "Other": 0, "Unspecified": 0}
southeast = {"Region": "Southeast", "Black": 0, "Asian": 0, "Hispanic": 0, "Native": 0, "White": 0, "Other": 0, "Unspecified": 0}

for d in data:
    if (d["State"] == "RI") | (d["State"] == "ME") | (d["State"] == "NH") | (d["State"] == "VT") | (d["State"] == "MA") | (d["State"] == "CT"):
        race = d["Race"]
        if not race:
            new_england["Unspecified"] += 1
        else:
            new_england[race] += 1

    elif (d["State"] == "NY") | (d["State"] == "PA") | (d["State"] == "NJ") | (d["State"] == "DE") | (d["State"] == "DC") | (d["State"] == "MD"):
        race = d["Race"]
        if not race:
            mideast["Unspecified"] += 1
        else:
            mideast[race] += 1

    elif (d["State"] == "MI") | (d["State"] == "IL") | (d["State"] == "IN") | (d["State"] == "OH") | (d["State"] == "WI"):
        race = d["Race"]
        if not race:
            great_lakes["Unspecified"] += 1
        else:
            great_lakes[race] += 1

    elif (d["State"] == "IA") | (d["State"] == "MN") | (d["State"] == "MO") | (d["State"] == "ND") | (d["State"] == "SD") | (d["State"] == "NE") | (d["State"] == "KS"):
        race = d["Race"]
        if not race:
            plains["Unspecified"] += 1
        else:
            plains[race] += 1

    elif (d["State"] == "TX") | (d["State"] == "OK") | (d["State"] == "NM") | (d["State"] == "AZ"):
        race = d["Race"]
        if not race:
            southwest["Unspecified"] += 1
        else:
            southwest[race] += 1

    elif (d["State"] == "MT") | (d["State"] == "MN") | (d["State"] == "CO") | (d["State"] == "UT") | (d["State"] == "ID"):
        race = d["Race"]
        if not race:
            rockies["Unspecified"] += 1
        else:
            rockies[race] += 1

    elif (d["State"] == "WA") | (d["State"] == "OR") | (d["State"] == "NV") | (d["State"] == "CA") | (d["State"] == "HI") | (d["State"] == "AK"):
        race = d["Race"]
        if not race:
            farwest["Unspecified"] += 1
        else:
            farwest[race] += 1

    else:
        race = d["Race"]
        if not race:
            southeast["Unspecified"] += 1
        else:
            southeast[race] += 1

regions_dict = [southeast, farwest, rockies, southwest, plains, great_lakes, new_england, mideast]
csv_columns = regions_dict[1].keys()

with open('bar.csv', 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
    writer.writeheader()
    for data in regions_dict:
        writer.writerow(data)