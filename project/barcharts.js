/* Creates charts in the main container */

Promise.all([
    d3.csv("data/sports-political-donations-unseparated.csv"),
    d3.csv("data/sports-political-donations-clean.csv")
  ]).then(([unseparated, clean]) => {

    console.log("Unseparated Raw", unseparated)
    console.log("Clean Raw", clean)

    //create necessary array

    let data = [
        {category: "MLB Women", party: "Republican",  amount: 0},
        {category: "WNBA Men", party: "Republican", amount: 0},
        {category: "All Women", party: "Republican",  amount: 0},
        {category: "All Men", party: "Republican",  amount: 0},
        {category: "MLB Women", party: "Democrat",  amount: 0},
        {category: "WNBA Men", party: "Democrat", amount: 0},
        {category: "All Women", party: "Democrat",  amount: 0},
        {category: "All Men", party: "Democrat",  amount: 0},
        {category: "MLB Women", party: "Other",  amount: 0},
        {category: "WNBA Men", party: "Other", amount: 0},
        {category: "All Women", party: "Other",  amount: 0},
        {category: "All Men", party: "Other",  amount: 0}
];
        

    for (let d of unseparated){
        d.Amount = +d.Amount
        party = d.Party

        if (party == "Republican"){
            if (d.Female == "0") {
                    data[3].amount += d.Amount;
                } else {
                    data[2].amount += d.Amount;
            } 
        }  else if (party == "Democrat"){
            if (d.Female == "0") {
                data[7].amount += d.Amount;
            } else {
                data[6].amount += d.Amount;
            } 
        } else {
            if (d.Female == "0") {
                data[11].amount += d.Amount;
            } else {
                data[10].amount += d.Amount;
            } 

        }
    };

    for (let d of clean) {
        if (d.League == "MLB"){
            if (d.Female == "1") {
                d.Amount = +d.Amount
                party = d.Party
                if (party == "Republican") {
                    data[0].amount += d.Amount;
                } else if (party == "Democrat"){
                    data[4].amount += d.Amount;
                } else {
                    data[8].amount += d.Amount;
                }} }
        if (d.League == "WNBA"){
            if (d.Female == "0") {
                d.Amount = +d.Amount
                party = d.Party
                if (party == "Republican") {
                    data[1].amount += d.Amount;
                } else if (party == "Democrat"){
                    data[5].amount += d.Amount;
                } else {
                    data[9].amount += d.Amount;
                } } 
    }};

    console.log(data)

    // change format of amount values - put into percents
    for (let d of data){
        if (d.category == "All Men"){
            d.amount = +((d.amount/40073415) * 100).toFixed(2);
        } else if (d.category == "All Women") {
            d.amount = +((d.amount/6905282) * 100).toFixed(2);
        } else if (d.category == "MLB Women") {
            d.amount = +((d.amount/1772824) * 100).toFixed(2);
        } else {
            d.amount = +((d.amount/2158235) * 100).toFixed(2)
        }
        };
  
    console.log(data)

    // create domain arrays
    let parties = ["Republican", "Democrat", "Other"];
    let colors = ['#ca0020','#0571b0', '#c2a5cf'];
    let groups = ["MLB Women", "WNBA Men", "All Women", "All Men"];

    // create grouped bar chart
    let groupedBar = GroupedBarChart(data, {
        x: d => d.category,
        y: d => d.amount,
        z: d => d.party,
        marginLeft: 100,
        zDomain: parties,
        xDomain: groups,
        xLabel: "Group of Owners",
        colors: colors,
        xPadding: 0.25,
        width: 800,
        });

    document.getElementById("grouped-bar").append(groupedBar);

    // create array for diverging bar chart
    let data2 = [{league: "WNBA", average: 15.8, ratio: 17.4},
        {league: "NBA", average: 15.8, ratio: 15.2},
        {league: "NFL", average: 15.8, ratio: 46.3},
        {league: "NHL", average: 15.8, ratio: 5.1},
        {league: "MLB", average: 15.8, ratio: 5.0},
        {league: "NASCAR", average: 15.8, ratio: 0.0},
    ]

    // create diverging bar chart
    let colors2 = ['#757C80','#800080'];

    let divergingBar = DivergingBarChart(data2, {
        x: d => d.ratio - d.average,
        y: d => d.league,
        height: 400,
        colors: colors2,
        xLabel: "← Below · Percentage Point Deviation from the Average · Above →",
        marginTop: 48,
    });

    document.getElementById("diverging-bar-NFL").append(divergingBar);

    // create array for stacked WNBA horizontal bar chart
    let data3 =[{league: "WNBA", gender: "Men", ratio: 68},
        {league: "WNBA", gender: "Women", ratio: 32}]
    
    // create horizontal stacked bar chart
    let stackedBar = StackedBarChart(data3, {
        x: d => d.ratio,
        y: d => d.league,
        z: d => d.gender,
        colors: colors2,
        width: 900,
        height: 75,
        title: d => d.ratio,
        marginLeft: 100,

    })

    document.getElementById("WNBA-bar").append(stackedBar);

    // create array for 2nd grouped bar chart
    let data4 = [{league: "WNBA", ratio: "owner", value: 35},
                    {league: "WNBA", ratio: "donation", value: 32},
                    {league: "NBA", ratio: "owner", value: 17},
                    {league: "NBA", ratio: "donation", value: 6},
                    {league: "MLB", ratio: "owner", value: 8},
                    {league: "MLB", ratio: "donation", value: 8},
                    {league: "NFL", ratio: "owner", value: 29},
                    {league: "NFL", ratio: "donation", value: 58},
                    {league: "NHL", ratio: "owner", value: 13},
                    {league: "NHL", ratio: "donation", value: 5}]

    // create 2nd groupe bar chart
    let groupedBar2 = GroupedBarChart(data4, {
        x: d => d.league,
        y: d => d.value,
        z: d => d.ratio

    })

    document.getElementById("women-grouped-bar").append(groupedBar2);

  });
