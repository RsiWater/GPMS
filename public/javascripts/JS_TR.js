const data = [ { "name": "1", "relevence": 2 }, { "name": "2", "relevence": 1 }, { "name": "3", "relevence": 2 }, { "name": "4", "relevence": 1 }, { "name": "5", "relevence": 2 }, { "name": "6", "relevence": 1 }, { "name": "7", "relevence": 2 }, { "name": "8", "relevence": 2 }, { "name": "9", "relevence": 1 }, { "name": "10", "relevence": 1 }, { "name": "11", "relevence": 2 }, { "name": "12", "relevence": 2 }, { "name": "13", "relevence": 2 }, { "name": "14", "relevence": 2 }, { "name": "15", "relevence": 1 }, { "name": "16", "relevence": 1 }, { "name": "17", "relevence": 2 }, { "name": "18", "relevence": 1 }, { "name": "19", "relevence": 2 }, { "name": "20", "relevence": 1 }, { "name": "21", "relevence": 2 }, { "name": "22", "relevence": 2 }, { "name": "23", "relevence": 1 }, { "name": "24", "relevence": 1 } ];
let nodes;

const container = document.getElementById('root');

const width = container.offsetWidth * 2,
  height = container.offsetHeight;

const radiusScale = d3.scaleSqrt()
  .domain([1, 2])
  .range([height/7, height/5]);

const xScale = d3.scaleLinear()
  .domain([0, data.length])
  .range([100, width]);

const svg = d3.select('#root')
  .append('svg')
  .attr('class', 'bubbles')
  .attr('id', 'bubbles')
  .attr('width', width)
  .attr('height', height)
  .append('g');

const simulation = d3.forceSimulation(data)
  .force('x', d3.forceX().x(d => xScale(d.index)))
  .force('y', d3.forceY(height / 2))
  .force('collision', d3.forceCollide().radius(d => radiusScale(d.relevence) + 1))
  .on('tick', ticked);

function ticked() {
  nodes = svg.selectAll('g')
    .data(data, d => d.name);
  const circles = nodes.enter()
    .append('g');
  circles
    .append('circle')
    .attr('r', d => radiusScale(d.relevence))
    .attr('data-name', d => d.name);
  circles
    .append('text')
    .attr('text-anchor', 'middle')
    .text(d => d.name)
    .attr('data-name', d => d.name);

  circles.merge(nodes)
    .attr('transform', d => `translate(${d.x}, ${d.y})`);
}

document.getElementById('bubbles').addEventListener('click', e => {
  const el = e.target;
  const nodeName = el.nodeName;
  if ( nodeName === 'circle' || nodeName === 'text' ) {
    const name = el.getAttribute('data-name');
    const index = data.findIndex(d => d.name === name);
    data.splice(index, 1);

    nodes = svg.selectAll('g')
      .data(data, d => d.name);
    
    nodes.exit()
      .select('text')
        .remove();
    nodes.exit()
      .select('circle')
        .transition().duration(400)
        .attr('r', '0')
        .remove();
    setTimeout(() => {
      simulation.nodes(data).alpha(1).restart();
    }, 200);
  }
});

