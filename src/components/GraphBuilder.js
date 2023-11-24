const edgeScale = 0.2
const nodeScale = 0.2

const partyColors = {
  'Democrats': '#3498DB', // blue
  'Democrats-dark': '#2471A3', // dark blue
  'Republicans': '#E74C3C', // red
  'Republicans-dark': '#A93226', // dark red
};

function findNodeByAccountName(nodes, account_name) {
  return nodes.find(node => node['account_name'] === account_name)
}

function createNode(data) {
  return { 
    id: Math.random(),
    account_name: data['account_name'],
    full_name: data['full_name'],
    political_party: data['political_party'],
    positiveness: data['positiveness'],
    description: data['description'],
    top_5_in_mentions: data['top_5_in_mentions'],
    top_5_out_mentions: data['top_5_out_mentions'],
    all_out_mentions: data['all_out_mentions'],

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

function createEdge(node_from, node_to, mentions_count) {
  return { 
    from: node_from.id,
    to: node_to.id,
    from_account_name: node_from.account_name,
    to_account_name: node_to.account_name,
    width: mentions_count * edgeScale,
    mentions_count: mentions_count
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
    node.value = (inDegrees[node.id] * nodeScale) || nodeScale;
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

  // Add edges
  nodes.forEach(node => {
    node['all_out_mentions'].forEach(out_mention => {
      let node_to = findNodeByAccountName(nodes, out_mention.account_name)
      let mentions_count = out_mention.mentions_count
      edges.push(createEdge(node, node_to, mentions_count))
    })
  })

  // Store nodes instead of account names
  transformTopMentions(nodes)

  resizeNodes(nodes, edges)

  return {
      nodes: nodes,
      edges: edges
  };
}