const width = 860,
      height = 100,
      margin = { top: 10, right: 30, bottom: 20, left: 0 };

    const svg = d3.select("#WNBA-bar")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    d3.csv("data/WNBA.csv").then(data => {

      let x = d3.scaleLinear([0, 100], [margin.left, width - margin.right]);

      let y = d3.scaleBand(data.map(d => (d.league)), [margin.top, height - margin.bottom]) //scaleBand specifically for bar charts
        .padding([0.1]);

      const subgroups = data.columns.slice(1);

      const color = d3.scaleOrdinal(subgroups, ['#757C80', '#800080']);

      const stackedData = d3.stack()
        .keys(subgroups)(data)

      svg.append("g")
        .selectAll("g")
        .data(stackedData)
        .join("g")
        .attr("fill", d => color(d.key))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", d => x(d[0]))
        .attr("y", d => y(d.data.group))
        .attr("width", d => x(d[1]) - x(d[0]))
        .attr("height", y.bandwidth());
      
    });