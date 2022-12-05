var svg = d3.select("#legend-5")
    .append("svg")
    .attr("viewBox", [0, 0, 800, 5]);

    svg.append("circle").attr("cx",0).attr("cy",5).attr("r", 5).style("fill", "#757C80")
    svg.append("circle").attr("cx",195).attr("cy",5).attr("r", 5).style("fill", "#800080")
    svg.append("text").attr("x", 10).attr("y", 5).text("Proportion Women Owners").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 205).attr("y", 5).text("Proportion Women's Political Donations").style("font-size", "10px").attr("alignment-baseline","middle")