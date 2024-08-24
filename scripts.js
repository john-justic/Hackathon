document.getElementById('apply-customization').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value;
    const textColor = document.getElementById('text-color').value;
    const imageUpload = document.getElementById('image-upload').files[0];
    const previewImage = document.getElementById('shirt-preview');

    // Create canvas and context
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const shirtImage = new Image();

    shirtImage.src = previewImage.src;
    shirtImage.onload = function() {
        canvas.width = shirtImage.width;
        canvas.height = shirtImage.height;
        ctx.drawImage(shirtImage, 0, 0);

        // Add text to canvas
        ctx.font = '30px Arial';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.fillText(textInput, canvas.width / 2, canvas.height / 2);

        // Handle image upload
        if (imageUpload) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const uploadedImage = new Image();
                uploadedImage.src = event.target.result;
                uploadedImage.onload = function() {
                    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
                    updatePreview();
                };
            };
            reader.readAsDataURL(imageUpload);
        } else {
            updatePreview();
        }
    };

    function updatePreview() {
        previewImage.src = canvas.toDataURL();
    }
});
