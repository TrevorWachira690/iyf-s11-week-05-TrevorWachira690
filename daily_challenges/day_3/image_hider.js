/* ================================================================
   DAY 3: IMAGE REMOVER (bonus: hide/show toggle instead of delete)
   ================================================================ */

const toggleImagesBtn = document.getElementById("toggle-images-btn");
const imageList = document.getElementById("image-list");
let imagesHidden = false; // tracks current state so we know which way to flip

toggleImagesBtn.addEventListener("click", () => {
  const images = imageList.querySelectorAll("img");

  imagesHidden = !imagesHidden; // flip true <-> false

  images.forEach((img) => {
    // Setting display to "none" hides it; setting it back to an
    // empty string "" removes our inline override, letting the
    // element return to its normal default display.
    img.style.display = imagesHidden ? "none" : "";
  });

  // Update the button label so it always describes what clicking
  // it will do NEXT, not what it just did.
  toggleImagesBtn.textContent = imagesHidden ? "Show Images" : "Hide Images";
});

/* --- Non-bonus version, for reference (permanent removal) ---
document.getElementById("toggle-images-btn").addEventListener("click", () => {
  document.querySelectorAll("#image-list img").forEach((img) => img.remove());
});
*/