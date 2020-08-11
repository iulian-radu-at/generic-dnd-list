import * as React from 'react';

export interface GenericDndListProps<T = any> extends React.Props<GenericDndList> {
  getId: (item: T | undefined) => string;
  getItemClassName?: (isDragging: boolean) => string;
  getItemStyle?: (isDragging: boolean) => React.CSSProperties;
  getListClassName?: (isDraggingOver: boolean) => string;
  getListStyle?: (isDraggingOver: boolean) => React.CSSProperties;
  items: (T | undefined)[];
  onReorder: (items: (T | undefined)[]) => void;
  renderItem: (item: T | undefined, index: number) => JSX.Element;
}

declare class GenericDndList extends React.Component<GenericDndListProps> {}

declare module 'generic-dnd-list' {}

export default GenericDndList;
