import React from "react";
import Graph from "react-graph-vis";
import { main, bitcoin, go } from "constants/colors";

export interface Node {
  id: number;
  label: string;
  title?: string;
  group?: number;
}

export interface Edge {
  from: number;
  to: number;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

const Network: React.FC<Graph> = ({ nodes, edges }) => {
  const options = {
    layout: {
      hierarchical: false,
    },
    nodes: {
      shape: "dot",
      color: {
        border: go,
        background: go,
        highlight: {
          border: bitcoin,
          background: bitcoin,
        },
        hover: {
          border: bitcoin,
          background: bitcoin,
        },
      },
      font: {
        color: go,
      },
    },
    edges: {
      width: 2,
      color: {
        color: go,
        highlight: bitcoin,
        hover: bitcoin,
      },
      smooth: {
        type: "continuous",
      },
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      // navigationButtons: true,
      keyboard: false,
    },
    height: "1000px",
  };

  const events = {
    select: function (event: any): void {
      const { nodes, edges } = event;
    },
  };

  return (
    <Graph
      graph={{ nodes, edges }}
      options={options}
      events={events}
      // getNetwork={network => {
      //   //  if you want access to vis.js network api you can set the state in a parent component using this property
      // }}
      style={{ backgroundColor: main }}
    />
  );
};

export default Network;
