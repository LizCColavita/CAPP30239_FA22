# Overview

Project Description:
This directory contains the files for the final project of University of Chicago's **Data Visualization for Policy Analysis** course (CAPP30239 Autumn 2022). The premise of the project was to find a dataset of interest and use it to craft a story and accompanying data visualizations using Javascript D3 and CSS. My data comes from FiveThirtyEight and is related to the political campaigns contributions of professional sports team owners in the MLB, NBA, WNBA, NHL, NFL, and NASCAR. Largely, donations flow to Republican-affiliated campaigns, regardless of gender of the owner or sports league. However, there are some anomalies. Namely:
- Women MLB owners and men NBA owners are the most Democratic in their campaign donations
- WNBA is the only league in which donations to democrat-affiliated campaigns outnumber donations to republican-affiliated campaigns
- NFL is the only league in which the proportion of women owner’s donations outnumber men owner’s political donations, despite women only making up 29% of owners in the NFL

Explaining these breaks in the patter are a bit harder to explain, though I attempt to fill in the gaps with additional research such as the political demographics of the league fanbase (MLB), social justice activism of the players (WNBA), and the long-time, and still-growing presence of women in the league (NFL).


Directories:
- data: contains csv files used to create data arrays/objects in js files
- legends: contains js files for the legends for the d3 charts
- unused: contains sankey.csv and parallet-set.js files which were used to create an alluvial chart but ultimately not used in the final project page

Files:
- index.html: html file for the final project
- styles.css: css for formating the above html page
- index.md: md file to execute the index.html file in GitHub pages
- barcharts.js: code to create the grouped bar charts, horizontal bar chart, and stacked horizontal bar charts in index.html
- WNBA-donuts.js: code to create the donut charts for donation patterns of all, women, and men WNBA owners
- cluster.js: code to create cluster charts for overall men and women owners' donations
- sidebar.js: code to create charts in the "Playing Field" sidebar
- stackedBar.js: code for a stacked bar chart function from https://observablehq.com/@d3/stacked-horizontal-bar-chart
- divergingBarChart.js: code for a diverging bar chart function from https://observablehq.com/@d3/diverging-bar-chart
- groupedBarChart.js: code for grouped bar chart function from https://observablehq.com/@d3/grouped-bar-chart
- horizontalBarChart.js: code for horizontal bar chart function from https://observablehq.com/@d3/horizontal-bar-chart
- treeMap.js:code for treemap function from https://observablehq.com/@d3/treemap


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

# Project Step 3: Build Charts

Internally, I very much struggled with coming to terms with the fact that my data was not conducive to fancy, complex charts. In an attempt to demonstrate proficiency with more complex d3 charts, I tried to create an alluvial chart (parallel-set.js  with data from sankey.csv). After I got most of the chart done and was going to fine tune the colors and formatting, I realized that the chart was not very clear and not very good supporting the point I wanted to make. I wanted to use the chart to highlight women MLB owners’ and men WNBA owners’ contributions to Democrat-affiliated campaigns, but the alluvial chart very much hid those findings. Largely because the absolute size of women MLB owners and men WNBA owners in dollar amounts was small compared to heavy hitters, like men MLB and men NBA owners.

In a similar vein, because most of the key parts of my story  were related to parts of a whole, I tried to utilize as many chart types as possible that were appropriate for showing this kind of data. Yet, bar charts and donut charts were often the most concise way of emphasizing my key points. I added some variety with the tree map and the bubble chart, as well as single stacked bar charts as occasional substitutes for donut charts.

In the end, I ultimately ended up building the following charts:
- Grouped Bar Charts
    - Women MLB Owners and Men WNBA Owners Donate More to Democrat-Affiliated Campaigns (main container)
    - Proportion of Women Owners Compared to Proportion of Women's Political Contributions by League (main container)
- Horizontal Bar Chart
    - Political Donations broken Down by League (sidebar)
- Stacked Horizontal Bar Charts
    - Gender Breakdown of WNBA Owners' Political Contributions (main container)
    - Gender Breakdown of NFL Owners' Political Contributions (main container)
- Donut Charts
    - Political Donations broken Down by Gender (sidebar)
    - Political Contribution Patterns of WNBA Owners (main container)
- Cluster Charts
    - Men and Women Owners' Political Donations (main container)
- Tree Map Chart
    - Political Donations broken Down by Party (sidebar)
