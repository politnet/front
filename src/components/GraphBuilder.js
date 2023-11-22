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
      inDegrees[edge.to]++;
    } else {
      inDegrees[edge.to] = 1;
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
          color: "grey",
          smooth: {
            type: 'dynamic',
            forceDirection: 'none',
            roundness: 0.5
          }
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
    data['all_out_mentions'].forEach(out_mention => {
      let edge = { 
        from: data['account_name'],
        to: out_mention
      }
      edges.push(edge)
    })
  })

  resizeNodes(nodes, edges)

  return {
      nodes: nodes,
      edges: edges
  };
}