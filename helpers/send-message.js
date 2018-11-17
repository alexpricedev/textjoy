const sendMessage = onSuccess => data => {
  fetch(`${process.env.LAMBDA_ENDPOINT}/send`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => {
      response.json().then(({ status }) => {
        if (status === 'succeeded') {
          alert('Message sent!');
          onSuccess();
        }
      });
    })
    .catch(err => {
      console.log('Error sending message', err);
      alert('There was an issue sending the message');
    });
};

export default sendMessage;
