import ePub from 'epubjs'; // Import the epub.js library
 
var book = ePub("C:\Users\docon\Documents\Github\codex-browser\aeneidos_virgil.epub");
var rendition = book.renderTo("area", {width: 600, height: 400});
var displayed = rendition.display();
