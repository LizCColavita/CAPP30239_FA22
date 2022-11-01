# Project Step 1: Find Data

## Data Source

### FiveThirtyEight

Data title: Sports Political Donations

Data link: https://github.com/fivethirtyeight/data/tree/master/sports-political-donations

Article link: https://fivethirtyeight.com/features/inside-the-political-donation-history-of-wealthy-sports-owners/


## Description of Data

According to FiveThirtyEight's github repository, the dataset includes "every confirmed partisan political contribution from team owners and commissioners in the NFL, NBA, WNBA, NHL, MLB and NASCAR."

The variables contained in the dataset include:
- Owner: name of the owner and/or commissioner
- Team: name of the sports team or specifies if it is a league commissioner
- League: name of the league (NFL, NBA, WBNA, NHL, MLB, NASCAR)
- Recipient: name of the recipient campaign (e.g., BIDEN FOR PRESIDENT)
- Amount: donation amount in dollars
- Election year: election year of the campaign (2016, 2018, 2020)
- Party: party affiliation of the recipient campaign ("Democrat", "Bipartisan, but mostly Democratic", "Bipartisan", "Bipartisan, but mostly Republican", "Republican", "Independent", "N/A")


## Motivation for the Topic
After my first ideas for a project did not work out, due to hard to find data sources, I began perusing the suggestions provided, including FiveThirtyEight, Buzzfeed, Google Public Data sets, data.gov, and Chicago Data Portal. I am interested in both sports - having gone to Duke I became a big basketball fan, have recently been paying more attention to baseball and hockey, and will occasionally throw on a football game at home or go to a bar to watch the games - as well as politics and who exactly is donating to political campaigns. 

In fact, my first idea for a project was related to abortion access and laws following the US Supreme Court's Dobbs vs. Jackson Women's Health Organization. Abortion access and women's health is a topic I am very passionate about, but I was quite disconcerted by the wave of private sector support for women's reproductive health that followed the Dobbs case. The very vocal support for women's health and reproductive rights seemed performative. And sure enough, a deeper dive into where major companies are putting their political money shows that a fair bit of money goes toward an organization that has fought for the most anti-choice court we have seen in recent decades (https://theintercept.com/2022/10/01/roe-amazon-google-facebook-independent-womens-forum/). All of this is to say, I am very interested in politics and the money behind it. So, when my first project idea did not pan pan out the way I hoped, I found this dataset to be an interesting alternative.

Pragmatically, this data set also seemed good for a project as someone new to html, javascript, and d3. I want to spend a majority of my time practicing these new skills rather than cleaning and wrangling messy and unruly data. I hope to use the time I save working with a fairly clean dataset to practice my skills as they relate to data visualization.


## Using the Data, Potential Data Points, and Potential Concerns

I am excited to go deeper into the data and explore the relationships between the following:

- **Men's vs. Women's leagues**: Another reason why I chose this data set was the inclusion of the WNBA. I would like to explore both the differences between the NBA and WNBA, as well as the differences between the WNBS and all the men's leagues in the data set. 
    - *Potential Concern*: Though the number of records for which the league is men's (2524) is much higher than the number of records for the women's league (274), I am curious to see how political campaign contributions differ amongst the groups.

- **Men vs. Women Owners**: Similar to the above, I'd be interested to know if there are any insights in comparing men versus women professional sports team owners and their political campaign contributions.
    - *Potential Concern*: Again, similar to the above concern, I am worried about the difference in sample size. Though, there are quite a few controlling owners of professional sports teams who are women, so the difference in sample size would be less than above.

- **Party Differences Between the Leagues**: Are some leagues more democratic/republican in their political donations than others? Which league most supports independent campaigns? Which league is the most bipartisan?

- **Changes in Affiliation Over Time**: I am also curious to see if there are any leagues/owners that have shifted in their party donations over time.
    - *Potential Concern*: The data set, while it does have donations from 2016, 2018, and 2020 elections, might cover a time period long enough to see any noteworthy changes. But it is still something I am looking to explore.

- **Party Differences within Leagues**: Which team/owner within a particular league was associated with the most democratic, republican, independent, and bipartisan donations? Could I somehow quantify the political polarization of owners within a league?
    - *Potential Concern*: If I wanted to quantify the political polarization within a league, I would need to think more seriously about how to do that.

- **Monetary Differences between Leagues**: Which league is associated with the highest or lowest total dollar amount of donations?


## Primary and Secondary Data
This is my primary data source, and I currently do not have secondary datasource as I think there is enough here to explore, tease out interesting relationships, and create engaging visualizations. Though I am very open to finding more data as the project progresses.



# Project Step 2: Clean Data

Data files are now housed in the "data" folder within "project".

## Clean data
My data, sourced from FiveThirtyEight, was fairly clean when I downloaded it. However there were a few steps I went through to clean it, and the code for this is found in the Jupyter notebook Clean.ipynb. Namely, I cleaned the data in the following ways:

- changed the  **format of the data in the "Amount" column from a character string to an integer** in order to do calculations, such as summing values in the column and making charts that involve numerical variables
- changed **format of "Recipient" strings** to be more uniform (all upercase)
- created a **binary indicator variable "Female"** to indicate whether an owner or commissioner is a woman (1) or not (0)
- **separated records** for which an owner owned more than 1 team for analysis when I want to explore the data by league/team

This resulted in the cleaned data file: sports-political-donations-clean.csv. For some analysis purposes, I also created a csv file, sports-political-donations-unseparated,csv, which includes all the above changes with the exception of seperating the records for owners of multiples teams. This is for the purpose of analyzing donations when I do not want to separate them by league. Otherwise I would end up double counting donations for owners of more than one team.


## Separate into smaller files
I **created smaller csv files** based on league. Requirements if the assignment specified that csv files should be less than 1000 rows/records. My dataset is fairly compact, so I'm not sure this was absolutely necessary. Nonetheless, just in case, I split the cleaned overall csv ("sports-political-donations-clean.csv") into smaller csv files based on league.

- MLB.csv
- NASCAR.csv
- NBA.csv
- NFL.csv
- NHL.csv
- WNBA.csv