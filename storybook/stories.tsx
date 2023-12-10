import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import GenericDndList from '../src/GenericDndList';
import './stories.css';

const items: unknown[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const itemsAddAtTop: unknown[] = [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const itemsAddAtBottom: unknown[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, undefined];

const getId = (item?: unknown) => (item ? `${item as number}` : 'new');

const renderItem = (item?: unknown) =>
  item ? <div>{item as number}</div> : <div>Use this to add a new item</div>;

const grid = 5;

const getItemStyle = (isDragging: boolean): React.CSSProperties => ({
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  backgroundColor: isDragging ? '#ffff00' : '#00ffff',
  color: isDragging ? '#cccccc' : '#000000',
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  backgroundColor: isDraggingOver ? '#cccc00' : '#88eeee',
  padding: grid,
});

const getItemClassName = (isDragging: boolean): string =>
  isDragging ? 'itemDragging' : 'item';

const getListClassName = (isDragging: boolean): string =>
  isDragging ? 'listDragging' : 'list';

const getFixWidthListStyle = (
  isDraggingOver: boolean
): React.CSSProperties => ({
  width: 250,
});

const meta: Meta<typeof GenericDndList> = {
  title: 'GenericDndList',
  component: GenericDndList,
} as Meta<typeof GenericDndList>;
export default meta;
type Story = StoryObj<typeof GenericDndList>;

export const WithoutAddNewItemSlot = () => (
  <div>
    <GenericDndList items={items} getId={getId} renderItem={renderItem} />
  </div>
);

export const WithAddNewItemAtTop = () => (
  <div>
    <GenericDndList
      items={itemsAddAtTop}
      getId={getId}
      renderItem={renderItem}
    />
  </div>
);

export const WithAddNewItemAtEnd = () => (
  <div>
    <GenericDndList
      items={itemsAddAtBottom}
      getId={getId}
      renderItem={renderItem}
    />
  </div>
);

export const WithFixedWidth = () => (
  <div>
    <GenericDndList
      items={items}
      getId={getId}
      renderItem={renderItem}
      getListStyle={getFixWidthListStyle}
    />
  </div>
);

export const StyledByRemovingTheDefaultStyles = () => (
  <div>
    <GenericDndList
      items={itemsAddAtBottom}
      getId={getId}
      renderItem={renderItem}
      getItemStyle={null}
      getListStyle={null}
    />
  </div>
);

export const StyledUsingStyleFunctions = () => (
  <div>
    <GenericDndList
      items={itemsAddAtBottom}
      getId={getId}
      renderItem={renderItem}
      getItemStyle={getItemStyle}
      getListStyle={getListStyle}
    />
  </div>
);

export const StyledUsingClassNameFunctions = () => (
  <div>
    <GenericDndList
      items={itemsAddAtBottom}
      getId={getId}
      renderItem={renderItem}
      getItemStyle={null}
      getItemClassName={getItemClassName}
      getListStyle={null}
      getListClassName={getListClassName}
    />
  </div>
);

export const DragAxisLocked = () => (
  <div>
    <GenericDndList
      items={items}
      getId={getId}
      renderItem={renderItem}
      lockAxis
    />
  </div>
);
