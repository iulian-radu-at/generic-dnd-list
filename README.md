# generic-dnd-list

A DnD list with a custom renderer for its items.

---

## Demo

You can access the storybook for this component [here](https://iulian-radu-at.github.io/generic-dnd-list/).

## Props

The component accepts the props defined bellow in the table.

### Props accepted by GenericDndList

| Name         | Type                                          | Required | Default   | Description                                  |
|--------------|-----------------------------------------------|----------|-----------|----------------------------------------------|
| getId        | (item: unknown) => string                     | yes      | -         | It returns a unique ID for each item         |
| getItemStyle | (isDragging: boolean) => CSSProperties        | no       | undefined | It returns the style for an item in the list |
| getListStyle | (isDraggingOver: boolean) => CSSProperties    | no       | undefined | It returns the style for the list            |
| items        | unknown[]                                     | yes      | -         | The items rendered                           |
| renderItem   | (item: unknown, index: number) => JSX.Element | yes      | -         | Render an item                               |

An undefined item can be used to signal the add new item. There should be at most one undefined item. 

---

## Versions

| GenericDndList _uses_ | react-beautiful-dnd | React  |
|----------------------:|:-------------------:|:------:|
|                 1.0.x |       11.0.5        | 16.8.6 |

### About versioning schema used for GenericDndList

- Major - it will be increased if the major version of the dependat package changes or there are breaking changes in the code of GenericDndList
- Minor - it will be increased if no major version of the dependat package changes, but there are changes of the minor or patch versions of it
- Patch - it will be increased if there are no changes of the dependat packages, but there are non breaking changes in the code of GenericDndList

---

## Example

Displaying a list with add item at the bottom:

```js
import * as React from "react";
import GenericDndList from "generic-dnd-list";

interface ListItem {
  id: string;
  text: string;
}

const items: (ListItem | undefined)[] = [ {
    id: 'fruit-1',
    text: 'Apple'
  }, {
    id: 'fruit-2',
    text: 'Orange'
  }, {
    id: 'fruit-3',
    text. 'Banana'
  }, undefined];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <GenericDndList
          items={items as unknown[]}
          getId={this.getId}
          renderItem={this.renderItem}
        />
      </div>
    );
  }

  private getId = (item: unknown) => (item ? item.id : 'new-fruit');

  private renderItem = (item?: unknown) => (item ? <div>{item.text}</div> : <div>Use this to add a new fruit</div>);
}

export default App;
```

---

## Changelog

### 1.0.0

- generic-dnd-list is made publicly available
