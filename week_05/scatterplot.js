let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]); // viewBox changes the size

d3.csv('penguins.csv').then(data => { //promise - loads the data
  
  let x = d3.scaleLinear() //declare x scale
    .domain(d3.extent(data, d => d.body_mass_g)).nice() //specified by data; xtent takes the min and max from the data
    .range([margin.left, width - margin.right]); // space it takes up on the page

  let y = d3.scaleLinear() // declare y scale
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice() //specified by data; extent takes the min and max from the data
    .range([height - margin.bottom, margin.top]); //space it takes up on the page

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom)) //peep tickSize, draws the gridlines

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right)) //peep tickSize, draws the gridlines

  svg.append("g")
    .attr("fill", "black")
    .selectAll("circle") //selecting the circle
    .data(data)
    .join("circle") //puts circle on the page
    .attr("cx", d => x(d.body_mass_g))
    .attr("cy", d => y(d.flipper_length_mm))
    .attr("r", 2)
    .attr("opacity", 0.75);

  const tooltip = d3.select("body").append("div") //selecting the html body
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle")
    .on("mouseover", function(event, d) {
      d3.select(this).attr("fill", "red"); //changes color of selected  circle
      tooltip
        .style("visibility", "visible") //makes toltip visible
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    .on("mousemove", function(event) { //puts the data near the tooltip
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() { //allows for the color/text to turn off after hovering off
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    })
    
});