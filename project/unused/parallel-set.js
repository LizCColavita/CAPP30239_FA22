// largely based off of code from https://github.com/tiffanyfrance/CAPP30239_FA22/blob/main/week_08/parallel-set/parallel-set.js

const width = 1000,
  height = 600,
  margin = { top: 25, right: 0, bottom: 20, left: 0 },
  nodeWidth = 5,
  nodePadding = 10;

const svg = d3.select("#parallel-set")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/sankey.csv").then((data) => {

  for (let d of data) {
    d.value = +d.value;
  }

  let leagues = [...new Set(data.map(d => d.source))];//spread syntax
  //console.log(leagues);

  let graph = nodeLinkData(data, ["source", "target"]);

  console.log(graph, data);

  let sankey = d3.sankey()
    .nodeSort((a, b) => a.name.localeCompare(b.name))
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent([
      [margin.left, margin.top], 
      [width - margin.right, height - margin.bottom]
    ]);

  let color = d3.scaleOrdinal()
    .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'])
    .domain(leagues);

  const { nodes, links } = sankey(graph); // modifies and returns graph

  svg.append("g")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("height", d => d.y1 - d.y0)
    .attr("width", d => d.x1 - d.x0)
    .append("title")
    .text(d => d.name);

  svg.append("g")
    .attr("fill", "none")
    .selectAll("g")
    .data(links)
    .join("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("stroke", d => color(d.source.name))
    .attr("stroke-width", d => d.width)
    .attr("opacity", 0.75)
    .style("mix-blend-mode", "multiply")
    .on("mouseover", function() {
      d3.select(this)
        .attr("opacity", 1);
    })
    .on("mouseout", function() {
      d3.select(this)
        .attr("opacity", 0.75);
    })
    .on("click", function(e, d) {
      let str = `${d.source.name} earned ${d.source.value.toLocaleString()} ${d.target.name} Parties`;
      d3.select("h2")
        .html(str);
    })
    .append("title")
    .text(d => `${d.source.name} ${d.target.name}`);

  // Text elements below
  svg.append("g")
    .style("font-weight", "bold")
    .append("text")
    .attr("x", 0)
    .attr("y", 16)
    .text("League x Gender of Owner");

  svg.append("g")
    .style("font-weight", "bold")
    .append("text")
    .attr("x", width - margin.left)
    .attr("y", 16)
    .attr("text-anchor", "end")
    .text("Parties");

  svg.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .text(d => d.name);
});

// This function separates data into links and nodes
function nodeLinkData(data, [source, target]) {
  const keys = [source, target];
  const seenNodes = new Set();
  const indexByName = {};
  let index = -1;

  // form nodes
  const nodes = [];
  for (const k of keys) {
    for (const d of data) {
      const name = d[k];
      if (seenNodes.has(name)) continue;
      const node = { name };
      nodes.push(node);
      seenNodes.add(name);
      indexByName[name] = ++index;
    }
  }

  // form links
  const links = [];
  for (const d of data) {
    links.push({
      source: indexByName[d[source]],
      target: indexByName[d[target]],
      value: d.value 
    });
  }

  return { nodes, links };
}