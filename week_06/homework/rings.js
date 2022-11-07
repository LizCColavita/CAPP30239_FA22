
d3.json('rings.json').then((data) => {
    for (let d of data) {
        createRing(d);
      }
    });

function createRing({ratio, values }) {
    const height = 400,
        width = 425,
        innerRadius = 80,
        outerRadius = 115,
        labelRadius = 135;
    
    const arcs = d3.pie().value(d => d.count)(values);
    
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    
    const svg = d3.select("#ring-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    
    svg.append("g")
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", (d, i) => d3.schemePaired[i])
        .attr("d", arc);
    
    svg.append("g")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .selectAll("tspan")
        .data(d => {
        return [d.data.category, d.data.count];
        })
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .attr("font-weight", (d, i) => i ? null : "bold")
        .text(d => d);
    
    svg.append("text")
        .attr("font-size", 16)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(ratio)
        .style("font-size", 20);
    }
