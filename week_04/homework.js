/* Line Chart Exercise: Canadian 2020 Interest Rates */

/* Define constants (height, width, margin, and svg) because it's not dependent on data */
const height = 400, 
    width = 800,
    margin = ({ top: 15, right: 40, bottom: 40, left: 50 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

/* load data and convert variables into the proper type/form */
d3.csv('long-term-interest-canada.csv').then(data => {
    
    let timeParse = d3.timeParse("%Y-%m"); //define function to convert Month
    
    /* loop through records and reformat Month and Num */
    for (let d of data) {              
        d.Month = timeParse(d.Month);
        d.Num = +d.Num;
    }

    console.log(data) //check to make sure dates converted properly

    /* define x and y axes */
    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left + 5, width - margin.right]);
    
    let y = d3.scaleLinear()
        .domain ([0, d3.max(data, d => d.Num) + 0.2])
        .range([height - margin.bottom, margin.top]);
    
    
    /* append axes to svg */
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%"));
    
    
    /* add axis labels */
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top*2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    /* create line */
    let line = d3.line()
      .x(d => x(d.Month))
      .y(d => y(d.Num));

    /* add line (path) to svg */
    svg.append("path")
      .datum(data)        //singular because there is only 1 path/1 line
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "green");

});