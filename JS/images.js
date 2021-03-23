$(function() {
    var ths;
    var img;

    $('.closeup').each(function() {


        ths = $(this);
        img = ths.find('img').eq(0);
        img.click(function() {
            var ths = $(this);
            var src = ths.attr('src');
            var fixed = create('img').addClass('fixed').attr('src', src);
            var fixedBackground = createHTML('div', fixed).addClass('fixed-div');
            fixedBackground = createHTML('div', fixedBackground).addClass('cover');
            fixedBackground.prepend(createHTML('i',
                "Cliquer sur l'image pour quitter"));

            ths.after(fixedBackground);

            fixed = $('img.fixed');
            fixedBackground = $('div.cover');

            fixed.click(function() {
                $('div.cover').remove();
            });
        });
    });
});
