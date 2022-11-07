/* Bar Chart of Covid Cases */

d3.csv('bar.csv').then(data => {
    for (let d of data) {
        d.num = +d.num;
    }

    const height = 400,
          width = 600,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50});

    let svg = d3.select("#bar-chart")
            .append("svg")
            .attr("viewbox", [0, 0, width, height]);

    const x = d3.scaleBand() 
            .domain(data.map(d => d.region))
            .range([margin.left, width-margin.right])
            .padding(0.1);
    
    const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.num)]).nice()
            .range([height - margin.bottom, margin.top]);
    
    const xAxis = g => g
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));
  

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y));


    svg.append("g")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);
    
    let bar = svg.selectAll(".bar") //creates bar group
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") //using the bar, appending an svg rectangle element
        .attr("fill", "steelblue")
        .attr("x", d => x(d.region))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.num))
        .attr("height", d => y(0) - y(d.num))
    
    bar.append('text')
        .text(d => d.num)
        .attr('x', d => x(d.region) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + 15) // to make it go above you go could make it "-#"
        .attr('text-anchor', 'middle')
        .style('fill', 'white');

});
