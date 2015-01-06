/*
 *jQuery UI datetime picker
 *
 *author: hs
 *
 *Depends:
 *      jquery-1.11.1
 *      bootstrap.css
*/

(function($){
 $.fn.timepicker = function(options){
    var defaults = {
        target_parent: null,
        init_value_fn: function(){ return new Date(); },
        callback: function(){},
        pos_fix_fn: function(pos){ return pos;}
    };
    var settings = $.extend({}, defaults, options);


    return this.each(function(){
        var me = $(this);

        var target_parent = (settings.target_parent) ? settings.target_parent : me.parent();

        var container = me.parent();
        var box_html = '<div class="timepicker"><table><tr class="tp-name"><td>Year</td><td>Mon</td><td>Day</td><td class="tp-space"></td><td>Hr</td><td>Min</td><td>Sec</td><td></td><td></td></tr><tr class="tp-inp"><td><input type="number" class="em4 tp-year"></td><td><input type="number" class="em2 tp-mon" max="12", min="1"></td><td><input type="number" class="em2 tp-day" max="31" min="1"></td><td></td><td><input type="number" class="em2 tp-hr" max="23" min="0"></td><td><input type="number" class="em2 tp-min" max="59" min=0></td><td><input type="number" class="em2 tp-sec" max="59" min="0"></td><td><select class="tp-locale"><option value="gmt">GMT</option><option value="local">Local</option></select></td><td><input type="button" class="tp-set" value="SET"></td></tr></table></div>';
        var box = null;

        function remove_fn(){
            if(box){
                box.remove();
                box = null;
            }
        }

        function init_box(b){
            var year = box.find('.tp-year');
            var mon = box.find('.tp-mon');
            var day = box.find('.tp-day');
            var hr = box.find('.tp-hr');
            var min = box.find('.tp-min');
            var sec = box.find('.tp-sec');
            var locale = box.find('.tp-locale');

            b.find('.tp-set').click(function(){
                if(locale.val() == 'gmt'){
                    var d = Date.UTC(year.val(), mon.val()-1, day.val(), hr.val(), min.val(), sec.val());
                }else{

                    var d = new Date(year.val(), mon.val()-1, day.val(), hr.val(), min.val(), sec.val());
                }

                settings.callback(me, d);
                remove_fn();
            });
            b.find('input').keyup(function(e){
                if(e.keyCode == 13){//enter
                    var d = new Date(year.val(), mon.val()-1, day.val(), hr.val(), min.val(), sec.val());
                    settings.callback(d);
                    remove_fn();
                }
            });

            var d = settings.init_value_fn(me);
            year.val(d.getFullYear());
            mon.val(d.getMonth()+1);
            day.val(d.getDate());
            hr.val(d.getHours());
            min.val(d.getMinutes());
            sec.val(d.getSeconds());
            locale.find('[value=local]')[0].selected = true;

        }

        function set_box(d){
            if(box){
                var year = box.find('.tp-year');
                var mon = box.find('.tp-mon');
                var day = box.find('.tp-day');
                var hr = box.find('.tp-hr');
                var min = box.find('.tp-min');
                var sec = box.find('.tp-sec');
                var locale = box.find('.tp-locale');
                year.val(d.getFullYear());
                mon.val(d.getMonth()+1);
                day.val(d.getDate());
                hr.val(d.getHours());
                min.val(d.getMinutes());
                sec.val(d.getSeconds());
                locale.f
            }
        }

        me.keyup(function(e){
            if(e.keyCode == 13){
                if(me.val()){
                    var v = parseInt(me.val(), 10);
                    var d = new Date(v);
                    set_box(d);
                }
            }
        });

        $(document).on("click", function(e){
            if(!$(e.target).is(me)){
                if(!$(e.target).is(box)){
                    if(!$(e.target).parents('.timepicker').length){
                        remove_fn();
                    }
                }
            }else{
                if(!box){
                    box = $(box_html);
                    var pos = settings.pos_fix_fn(me, {x: e.pageX, y: e.pageY});
                    box.css('left', pos.x).css('top', pos.y);
                    // box.appendTo(me.parent());
                    box.appendTo(settings.target_parent);
                    init_box(box);
                }
            }
        });


    });
};
}(jQuery));
