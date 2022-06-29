import ReactDOM from 'react-dom';

export const createContainer = () => {
  const container = document.createElement('div');
  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const field = (formId, name) => form(formId).elements[name];
  const labelFor = (formElement) =>
    container.querySelector(`label[for="${formElement}"]`);
  const element = selector => container.querySelector(selector);
  const elements = selector => Array.from(container.querySelectorAll(selector));
  
  return {
    render: (component) => ReactDOM.render(component, container),
    container,
    element,
    form,
    field,
    labelFor,
    elements
  };
};
