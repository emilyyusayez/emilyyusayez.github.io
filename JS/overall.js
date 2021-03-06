window.onload = function() {
    $(setBasicClasses());
    $(setChangeVariables());

    $(setAddBefore());
    $(setVariables('vr'));
}




function setBasicClasses() {
    $('.table_js').wrapInner('<table><tr><td></table></tr></td>');
    $('.scroll_js').wrapInner('<scroll></scroll>');
}




/*
    <container class="addBefore" target="elem" toAdd="<span>—</span>">
        some text
        <p>some text <elem>targeted text</elem> some text</p>

        <elem>targeted text 2</elem>
        <elem>targeted text 3</elem>
    </container>

    BECOMES ::
        <container class="addBefore" target="elem" toAdd="-">
            some text
            <p>some text -<elem>targeted text</elem> some text</p>

            -<elem>targeted text 2</elem>
            -<elem>targeted text 3</elem>
        </container>

    NOTE :: use "addBefore-true" if you don't want toAdd to be inserted
            before the first target element
            example:
                <div class="addBefore-true" target="a" toAdd="<br>">
                    <a>link</a>
                    <a>link</a>
                    <a>link</a>
                </div>
            BECOMES ::
                <div class="addBefore-true" target="a" toAdd="<br>">
                    <a>link</a>
                    <br><a>link</a>
                    <br><a>link</a>
                </div>
*/
function setAddBefore() {
    $('[class^="addBefore"]').each(function() {
        var ths = $(this);
        var classe = ths.attr('class').split('-');
        if (classe.length == 2) {
            var useCount = true;
            var count = 0;
        } else {
            var useCount = false;
            var count = 1;
        }
        console.log(useCount);
        var target = ths.attr('target');
        var toAdd = ths.attr('toAdd');
        toAdd = createHTML('span', toAdd);

        ths.find(target).each(function() {
            console.log(count);
            if (count != 0) $(toAdd).insertBefore($(this));
            count++;
        });
    });
}




/*
    <container class="changeVariables" style="--variableX: valueX; --variableY">
        some long content...
        some long content
    </container>

    EFFECT :: CHANGE VARIABLES
        for the length of the block, variables are changed.
        the values can mostly be colors.
        that way, body background can be changed easily for just a part of the code.

        example:
            <div class="changeVariables" style="--background-body: white; --h1: lightblue;">
                <img src="xx" height="3000">
            </div>
            --> body background and highlight 1 will be changed for the 3000px height of the div.changeVariables
*/
function setChangeVariables() {

    var changed = [];
    //var navHeight = $('nav').outerHeight();
    //navHeight *= 3;
    var navHeight = window.innerHeight / 2;
    var count = 0;

    $('.changeVariables').each(function() {
        // sets top and bottom of element
        var el = $(this);
        var pos = el.offset();
        var top = pos.top - navHeight;
        if (top < 0) top = 0;
        var bottom = top + el.outerHeight();
        console.log(el.outerHeight());
        for (var i = 0; i < changed.length; i++) {
            var bottomOfElement = changed[i][0][1];
            if (bottomOfElement > bottom) return;
        }


        // sets list of css attributes tu change
        var style = el.attr('style');
        if (style == undefined) return;
        else style = style.split(';');
        var styles = [];
        var current = '';

        for (let cssAttr of style) {
            cssAttr = strip(cssAttr);
            if (cssAttr != '') {
                current = cssAttr.split(':');
                for (var i = 0; i < current.length; i++)
                current[i] = strip(current[i]);
                styles.push(current);
            }
        }

        var toPush = [[top, bottom], styles];
        changed.push(toPush);
    });

    console.log(changed);



    // change the attributes on scroll
    if (changed.length > 0)
        $(window).scroll(function() {
            var scroll = $(this).scrollTop();

            for (var i = 0; i < changed.length; i++) {
                var top = changed[i][0][0];
                var bottom = changed[i][0][1];

                if (top < scroll && scroll < bottom) {
                    for (let att of changed[i][1]) {
                        $('body').css(att[0], att[1]);
                    }
                    return;
                } else {
                    $('body').removeAttr('style');
                }
            }
        });
}




/*
    SET :: ($('#var_def') NOT child of $('#var_container'))
        <div id="var_def">
            <vr value="var1">text1</vr>
            <vr value="var2">text2</vr>
            <vr value="var3">text3</vr>
        </div>

        <div id="var_container">
            ...
            <vr value="var1"></vr><vr value="var1"></vr>
            <vr value="var2"></vr><vr value="var3"></vr>
            <vr value="var3"></vr>
            ...
        </div>

    BECOMES :: (each $('vr') but not $('#var_def'))
        <div id="var_def">...</div>

        <div id="var_container">
            ...
            <vr value="var1">text1</vr><vr value="var1">text1</vr>
            <vr value="var2">text2</vr><vr value="var3">text3</vr>
            <vr value="var3">text3</vr>
            ...
        </div>
*/
function setVariables(name) {
    $('#var_def').find(name).each(function() {
        var ths = $(this);
        ths.hide();
        var target = ths.attr('value');
        var element = ths.html();

        $('#var_container').find(name + '[value="' + target + '"]').each(function() {
            $(this).append(element);
        });
    });
}
