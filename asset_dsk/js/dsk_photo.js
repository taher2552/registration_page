// Function to handle file change
// Function to handle file change
function handleLogoChange() {
  const fileInput = document.querySelector(".institute-logo-input");
  const fileNameDisplay = document.getElementById("logo-name");
  const file = fileInput.files[0];
  const eyeIcon = document.getElementById("logo_preview_icon");

  if (file) {
    const fileName = file.name;
    const fileType = file.type.split("/")[0]; // Get the file type

    // Check if the file type is an image
    if (fileType === "image") {
      if (fileName.length > 15) {
        // Truncate the name if it's longer than 15 characters
        const truncatedName = fileName.substring(0, 15) + "...";
        fileNameDisplay.textContent = truncatedName;
      } else {
        fileNameDisplay.textContent = fileName;
      }
    } else {
      // If the selected file is not an image, clear the input
      fileInput.value = ""; // Clear the input value
      fileNameDisplay.textContent = "Please select an image file";
      // You can display an error message or take other actions as needed
    }

    eyeIcon.style.display = "inline-block";
  } else {
    eyeIcon.style.display = "none";
  }
}

function handleBannerChange() {
  const fileInput = document.querySelector(".banner-file-input");
  const fileNameDisplay = document.getElementById("banner-name");
  const eyeIcon = document.getElementById("banner_preview_icon");
  const file = fileInput.files[0];

  if (file) {
    const fileName = file.name;
    const fileType = file.type.split("/")[0]; // Get the file type

    // Check if the file type is an image
    if (fileType === "image") {
      if (fileName.length > 15) {
        // Truncate the name if it's longer than 15 characters
        const truncatedName = fileName.substring(0, 15) + "...";
        fileNameDisplay.textContent = truncatedName;
      } else {
        fileNameDisplay.textContent = fileName;
      }
    } else {
      // If the selected file is not an image, clear the input
      fileInput.value = ""; // Clear the input value
      fileNameDisplay.textContent = "Please select an image file";
      // You can display an error message or take other actions as needed
    }
    eyeIcon.style.display = "inline-block";
  } else {
    eyeIcon.style.display = "none";
  }
}

// Function to handle preview click
function handleLogoPreviewClick() {
  const fileInput = document.querySelector(".institute-logo-input");
  const imagePreviewModal = document.getElementById("image-preview-modal-1");
  const previewImage = document.getElementById("preview-image-1");
  const body = document.querySelector("body");

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };

    reader.readAsDataURL(fileInput.files[0]);

    // Prevent background scrolling
    body.style.overflow = "hidden";

    imagePreviewModal.style.display = "block";
  }
}

function handleBannerPreviewClick() {
  const fileInput = document.querySelector(".banner-file-input");
  const imagePreviewModal = document.getElementById("image-preview-modal-2");
  const previewImage = document.getElementById("preview-image-2");
  const body = document.querySelector("body");

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };

    reader.readAsDataURL(fileInput.files[0]);

    // Prevent background scrolling
    body.style.overflow = "hidden";

    imagePreviewModal.style.display = "block";
  }
}

// Function to close the image preview modal
function closeLogoPreview() {
  const imagePreviewModal = document.getElementById("image-preview-modal-1");
  const body = document.querySelector("body");
  imagePreviewModal.classList.add("closing-animation");

  body.style.overflow = "auto";

  // Add a delay to remove the modal after the animation finishes
  setTimeout(() => {
    imagePreviewModal.style.display = "none";
    imagePreviewModal.classList.remove("closing-animation");
  }, 500);
}

function closeBannerPreview() {
  const imagePreviewModal = document.getElementById("image-preview-modal-2");
  const body = document.querySelector("body");
  imagePreviewModal.classList.add("closing-animation");

  body.style.overflow = "auto";

  // Add a delay to remove the modal after the animation finishes
  setTimeout(() => {
    imagePreviewModal.style.display = "none";
    imagePreviewModal.classList.remove("closing-animation");
  }, 500);
}

// multiple image video js

let imagePreviews = [];
let videoPreviews = [];

function handleImageVideoChange() {
  const fileInput = document.getElementById("file-upload");
  const files = fileInput.files;

  const imageFiles = [];
  const videoFiles = [];

  // Categorize files into image and video arrays
  for (let i = 0; i < files.length; i++) {
    const fileType = files[i].type.split("/")[0];
    if (fileType === "image") {
      imageFiles.push(files[i]);
    } else if (fileType === "video") {
      videoFiles.push(files[i]);
    }
  }

  // Read image files
  if (imageFiles.length > 0) {
    readFiles(imageFiles, "image-previews", imagePreviews);
  }

  // Read video files
  if (videoFiles.length > 0) {
    readFiles(videoFiles, "video-previews", videoPreviews);
  }
}

function readFiles(files, previewSectionClass, previewsArray) {
  const previewSection = document.querySelector("." + previewSectionClass);

  // Clear existing previews
  previewSection.innerHTML = "";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (event) {
      const previewContainer = document.createElement("div");
      previewContainer.classList.add("mob_img_card");

      const cardFlex = document.createElement("div");
      cardFlex.classList.add("mob_card_flex");

      const cardTop = document.createElement("div");
      cardTop.classList.add("mob_card_top");

      const img = document.createElement("img");
      img.src = "asset_mobile/images/mob_gallery.svg";
      img.alt = "";

      const imageName = document.createElement("p");
      imageName.classList.add("mob_font", "mob_img_name");
      const fileName =
        file.name.length > 15 ? file.name.substring(0, 15) + "..." : file.name;
      imageName.textContent = fileName;

      const deleteIcon = document.createElement("img");
      deleteIcon.src = "asset_dsk/images/mob_delete.svg";
      deleteIcon.alt = "";
      deleteIcon.addEventListener("click", function () {
        previewContainer.remove(); // Remove the entire preview container
        const index = previewsArray.indexOf(previewContainer);
        if (index !== -1) {
          previewsArray.splice(index, 1);
        }
      });

      const imgSize = document.createElement("div");
      imgSize.classList.add("mob_img_size");

      if (file.type.startsWith("image/")) {
        const uploadedImg = document.createElement("img");
        uploadedImg.src = event.target.result;
        uploadedImg.alt = "";

        imgSize.appendChild(uploadedImg);
      } else if (file.type.startsWith("video/")) {
        const uploadVideo = document.createElement("video");
        uploadVideo.src = event.target.result;
        uploadVideo.setAttribute("controls", "");

        imgSize.appendChild(uploadVideo);
      }

      cardTop.appendChild(img);
      cardTop.appendChild(imageName);

      cardFlex.appendChild(cardTop);
      cardFlex.appendChild(deleteIcon);

      previewContainer.appendChild(cardFlex);
      previewContainer.appendChild(imgSize);

      previewsArray.push(previewContainer);
      previewSection.appendChild(previewContainer);
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  }
}

// multiple image video js ends
