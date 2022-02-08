import React from 'react';
import { storiesOf } from '@storybook/react';
import GenericDndList from '../src/GenericDndList';
import './stories.css';

const items: unknown[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const itemsAddAtTop: unknown[] = [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const itemsAddAtBottom: unknown[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, undefined];

const getId = (item?: unknown) => (item ? `${item as number}` : 'new');

const renderItem = (item?: unknown) => (item ? <div>{item as number}</div> : <div>Use this to add a new item</div>);

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

const getItemClassName = (isDragging: boolean): string => (isDragging ? 'itemDragging' : 'item');

const getListClassName = (isDragging: boolean): string => (isDragging ? 'listDragging' : 'list');

const getFixWidthListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  width: 250,
});

const handleReorder = (items: unknown[]) => console.log({ items });

storiesOf('GenericDndList', module)
  .addParameters({ options: { showPanel: false } })
  .add('without add new item slot', () => (
    <div>
      <GenericDndList items={items} getId={getId} renderItem={renderItem} onReorder={handleReorder} />
    </div>
  ))
  .add('with add new item at top', () => (
    <div>
      <GenericDndList items={itemsAddAtTop} getId={getId} renderItem={renderItem} onReorder={handleReorder} />
    </div>
  ))
  .add('with add new item at end', () => (
    <div>
      <GenericDndList items={itemsAddAtBottom} getId={getId} renderItem={renderItem} onReorder={handleReorder} />
    </div>
  ))
  .add('with fixed width', () => (
    <div>
      <GenericDndList
        items={items}
        getId={getId}
        renderItem={renderItem}
        getListStyle={getFixWidthListStyle}
        onReorder={handleReorder}
      />
    </div>
  ))
  .add('styled by removing the default styles', () => (
    <div>
      <GenericDndList
        items={itemsAddAtBottom}
        getId={getId}
        renderItem={renderItem}
        getItemStyle={null}
        getListStyle={null}
        onReorder={handleReorder}
      />
    </div>
  ))
  .add('styled using style functions', () => (
    <div>
      <GenericDndList
        items={itemsAddAtBottom}
        getId={getId}
        renderItem={renderItem}
        getItemStyle={getItemStyle}
        getListStyle={getListStyle}
        onReorder={handleReorder}
      />
    </div>
  ))
  .add('styled using className functions', () => (
    <div>
      <GenericDndList
        items={itemsAddAtBottom}
        getId={getId}
        renderItem={renderItem}
        getItemStyle={null}
        getItemClassName={getItemClassName}
        getListStyle={null}
        getListClassName={getListClassName}
        onReorder={handleReorder}
      />
    </div>
  ))
  .add('drag axis locked', () => (
    <div>
      <GenericDndList items={items} getId={getId} renderItem={renderItem} onReorder={handleReorder} lockAxis />
    </div>
  ));
