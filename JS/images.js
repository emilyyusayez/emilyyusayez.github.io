$(function() {
    var ths;
    var img;

    $('.closeup').each(function() {
        ths = $(this);
        img = ths.find('img').eq(0);
        img.click(function() {
            var ths = $(this);
            var src = ths.attr('src');
            var fixed = '<img src="' + src + '" class="fixed">';
            var fixedBackground = `
                <div class="cover">
                    <i>Cliquer sur l'image pour quitter</i>
                    <div class="fixed-div">
                    ` + fixed + `</div></div>`;

            ths.after(fixedBackground);

            fixed = $('img.fixed');
            fixedBackground = $('div.cover');

            fixed.click(function() {
                $('div.cover').remove();
            });
        });
    });
});
