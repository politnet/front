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
      shape: 'circularImage',
      image: data['profile_image_url'],
      political_party: data['political_party'],
      positiveness: data['positiveness'],
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