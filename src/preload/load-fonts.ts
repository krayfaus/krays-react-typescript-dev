/** Appends a font to the webpage.
 * This method is useful, because loaded fonts are not lost between React render calls.
 * 
 * @param href - web link to css font.
 * @return {HTMLLinkElement} - the child node.
 */
function loadFont(href: string): HTMLLinkElement
{
  const fontLink = document.createElement('link');
  fontLink.href = href;
  fontLink.rel = 'stylesheet';

  return document.head.appendChild(fontLink);
}

window.addEventListener("DOMContentLoaded", () =>
{
  loadFont('https://fonts.googleapis.com/css?family=Ubuntu:regular,regularitalic,bold');         // Ubuntu
  loadFont('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');       // Font Awesome
  loadFont('https://fonts.googleapis.com/css?family=Nunito+Sans:400,700,800,900&display=swap');  // Nunito Sans
});