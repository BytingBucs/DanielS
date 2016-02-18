var main = function () {
   "use strict;"
   $("*").css("color", "red");
   $("h2").css("color", "blue");
   $(".relevant p:first-of-type").css("color", "green");
   $(".relevant p:nth-child(3)").css("color", "black");
   $("p").css("color", "yellow");
   $(".relevant p").css("color", "orange");
   $(".relevant p:even").css("color", "purple");
   $(".relevant p:last-of-type").css("color", "silver");
   $(".relevant p:nth-child(5n+1)").css("color", "indigo");
   $(".relevant p:not(.a)").css("color", "fuschia");
};
$(document).ready(main);