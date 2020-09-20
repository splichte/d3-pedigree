document.getElementById('ped-file').addEventListener('change', readFile, false);

let helpHidden = true;
document.getElementById('help').addEventListener('click', function (evt) {
  if (helpHidden) {
    d3.select('#help-div').style('display', 'block');
    d3.select('#help').text('(hide help)');
    helpHidden = false;
  } else {
    d3.select('#help').text('(show help)');
    d3.select('#help-div').style('display', 'none');
    helpHidden = true;
  }
}, false);

let first_run = true;

function readFile(evt) {
  const files = evt.target.files;
  const file = files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const text = event.target.result;
    const res = quickPedCheck(text);

    d3.select('body').select('div#error').selectAll("*").remove();
    if (res !== "") {
      // set error text
      d3.select('body').select('div#error')
        .append('span').text(res);
    } else {
      // delete all existing svgs
      d3.selectAll('div.family').remove();

      // draw each family as a separate svg
      const families = splitByFamilyId(text);
      for (const familyId of Object.keys(families)) {
        const family = families[familyId];
        const div = d3.select('body')
          .append('div')
          .attr('class', 'family');

        div.append('h5').text("kindred id: " + familyId);

        const svg = div
          .append('svg')
          .attr('width', '1200')
          .attr('height', '300')
          .style('display', 'block')
          .style('margin-bottom', '20px');

        const inner = svg.append('g');

        drawGraph(family, svg, inner);
      }
    }
  }
  reader.readAsText(file);
}

function splitByFamilyId(text) {
  const families = {};
  const lines = text.split('\n');
  for (const line of lines) {
    if (line.length === 0) continue;
    if (line[0] === '#') continue;
    const fields = line.split('\t');
    const familyId = fields[0];

    if (families[familyId] === undefined) {
      families[familyId] = line;
    } else {
      families[familyId] += '\n' + line;
    }
  }
  return families;
}

function quickPedCheck(text) {
  const lines = text.split('\n');

  let ctr = 0;

  for (const line of lines) {
    if (line[0] === '#') continue;
    if (line.length === 0) continue; // skip empty lines
    ctr += 1;
    const fields = line.split('\t');
    if (fields.length < 6) {
      return "error: each line in PED file must have at least 6 tab-separated fields.";
    }
  }

  if (ctr === 0) {
    return "error: PED file must have at least one line."
  }

  return "";
}

function drawDefaultGraph() {
  const defaultData = `
  132829	1829	0	0	1	0
  132829	1830	dad_132829_somalier	mom_132829_somalier	2	0
  132829	1836	1829	1830	1	0
  132829	1837	1836	1838	2	0
  132829	1838	1847	1848	2	0
  132829	1839	1836	1838	1	0
  132829	1840	1836	1838	2	0
  132829	1841	1836	1838	1	0
  132829	1842	1836	1838	1	0
  132829	1843	1836	1838	2	0
  132829	1844	1836	1838	2	0
  132829	1845	1836	1838	1	0
  132829	1846	1836	1838	2	0
  132829	1847	0	0	1	0
  132829	1848	0	0	2	0
  132829	2777	8100	8101	2	0
  132829	2778	8100	8101	2	0
  132829	2779	8100	8101	1	0
  132829	2780	8100	8101	2	0
  132829	2788	8125	8126	1	0
  132829	2789	8136	8135	2	0
  132829	2790	8136	8135	2	0
  132829	2946	8107	8108	2	1
  132829	46077	1829	1830	1	0
  132829	46078	46494	0	2	0
  132829	46079	46077	46078	2	0
  132829	46080	46077	46078	1	0
  132829	46081	46077	46078	1	0
  132829	46082	46077	46078	2	0
  132829	46083	46077	46078	1	0
  132829	46084	46077	46078	1	1
  132829	46086	46077	46078	2	0
  132829	46494	0	0	1	0
  132829	4841	8100	8101	2	0
  132829	4875	1836	1838	1	0
  132829	51497	8123	8124	2	0
  132829	51498	8123	8124	2	0
  132829	51499	8123	8124	2	1
  132829	51500	8123	8124	2	0
  132829	51501	8123	8124	2	0
  132829	51502	8123	8124	2	0
  132829	51503	8123	8124	2	0
  132829	51504	8123	8124	2	1
  132829	51505	8136	8135	2	1
  132829	51506	8095	8097	1	1
  132829	51507	8095	8097	2	0
  132829	51508	8095	8097	1	0
  132829	51509	8142	8143	1	0
  132829	51510	8142	8143	1	0
  132829	51511	8142	8143	2	0
  132829	51512	8142	8143	2	0
  132829	58078	8100	8101	2	0
  132829	8090	8095	8097	1	0
  132829	8091	8095	8097	1	0
  132829	8092	8095	8097	2	0
  132829	8093	8095	8097	2	0
  132829	8094	8100	8101	1	0
  132829	8095	8123	8124	1	0
  132829	8096	8095	8097	1	0
  132829	8097	8107	8108	2	0
  132829	8098	8100	8101	2	0
  132829	8099	8100	8101	2	0
  132829	8100	8139	8140	1	0
  132829	8101	8107	8108	2	0
  132829	8102	8107	8108	2	0
  132829	8103	8107	8108	2	0
  132829	8104	8107	8108	2	0
  132829	8105	8107	8108	2	0
  132829	8106	8107	8108	1	0
  132829	8107	0	0	1	0
  132829	8108	0	0	2	0
  132829	8109	8107	8108	2	0
  132829	8110	8107	8108	1	0
  132829	8123	0	0	1	0
  132829	8124	0	0	2	0
  132829	8125	8123	8124	1	0
  132829	8126	8373	8374	2	0
  132829	8127	8125	8126	1	0
  132829	8128	8125	8126	1	0
  132829	8129	8125	8126	1	0
  132829	8130	8136	8135	1	0
  132829	8131	8136	8135	1	0
  132829	8132	8136	8135	2	0
  132829	8133	8136	8135	1	0
  132829	8134	8136	8135	1	0
  132829	8135	8123	8124	2	0
  132829	8136	8138	8137	1	0
  132829	8137	0	0	2	0
  132829	8138	0	0	1	0
  132829	8139	0	0	1	0
  132829	8140	0	0	2	0
  132829	8141	8142	8143	1	0
  132829	8142	8123	8124	1	0
  132829	8143	8138	8137	2	0
  132829	8144	8125	8126	2	0
  132829	8145	8125	8126	2	0
  132829	8146	8142	8143	1	0
  132829	8175	8142	8143	2	0
  132829	8373	0	0	1	0
  132829	8374	dad_132829_somalier	mom_132829_somalier	2	0
  132829	8425	8142	8143	1	0
  132829	8426	8142	8143	1	0
  132829	8427	8125	8126	2	0
  132829	8428	8125	8126	1	0
  132829	8429	8136	8135	1	0
  132829	8432	8095	8097	1	0
  132829	8433	8095	8097	1	0
  132829	8598	8142	8143	2	0
  132829	8599	8142	8143	2	0`;
  const div = d3.select('body')
    .append('div')
    .attr('class', 'family');

  div.append('h5').text("example:");

  const svg = div
    .append('svg')
    .attr('width', '1200')
    .attr('height', '300')
    .style('display', 'block')
    .style('margin-bottom', '20px');

  const inner = svg.append('g');

  drawGraph(defaultData, svg, inner);
}

function drawGraph(dat, svg, inner) {
  const g = new dagreD3.graphlib.Graph();

  g.setGraph({});
  g.setDefaultEdgeLabel(function() { return {}; });

  const lines = dat.split('\n');

  const singleWidth = 100;
  const singleHeight = 100;
  const marriageWidth = 4 * singleWidth;

  // first pass: create the nodes
  // arrow from parents to "marriage", then from marriage to child
  // if single parent, still do "marriage"
  
  // an issue: remarriages. we can just have the pointer 2x.
  
  // we can just make the width wider. 
  const created = {};
  const isAffected = {}

  // these are global to the graph
  const adjacentNodes = {};
  const adjacentEdges = {};
 
  for (const line of lines) {
    if (line[0] === '#') continue;
    const fields = line.split('\t');
    if (fields.length < 6) continue;
    const sample = fields[1];
    const father = fields[2];
    const mother = fields[3];
    const sex = fields[4] === '1' ? 'male' : 'female'; // double-check this
    const affected = fields[5] === '0' ? false : true;
  
    if (father === '0' && mother === '0') continue; 
  
    // only set individual nodes. don't set marriages yet. or links.
    const shape = sex === 'male' ? 'rect' : 'circle';
    g.setNode(sample, { label: sample, width: singleWidth, height: singleHeight, shape, affected });
    created[sample] = true;
    isAffected[sample] = affected;
  }
  
  for (const line of lines) {
    if (line[0] === '#') continue;
    const fields = line.split('\t');
    if (fields.length < 6) continue;
    const sample = fields[1];
    const father = fields[2];
    const mother = fields[3];
    const sex = fields[4] === '1' ? 'male' : 'female'; // double-check this
    const affected = fields[5] === '0' ? false : true;

    if (father === '0' && mother === '0') continue; 

    // force creation of father/mother if they don't have their own rows
    if (!created[father] && father !== '0') {
      g.setNode(father, { label: father, width: singleWidth, height: singleHeight, shape: 'rect' });
      created[father] = true;
    }
  
    if (!created[mother] && mother !== '0') {
      g.setNode(mother, { label: mother, width: singleWidth, height: singleHeight, shape: 'circle' });
      created[mother] = true;
    }

    // if just one parent, that's fine. we'll handle that later.
    const marriage = father + ',' + mother;

    // set labels for matching. we won't draw these, though.
    g.setNode(marriage, { label: marriage, shape: 'diamond', width: 50, height: 50 });
  
    // pointer from mother/father to marriage. 
    if (father !== '0') {
      g.setEdge(father, marriage, { label: father+','+marriage });
    }
  
    if (mother !== '0') {
      g.setEdge(mother, marriage, { label: mother+','+marriage });
    }
  
    g.setEdge(marriage, sample, { label: sample+','+marriage });
  }
  
 
  // Set up zoom support
  const zoom = d3.zoom().on("zoom", function() {
        inner.attr("transform", d3.event.transform);
      });
  svg.call(zoom);
  
  // rendering
  const render = new dagreD3.render();
  
  render(inner, g);
  
  /* display:none edge labels */
  d3.selectAll('g.edgeLabel').selectAll('g.label')
    .style('display', 'none');
  
  /* style the affected nodes */
  /* TODO: this is hard to read. improve! */
  const active = {};
  inner.selectAll("g.node")
    .on('click', function (v) {
      if (active[v] === undefined) {
        active[v] = true;
      } else {
        active[v] = !active[v];
      }
    })
    .each(function(v) {
      // display:none marriage labels */
      if (!d3.select(this).select('polygon').empty()) {
        d3.select(this).select('g.label').style('display', 'none');
      }
  
      // when you leave mouseover, stop highlighting.
      d3.select(this).on('mouseleave', function(u) {
        if (active[u]) return;
  
        // just reset everything. we could determine only the 
        // set of nodes/edges that's changed, but I honestly don't
        // think it's worth it. 
        /* match what's in index.html style */
        inner.selectAll('g').each(function(w) {
          if (typeof w === 'object') { // edge
            const me = d3.select(this);
    
            me.select('path')
              .style('stroke', 'black')
              .style('stroke-width', '3px');
          } else { // node
            const me = d3.select(this);
    
            me
              .select('rect')
              .style('stroke', '#333')
              .style('stroke-width', '4px');
            me
              .select('circle')
              .style('stroke', '#333')
              .style('stroke-width', '4px');
            me
              .select('polygon')
              .style('stroke', '#333')
              .style('fill', '#333');
          }
        });

        // now go through the active ones and recolor
        for (const key of Object.keys(active)) {
          if (active[key]) {
            colorGroup(key, adjacentNodes, adjacentEdges);
          }
        }
      });

      // highlight entire immediate family on hover of marriage nodes
      d3.select(this).on('mouseover', function(u) {
        let group = [];
        let match;
        for (const n of g.nodes()) {
          if (v === n) {
            match = n;
            group.push(match);
          }
        }
  
        // there should be a match, but let's be safe
        // get all edges and nodes that share an edge.
        for (const e of g.edges()) {
          if (match === e.v) {
            if (e.w !== '0') {
              group.push(e.w);
            }
          } else if (match === e.w) {
            if (e.v !== '0') {
              group.push(e.v);
            }
          }
        }
        // if adjacent nodes is undefined, adjacent edges is also.
        if (adjacentNodes[match] === undefined) {
          adjacentNodes[match] = [];
          adjacentEdges[match] = [];

          inner.selectAll("g").each(function(w) {
            if (typeof w === 'object') { // it's an edge
              const src = w.v;
              const dst = w.w;
              // if src and dst are both members, color the edge
              let ctr = 0;
              for (const member of group) {
                if (src === member) {
                  ctr += 1;
                } else if (dst === member) {
                  ctr += 1;
                }
              }
    
              if (ctr === 2) {
                adjacentEdges[match].push(this);
              }
            } else { // it's a node
              for (const member of group) {
                if (w === member) {
                  adjacentNodes[match].push(this);
                  break;
                }
              }
            }
          });
        }

        colorGroup(match, adjacentNodes, adjacentEdges);
      });
  
      if (isAffected[v]) { 
        d3.select(this).select("rect").style("fill", "lightgray");
        d3.select(this).select("circle").style("fill", "lightgray");
      }
    });

  // set the svg viewport based on the width of the screen (just 1x)

  // zoom and scale to fit
  const graphWidth = g.graph().width + 80;
  const graphHeight = g.graph().height + 40;
  const width = parseInt(svg.style("width").replace(/px/, ""));
  const height = parseInt(svg.style("height").replace(/px/, ""));
  const zoomScale = Math.min(width / graphWidth, height / graphHeight);
  const translateX = (width / 2) - ((graphWidth * zoomScale) / 2);
  // gets cut off at top without +5
  const translateY = (height / 2) - ((graphHeight * zoomScale) / 2) + 5;
  svg.call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomScale));
}

function colorGroup(match, adjacentNodes, adjacentEdges) {
  for (const node of adjacentNodes[match]) {
    const me = d3.select(node);
    me
      .select('rect')
      .style('stroke', 'green')
      .style('stroke-width', '8px');
    me
      .select('circle')
      .style('stroke', 'green')
      .style('stroke-width', '8px');
    me
      .select('polygon')
      .style('stroke', 'green')
      .style('fill', 'green');
  }

  for (const edge of adjacentEdges[match]) {
    const me = d3.select(edge);

    me.select('path')
      .style('stroke', 'green')
      .style('stroke-width', '6px'); 
  }
}

drawDefaultGraph();
