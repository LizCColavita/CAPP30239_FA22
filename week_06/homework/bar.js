/* Bar Chart */
(function barchart() {
    let height = 400,
    width = 600,
    margin = ({ top: 50, right: 30, bottom: 50, left: 30});

    const svg = d3.select("#bar-chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    d3.csv("bar.csv").then( data => {
    
        let x = d3.scaleBand(data.map(d => (d.Region)),[margin.left, width - margin.right])
          .padding([0.2]);
  
        let y = d3.scaleLinear([0, 450],[height - margin.bottom, margin.top]);
  
        svg.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x))
  
        svg.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))
        
        //create subgroups
        const subgroups = data.columns.slice(1);
        const color = d3.scaleOrdinal(subgroups,['#a6cee3','#1f78b4','#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f']); //scaleOrdinal maps colors to the subgroups
        const stackedData = d3.stack()
          .keys(subgroups)(data)

        svg.append("g")
          .selectAll("g")
          .data(stackedData)
          .join("g")
          .attr("fill", d => color(d.key))
          .selectAll("rect")
          .data(d => d) //uses whatever row we're in stackedData for the data (uses a specific array)
          .join("rect")
          .attr("x", d => x(d.data.Region))
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width",x.bandwidth())


        /* Manual legend */
        svg.append("circle").attr("cx",10).attr("cy",10).attr("r", 4).style("fill", "#a6cee3")
        svg.append("circle").attr("cx",70).attr("cy",10).attr("r", 4).style("fill", "#1f78b4")
        svg.append("circle").attr("cx",130).attr("cy",10).attr("r", 4).style("fill", "#b2df8a")
        svg.append("circle").attr("cx",190).attr("cy",10).attr("r", 4).style("fill", "#33a02c")
        svg.append("circle").attr("cx",250).attr("cy",10).attr("r", 4).style("fill", "#fb9a99")
        svg.append("circle").attr("cx",310).attr("cy",10).attr("r", 4).style("fill", "#e31a1c")
        svg.append("circle").attr("cx",370).attr("cy",10).attr("r", 4).style("fill", "#fdbf6f")
        svg.append("text").attr("x", 20).attr("y", 10).text("Black").style("font-size", "8px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 80).attr("y", 10).text("Asian").style("font-size", "8px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 140).attr("y", 10).text("Hispanic").style("font-size", "8px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 200).attr("y", 10).text("Native").style("font-size", "8px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 260).attr("y", 10).text("White").style("font-size", "8px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 320).attr("y", 10).text("Other").style("font-size", "8px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 380).attr("y", 10).text("Unspecified").style("font-size", "8px").attr("alignment-baseline","middle")
      
      
    });
})();

// const svg = d3.select("#bar-chart")
//     .append("svg")
//     .attr("viewBox", [0, 0, width, height]);

// d3.csv("bar.csv").then(data => {
//     for (let d of data) {
//         d.num = +d.num;
//     }

//     const x = d3.scaleBand() 
//             .domain(data.map(d => d.region))
//             .range([margin.left, width-margin.right])
//             .padding(0.1);
    
//     const y = d3.scaleLinear()
//             .domain([0, d3.max(data, d => d.num)]).nice()
//             .range([height - margin.bottom, margin.top]);
    
//     const xAxis = g => g
//         .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
//         .call(d3.axisBottom(x));
  

//     const yAxis = g => g
//         .attr("transform", `translate(${margin.left - 5}, 0)`)
//         .call(d3.axisLeft(y));


//     svg.append("g")
//         .call(xAxis);
    
//     svg.append("g")
//         .call(yAxis);
    
//     let bar = svg.selectAll(".bar") //creates bar group
//         .append("g")
//         .data(data)
//         .join("g")
//         .attr("class", "bar");

//     bar.append("rect") //using the bar, appending an svg rectangle element
//         .attr("fill", "steelblue")
//         .attr("x", d => x(d.region))
//         .attr("width", x.bandwidth())
//         .attr("y", d => y(d.num))
//         .attr("height", d => y(0) - y(d.num))
    
//     bar.append('text')
//         .text(d => d.num)
//         .attr('x', d => x(d.region) + (x.bandwidth()/2))
//         .attr('y', d => y(d.num) + 15) // to make it go above you go could make it "-#"
//         .attr('text-anchor', 'middle')
//         .style('fill', 'white');

// });
// })();
