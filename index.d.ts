import * as React from 'react';

export interface GenericDndListProps extends React.Props<GenericDndList> {
  getId: (item: unknown | undefined) => string;
  getItemClassName?: (isDragging: boolean) => string;
  getItemStyle?: (isDragging: boolean) => React.CSSProperties;
  getListClassName?: (isDraggingOver: boolean) => string;
  getListStyle?: (isDraggingOver: boolean) => React.CSSProperties;
  items: unknown[];
  onReorder: (items: unknown[]) => void;
  renderItem: (item: unknown | undefined, index: number) => JSX.Element;
}

declare class GenericDndList extends React.Component<GenericDndListProps> {}

declare module 'generic-dnd-list' {}

export default GenericDndList;
