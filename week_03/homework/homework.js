/* Bar Chart of Library Visits in January 2022 */

d3.csv("data.csv").then(data => {
    for (let d of data) {
        d.num = +d.num;
    }

    /* specify height, width and margins of container */
    const height = 400,
          width = 600,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50});

    /* creates svg container from top left corner and builds down/to the right */
    let svg = d3.select("#chart")
          .append("svg")
          .attr("viewbox", [0, 0, width, height]);

    /* identify the domain and range for the x scale */
    /* uses scaleBand for discrete/categorical variable */
    const x = d3.scaleBand() 
          .domain(data.map(d => d.branch))
          .range([margin.left, width-margin.right])
          .padding(0.1);

    /* identify the domain and range of the y scale, uses nice to round up the maximum value for "padding" */
    /* uses scaleLinear for continuous variable */
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice()
        .range([height - margin.bottom, margin.top]);

    /* create x axis */
    const xAxis = g => g
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)   //move location of axis
        .call(d3.axisBottom(x));

    /* create y axis */
    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5}, 0)`)  //move location of axis
        .call(d3.axisLeft(y));
    
    /* append axes */
    svg.append("g")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);
    
    /* create bar group */
    let bar = svg.selectAll(".bar") 
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    /* using the bar group, append an svg rectangle element */
    bar.append("rect")
        .attr("fill", "steelblue")      //specify the color and fill of the rectangle
        .attr("x", d => x(d.branch))    // x position attribute
        .attr("width", x.bandwidth())   // width attribute of the element
        .attr("y", d => y(d.num))       // y position attribute
        .attr("height", d => y(0) - y(d.num));  // height attribute of element

    /* add text labels */
    bar.append('text')
        .text(d => d.num)   // for each record, label the rectangle with d.num
        .attr('x', d => x(d.branch) + (x.bandwidth()/2))    //position the text in the middle of the rectangle (horizontally speaking)
        .attr('y', d => y(d.num) - 15)      //position the text 15 pixels above the top of the rectangle
        .attr('text-anchor', 'middle')      // anchors text to the middle of the bandwidth
        .style('fill', 'gray');        // specify fill/color of text labels
    
});