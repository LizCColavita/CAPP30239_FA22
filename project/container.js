/* Creates charts in the main container */

Promise.all([
    d3.csv("data/sports-political-donations-unseparated.csv"),
    d3.csv("data/sports-political-donations-clean.csv")
  ]).then(([unseparated, clean]) => {

    console.log("Unseparated Raw", unseparated)
    console.log("Clean Raw", clean)

    //create necessary array

    let data = [
        {category: "Men", party: "Republican",  amount: 0}, 
        {category: "Women", party: "Republican",  amount: 0},
        {category: "MLB Women", party: "Republican",  amount: 0},
        {category: "Men", party: "Democrat",  amount: 0}, 
        {category: "Women", party: "Democrat",  amount: 0},
        {category: "MLB Women", party: "Democrat",  amount: 0},
];
        

    for (let d of unseparated){
        d.Amount = +d.Amount
        party = d.Party

        if (party == "Republican"){
            if (d.Female == "0") {
                    data[0].amount += d.Amount;
                } else {
                    data[1].amount += d.Amount;
            } 
        }  else if (party == "Democrat"){
            if (d.Female == "0") {
                data[3].amount += d.Amount;
            } else {
                data[4].amount += d.Amount;
            } 
        } 
    };

    for (let d of clean) {
        if (d.League == "MLB"){
            if (d.Female == "1") {
                d.Amount = +d.Amount
                party = d.Party
                if (party == "Republican") {
                    data[2].amount += d.Amount;
                } else if (party == "Democrat"){
                    data[5].amount += d.Amount;
                } 
    }}};
    console.log(data)
    // change format of amount values - put into percents
    for (let d of data){
        if (d.category == "Men"){
            d.amount = +((d.amount/39247165) * 100).toFixed(2);
        } else if (d.category == "Women") {
            d.amount = +((d.amount/6882528) * 100).toFixed(2);
        } else {
            d.amount = +((d.amount/1752824) * 100).toFixed(2)
        }
    };
    console.log(data)

    // create domain arrays
    let parties = ["Republican", "Democrat"];
    let colors = ['#ca0020','#0571b0'];
    let groups = ["Men", "Women", "MLB Women"];

    // create grouped bar chart
    let groupedBar = GroupedBarChart(data, {
        x: d => d.category,
        y: d => d.amount,
        z: d => d.party,
        zDomain: parties,
        xDomain: groups,
        yLabel: "% of Total Campaign Donations per Group",
        xLabel: "Group of Owners",
        colors: colors,
        xPadding: 0.3,
        width: 400,
        });

    document.getElementById("grouped-bar-MLB").append(groupedBar);

    // create array for diverging bar chart
    let data2 = [{league: "WNBA", average: 15.8, ratio: 17.4},
        {league: "NBA", average: 15.8, ratio: 15.2},
        {league: "NFL", average: 15.8, ratio: 46.3},
        {league: "NHL", average: 15.8, ratio: 5.1},
        {league: "MLB", average: 15.8, ratio: 5.0},
        {league: "NASCAR", average: 15.8, ratio: 0.0},
    ]

    // create diverging bar chart
    let colors2 = ['#757C80',' #800080'];

    let divergingBar = DivergingBarChart(data2, {
        x: d => d.ratio - d.average,
        y: d => d.league,
        height: 400,
        colors: colors2,
        xLabel: "← Below · Percentage Point Deviation from the Average · Above →",
        marginTop: 48,
    });

    document.getElementById("diverging-bar-NFL").append(divergingBar);
  });
