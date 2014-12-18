#pagescroll

------

pagescroll version 1.0.1
> * div布局方式自动调整，不需要一定为绝对布局

------
## 说明

> * 单页滚动视觉差插件，让你的页面也华丽丽的滑动起来
> * 超轻量级，源码6kb左右
> * 使用请参考demo.html

------

##例子

```javascript
    $(this).scrollAnimate({
        offset: 'left',
        offsetLen: 50,//偏移距离
        callBackHander: function(){
            console.info(offArr[index]+"---->动画执行完毕");
        },
        display:'show',
        easing:'swing',
        duration: 500,//动画执行时间
        enableScrollTop: true,//启用滚动监听 不启用 立即执行动画
        delay: 50//延时
    })
```

------
也可以直接附属在div标签上（data-scrollAnimate="right"）自动加上滚动效果