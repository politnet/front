import Graph from "react-graph-vis";
import { React, useState } from "react";
import Tooltip from "./tooltip/Tooltip";
import { buildOptions, readGraph } from './GraphBuilder'
import Details from "./details/Details"
import "./Graph.css";
import About from "./about/About";

const options = buildOptions();
const graph = readGraph();

const GraphComponent = () => {
    const [tooltipNode, setTooltipNode] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
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

      setTooltipNode(node);
      setTooltipPosition({ x: x, y: y });
    };

    const handleNodeBlur = () => {
      setTooltipNode(null);
      setTooltipPosition({ x: 0, y: 0 });
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
      console.log("about clicked")
      setAboutOpen(true);
      setTooltipNode(null);
      setDetailsNode(null);
    }
    
    return (
      <>
        <Graph
          graph={graph}
          options={options}
          events={{
            blurNode: handleNodeBlur,
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
        <Tooltip node={tooltipNode} position={tooltipPosition} />
        <Details node={detailsNode} nodeSetter={setDetailsNode}/>
        <button onClick={() => handleAboutClick()}>About</button>
        {aboutOpen && <About setAboutOpen={setAboutOpen} graph={graph}/>}
      </>
    )
};

export default GraphComponent;