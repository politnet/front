const partyColors = {
  'Democratic': '#3498DB', // blue
  'Democratic-dark': '#2471A3', // dark blue
  'Republican': '#E74C3C', // red
  'Republican-dark': '#A93226', // dark red
  'Independent': '#00B300', // green
  'Independent-dark': '##006600', // dark green
};

function scaleEdge(width) {
  return Math.log(width + 1) / 2
}

function scaleNode(value) {
  return Math.log((value + 1) ** 3)
}

function findNodeByAccountName(nodes, account_name) {
  return nodes.find(node => node.account_name === account_name)
}

function createNode(data) {
  console.log(`Parrty: ${data.political_party}, color ${partyColors[data.political_party]}`)

  return { 
    id: Math.random(),
    account_name: data.account_name,
    full_name: data.full_name,
    political_party: data.political_party,
    sentiment: data.sentiment,
    description: data.description,
    top_5_in_mentions: data.top_5_in_mentions,
    top_5_out_mentions: data.top_5_out_mentions,
    all_out_mentions: data.all_out_mentions,

    shape: 'circularImage',
    image: data.profile_image_url,
    value: scaleNode(data.in_degree),
    color: {
      border: partyColors[data.political_party],
      highlight: { 
        border: partyColors[data.political_party + '-dark'] 
      },
      hover: { 
        border: partyColors[data.political_party + '-dark']
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
    width: scaleEdge(mentions_count),
    mentions_count: mentions_count
  }
}

function transformTopMentions(nodes) {
  nodes.forEach(node => {
    node.top_5_in_mentions = node.top_5_in_mentions.map(mention => {
      return nodes.find(node => node.account_name === mention)
    })
    node.top_5_out_mentions = node.top_5_out_mentions.map(mention => {
      return nodes.find(node => node.account_name === mention)
    })
  })
}

export function buildOptions() {
    return {
        physics: {
          hierarchicalRepulsion: {
            nodeDistance: 120
          }
        },
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
    node.all_out_mentions.forEach(out_mention => {
      let node_to = findNodeByAccountName(nodes, out_mention.account_name)
      let mentions_count = out_mention.mentions_count
      edges.push(createEdge(node, node_to, mentions_count))
    })
  })

  // Store nodes instead of account names
  transformTopMentions(nodes)
  
  return {
      nodes: nodes,
      edges: edges
  };
}