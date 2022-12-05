/* Donut Charts for WNBA Donations Section */
/* References code from https://github.com/tiffanyfrance/CAPP30239_FA22*/

// Create array for WNBA data
let WNBA = [
    {"category": "All", "values": 
        [{"party": "Democrat", "amount": 52}, {"party": "Republican", "amount": 42}, {"party": "Other", "amount": 6}]},
    {"category": "Men", "values": 
        [{"party": "Democrat", "amount": 72}, {"party": "Republican", "amount": 20}, {"party": "Other", "amount": 8}]},
    {"category": "Women", "values": 
        [{"party": "Democrat", "amount": 8}, {"party": "Republican", "amount": 90}, {"party": "Other", "amount": 2}]}
];

const colors = ['#0571b0','#ca0020', '#c2a5cf'];

// create donut charts
for (let d of WNBA) {
    createRingsWNBA(d);
};


//Define createRingsWNBA function
function createRingsWNBA({ category, values }) {
    const height = 200,
    width = 300,
    innerRadius = 45,
    outerRadius = 90,
    labelRadius = 110;

    const arcs = d3.pie()
        .startAngle(-90 * (Math.PI / 180))
        .endAngle(90 * (Math.PI / 180))
        .value(d => d.amount)(values);


    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const svg = d3.select("#WNBA-donuts")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width/1.5, -height/1.5, width, height])
        .attr("style", "max-width: 100%; height: auto;");

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
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .selectAll("tspan")
        .data(d => (d.data.amount > 8) ? [d.data.category, d.data.amount + "%"] : [])
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        //.attr("font-weight", (d, i) => i ? null : "bold")
        .text(d => d);

    svg.append("text")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "center")
        .text(category)
        .style("font-size", 16);
    
    };

