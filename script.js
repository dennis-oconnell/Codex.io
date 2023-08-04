document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('myImage'); // Replace with the ID of your image element
  
    Tesseract.recognize(
      image,
      'lat', // Language code for Latin.
      {
        logger: info => console.log(info.progress, info.status), // Optional logger function
      }
    ).then(({ data: { text } }) => {
      console.log('Recognized Text:', text);
      // Do whatever you want with the recognized text
    }).catch(err => {
      console.error('Error:', err);
    });
  });
  