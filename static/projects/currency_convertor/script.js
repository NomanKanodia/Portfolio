document.getElementById('convertButton').addEventListener('click', function() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '' || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    convertCurrency(amount, fromCurrency, toCurrency);
});

function convertCurrency(amount, fromCurrency, toCurrency) {
    const apiKey = '21c3f88a1200016a5328f632'; // Your API key
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            alert('Error fetching exchange rates. Please try again later.');
        });
}