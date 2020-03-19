import {Children} from 'react';

/** Just a helper for formatting "code" names in the error message — ’cause all those backticks are confusing */
const code = text => `\`${text}\``;

/**
 * renderPropOf – Validates a render prop with only children of a specific element type.
 * @param {(function|string)} elementType – The actual element type
 * @param {string} [elementTypePublicName] – The "public" name of the type. Use if the underlying, evaluated elementType is different than the public API.
 * @returns {?TypeError}
 */
export const renderPropOf = (elementType, elementTypePublicName) => (
  props,
  propName,
  componentName,
) => {
  /** Set up the base error message */
  const errorMessage = `${code(propName)} of ${code(componentName)} is a render prop that expects only ${code(elementTypePublicName || elementType)} as children.`; // prettier-ignore

  /** Get the actual prop from the props */
  const prop = props[propName];

  /** First of all, the prop must be a function since it’s a render prop. */
  if (typeof prop !== 'function') {
    return new TypeError(
      `${errorMessage} Expected a function, but received a ${typeof prop}.`,
    );
  }

  let error = null;

  /** Second, the children of the render prop should be the specified element type. */
  Children.forEach(prop().props.children, child => {
    if (child.type !== elementType) {
      error = new TypeError(
        `${errorMessage} Received ${code(child.type)} element.`,
      );
    }
  });

  return error;
};
