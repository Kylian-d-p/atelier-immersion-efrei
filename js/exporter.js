/**
 * Export an html element as an image
 *
 * @param {HTMLElement} element Element to export
 * @throws {Error} If the element is invalid
 * @returns {void}
 */
export function exportElement(element) {
  if (!element) {
    console.error("L'élément spécifié est invalide.");
    return;
  }

  const newElement = element.cloneNode(true);
  newElement.classList.remove("fighter-container");
  newElement.style.position = "absolute";
  newElement.style.top = "50%";
  newElement.style.left = "50%";
  newElement.style.transform = "translate(-50%, -50%)";
  newElement.style.width = "250px";
  newElement.style.height = "300px";
  newElement.querySelector("img").style.width = "250px";
  newElement.querySelector("img").style.width = "300px";
  newElement.querySelector("img").style.objectFit = "cover";

  const cardContainerElement = document.createElement("div");
  cardContainerElement.style.width = "400px";
  cardContainerElement.style.height = "400px";
  cardContainerElement.style.position = "relative";
  cardContainerElement.appendChild(newElement);
  const cardElement = document.createElement("img");
  cardElement.src = "/img/card.png";
  cardElement.style.position = "absolute";
  cardElement.style.top = "0";
  cardElement.style.left = "0";
  cardElement.style.width = "400px";
  cardElement.style.height = "400px";
  cardContainerElement.appendChild(cardElement);
  const efreiLogoElement = document.createElement("img");
  efreiLogoElement.src = "/img/efrei.png";
  efreiLogoElement.style.position = "absolute";
  efreiLogoElement.style.bottom = "10px";
  efreiLogoElement.style.right = "10px";
  efreiLogoElement.style.width = "104.6px";
  efreiLogoElement.style.height = "34.1px";
  efreiLogoElement.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  efreiLogoElement.style.borderRadius = "10px";
  efreiLogoElement.style.padding = "5px";
  cardContainerElement.appendChild(efreiLogoElement);

  document.body.appendChild(cardContainerElement);

  document.querySelectorAll(".exporter").forEach((element) => {
    element.style.display = "none";
  });

  html2canvas(cardContainerElement)
    .then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "capture.png";
      link.click();
      cardContainerElement.remove();
      document.querySelectorAll(".exporter").forEach((element) => {
        element.style.display = "block";
      });
    })
    .catch((error) => {
      console.error("Une erreur est survenue lors de la capture :", error);
    });
}
