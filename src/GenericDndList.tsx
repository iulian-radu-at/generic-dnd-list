import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';

const reorder = (list: unknown[], startIndex: number, endIndex: number): unknown[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 10;

const getDefaultItemStyle = (
  isDragging: boolean,
  getItemStyle?: (isDragging: boolean) => React.CSSProperties,
  draggableStyle?: DraggingStyle | NotDraggingStyle
): React.CSSProperties => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...(draggableStyle ? draggableStyle : {}),
  ...(getItemStyle ? getItemStyle(isDragging) : {}),
});

const getDefaultListStyle = (
  isDraggingOver: boolean,
  getListStyle?: (isDraggingOver: boolean) => React.CSSProperties
) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  ...(getListStyle ? getListStyle(isDraggingOver) : {}),
});

interface GenericDndListProps extends React.Props<any> {
  getId: (item: unknown) => string;
  getItemClassName?: (isDragging: boolean) => string;
  getItemStyle?: (isDragging: boolean) => React.CSSProperties;
  getListClassName?: (isDraggingOver: boolean) => string;
  getListStyle?: (isDraggingOver: boolean) => React.CSSProperties;
  items: unknown[];
  onReorder: (items: unknown[]) => void;
  renderItem: (item: unknown, index: number) => JSX.Element;
}

const GenericDndList: React.FC<GenericDndListProps> = ({
  getId,
  getItemClassName,
  getItemStyle,
  getListClassName,
  getListStyle,
  items: defaultItems,
  onReorder,
  renderItem,
}) => {
  const [items, setItems] = React.useState<unknown[]>([]);

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
            style={getDefaultListStyle(snapshot.isDraggingOver, getListStyle)}
          >
            {items.map((item, index) => (
              <Draggable key={getId(item)} draggableId={getId(item)} index={index} isDragDisabled={item === undefined}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={getItemClassName?.(snapshot.isDragging)}
                    style={getDefaultItemStyle(snapshot.isDragging, getItemStyle, provided.draggableProps.style)}
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
