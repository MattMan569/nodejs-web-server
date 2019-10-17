console.log('Client side js file');

(async () => {
    const response = await fetch('http://localhost:3000/weather?address=regina');
    const data = await response.json();

    if (data.error) {
        return console.log(data.error);
    }

    const {forecast, location, address} = data;

    console.log(forecast);
    console.log(location);
    console.log(address);
})();
