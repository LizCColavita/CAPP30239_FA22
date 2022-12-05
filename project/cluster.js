
let width = 1000,
    height = 400
    gWidth = width/2;

Promise.all([
    d3.csv("data/cluster-men.csv"),
    d3.csv("data/cluster-women.csv")
    ]).then(([Men, Women]) => {

    let datasets = [{category: "Men Owners", values: Men}, {category: "Women Owners", values: Women}]


    for (let set of datasets) {
        data = set.values
        string = set.category
        createCluster(data,string);
    };

});

function createCluster(data, string) {

    let svg = d3.select("#cluster")
        .append("svg")
        .attr("width", gWidth)
        .attr("height", height)
        .attr("viewBox", [0, 0, width/1.3, height]);

 
    for (let d of data){
        d.amount = +d.amount/1000;
        d.party_int = +d.party_int;
    }

    let result = d3.group(data, d => d.party);

    console.log(result)

    let rScale = d3.scaleLinear()
        .range([10, 100])
        .domain(d3.extent(data, d => d.amount));

    let colors = d3.scaleOrdinal()
        .range(['#ca0020', '#ff6880', '#9765ad', '#0571b0', '#fff', '#757C80', '#58befa'])
        .domain(d3.map(data, d => d.party));

    // let x = d3.scaleLinear()
    //     .domain(d3.extent(data, d => d.party_int))
    //     .range([0, 8])

    let simulation = d3.forceSimulation(data)
        .force("charge", d3.forceManyBody().strength(1000)) //strength
        //.force('x', d3.forceX().x())
        //.force('y', d3.forceY().y(height/2))
        .force("center", d3.forceCenter().x(width / 2).y(height / 2))
        .force("collision", d3.forceCollide().radius(d => rScale(d.amount) + 1.5));

    let g = svg.append("g")
        .attr("class", "group");

    simulation.on("tick", () => {
        g.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("stroke", "#757C80")
        .attr("stroke-width", 0.5)
        .attr("r", d => rScale(d.amount))
        // .attr("fill", "red")
        .attr("fill", d => colors(d.party))
        .attr("opacity", 0.90)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .on("mouseover", function (event, d) {
            d3.select(this).attr("opacity", 1);

            tooltip
            .style("visibility", "visible")
            .html(`<h3>${d.league}</h3><br />Total Donations: ${d.amount}<br /><span style="text-transform: capitalize">Party Affiliation: ${d.party}</span>`);
        })
        .on("mousemove", function (event) {
            tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            d3.select(this).attr("opacity", 0.90);
            tooltip.style("visibility", "hidden");
        })
    })

    svg.append("text")
        .text(string)
        .attr("x",gWidth * (0.5) - 80)
        .attr("y", 90)
        .attr("text-anchor","middle")
        .style("text-transform","capitalize")
        .style("font-weight","bold")
        .attr("font-size", 24);

    for (let i = 0; i < 200; i++) {
        simulation.tick()
    }


    const tooltip = d3.select("body").append("div")
        .attr("class", "svg-tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden");
        
}