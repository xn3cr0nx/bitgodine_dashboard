import cx from "classnames";
import { bitcoin, go } from "constants/colors";
import React, { useState, useContext, useMemo } from "react";
import Graph from "react-graph-vis";
import { Theme } from "context";
import { Card } from "reactstrap";

type id = number;

export interface ColorDef {
  border: string;
  background: string;
}

export interface Color extends ColorDef {
  highlight: ColorDef;
  hover: ColorDef;
}

export interface Node {
  id: id;
  label: string;
  group?: number;
}

export interface Edge {
  from: id;
  to: id;
  label?: string;
  color?: Color | string;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Pointer {
  DOM: Coordinates;
  canvas: Coordinates;
}

export interface NodeID {
  node: id;
}

export interface EdgeID {
  node: id;
}

export interface Event {
  nodes: id[];
  edges: string[];
  event: PointerEvent;
  pointer: Pointer;
}

export interface Drag extends Event {
  controlEdge: { from: id; to: id };
}

export interface Deselect extends Event {
  previousSelection: Graph;
}

enum Direction {
  P = "+",
  M = "-",
}

export interface Zoom {
  direction: Direction;
  scale: number;
  pointer: Coordinates;
}

export interface Hover {
  node: id;
  event: PointerEvent;
  pointer: Pointer;
}

export interface Events {
  click?: (arg0: Event) => void;
  doubleClick?: (arg0: Event) => void;
  oncontext?: (arg0: Event) => void;
  hold?: (arg0: Event) => void;
  release?: (arg0: Event) => void;
  select?: (arg0: Event) => void;
  selectNode?: (arg0: Event) => void;
  selectEdge?: (arg0: Event) => void;
  deselectNode?: (arg0: Deselect) => void;
  deselectEdge?: (arg0: Deselect) => void;
  dragStart?: (arg0: Event) => void;
  dragging?: (arg0: Event) => void;
  dragEnd?: (arg0: Event) => void;
  controlNodeDragging?: (arg0: Drag) => void;
  controlNodeDragEnd?: (arg0: Drag) => void;
  hoverNode?: (arg0: Hover) => void;
  blurNode?: (arg0: Hover) => void;
  hoverEdge?: (arg0: Hover) => void;
  blurEdge?: (arg0: Hover) => void;
  zoom?: (arg0: Zoom) => void;
  showPopup?: (arg0: id) => void;
  hidePopup?: (arg0: id) => void | null;
}

export interface Props {
  graph: Graph;
  events?: Events;
  style?: any;
}

const Network: React.FC<Props> = ({ graph, events, style }) => {
  const { theme } = useContext(Theme);
  const [physics, setPhysics] = useState(false);
  const [labels, setLabels] = useState(true);
  const [hierarchy, setHierarchy] = useState(false);

  const options = useMemo(
    () => ({
      layout: {
        hierarchical: hierarchy,
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
        label: "",
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
        hover: true, // event is triggered anuway
        hoverConnectedEdges: true,
        // navigationButtons: true,
        keyboard: false,
      },
      physics: {
        enabled: physics,
      },
      height: "1000px",
    }),
    [physics, hierarchy, labels],
  );

  const Controls = (
    <Card className="py-4 px-4 flex flex-row position-absolute mt-8 right-5 z-10">
      <label className="custom-toggle mr-4">
        <input type="checkbox" onClick={(): void => setPhysics(!physics)} />
        <span className={cx("custom-toggle-slider rounded-circle", theme)} />
        <span className="position-absolute top-4">Gravity</span>
      </label>
      <label className="custom-toggle mr-4">
        <input type="checkbox" onClick={(): void => setHierarchy(!hierarchy)} />
        <span className={cx("custom-toggle-slider rounded-circle", theme)} />
        <span className="position-absolute top-4">Hierarchy</span>
      </label>
      <label className="custom-toggle">
        <input type="checkbox" onClick={(): void => setLabels(!labels)} />
        <span className={cx("custom-toggle-slider rounded-circle", theme)} />
        <span className="position-absolute top-4">Labels</span>
      </label>
    </Card>
  );

  return (
    <>
      {Controls}
      <Graph
        graph={graph}
        options={options}
        events={events}
        // getNetwork={network => {
        //   //  if you want access to vis.js network api you can set the state in a parent component using this property
        // }}
        style={{ background: "transparent", ...style }}
      />
    </>
  );
};

export default Network;
