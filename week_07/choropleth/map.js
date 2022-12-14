const tooltip = d3.select("body")
  .append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([ //promise.all because we have 2 data sets
  d3.csv("data/unemployment2020.csv"),
  d3.json("libs/counties-albers-10m.json")
]).then(([data, us]) => {
  const dataById = {};

  for (let d of data) {
    d.rate = +d.rate;
    //making a lookup table from the array (unemployment data)
    dataById[d.id] = d;
  }

  console.log(dataById);
  
  const counties = topojson.feature(us, us.objects.counties);

  // Quantize evenly breakups domain into range buckets
  const color = d3.scaleQuantize()
    .domain([0, 10]).nice()
    .range(d3.schemeBlues[9]); //actually 10 values because it is zero based

  const path = d3.geoPath();

  d3.select("#legend")
    .node()
    .appendChild(
      Legend(
        d3.scaleOrdinal(
          ["1", "2", "3", "4", "5", "6", "7", "8", "9+"],
          d3.schemeBlues[9]
        ),
        { title: "Unemployment rate (%)" }
      ));

  svg.append("g")
    .selectAll("path")
    .data(counties.features) //see line 28
    .join("path")
    .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc') //#ccc is saying fill in gray if rate is missing
    .attr("d", path)
    .on("mousemove", function (event, d) {
      let info = dataById[d.id];
      tooltip
        .style("visibility", "visible")
        .html(`${info.county}<br>${info.rate}%`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc');
    });
});