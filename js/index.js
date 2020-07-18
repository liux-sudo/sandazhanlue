var view = new ViewAdap();
view.setViewMode({
    designWidth: 3840,
    designHeight: 1080,
    mode: 'contain'
})

$('.ts div').click(function () {
    $('.right1').addClass('action1')
})

$('.ts>div').hover(function () {
    $(this).css({ cursor: 'pointer' })
})


// 住房金融
$('.tuijian ul li').eq(2).click(function () {
    $('.left1').addClass('action1')
})

$('.zkd').click(function () {
    $('.left1').removeClass('action1')
})

$('.phjr').click(function () {
    $('.right1').removeClass('action1')
})


// 房源点击关闭
$(document).on('click', '.lssq', function () {
    $('.zl-list').removeClass('action1')
})


// 租房租赁
$('.tuijian ul li').eq(0).click(function () {
    $('.zl-list').addClass('action1')
})
$('.tuijian ul li').eq(1).click(function () {
    $('.zl-list').addClass('action1')
})


// 建行TOP
$('.a').eq(0).click(function () {
    $('.tan1').addClass('action')
    $('.tan2').removeClass('action')
    $('.tan3').removeClass('action')
})

$('.a').eq(1).click(function () {
    $('.tan2').addClass('action')
    $('.tan1').removeClass('action')
    $('.tan3').removeClass('action')
})
$('.a').eq(2).click(function () {
    $('.tan3').addClass('action')
    $('.tan1').removeClass('action')
    $('.tan2').removeClass('action')
})


// 报道专栏


// 普惠经融下边轮播图事件
$(document).on("click", '.phjr1', function () {
    $('.left3').fadeOut()
})

$(document).on("click", '.lbt-swiper div', function () {
    $('.left3').fadeIn(300)
})
// 普惠经融下边轮播图事件 END


var num = 0;
function tan() {
    $('.a').eq(num).find(".tan").addClass('action');
    $(".a").eq(num).siblings().find(".tan").removeClass("action");
    num += 1;
    if (num == 3) {
        num = 0;
    }
}
timer01 = setInterval(tan, 3000)

$('.a').click(function () {
    clearInterval(timer01)
})

// 报道专栏
var li = $('.zhuanlan ul>li:nth-of-type(2)')

$(document).on('click', '.bdzl .close-bdzl', function () {
    $('.bdzl').hide()
    $('.zhuanlan-bd').show()
    li.show()
})

window.onload = function () {
    // ajax封装
    let jqPostAjaxPromise = function (param) {
        // 接口地址
        let baseUrl = "http://188.131.235.7/";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: baseUrl + param.url,
                type: param.type,
                page: param.page,
                limite: param.limite,
                data: param.data || '',
                dataType: "json",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error)
                }
            });
        });
    };

    // 请求普惠经融轮播图数据
    function getList() {
        jqPostAjaxPromise({
            url: "api/credit_product/list",
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg
            var lbt = '';
            for (var i in data) {
                lbt += '<div class="swiper-slide"  data-ID="' + data[i].cpId + ' ">' +
                    '<a href="javascript:;" class="Ysd">' +
                    '<img src="' + data[i].cpPicture + '" alt="">' +
                    '<div class="ysd">' + data[i].cpName + '</div>' +
                    '</a>' +
                    '</div>'
                $('.lbt-swiper').html(lbt)
            }
            var swiper = new Swiper('.swiper-container1', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                loop: true,
                autoplay: true,
                autoplay: {
                    delay: 3000,//1秒切换一次
                    disableOnInteraction: false,
                },
                coverflowEffect: {
                    rotate: 0,
                    stretch: 100,
                    depth: 80,
                    modifier: 5,
                    slideShadows: false,
                },
            });
        }).catch(err => {
            console.log(err)
        })
    }
    getList();

    // 请求普惠金融视频
    function getpujrvideo() {
        jqPostAjaxPromise({
            url: "api/credit_product/video",
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg
            var pujrvideo = '';
            pujrvideo +=
                '<video controls src="' + data + '" poster="./images/jjh.png" class="video1"></video>'
            $('.content .top .img').append(pujrvideo)
        }).catch(err => {
            console.log(err)
        })
    }
    getpujrvideo();

    // 请求住房租赁视频
    function getzfzlvideo() {
        jqPostAjaxPromise({
            url: "api/housing/video",
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg
            var zfzlvideo = '';
            zfzlvideo +=
                '<video controls src="' + data + '" poster="./images/jjh.png" class="video2"></video>'
            $('.zf-video').append(zfzlvideo)
        }).catch(err => {
            console.log(err)
        })
    }
    getzfzlvideo();

    // 请求金融科技视频
    function getjrkjvideo() {
        jqPostAjaxPromise({
            url: "api/financial_technology/video",
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg
            var jrkjvideo = '';
            jrkjvideo +=
                '<video controls src="' + data + '" poster="./images/jjh.png" class="video3"></video>'
            $('.video1').append(jrkjvideo)
        }).catch(err => {
            console.log(err)
        })
    }
    getjrkjvideo();

    // 请求普惠经融弹层轮播图
    function getpujrlbt1() {
        jqPostAjaxPromise({
            url: "api/financial_technology/list",
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg
            var phjrlbt1 = '';
            var phjrlbt2 = '';
            for (var i in data) {
                phjrlbt1 += '<div class="swiper-slide">' + '<img src="' + data[i].ftPicture + '" alt="">' + '</div>'
                phjrlbt2 += '<div class="swiper-slide" style="background:url(' + data[i].ftPicture + ';);margin-right:7px !important;">' + '</div>'
                $('#big').append(phjrlbt1)
                $('#big-1').append(phjrlbt2)
            }
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            });
            var galleryTop = new Swiper('.gallery-top', {
                spaceBetween: 10,
                autoplay: true,
                loop: true,
                autoplay: {
                    disableOnInteraction: false,
                    delay: 3000,//1秒切换一次
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs
                }
            });
        }).catch(err => {
            console.log(err)
        })
    }
    getpujrlbt1();

    // 请求报道专栏内容
    function getbdcontent() {
        jqPostAjaxPromise({
            url: "api/financialReports/list",
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg.rows
            var li = '';
            for (var i in data) {
                li += '<li>' +
                    '<span></span>' +
                    '<div>' +
                    '<a href="javascript:;">' +
                    '<p>' + data[i].name + '</p>' +
                    '<p>' + data[i].title + '</p>' +
                    '</a>' +
                    '</div>' +
                    '</li>'
            }
            $('.zl-content1 ul').append(li)
        }).catch(err => {
            console.log(err)
        })
    }
    getbdcontent();

    // 请求报道专栏弹出详细内容
    $(document).on('click', '.zl-content1 ul li', function () {
        var li = $('.zhuanlan ul>li:nth-of-type(2)')
        $('.bdzl').css({ display: 'block' })
        var i = $(this).index()
        li.hide()
        function getbdcontent1() {
            jqPostAjaxPromise({
                url: "api/financialReports/list",
                type: "get",
                data: {}
            }).then(res => {
                var data = res.msg.rows
                var li1 = '';
                li1 += '<div class="zhuanlan-bd1-content-title">' + data[i].name + '</div>' +
                    '<div class="zhuanlan-bd1-content-content">' +
                    '' + data[i].content + '' +
                    '</div>'
                $('.zhuanlan-bd1-content').html(li1)
            }).catch(err => {
                console.log(err)
            })
        }
        getbdcontent1();
    })


    // 请求普惠经融下部轮播图弹出内容
    $(document).on('click', '.lbt div div div', function () {
        var index = $(this).index() - 5
        function getpujrtclbt() {
            jqPostAjaxPromise({
                url: "api/credit_product/list",
                type: "get",
                data: {}
            }).then(res => {
                var data = res.msg
                var phjrtclbt = '';
                if (index == -1) {
                    index = 4
                }
                if (index >= data.length) {
                    index = 0
                }
                phjrtclbt += '<div class="close phjr1">' +
                    '<img style="width: 77px !important; height: 77px !important;"' +
                    'src="./images/list-images/cha.png" alt="">' +
                    '</div>' +
                    '<div class="content-left">' +
                    '<h1>普惠金融</h1>' +
                    '<p>INCLUSIVE FINANCE</p>' +
                    '<img src="./images/list-images/jx.png" alt="" class="jx">' +
                    '<img src="' + data[index].cpPicture + '" alt="" class="hb">' +
                    '<img src="' + data[index].cpQrCode + '" alt="" class="code">' +
                    '<p>扫码立即申请</p>' +
                    '</div>' +
                    '<div class="content-right">' +
                    '<div class="content-right-jx">' +
                    '<p>' + data[index].cpName + '</p>' +
                    '</div>' +
                    '<p>' + data[index].cpTitle + '</p>' +
                    '<div class="price">' +
                    '<div class="price-content1">贷款额度：' + data[index].cpPeriod + '</div>' +
                    '<div class="price-content1">年利率' + data[index].cpIntroduceB + '起</div>' +
                    '<div class="price-content1">贷款期限：' + data[index].cpIntroduceA + '</div>' +
                    '<div class="price-content">' +
                    '<ul>' +
                    '<li>' +
                    '<h1>办理条件</h1>' +
                    '<p>' + data[index].cpFeatures + '</p>' +
                    '</li>' +
                    '<li>' +
                    '<h1>办理条件</h1>' +
                    '<p>' + data[index].cpApplyObject + '</p>' +
                    '<div class="xy">' +
                    '纯信用 · 勤周转 · 高效率' +
                    '</div>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $('.content1').html(phjrtclbt)

            }).catch(err => {
                console.log(err)
            })
        }
        getpujrtclbt();
    })

    // 请求房源信息
    var num = 1;
    function gethouse() {
        jqPostAjaxPromise({
            url: "api/housing/list",
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg.rows
            var house = '';
            var img = '', img1 = '', img2 = '';

            house += '<div class="close lssq">' +
                '<img src="./images/list-images/cha.png" alt="">' +
                '</div>' +
                '<div class="zl-content">' +
                '<div class="title">' +
                '<div></div>' +
                '<h2>' + data[num].vhName + '</h2>' +
                '<img src="./images/list-images/zfyz.png" alt="">' +
                '</div>' +
                '<div class="swiper">' +
                '<!-- 住房租赁下边左边两个点击弹出来的轮播图 -->' +
                '<div class="swiper-container3">' +
                '<div class="swiper-wrapper">' +
                '<div class="swiper-slide"><img src="' + data[num].vhPicture + '" alt=""></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="zl-bottom">' +
                '<div class="zl-bottom-price">' +
                '<div><span>' + data[num].vhRental + '</span></div>' +
                '<span>' + data[num].vhLeaseType + '</span>' +
                '<span>' + data[num].vhIs + '</span>' +
                '<span>' + data[num].vhPaymentMethod + '</span>' +
                '</div>' +
                '<hr>' +
                '<div class="zl-bottom-content">' +
                '<div>' +
                '<div class="zl-bottom-content-title">' +
                '' + data[num].vhHouseType + '' +
                '</div>' +
                '<p>' + data[num].vhFloor + '</p>' +
                '</div>' +
                '<div>' +
                '<div class="zl-bottom-content-title">' +
                '' + data[num].vhToward + '' +
                '</div>' +
                '<p>' + data[num].vhDecorateDegree + '/' + data[5].vhApartment + '</p>' +
                '</div>' +
                '<div>' +
                '<div class="zl-bottom-content-title">' +
                '' + data[num].vhRoomArea + '' +
                '</div>' +
                '<p>2016年建/居住建筑</p>' +
                '</div>' +
                '</div>' +
                '<p>小区名称<span>' + data[num].vhVillageName + '</span></p>' +
                '<p>所在地址<span>' + data[num].vhAddress + '</span></p>' +
                '</div>' +
                '</div>'
            $('.zl-list').append(house)
            img += '<img src="' + data[4].vhPicture + '" alt="">'
            $('.tuijian ul .li1 div').append(img)
            img1 += '<img src="' + data[11].vhPicture + '" alt="">'
            $('.tuijian ul .li2 div').append(img1)
            img2 += '<img src="' + data[5].vhPicture + '" alt="">'
            $('.tuijian ul .li3 div').append(img2)

        }).catch(err => {
            console.log(err)
        })
    }
    gethouse();


    // 请求房源left信息
    var num1 = 1
    $(document).on('click', '.left1-button img', function () {
        num1--
        function gethouse() {
            jqPostAjaxPromise({
                url: "api/housing/list",
                type: "get",
                data: {}
            }).then(res => {
                var data = res.msg.rows
                var house = '';
                house +=
                    '<div class="zl-content">' +
                    '<div class="title">' +
                    '<div></div>' +
                    '<h2>' + data[num1].vhName + '</h2>' +
                    '<img src="./images/list-images/zfyz.png" alt="">' +
                    '</div>' +
                    '<div class="swiper">' +
                    '<!-- 住房租赁下边左边两个点击弹出来的轮播图 -->' +
                    '<div class="swiper-container3">' +
                    '<div class="swiper-wrapper">' +
                    '<div class="swiper-slide"><img src="' + data[num1].vhPicture + '" alt=""></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="zl-bottom">' +
                    '<div class="zl-bottom-price">' +
                    '<div><span>' + data[num1].vhRental + '</span></div>' +
                    '<span>' + data[num1].vhLeaseType + '</span>' +
                    '<span>' + data[num1].vhIs + '</span>' +
                    '<span>' + data[num1].vhPaymentMethod + '</span>' +
                    '</div>' +
                    '<hr>' +
                    '<div class="zl-bottom-content">' +
                    '<div>' +
                    '<div class="zl-bottom-content-title">' +
                    '' + data[num1].vhHouseType + '' +
                    '</div>' +
                    '<p>' + data[num1].vhFloor + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<div class="zl-bottom-content-title">' +
                    '' + data[num1].vhToward + '' +
                    '</div>' +
                    '<p>' + data[num1].vhDecorateDegree + '/' + data[num1].vhApartment + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<div class="zl-bottom-content-title">' +
                    '' + data[num1].vhRoomArea + '' +
                    '</div>' +
                    '<p>2016年建/居住建筑</p>' +
                    '</div>' +
                    '</div>' +
                    '<p>小区名称<span>' + data[num1].vhVillageName + '</span></p>' +
                    '<p>所在地址<span>' + data[num1].vhAddress + '</span></p>'
                '</div>'
                '</div>'
                $('.zl-list').append(house)
                $('.zl-content').css({ boxShadow: 'none' })
                if (num1 == 0) {
                    num1 = data.length
                }
            }).catch(err => {
                console.log(err)
            })
        }
        gethouse();
    })


    // 请求房源right信息
    var num5 = 0
    $(document).on('click', '.zl-list .right', function () {
        num5++
        function gethouse() {
            jqPostAjaxPromise({
                url: "api/housing/list",
                type: "get",
                data: {}
            }).then(res => {
                var data = res.msg.rows
                var house = '';
                house +=
                    '<div class="zl-content">' +
                    '<div class="title">' +
                    '<div></div>' +
                    '<h2>' + data[num5].vhName + '</h2>' +
                    '<img src="./images/list-images/zfyz.png" alt="">' +
                    '</div>' +
                    '<div class="swiper">' +
                    '<!-- 住房租赁下边左边两个点击弹出来的轮播图 -->' +
                    '<div class="swiper-container3">' +
                    '<div class="swiper-wrapper">' +
                    '<div class="swiper-slide"><img src="' + data[num5].vhPicture + '" alt=""></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="zl-bottom">' +
                    '<div class="zl-bottom-price">' +
                    '<div><span>' + data[num5].vhRental + '</span></div>' +
                    '<span>' + data[num5].vhLeaseType + '</span>' +
                    '<span>' + data[num5].vhIs + '</span>' +
                    '<span>' + data[num5].vhPaymentMethod + '</span>' +
                    '</div>' +
                    '<hr>' +
                    '<div class="zl-bottom-content">' +
                    '<div>' +
                    '<div class="zl-bottom-content-title">' +
                    '' + data[num5].vhHouseType + '' +
                    '</div>' +
                    '<p>' + data[num5].vhFloor + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<div class="zl-bottom-content-title">' +
                    '' + data[num5].vhToward + '' +
                    '</div>' +
                    '<p>' + data[num5].vhDecorateDegree + '/' + data[num5].vhApartment + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<div class="zl-bottom-content-title">' +
                    '' + data[num5].vhRoomArea + '' +
                    '</div>' +
                    '<p>2016年建/居住建筑</p>' +
                    '</div>' +
                    '</div>' +
                    '<p>小区名称<span>' + data[num5].vhVillageName + '</span></p>' +
                    '<p>所在地址<span>' + data[num5].vhAddress + '</span></p>'
                '</div>'
                '</div>'
                $('.zl-list').append(house)
                $('.zl-content').css({ boxShadow: 'none' })
                if (num5 >= data.length - 1) {
                    num5 = -1
                }
            }).catch(err => {
                console.log(err)
            })
        }
        gethouse();
    })



    // 请求住房金融
    var num2 = 0
    function getzfjr() {
        jqPostAjaxPromise({
            url: "api/financial_products/list",
            type: "get",
            data: {}
        }).then(res => {
            var data = res.msg
            var zfjr = '';
            zfjr +=
                '<div class="zfjrajax">' +
                '<div class="title">' +
                '<div class="xian"></div>' +
                '<p>住房金融产品·为您推荐</p>' +
                '</div>' +
                '<div class="swiper">' +
                '<!-- 住房租赁下边点击第三个弹出来的轮播图 -->' +
                '<div class="swiper-container2">' +
                '<div class="swiper-wrapper">' +
                '<div class="swiper-slide"><img src="' + data[num2].fbPicture + '" alt=""></div>' +
                '</div>' +
                '<div class="swiper-pagination" style="position:absolute;top:410px"></div>' +
                '</div>' +
                '</div>' +
                '<div class="xiangqing">' +
                '<h1 style="margin-left:300px">' + data[num2].fbName + '</h1>' +
                '<p style="margin-top:0">' + data[num2].fbTitle + '</p>' +
                '</div>' +
                '<div class="code">' +
                '<img src="' + data[num2].fbQrCode + '" alt="">' +
                '<p>扫描二维码 查看更多详情</p>' +
                '</div>'
            '</div>'
            $('.left1-content').append(zfjr)
            $(document).on('click', '.left1 .right', function r() {
            })
        }).catch(err => {
            console.log(err)
        })

    }
    getzfjr();


    // 请求住房金融right按钮
    var num4 = 0
    $(document).on('click', '.left1 .right', function () {
        num4++
        function getzfjr() {
            jqPostAjaxPromise({
                url: "api/financial_products/list",
                type: "get",
                data: {}
            }).then(res => {
                var data = res.msg
                var zfjr = '';
                for (var i in data) {
                    zfjr +=
                        '<div class="zfjrajax">' +
                        '<div class="title">' +
                        '<div class="xian"></div>' +
                        '<p>住房金融产品·为您推荐</p>' +
                        '</div>' +
                        '<div class="swiper">' +
                        '<!-- 住房租赁下边点击第三个弹出来的轮播图 -->' +
                        '<div class="swiper-container2">' +
                        '<div class="swiper-wrapper">' +
                        '<div class="swiper-slide"><img src="' + data[num4].fbPicture + '" alt=""></div>' +
                        '</div>' +
                        '<div class="swiper-pagination" style="position:absolute;top:410px"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="xiangqing">' +
                        '<h1 style="margin-left:300px">' + data[num4].fbName + '</h1>' +
                        '<p style="margin-top:0">' + data[num4].fbTitle + '</p>' +
                        '</div>' +
                        '<div class="code">' +
                        '<img src="' + data[num4].fbQrCode + '" alt="">' +
                        '<p>扫描二维码 查看更多详情</p>' +
                        '</div>'
                    '</div>'
                    $('.left1-content').append(zfjr)
                    $('.zfjrajax ').css({ background: 'rgba(238, 237, 240, 1)' })
                    if (num4 >= data.length - 1) {
                        num4 = -1
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }
        getzfjr();
    })


    // 请求住房金融left按钮
    var num3 = 2
    $(document).on('click', '.left1 .left2', function () {
        num3--
        function getzfjr() {
            jqPostAjaxPromise({
                url: "api/financial_products/list",
                type: "get",
                data: {}
            }).then(res => {
                var data = res.msg
                var zfjr = '';
                for (var i in data) {
                    zfjr +=
                        '<div class="zfjrajax">' +
                        '<div class="title">' +
                        '<div class="xian"></div>' +
                        '<p>住房金融产品·为您推荐</p>' +
                        '</div>' +
                        '<div class="swiper">' +
                        '<!-- 住房租赁下边点击第三个弹出来的轮播图 -->' +
                        '<div class="swiper-container2">' +
                        '<div class="swiper-wrapper">' +
                        '<div class="swiper-slide"><img src="' + data[num3].fbPicture + '" alt=""></div>' +
                        '</div>' +
                        '<div class="swiper-pagination" style="position:absolute;top:410px"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="xiangqing">' +
                        '<h1 style="margin-left:300px">' + data[num3].fbName + '</h1>' +
                        '<p style="margin-top:0">' + data[num3].fbTitle + '</p>' +
                        '</div>' +
                        '<div class="code">' +
                        '<img src="' + data[num3].fbQrCode + '" alt="">' +
                        '<p>扫描二维码 查看更多详情</p>' +
                        '</div>'
                    '</div>'
                    $('.left1-content').append(zfjr)
                    $('.zfjrajax ').css({ background: 'rgba(238, 237, 240, 1)' })
                    if (num3 == 0) {
                        num3 = data.length
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }
        getzfjr();
    })

    // 专栏报道刷新

    console.log($('.video1'))

    $(document).on('click','.video1',function(){
        var video = $(".video1");
        console.log(video)
        if(video.play){
            $('.video1').css({background:'#000'})
        }
    })
}
