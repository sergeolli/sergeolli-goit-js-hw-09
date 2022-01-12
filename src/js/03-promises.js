const refs = {
  form: document.querySelector('form'),
}

refs.form.addEventListener('submit', (e) => {
  e.preventDefault();
  let delay = Number(e.currentTarget.delay.value)
  let step = Number(e.currentTarget.step.value)
  let amount = Number(e.currentTarget.amount.value)
  position = 0;
  isClearInterval = setInterval(() => {
    position += 1;
    delay += step;
    if (position >= amount) {
      clearInterval(isClearInterval)
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      })
   
  }, delay);
  


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
  


