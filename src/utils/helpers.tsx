export const setFormMessage = (
  validField: boolean,
  spanElement: HTMLSpanElement,
  inputElement: HTMLInputElement,
  errorMessage: string
): void => {
  if (validField) {
    spanElement.innerHTML = '';
    inputElement.style.borderColor = 'rgb(1, 187, 1)';
  } else {
    spanElement.innerHTML = errorMessage;
    inputElement.style.borderColor = 'red';
  }
};
