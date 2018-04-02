/*
 * Name: projects.js
 * Author: Riyang Liu
 * Description: This is the JS file for controlling hover effect of the
 *              owner's detail. If mouse is on the owner's name, then
 *              shows the detail of the owner.
 * Date: April 1, 2018
 */

//Show profile function shows the tooltip
function showProfile(element){
    element.nextSibling.nextSibling.style.visibility = "visible";
}

//Hide profile function hides the tooltip
function hideProfile(element){
    element.nextSibling.nextSibling.style.visibility = "hidden";
}
