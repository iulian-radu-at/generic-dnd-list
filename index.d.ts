import * as React from 'react';

export interface GenericDndListProps extends React.Props<GenericDndList> {
  getId: (item: unknown | undefined) => string;
  getItemStyle?: (isDragging: boolean) => React.CSSProperties;
  getListStyle?: (isDraggingOver: boolean) => React.CSSProperties;
  items: unknown[];
  renderItem: (item: unknown | undefined, index: number) => JSX.Element;
}

declare class GenericDndList extends React.Component<GenericDndListProps> {}

declare module 'generic-dnd-list' {}

export default GenericDndList;
