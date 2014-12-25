/**
 * Created by lohasle github.com/lohasle on 2014/11/17.
 * 滚动偏移插件 相对位置偏移
 * offset 偏移位置 top bottom right left
 * offsetLen 偏移距离
 * duration 动画时间
 * delay   延迟时间
 * enableScrollTop  为false 为立即执行
 * display 动画类型  show  显示  hide  隐藏
 */
;(function($){
    $.scrollAnimate = function (options) {
        var _options = $.extend({}, {
                offset: 'top', //偏移位置
                offsetLen: 50,//偏移距离
                scrollHander: $.noop,//监听函数
                callBackHander: $.noop,
                display:'show',
                easing:'swing',
                duration: 380,//执行时间
                enableScrollTop: true,
                delay: 70//延时
            }, options),
            self = $(this),
            offsetObj = {};

        if (!/top|left|right|bottom/.test(_options.offset)){
            return false;
        }

        function getPosition(el){
            var result =el.position();
            if(el.is(':hidden')){
                result = el.css('opacity','0').show().position();
                el.css('opacity','1').hide();
            }
            return result;
        }


        function getElementLeft(element) {
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent
            }
            return actualLeft
        }
        function getElementTop(element) {
            var actualTop = element.offsetTop;
            var current = element.offsetParent;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent
            }
            return actualTop
        }

        var runOver = false,
            position = getPosition(self),
            topWz = getElementTop(self[0])-document.documentElement.clientHeight+self.height();

        offsetObj = {
            topHome :self.css('position')!=='absolute'?0:position['top'],
            leftHome :self.css('position')!=='absolute'?0:position['left'],
            init:function(){

                //调整布局 不是绝对布局 调整布局
                if(self.css('position')!=='absolute'){
                    self.css('opacity','0').show();
                    var $sp =$('<div data-create="auto" style="position: relative;"></div>'),
                        _height = self.height(),
                        _width = self.width();
                    $sp.css({
                        'height':_height,
                        'width':_width,
                        'padding-top':self.css('padding-top')?self.css('padding-top'): 0,
                        'padding-bottom':self.css('padding-bottom')?self.css('padding-bottom'): 0,
                        'padding-left':self.css('padding-left')?self.css('padding-left'): 0,
                        'padding-right':self.css('padding-right')?self.css('padding-right'): 0,
                        'margin-top':self.css('margin-top')?self.css('margin-top'): 0,
                        'margin-bottom':self.css('margin-bottom')?self.css('margin-bottom'): 0,
                        'margin-left':elem.css('marginLeft')!='0px'?elem.css('marginLeft'): elem.position().left,
                        'margin-right':elem.css('marginRight')!='0px'?elem.css('marginRight'): elem.position().right

                    });
                    self.css({
                        'opacity':'1',
                        'height':_height,
                        'width':_width,
                        'padding':0,
                        'margin':0, //转移到父元素
                        'left':offsetObj.topHome,
                        'top':offsetObj.leftHome,
                        'position':'absolute'
                    }).hide();
                    self.wrap($sp);
                }

                if(_options.display==='hide'){
                    //移出
                    self.show();
                }else{
                    //移入 调整
                    self.hide();
                    if(_options.offset === 'top'){
                        self.css('top',~~offsetObj.topHome+ _options.offsetLen);
                    }else if(_options.offset === 'bottom'){
                        self.css('top',~~offsetObj.topHome - _options.offsetLen);

                    }else if(_options.offset === 'left'){
                        self.css('left',~~offsetObj.leftHome+ _options.offsetLen);

                    }else if(_options.offset === 'right'){
                        self.css('left',~~offsetObj.leftHome - _options.offsetLen);
                    }
                }

            },
            move:function(){
                var st = setTimeout(function(){
                    var _css = {};
                    var _hfCss = {};
                    _hfCss[(_options.offset==='top'||_options.offset==='bottom')?'top':'left'] =(_options.offset==='top'||_options.offset==='bottom')?offsetObj.topHome:offsetObj.leftHome;
                    if(_options.display==='hide') {
                        //移出
                        if(_options.offset === 'top'){
                            _css['top'] =~~offsetObj.topHome- _options.offsetLen;
                        }else if(_options.offset === 'bottom'){
                            _css['top'] =~~offsetObj.topHome+_options.offsetLen;
                        }else if(_options.offset === 'left'){
                            _css['left'] =~~offsetObj.leftHome- _options.offsetLen;
                        }else if(_options.offset === 'right'){
                            _css['right'] =~~offsetObj.leftHome+_options.offsetLen;
                        }
                    }else{
                        _css = _hfCss;
                    }
                    _css['opacity'] =_options.display==='show'?'show':'hide';
                    self.animate(_css,_options.duration,_options.easing,function(){
                        if(_options.display==='hide'){
                            //恢复
                            self.css(_hfCss);
                        }
                        _options.callBackHander.call(self);
                    });
                    runOver = true;//执行完毕
                    clearTimeout(st);
                },_options.delay);
            }
        };


        //init
        offsetObj.init();
        if(!_options.enableScrollTop){
            offsetObj.move();
        }else{
            //listen
            $(window).scroll(function(e){
                var scrollTop = $(window).scrollTop();//滚动高度

                if(scrollTop>=topWz&&!runOver){
                    offsetObj.move();
                }
            });
        }
    };
    $.fn.scrollAnimate = function(options){
        this.each(function(){
            $.scrollAnimate.call(this,options);
        });
    };
    $(function(){
        $('body div[data-scrollAnimate]').hide().each(function(){
            $(this).scrollAnimate({
                offset:$(this).attr('data-scrollAnimate')
            });
        });
    });
})(jQuery);




