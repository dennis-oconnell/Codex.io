document.addEventListener("DOMContentLoaded", () => {
    //load images from folder
    const gallery = document.querySelector(".gallery");

    for (let i = 2; i <= 305; i++) {
        const img = document.createElement("img");
        img.src = `./aeneid_images/430d7a8a8b6816106a9c04275772583b-${i}.jpg`;
        gallery.appendChild(img);
        }
    

    //recognize text using Tesseract
    const image = document.getElementById('img'); // Replace with the ID of your image element

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