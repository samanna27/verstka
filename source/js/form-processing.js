const PHOTO_WIDTH = 30;
const PHOTO_HEIGHT = 30;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
let formElement = document.querySelector('.form-review');
let citizenshipElement = document.querySelector('.citizenship');
let ageElement = document.querySelector('.age');
let subjectElement = document.querySelector('.subject');
let submitButtonElement = document.querySelector('.form-review__button');
let formValid = false;
const radiosCitizenship = document.getElementsByName('citizenship');
const radiosAge = document.getElementsByName('age');
const radiosSubject = document.getElementsByName('subject');
const topicElement = document.querySelector('.form-review__comment-topic');
let uploadPhotoPreviewElement = document.querySelector('.form-review__preview');
let citizenshipFieldValid = false;
let ageFieldValid = false;
let subjectFieldValid = false;
let topicFieldValid = false;
const previewUploadElement = document.querySelector('.form-review__preview-input');
const previewReportValidityElement = document.querySelector('.toReportValidity');

const onCitizenshipClick = () => {
  let i = 0;
  while (!citizenshipFieldValid && i < radiosCitizenship.length) {
    if (radiosCitizenship[i].checked) {
      citizenshipFieldValid = true;
    }
    i++;
  }

  if (!citizenshipFieldValid) {
    citizenshipElement.setCustomValidity('Обязательное поле!');
  } else {
    citizenshipElement.setCustomValidity('');
  }

  citizenshipElement.reportValidity();
  formValid = citizenshipFieldValid & ageFieldValid & subjectFieldValid & topicFieldValid;
};

const onAgeClick = () => {
  let i = 0;
  while (!ageFieldValid && i < radiosAge.length) {
    if (radiosAge[i].checked) {
      ageFieldValid = true;
    }
    i++;
  }

  if (!ageFieldValid) {
    ageElement.setCustomValidity('Обязательное поле!');
  } else {
    ageElement.setCustomValidity('');
  }

  ageElement.reportValidity();
  formValid = citizenshipFieldValid & ageFieldValid & subjectFieldValid & topicFieldValid;
};

const onSubjectClick = () => {
  let i = 0;
  while (!subjectFieldValid && i < radiosSubject.length) {
    if (radiosSubject[i].checked) {
      subjectFieldValid = true;
    }
    i++;
  }

  if (!subjectFieldValid) {
    subjectElement.setCustomValidity('Обязательное поле!');
  } else {
    subjectElement.setCustomValidity('');
  }

  subjectElement.reportValidity();
  formValid = citizenshipFieldValid & ageFieldValid & subjectFieldValid & topicFieldValid;
}

const photoPreviewElement = document.createElement('img');
photoPreviewElement.width = PHOTO_WIDTH;
photoPreviewElement.height = PHOTO_HEIGHT;
photoPreviewElement.setAttribute('style', 'padding: 15px 15px;');

const onPreviewElementChange = () => {
  const file = previewUploadElement.files[0];

  if (previewUploadElement.files[0]) {
    previewReportValidityElement.setCustomValidity('');
  } else {
    previewReportValidityElement.setCustomValidity('Загрузите фото!');
    return;
  }
  previewReportValidityElement.reportValidity();

  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadPhotoPreviewElement.insertAdjacentElement('beforeend', photoPreviewElement);
      photoPreviewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const onTopicClick = () => {
  if (Number(topicElement.value.length) === 0) {
    topicElement.setCustomValidity('Обязательное поле!');
  } else {
    topicFieldValid = true;
    topicElement.setCustomValidity('');
  }

  topicElement.reportValidity();
  formValid = citizenshipFieldValid & ageFieldValid & subjectFieldValid & topicFieldValid;
};


radiosCitizenship.forEach((item) => item.addEventListener('click', onCitizenshipClick));
radiosAge.forEach((item) => item.addEventListener('click', onAgeClick));
radiosSubject.forEach((item) => item.addEventListener('click', onSubjectClick));
topicElement.addEventListener('change', onTopicClick);
previewUploadElement.addEventListener('change', onPreviewElementChange);
submitButtonElement.addEventListener('click', onCitizenshipClick);
submitButtonElement.addEventListener('click', onAgeClick);
submitButtonElement.addEventListener('click', onSubjectClick);
submitButtonElement.addEventListener('click', onTopicClick);
submitButtonElement.addEventListener('click', onPreviewElementChange);

export {formElement, formValid};
