var svg = d3.select("#legend-7")
      .append("svg")
      .attr("viewBox", [0, 0, 250, 10]);

    svg.append("circle").attr("cx",5).attr("cy",5).attr("r", 6).style("fill", "#ca0020")
    svg.append("circle").attr("cx",75).attr("cy",5).attr("r", 6).style("fill", "#0571b0")
    svg.append("circle").attr("cx",145).attr("cy",5).attr("r", 6).style("fill", "#c2a5cf")
    svg.append("text").attr("x", 15).attr("y", 5).text("Republican").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 85).attr("y", 5).text("Democrat").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 155).attr("y", 5).text("Other").style("font-size", "10px").attr("alignment-baseline","middle")
