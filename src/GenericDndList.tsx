import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
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

const getComputedItemStyle = (
  isDragging: boolean,
  getItemStyle: ((isDragging: boolean) => React.CSSProperties) | null,
  draggableStyle: DraggingStyle | NotDraggingStyle = {}
): React.CSSProperties => ({
  userSelect: 'none',
  ...(getItemStyle ? getItemStyle(isDragging) : {}),
  ...draggableStyle,
});

interface GenericDndListProps<T> extends React.Props<any> {
  getId: (item: T | undefined) => string;
  getItemClassName?: (isDragging: boolean) => string;
  getItemStyle?: ((isDragging: boolean) => React.CSSProperties) | null;
  getListClassName?: (isDraggingOver: boolean) => string;
  getListStyle?: ((isDraggingOver: boolean) => React.CSSProperties) | null;
  items: (T | undefined)[];
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
    onReorder,
    renderItem,
  } = props;
  const [items, setItems] = React.useState<(T | undefined)[]>([]);

  React.useEffect(() => {
    setItems(defaultItems);
  }, [defaultItems]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(items, result.source.index, result.destination.index);
    setItems(newItems);
    onReorder(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={getListClassName?.(snapshot.isDraggingOver)}
            style={getComputedListStyle(snapshot.isDraggingOver, getListStyle)}
          >
            {items.map((item, index) => (
              <Draggable key={getId(item)} draggableId={getId(item)} index={index} isDragDisabled={item === undefined}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={getItemClassName?.(snapshot.isDragging)}
                    style={getComputedItemStyle(snapshot.isDragging, getItemStyle, provided.draggableProps.style)}
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
