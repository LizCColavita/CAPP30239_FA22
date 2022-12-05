var svg = d3.select("#legend-7")
    .append("svg")
    .attr("viewBox", [0, 0, 400, 10]);

    svg.append("circle").attr("cx",5).attr("cy",5).attr("r", 2).style("fill", "#0571b0")
    svg.append("circle").attr("cx",55).attr("cy",5).attr("r", 2).style("fill", "#ca0020")
    svg.append("circle").attr("cx",105).attr("cy",5).attr("r", 2).style("fill", "#c2a5cf")
    svg.append("text").attr("x", 10).attr("y", 5).text("Democrat").style("font-size", "6px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 60).attr("y", 5).text("Republican").style("font-size", "6px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 110).attr("y", 5).text("Other").style("font-size", "6px").attr("alignment-baseline","middle")
