/**
 * Update the site visitor count.
 * @param {number} newValue - The value to update the visitor count to.
 */
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

/**
 * Get the current site visitor count.
 */
async function getValue() {
    const response = await fetch('https://pzachcomfn.azurewebsites.net/api/GetValue?partitionKey=VALUES&rowKey=VISITOR_COUNT');
    const result = await response.text();
    console.log('Get response:', result);

    return result
}

// On page load, get the site visitor count, increment it and display it, and 
// update the count on the server.
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