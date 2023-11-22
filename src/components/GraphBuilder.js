const partyColors = {
  'Democrats': '#3498DB', // blue
  'Democrats-dark': '#2471A3', // dark blue
  'Republicans': '#E74C3C', // red
  'Republicans-dark': '#A93226', // dark red
};

function createNode(data) {
  return { 
    id: data['account_name'],
    full_name: data['full_name'],
    political_party: data['political_party'],
    positiveness: data['positiveness'],
    description: data['description'],
    top_5_in_mentions: data['top_5_in_mentions'],
    top_5_out_mentions: data['top_5_out_mentions'],

    shape: 'circularImage',
    image: data['profile_image_url'],
    color: {
      border: partyColors[data['political_party']],
      highlight: { 
        border: partyColors[data['political_party'] + '-dark'] 
      },
      hover: { 
        border: partyColors[data['political_party'] + '-dark']
      },
    }
  }
}

function createEdge(account_name, out_mention) {
  let out_mention_account_name = Object.keys(out_mention)[0];
  let out_mention_count = out_mention[out_mention_account_name];
  return { 
    from:account_name,
    to: out_mention_account_name,
    width: out_mention_count / 2
  }
}

function transformTopMentions(nodes) {
  nodes.forEach(node => {
    node['top_5_in_mentions'] = node['top_5_in_mentions'].map(mention => {
      return nodes.find(node => node['id'] === mention)
    })
    node['top_5_out_mentions'] = node['top_5_out_mentions'].map(mention => {
      return nodes.find(node => node['id'] === mention)
    })
  })
}

function resizeNodes(nodes, edges) {
  let inDegrees = {};
  edges.forEach(edge => {
    if (inDegrees[edge.to]) {
      inDegrees[edge.to] += edge.width;
    } else {
      inDegrees[edge.to] = edge.width;
    }
  });

  nodes.forEach(node => {
    node.value = (inDegrees[node.id] / 2) || 1;
  });
}

export function buildOptions() {
    return {
        interaction: {
          hover: true
        },
        layout: {
          hierarchical: false
        },
        edges: {
          color: {
            color: '#e2e2e2',
            hover: '#7a7a7a',
          },
          smooth: {
            type: 'dynamic',
            forceDirection: 'none',
            roundness: 0.5
          },
          hoverWidth: function (width) { return width; }
        },
        nodes: {
          borderWidth: 8,
          borderWidthSelected: 11
        }
      };
}

export function readGraph() {
  let nodes = []
  let edges = []

  const context = require.context('../../data', true, /\.json$/)

  // Add nodes
  context.keys().forEach(key => {
    const data = context(key)
    nodes.push(createNode(data))
  })

  // Store nodes instead of account names
  transformTopMentions(nodes)

  // Add edges
  context.keys().forEach(key => {
    const data = context(key)
    const account_name = data['account_name']
    data['all_out_mentions'].forEach(out_mention => {
      edges.push(createEdge(account_name, out_mention))
    })
  })

  resizeNodes(nodes, edges)

  return {
      nodes: nodes,
      edges: edges
  };
}