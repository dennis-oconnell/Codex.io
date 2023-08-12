document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('highlighted-image'); // Replace with the ID of your image element
    const highlightBox = document.querySelector(".highlight-box");
  
    image.addEventListener("mousemove", function (event) {
      const x = event.clientX - image.getBoundingClientRect().left;
      const y = event.clientY - image.getBoundingClientRect().top;

      // Set the highlight box dimensions and position
      highlightBox.style.left = x + "px";
      highlightBox.style.top = y + "px";
      highlightBox.style.width = "100px"; // Adjust as needed
      highlightBox.style.height = "40px"; // Adjust as needed

      // Display the highlight box
      highlightBox.style.display = "block";
    });

    image.addEventListener("mouseleave", function () {
        // Hide the highlight box when the mouse leaves the image
        highlightBox.style.display = "none";
    });

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
  
