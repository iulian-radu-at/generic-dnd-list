import * as React from 'react';
import {
  DragDropContext,
  DragDropContextProps,
  Draggable,
  DraggableProps,
  DraggingStyle,
  Droppable,
  DroppableProps,
  DropResult,
  NotDraggingStyle,
  ResponderProvided,
} from 'react-beautiful-dnd';

const reorder = <T extends any>(list: (T | undefined)[], startIndex: number, endIndex: number): (T | undefined)[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const PADDING = 10;

const getDefaultListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: PADDING,
});

const getComputedListStyle = (
  isDraggingOver: boolean,
  getListStyle: ((isDraggingOver: boolean) => React.CSSProperties) | null
) => (getListStyle ? getListStyle(isDraggingOver) : {});

const getDefaultItemStyle = (isDragging: boolean): React.CSSProperties => ({
  padding: PADDING * 2,
  margin: `0 0 ${PADDING}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
});

function getComputedItemStyle(
  isDragging: boolean,
  getItemStyle: ((isDragging: boolean) => React.CSSProperties) | null,
  draggableStyle: DraggingStyle | NotDraggingStyle = {},
  lockAxis?: boolean
): React.CSSProperties {
  const style: React.CSSProperties = {
    userSelect: 'none',
    ...(getItemStyle?.(isDragging) ?? {}),
    ...draggableStyle,
  };

  const transform = (draggableStyle as DraggingStyle).transform;
  if (lockAxis && transform) {
    style.transform = 'translate(0px' + transform.slice(transform.indexOf(','), transform.length);
  }

  return style;
}

interface GenericDndListProps<T> {
  getId: (item: T | undefined) => string;
  getItemClassName?: (isDragging: boolean) => string;
  getItemStyle?: ((isDragging: boolean) => React.CSSProperties) | null;
  getListClassName?: (isDraggingOver: boolean) => string;
  getListStyle?: ((isDraggingOver: boolean) => React.CSSProperties) | null;
  items: (T | undefined)[];
  lockAxis?: boolean;
  propsDragDropContext?: Partial<DragDropContextProps>;
  propsDraggable?: Omit<Partial<DraggableProps>, 'draggableId' | 'index'>;
  propsDroppable?: Omit<Partial<DroppableProps>, 'direction'>;
  onReorder: (items: (T | undefined)[]) => void;
  renderItem: (item: T | undefined, index: number) => JSX.Element;
}

const GenericDndList = <T extends any = any>(props: GenericDndListProps<T>) => {
  const {
    getId,
    getItemClassName,
    getItemStyle = getDefaultItemStyle,
    getListClassName,
    getListStyle = getDefaultListStyle,
    items: defaultItems,
    lockAxis,
    propsDragDropContext,
    propsDraggable,
    propsDroppable,
    onReorder,
    renderItem,
  } = props;
  const [items, setItems] = React.useState<(T | undefined)[]>([]);

  React.useEffect(() => {
    setItems(defaultItems);
  }, [defaultItems]);

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    propsDragDropContext?.onDragEnd?.(result, provided);

    if (!result.destination) {
      return;
    }

    const newItems = reorder(items, result.source.index, result.destination.index);
    setItems(newItems);
    onReorder(newItems);
  };

  return (
    <DragDropContext {...propsDragDropContext} onDragEnd={handleDragEnd}>
      <Droppable {...propsDroppable} droppableId={propsDroppable?.droppableId ?? 'droppable'}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={getListClassName?.(snapshot.isDraggingOver)}
            style={getComputedListStyle(snapshot.isDraggingOver, getListStyle)}
          >
            {items.map((item, index) => (
              <Draggable
                {...propsDraggable}
                key={getId(item)}
                draggableId={getId(item)}
                index={index}
                isDragDisabled={item === undefined}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={getItemClassName?.(snapshot.isDragging)}
                    style={getComputedItemStyle(
                      snapshot.isDragging,
                      getItemStyle,
                      provided.draggableProps.style,
                      lockAxis
                    )}
                  >
                    {renderItem(item, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default GenericDndList;
