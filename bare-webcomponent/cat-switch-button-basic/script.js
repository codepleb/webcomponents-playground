/* global Prism */

const lazyImage = document.querySelector('lazy-image');
const btn = document.querySelector('button');
const output = document.querySelector('#output');

const random = () => Math.floor(Math.random() * 90 + 10)

const updateMarkdown = () =>
  output.innerHTML = Prism.highlight(
    lazyImage.shadowRoot.innerHTML,
    Prism.languages.html,
    'html'
  );

btn.addEventListener('click', event => {
  const width = `${random()}0`;
  const height = `${random()}0`;
  lazyImage.src = `https://placekitten.com/${width}/${height}/`;
  lazyImage.alt = `Picture of a cat that is ${width} wide and ${height} high`;
})

const observer = new MutationObserver(updateMarkdown);

observer.observe(lazyImage, { attributes: true, childList: true, subtree: true });

window.WebComponents.waitFor(() => {
  setTimeout(updateMarkdown)
}); 
