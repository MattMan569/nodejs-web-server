document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const search = document.querySelector('input');
    const message1 = document.querySelector('#message-1');
    const message2 = document.querySelector('#message-2');

    message1.textContent = 'Loading...';
    message2.textContent = '';

    (async () => {
        const response = await fetch(`http://localhost:3000/weather?address=${search.value}`);
        const data = await response.json();

        if (data.error) {
            message1.textContent = data.error;
            return;
        }

        search.value = '';

        const {forecast, location} = data;

        message1.textContent = location;
        message2.textContent = forecast;
    })();
});
