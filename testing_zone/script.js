document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById("highlighted-image");
    const highlightBox = document.querySelector(".highlight-box");

    let startCoords = { x: 0, y: 0 };
    let endCoords = { x: 0, y: 0 };
    let isSelecting = false;

    image.addEventListener("mousedown", function (event) {
        // Record starting coordinates when mouse button is pressed
        startCoords.x = event.clientX - image.getBoundingClientRect().left;
        startCoords.y = event.clientY - image.getBoundingClientRect().top;
        isSelecting = true;
    });

    image.addEventListener("mousemove", function (event) {
        if (isSelecting) {
            // Update ending coordinates while dragging
            endCoords.x = event.clientX - image.getBoundingClientRect().left;
            endCoords.y = event.clientY - image.getBoundingClientRect().top;

            // Calculate dimensions and position of highlight box
            const boxWidth = Math.abs(endCoords.x - startCoords.x);
            const boxHeight = Math.abs(endCoords.y - startCoords.y);
            highlightBox.style.width = boxWidth + "px";
            highlightBox.style.height = boxHeight + "px";
            highlightBox.style.left = Math.min(startCoords.x, endCoords.x) + "px";
            highlightBox.style.top = Math.min(startCoords.y, endCoords.y) + "px";

            // Display the highlight box
            highlightBox.style.display = "block";
        }
    });

    document.addEventListener("mouseup", function () {
        if (isSelecting) {
            // Stop selecting when mouse button is released
            isSelecting = false;

            // Get the coordinates of the selected area
            const minX = Math.min(startCoords.x, endCoords.x);
            const minY = Math.min(startCoords.y, endCoords.y);
            const maxX = Math.max(startCoords.x, endCoords.x);
            const maxY = Math.max(startCoords.y, endCoords.y);

            // Extract text from the selected area using Tesseract.js
            const selectedImageData = imageToDataUri(image, minX, minY, maxX, maxY);
            performOCR(selectedImageData);
        }
    });

    function imageToDataUri(img, x1, y1, x2, y2) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = x2 - x1;
        const height = y2 - y1;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, x1, y1, width, height, 0, 0, width, height);
        return canvas.toDataURL();
    }

    function performOCR(imageData) {
        Tesseract.recognize(
            imageData,
            'eng', // Language code (English in this example)
            { logger: info => console.log(info) }
        ).then(result => {
            console.log("OCR Result:", result.text);
            // You can process and use the OCR result as needed
        }).catch(error => {
            console.error("OCR Error:", error);
        });
    }
});
