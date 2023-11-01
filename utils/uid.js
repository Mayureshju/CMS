exports.generateOrderID = () => {
    const timestamp = new Date().getTime(); // Get a timestamp
    const uniqueID = Math.random().toString(36).substr(2, 6); // Generate a random unique ID
    return `ORDER-${timestamp}-${uniqueID}`;
  }
  

  