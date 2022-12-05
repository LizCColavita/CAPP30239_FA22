var svg = d3.select("#legend-7")
      .append("svg")
      .attr("viewBox", [0, 0, 530, 10]);

    svg.append("circle").attr("cx",5).attr("cy",5).attr("r", 4).style("fill", "#ca0020")
    svg.append("circle").attr("cx",65).attr("cy",5).attr("r", 4).style("fill", "#0571b0")
    svg.append("circle").attr("cx",125).attr("cy",5).attr("r", 4).style("fill", "#c2a5cf")
    svg.append("text").attr("x", 12).attr("y", 5).text("Republican").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 72).attr("y", 5).text("Democrat").style("font-size", "8px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 132).attr("y", 5).text("Other").style("font-size", "8px").attr("alignment-baseline","middle")
