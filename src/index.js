// hiding the div that will contain the images
const imagesDiv = document.querySelector("#images");
imagesDiv.style.visibility = "hidden";

const fileInput = document.querySelector("#upload");

fileInput.addEventListener("change", async (e) => {
    const [file] = fileInput.files;

    // displaying the uploaded image
    const imageToResize = document.querySelector("#imgToResize");
    imageToResize.src = await fileToDataUri(file);

    // resizing the image and displaying it
    const resizedImage = document.querySelector("#resizedImage");
    resizedImage.src = resizeImage(imageToResize, this);

    // making the div containing the image visible
    imagesDiv.style.visibility = "visible";
});

function fileToDataUri(field) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            resolve(reader.result);
        });

        reader.readAsDataURL(field);
    });
}

function resizeImage(imgToResize, resizingFactor = 0.5) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const originalWidth = imgToResize.width;
    const originalHeight = imgToResize.height;

    const canvasWidth = originalWidth * resizingFactor;
    const canvasHeight = originalHeight * resizingFactor;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.drawImage(
        imgToResize,
        0,
        0,
        originalWidth * resizingFactor,
        originalHeight * resizingFactor
    );
    return canvas.toDataURL();
}