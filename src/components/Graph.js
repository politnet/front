import Graph from "react-graph-vis";
import { React, useState } from "react";
import Tooltip from "./tooltip/Tooltip";

const graph = {
    nodes: [
      { id: 1, title: "node 1 tootip text" },
      { id: 2, title: "node 2 tootip text" },
      { id: 3, title: "node 3 tootip text" },
      { id: 4, title: "node 4 tootip text" },
      { id: 5, title: "node 5 tootip text" },
      { id: 6, extra: "extra", title: "node 6 tootip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6 },
      { from: 6, to: 1 },
      { from: 5, to: 6 }
    ]
  };

const options = {
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
      shape: "circularImage",
      image: "https://avatars0.githubusercontent.com/u/1315101?v=3&s=460",
    }
  };

const GraphComponent = () => {
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleNodeHover = (data) => {
      let e = data.event
      let nodeId = data.node
      setTooltipContent('Title ' + nodeId);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    const handleNodeBlur = () => {
      setTooltipContent('');
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
          getNetwork={(network) => network.fit()}
        />
        <Tooltip content={tooltipContent} position={tooltipPosition} />
      </>
    )
};

export default GraphComponent;