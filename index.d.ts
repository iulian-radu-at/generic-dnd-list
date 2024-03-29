import * as React from 'react';
import {
  DragDropContextProps,
  DraggableProps,
  DroppableProps,
} from 'react-beautiful-dnd';

export interface GenericDndListProps<T = any> {
  getId: ((item: T | undefined) => string) | ((item: T) => string);
  getItemClassName?: (isDragging: boolean) => string;
  getItemStyle?: (isDragging: boolean) => React.CSSProperties;
  getListClassName?: (isDraggingOver: boolean) => string;
  getListStyle?: (isDraggingOver: boolean) => React.CSSProperties;
  items: (T | undefined)[] | T[];
  lockAxis?: boolean;
  propsDragDropContext?: Partial<DragDropContextProps>;
  propsDraggable?: Omit<Partial<DraggableProps>, 'draggableId' | 'index'>;
  propsDroppable?: Omit<Partial<DroppableProps>, 'direction'>;
  onReorder?: ((items: (T | undefined)[]) => void) | ((items: T[]) => void);
  renderItem:
    | ((
        item: T | undefined,
        index: number,
        context: RenderItemContext
      ) => JSX.Element)
    | ((item: T, index: number, context: RenderItemContext) => JSX.Element);
}

export interface RenderItemContext {
  isDragging: boolean;
  isDropAnimating: boolean;
}

declare class GenericDndList<T> extends React.Component<
  GenericDndListProps<T>
> {}

declare module 'generic-dnd-list' {}

export default GenericDndList;
