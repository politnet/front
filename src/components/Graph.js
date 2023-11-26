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

    const handleNodeHover = (data) => {
      let e = data.event
      let node = graph.nodes.find(node => node.id === data.node) 
      if (detailsNode === node) return;

      setNodeTooltip(node);
      setNodeTooltipPosition({ x: e.clientX, y: e.clientY });
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
    
    const cursorPointer = (network) => network.canvas.body.container.style.cursor = 'pointer'
    const cursorBlur = (network) => network.canvas.body.container.style.cursor = 'default'
    
    return (
      <>
        <Graph
          graph={graph}
          options={options}
          events={{
            hoverNode: handleNodeHover,
            hoverEdge: handleEdgeHover,
            blurNode: handleNodeBlur,
            blurEdge: handleEdgeBlur,
            selectNode: handleSelectNode,
            deselectNode: handleDeselectNode,
          }}
          getNetwork={(network) => {
            network.fit()
            network.on("hoverNode", () => cursorPointer(network));
            network.on("blurNode", () => cursorBlur(network));
            network.on("hoverEdge", () => cursorPointer(network));
            network.on("blurEdge", () => cursorBlur(network));
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