import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name=delay]'),
  delayStep: document.querySelector('[name = step]'),
  amount: document.querySelector('[name = amount]'),
};

refs.form.addEventListener('submit', onFornSubmit);

function onFornSubmit(e) {
  e.preventDefault();

  const amountValue = Number(refs.amount.value);
  let firstDelayValue = Number(refs.firstDelay.value);
  const delayStepValue = Number(refs.delayStep.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, firstDelayValue)
     .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  firstDelayValue += delayStepValue;
  }
};

function createPromise(position, delay) { 
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
          if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
    }, delay)
  })
};

