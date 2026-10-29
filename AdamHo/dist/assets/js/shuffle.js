(function ($) {
  $.fn.shuffle = function () {
    var allElems = this.get(),
      getRandom = function (max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function () {
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });

    this.each(function (i) {
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);
  };
})(jQuery);
$(".draggable").shuffle();
$(".renown").shuffle();
$(".projectnamecard").shuffle();
$(".randomcollab").shuffle();
$(".cereal").shuffle();
$(".randomele").shuffle();
$(".bbbs").shuffle();
$(".clientlist-container").shuffle();
$(".db-130").shuffle();
$(".col-press-item").shuffle();
$(".col-list-item").shuffle();
