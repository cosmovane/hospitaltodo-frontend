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

export const validateForm = (spanId: string, inputId: string): boolean => {
  const spanElement = document.getElementById(spanId) as HTMLSpanElement;
  const inputElement = document.getElementById(inputId) as HTMLInputElement;
  const info = inputElement.value.trim();
  const validInfo = info !== '';
  setFormMessage(validInfo, spanElement, inputElement, 'Name cannot be null');
  return validInfo;
};
