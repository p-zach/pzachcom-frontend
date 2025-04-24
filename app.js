async function updateValue(newValue) {
    const response = await fetch('https://pzachcomfn.azurewebsites.net/api/UpdateValue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partitionKey: "VALUES",
        rowKey: "VISITOR_COUNT",
        value: newValue
      })
    });
  
    const result = await response.text();
    console.log('Update response:', result);
}

async function getValue() {
    const response = await fetch('https://pzachcomfn.azurewebsites.net/api/GetValue?partitionKey=VALUES&rowKey=VISITOR_COUNT');
    const result = await response.text();
    console.log('Get response:', result);

    return result
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        let count = await getValue();
        count = parseInt(count) + 1
        document.getElementById('value-display').textContent = count;
        await updateValue(count);
    } catch (error) {
        console.error('Error during DOMContentLoaded:', error);
        document.getElementById('value-display').textContent = 'Error loading value.';
    }
});