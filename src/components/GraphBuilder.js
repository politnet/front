const partyColors = {
  'Democrats': '#3498DB', // blue
  'Democrats-dark': '#2471A3', // dark blue
  'Republicans': '#E74C3C', // red
  'Republicans-dark': '#A93226', // dark red
};

export function buildOptions() {
    return {
        interaction: {
          hover: true
        },
        layout: {
          hierarchical: false
        },
        edges: {
          color: "grey"
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

    let node = { 
      id: data['account_name'],
      full_name: data['full_name'],
      political_party: data['political_party'],
      positiveness: data['positiveness'],
     
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

    nodes.push(node)
  })

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

  return {
      nodes: nodes,
      edges: edges
  };
}