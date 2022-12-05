/* Creates sidebar charts providing an overview of the political donation landscape */

Promise.all([
    d3.csv("data/sports-political-donations-unseparated.csv"),
    d3.csv("data/sports-political-donations-clean.csv")
  ]).then(([unseparated, clean]) => {

    console.log("Unseparated Raw", unseparated)
    console.log("Clean Raw", clean)

    // create array for overall gender data
    let genderData = [
        {category: "Number of Owners", values: [{gender: "Women", amount: 25}, {gender: "Men", amount: 133}]},
        {category: "Donations ($ mil)", values: [{gender: "Women", amount: 6.9}, {gender: "Men", amount: 40.1}]}
    ];
  

    // create array for overall league data
    let leagueData = [
        {league: "WNBA", amount: 0},
        {league: "NBA", amount: 0},
        {league: "NFL", amount: 0},
        {league: "NHL", amount: 0},
        {league: "MLB",  amount: 0},
        {league: "NASCAR",  amount: 0},  
    ];

    for (let d of clean) {
        d.Amount = +d.Amount
        if (d.League == "WNBA") {
            leagueData[0].amount += d.Amount;
        } else if (d.League == "NBA") {
            leagueData[1].amount += d.Amount;
        } else if (d.League == "NFL") {
            leagueData[2].amount += d.Amount;
        } else if (d.League == "NHL") {
            leagueData[3].amount += d.Amount;
        } else if (d.League == "MLB") {
            leagueData[4].amount += d.Amount;
        } else if (d.League == "NASCAR") {
            leagueData[5].amount += d.Amount;
        }
    };

    //change format of amounts in leagueData
    for (let d of leagueData){
        d.amount = +(d.amount/1000000).toFixed(2)
    }

    // create object for party data
    let partyData = [{name: "party", size: null},
        {name: "party.Republican", size: 34.2},
        {name: "party.Bipartisan-Independent", size: 1.8},
        {name: "party.Democrat", size: 10.1}];

        
    // create donut charts
    for (let d of genderData) {
        createRing(d);
    };

    // create treemap
    let colors3 = ['#ca0020', '#c2a5cf', '#0571b0'];

    let treeMap = Treemap(partyData, {
        path: d => d.name.replace(/\./g, "/"), // e.g., "flare/animate/Easing"
        value: d => d?.size,
        group: d => d.name.split(".")[1],
        label: (d, n) => `${" $" + n.value.toLocaleString("en") + " mil"}`,
        title: (d, n) => `${d.name.split(".")[1]}\n${"$" + n.value.toLocaleString("en") + " mil"}`, // text to show on hover
        tile: d3.treemapBinary,
        colors: colors3,
        fillOpacity: 1,
        marginLeft: -50,
    })


    document.getElementById("party-sidebar").append(treeMap);

    // create horizontal bar chart
    let horizontalBar = BarChart(leagueData, {
        x: d => d.amount,
        y: d => d.league,
        yDomain: d3.groupSort(leagueData, ([d]) => -d.amount, d => d.league),
        marginTop: 20,
        marginRight: 5,
        marginBottom: 5,
        marginLeft: 5,
        width: 225,
        height: 250,
        xLabel: "$ millions",
        color: '#36454f',

        })

    document.getElementById("league-sidebar").append(horizontalBar);

});


function createRing({ category, values }) {
    const height = 225,
      width = 200,
      innerRadius = 45,
      outerRadius = 95,
      labelRadius = 118;
  
    const arcs = d3.pie()
        .startAngle(-90 * (Math.PI / 180))
        .endAngle(90 * (Math.PI / 180))
        .value(d => d.amount)(values);

  
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
  
    const svg = d3.select("#gender-donut-sidebar")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const colors = ['#36454f' ,'#757C80'];
    
    svg.append("g")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d, i) => colors[i])
      .attr("d", arc);
  
    svg.append("g")
      .attr("font-size", 14)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan")
      .data(d => {
        return [d.data.gender, d.data.amount];
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i) => `${i * 1.1}em`)
      .attr("font-weight", (d, i) => i ? null : "bold")
      .text(d => d);
  
    svg.append("text")
      .attr("font-weight", "bold")     
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "center")
      .attr("y", 25)
      .text(category)
      .style("font-size", 14);
    
}



