console.log("DOM_Events_exercises JS");

//exercise 1
//change position of an element acoording to the movement of the mouse

//iife (immediately invoked function expression)
(function () {
    var box = document.getElementById("box");

    //add eventlistener
    document.addEventListener("mousemove", documentMousemoveHandler);

    //documentMousemoveHandler
    function documentMousemoveHandler(event) {
        //change style of "position" to "relative", otherwise it wouldnt move with absolute positioning
        box.style.position = "relative";
        box.style.zIndex = -1;

        //get the half of the width & height of the element/box
        var halfWidth = box.offsetWidth / 2;
        var halfHeight = box.offsetHeight / 2;

        //calculate the new coordinates for the element
        var newX = event.clientX - halfWidth;
        var newY = event.clientY - halfHeight;
        //change style of "top" and "left"
        box.style.left = newX + "px";
        box.style.top = newY + "px";
    }
})();

//exercise 2
//swap the input user types for a predefined text in real-time

//iife
(function () {
    var message =
        "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.";
    var textarea = document.getElementById("speech");
    //add eventlistener - when users types in textarea
    textarea.addEventListener("input", textareaInputHandler);

    //textareaInputHandler
    function textareaInputHandler(event) {
        var charactersNeeded = event.target.value.length;
        var swappedContent = getPortionOfMessage(charactersNeeded);
        event.target.value = swappedContent;
    }
    //function swapContent
    //1 parameter: number
    //do: cut a portion of a string a
    //return: string
    function getPortionOfMessage(numberOfCharacterNeeded) {
        var newContent = message.slice(0, numberOfCharacterNeeded);
        return newContent;
    }
})();
