import * as React from 'react';

export interface GenericDndListProps<T = any> extends React.Props<GenericDndList<T>> {
  getId: ((item: T | undefined) => string) | ((item: T) => string);
  getItemClassName?: (isDragging: boolean) => string;
  getItemStyle?: ((isDragging: boolean) => React.CSSProperties) | null;
  getListClassName?: (isDraggingOver: boolean) => string;
  getListStyle?: ((isDraggingOver: boolean) => React.CSSProperties) | null;
  items: (T | undefined)[] | T[];
  onReorder: ((items: (T | undefined)[]) => void) | ((items: T[]) => void);
  renderItem: ((item: T | undefined, index: number) => JSX.Element) | ((item: T, index: number) => JSX.Element);
}

declare class GenericDndList<T> extends React.Component<GenericDndListProps<T>> {}

declare module 'generic-dnd-list' {}

export default GenericDndList;
