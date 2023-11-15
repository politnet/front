import Graph from "react-graph-vis";
import { React, useState } from "react";
import Tooltip from "./tooltip/Tooltip";
import { buildOptions, readGraph } from './GraphBuilder'

const options = buildOptions();
const graph = readGraph();

const GraphComponent = () => {
    const [tooltipNode, setTooltipNode] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleNodeHover = (data) => {
      let e = data.event
      let node = graph.nodes.find(node => node.id === data.node) 
      setTooltipNode(node);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    const handleNodeBlur = () => {
      setTooltipNode(null);
      setTooltipPosition({ x: 0, y: 0 });
    };

    return (
      <>
        <Graph
          graph={graph}
          options={options}
          events={{
            hoverNode: handleNodeHover,
            blurNode: handleNodeBlur,
          }}
          getNetwork={(network) => {
            network.fit()
          }}
        />
        <Tooltip node={tooltipNode} position={tooltipPosition} />
      </>
    )
};

export default GraphComponent;