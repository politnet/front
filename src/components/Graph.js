import Graph from "react-graph-vis";
import { React, useState } from "react";
import Tooltip from "./tooltip/Tooltip";
import { buildOptions, readGraph } from './GraphBuilder'
import Details from "./details/Details"

const options = buildOptions();
const graph = readGraph();

const GraphComponent = () => {
    const [tooltipNode, setTooltipNode] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [detailsNode, setDetailsNode] = useState(null);

    const handleNodeHover = (data) => {
      let e = data.event
      let node = graph.nodes.find(node => node.id === data.node) 
      if (detailsNode === node) return;

      setTooltipNode(node);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    const handleNodeBlur = () => {
      setTooltipNode(null);
      setTooltipPosition({ x: 0, y: 0 });
    };

    const handleSelectNode = (data) => {
      let node = graph.nodes.find(node => node.id === data.nodes[0])
      setDetailsNode(node);
    }

    const handleDeselectNode = () => {
      setDetailsNode(null);
    }

    return (
      <>
        <Graph
          graph={graph}
          options={options}
          events={{
            hoverNode: handleNodeHover,
            blurNode: handleNodeBlur,
            selectNode: handleSelectNode,
            deselectNode: handleDeselectNode,
          }}
          getNetwork={(network) => {
            network.fit()
          }}
        />
        <Tooltip node={tooltipNode} position={tooltipPosition} />
        <Details node={detailsNode} nodeSetter={setDetailsNode}/>
      </>
    )
};

export default GraphComponent;