import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayInput = document.querySelector('input[name="delay"]');
const button = document.querySelector('button');

button.addEventListener('click', onCreateNotification);

function onCreateNotification(event) {
  const radioSelector = document.querySelector('input[name="state"]:checked');
  event.preventDefault();
  const delay = parseInt(delayInput.value);
  if (delayInput.value === '') {
    iziToast.error({
      message: '❌ Please enter a delay value',
      backgroundColor: 'red',
      messageColor: 'white',
      position: 'topRight',
      icon: null,
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioSelector.value === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  promise
    .then(() => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: 'green',
        messageColor: 'white',
        position: 'topRight',
        icon: null,
      });
    })
    .catch(() => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: 'red',
        messageColor: 'white',
        position: 'topRight',
        icon: null,
      });
    });
  delayInput.value = '';
}
