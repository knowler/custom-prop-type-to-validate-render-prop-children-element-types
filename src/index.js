import React from 'react';
import ReactDOM from 'react-dom';

/** Import the extracted custom prop type */
import {renderPropOf} from './renderPropOf';

/**
 * List item
 */
function Item({children}) {
  return <li>{children}</li>;
}

/**
 * List compound component
 */
function List({items: Items}) {
  return (
    <ul>
      <Items />
    </ul>
  );
}

/** Add Item as a component of List */
List.Item = Item;

/** This is where the magic happens. */
List.propTypes = {
  items: renderPropOf(Item, `List.Item`),
};

function App() {
  return (
    <>
      {/* This will cause an error since it uses an `li` */}
      <List
        items={() => (
          <>
            <List.Item>Hello</List.Item>
            <li>Goodbye</li>
          </>
        )}
      />
      {/* This will cause an error since it’s not a function. */}
      <List items="Hi" />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
