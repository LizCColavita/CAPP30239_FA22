/* D3 Line Chart */
const height = 250, 
    width = 500,
    margin = ({ top: 20, right: 50, bottom: 40, left: 50 });

const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('line.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m");
    
    for (let d of data) {
        d.Month = timeParse(d.Month)             
        d.Count = +d.Count;
    }

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left + 5, width - margin.right]);
    
    let y = d3.scaleLinear()
        .domain ([60, d3.max(data, d => d.Count) + 10])
        .range([height - margin.bottom, margin.top])

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.1em")
      .attr("dy", "-0.1em") 
      .text("Month");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.1em")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .text("Count");

    let line = d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Count));

    svg.append("path")
        .datum(data)        //singular because there is only 1 path/1 line
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

    svg.append("foreignObject")
        .attr("x", 210)
        .attr("y", 25)
        .attr("width", 120)
        .attr("height", 100)
        .append('xhtml:div')
        .append("p")
        .html('Max: 152 in July');

    svg.append("foreignObject")
        .attr("x", 175)
        .attr("y", 140)
        .attr("width", 120)
        .attr("height", 100)
        .append('xhtml:div')
        .append("p")
        .html('Min: 103 in June');
    });
