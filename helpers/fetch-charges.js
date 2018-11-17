const fetchCharges = onSuccess => {
  fetch(`${process.env.LAMBDA_ENDPOINT}/customers`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
    .then(response => {
      response.json().then(({ customers }) => {
        onSuccess(customers);
      });
    })
    .catch(err => {
      console.log('Error fetching charges', err);
      alert('There was an issue fetching the customers');
    });
};

export default fetchCharges;
