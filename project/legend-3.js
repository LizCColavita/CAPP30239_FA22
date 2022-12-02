var svg = d3.select("#legend-3")
    .append("svg")
    .attr("viewBox", [0, 0, 400, 5]);

    svg.append("circle").attr("cx",5).attr("cy",5).attr("r", 2).style("fill", "#757C80")
    svg.append("circle").attr("cx",55).attr("cy",5).attr("r", 2).style("fill", "#800080")
    svg.append("text").attr("x", 10).attr("y", 5).text("Men").style("font-size", "6px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 60).attr("y", 5).text("Women").style("font-size", "6px").attr("alignment-baseline","middle")
