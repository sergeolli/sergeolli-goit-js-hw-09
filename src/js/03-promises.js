import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('form'),
}

refs.form.addEventListener('submit', (e) => {
  e.preventDefault();
  let delay = Number(e.currentTarget.delay.value)
  let step = Number(e.currentTarget.step.value)
  let amount = Number(e.currentTarget.amount.value)
  let position = 0;
  e.target.submit = setInterval(() => {
    position += 1;
    delay += step;
    if (position >= amount) {
      clearInterval(e.target.submit)
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      })
   
  }, step);
  


});
  

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay })
    }, delay);
    })

    return promise;
  }
  


