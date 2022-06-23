import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');

const FEEDBACK_KEY = 'feedback-form-state';
let formData = {};

const populateForm = () => {
  const savedMessage = localStorage.getItem(FEEDBACK_KEY);
  formData = JSON.parse(savedMessage) ?? {};
  const formDataKeys = Object.keys(formData);

  if (savedMessage) {
    formDataKeys.map(key => {
      formRef.elements[key].value = formData[key];
    });
  }
};

const onFormInput = evt => {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
};

const onFormSubmit = evt => {
  evt.preventDefault();
  localStorage.removeItem(FEEDBACK_KEY);
  // console.log(new FormData(evt.currentTarget));
  console.log(formData);

  evt.target.reset();
};

populateForm();
formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);
