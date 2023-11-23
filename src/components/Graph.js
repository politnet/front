import Graph from "react-graph-vis";
import { React, useState } from "react";
import NodeTooltip from "./nodeTooltip/NodeTooltip";
import { buildOptions, readGraph } from './GraphBuilder'
import Details from "./details/Details"
import "./Graph.css";
import About from "./about/About";
import EdgeTooltip from "./edgeTooltip/EdgeTooltip";

const options = buildOptions();
const graph = readGraph();

const GraphComponent = () => {
    const [nodeTooltip, setNodeTooltip] = useState(null);
    const [nodeTooltipPosition, setNodeTooltipPosition] = useState({ x: 0, y: 0 });
    const [edgeTooltip, setEdgeTooltip] = useState(null);
    const [edgeTooltipPosition, setEdgeTooltipPosition] = useState({ x: 0, y: 0 });
    const [detailsNode, setDetailsNode] = useState(null);
    const [aboutOpen, setAboutOpen] = useState(false);

    const handleNodeHover = (params, network) => {
      let nodeId = params.node;
      let node = graph.nodes.find(node => node.id === nodeId) 
      if (detailsNode === node) return;

      let _, {x, y} = network.canvasToDOM(
        network.getPositions([nodeId])[nodeId]
      );
      let nodeSize = node.value * 10
      let scale = network.getScale()
      x += nodeSize * scale;
      y += nodeSize * scale;

      setNodeTooltip(node);
      setNodeTooltipPosition({ x: x, y: y });
    };

    const handleEdgeHover = (data) => {
      let e = data.event
      let edge = graph.edges.find(edge => edge.id === data.edge) 

      setEdgeTooltip(edge);
      setEdgeTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    const handleNodeBlur = () => {
      setNodeTooltip(null);
      setNodeTooltipPosition({ x: 0, y: 0 });
    };

    const handleEdgeBlur = () => {
      setEdgeTooltip(null);
      setEdgeTooltipPosition({ x: 0, y: 0 });
    };

    const handleSelectNode = (data) => {
      let node = graph.nodes.find(node => node.id === data.nodes[0])
      setDetailsNode(node);
      setAboutOpen(false);
    }

    const handleDeselectNode = () => {
      setDetailsNode(null);
    }

    const handleAboutClick = () => {
      setAboutOpen(true);
      setNodeTooltip(null);
      setDetailsNode(null);
    }
    
    return (
      <>
        <Graph
          graph={graph}
          options={options}
          events={{
            hoverEdge: handleEdgeHover,
            blurNode: handleNodeBlur,
            blurEdge: handleEdgeBlur,
            selectNode: handleSelectNode,
            deselectNode: handleDeselectNode,
          }}
          getNetwork={(network) => {
            network.fit()
            network.on("hoverNode", (params) =>
              handleNodeHover(params, network)
            );
          }}
        />
        <NodeTooltip node={nodeTooltip} position={nodeTooltipPosition} />
        <EdgeTooltip edge={edgeTooltip} position={edgeTooltipPosition} />
        <Details node={detailsNode} nodeSetter={setDetailsNode}/>
        <button onClick={() => handleAboutClick()}>About</button>
        {aboutOpen && <About setAboutOpen={setAboutOpen} graph={graph}/>}
      </>
    )
};

export default GraphComponent;