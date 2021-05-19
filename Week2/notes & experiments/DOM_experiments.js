console.log("DOM Experiments");

//Document Object Model DOM

//html element/node of the page
var html = document.documentElement;
console.log("html element:", html);

//body element/node of the page
var body = document.body;
console.log("body element:", body);

//parent
var parentOfBody = body.parentNode;
console.log("parent of body:", parentOfBody);
console.log("parent of document:", document.parentNode); //null

//children
var childrenOfBody = body.children;
console.log("children of body:", childrenOfBody);
var childOfBody = document.getElementById("slugs");
console.log("child of body:", childOfBody);
var lastChildOfBody = body.lastElementChild;
console.log("last child of body:", lastChildOfBody);

//siblings
var slugs = document.getElementById("slugs");
console.log("slugs:", slugs);
var childOfSlugs = slugs.firstElementChild;
console.log("1st child of slugs:", childOfSlugs);
var nextSiblingOfH2 = childOfSlugs.nextElementSibling;
console.log("sibling of h2:", nextSiblingOfH2);

//by Id, tag and class
var slug = document.getElementById("leaf");
var divs = document.getElementsByTagName("div");
var section = document.getElementsByClassName("slugs");

//Query Selector & Query Selector All
var classBlue = document.querySelector("#blue");
console.log("class:", classBlue);
var images = document.querySelectorAll("img");
console.log("images:", images);

//Change appearance & content
slugs.style.color = "tomato";
images[1].style.border = "5px dotted tan";

slugs.lastElementChild.lastElementChild.innerText = "This has been hacked!";

//other Methods

//create and append
var p = document.createElement("p");
p.innerText = "This has been appended!";
var p2 = document.createElement("p");
p2.innerText = "Inserted before!";
var p3 = document.createElement("p");
p3.innerText = "p3 will be removed";
var p4 = document.createElement("p");
p4.innerText = "this has been replaced!!";
slugs.appendChild(p);
slugs.appendChild(p3);
slugs.insertBefore(p2, slugs.firstElementChild);

slugs.removeChild(p3);
slugs.replaceChild(p4, document.getElementById("blue"));
