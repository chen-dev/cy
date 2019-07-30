// 导航滑动顺滑函数
$(function() {
	var ScrollTop = function (number, time) {
		number = number || 0
		if (!time) {
			document.body.scrollTop = document.documentElement.scrollTop = number;
			return number;
		}
		const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
		let spacingInex = time / spacingTime; // 计算循环的次数
		let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
		let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
		let scrollTimer = setInterval(function () {
				if (spacingInex > 0) {
					spacingInex--;
					ScrollTop(nowTop += everTop);
				} else {
					clearInterval(scrollTimer); // 清除计时器
				}
			},
			spacingTime
		);
	};


	// 滚动条滑动时，判断导航是否fixed
	//页面元素距离浏览器工作区顶部的距离 = 元素距离文档顶部的偏移值 - 网页别卷起来的高度
	var stop = window.innerHeight; // 获取整个浏览器工作区的高度
	$(window).scroll(function() {
		var top = document.documentElement.scrollTop || document.body.scrollTop; // 获取的是滚动条往下滚动了多少高度
		// 判断滚动条滚动的高度是不是等于浏览器工作区的高度，大于或等于就显示，小于就去掉fixed定位
		if(top >= stop) {
			$('nav').addClass('nav-fix');
		} else {
			$('nav').removeClass('nav-fix');
		}
	});

	// 招聘职位点击隐藏显示
	$('.taskTit ').click(function() {
		$(this).next().toggle();
		$(this).children('em').toggleClass('arrows');
	});

	// 点击导航滑动到相应区域
	// 获取该元素距离浏览器顶部的偏移位
	var personResume = $('.personResume').offset().top;
	var caseShow = $('.caseShow').offset().top;
	var profsskill = $('.profs-skill').offset().top;
	var contactUs = $('.contactUs').offset().top;
	$('.home-page').click(function() {
		ScrollTop(0, 300)
	});
	$('.idea').click(function() {
		ScrollTop(personResume - 66, 300);
	});
	$('.works').click(function() {
		ScrollTop(caseShow - 66, 300);
	});
	$('.recruit').click(function() {
		ScrollTop(profsskill - 66, 300);
	});
	$('.contact').click(function() {
		ScrollTop(contactUs - 66, 300);
	});

	//导航跟随滑动
	$(window).scroll(function() {
		var top = $(document).scrollTop(); // 定义变量，获取滚动条的高度
		var menu = $('#menu'); // 定义变量，抓取#menu
		var items = $('.content').find('.item'); // 定义变量，查找.item
		var curId = ''; // 定义变量，当前所咋的楼层item         
		items.each(function() {
			var m = $(this);
			var itemsTop = m.offset().top; // 获取当前类的距离顶部top值
			if(top > itemsTop - 100) { // 如果当前类距离顶部的top值-100 大于滚动条的高度
				curId = "#" + m.attr('id'); // 就给当前所在楼层赋值id
			} else {
				return false;
			}
		});
		// 给相应的楼层设置cur，取消其他楼层的cur
		var curLink = menu.find('.cur');
		if(curId && curLink.attr('href') != curId) { // 如果当前楼层和menu找到的动态添加类赋属性href 不等于 当前楼层
			curLink.removeClass('cur');
			menu.find("[href=" + curId + "]").parents('li').addClass('cur');
		}
	});

	// 鼠标移入图片 显示阴影层 旋转效果  scale 缩放 rotate 旋转
	$('.example>ul>li').mouseenter(function() {
		$(this).children('.empMask').css('opacity', '1');
		$(this).children('img').css('transform', ' scale(1.5) rotate(-25deg)');
	}).mouseleave(function() {
		$(this).children('.empMask').css('opacity', '0');
		$(this).children('img').css('transform', ' scale(1.0) rotate(0deg)')
	});

	// 点击阴影层上右图标 显示轮播图
	var slideimg = $('.emp-img>.emp-slideImg');
	$('.example>ul>li a.emp-slide').on('click', function() {
		var index = $(this).parents('li').index();
		slideimg.eq(index).show(1000);
		$('.mask-layer').css('display', 'block');
		console.log(index)
	});

	// 点击阴影层上左图标 显示下侧介绍
	var describe = $('.emp-des>.emp-describe');
	$('.example>ul>li a.emp-link').on('click', function() {
		var index = $(this).parents('li').index();
		describe.eq(index).show(1000).siblings().css('display', 'none').hide(1000);
	});

	// 轮播图切换
	var img = $('.example ul li .emp-slide').index();
	var index = 0;
	var length = $('.slideImgWidth>ul').length - 1;
	var imgwidth = $('.emp-slideImg ul li').width(); // 获取图片宽度
	if(index < 0 || index == 0) {
		index = 0;
		$('.emp-left').css('display', 'none');
	}
	// 点击轮播图左箭头
	var Liwidth = $('.em')
	$('.emp-left').click(function() {
		$('.emp-right').css('display', 'block');
		index--;
		if(index < 0) {
			index = 0;
			$('.emp-left').css('display', 'none');
		}
		if(index == 0) {
			$('.emp-left').css('display', 'none');
		}
		console.log(index);
		$('.emp-slideImg ul').css({
			left: index * -imgwidth + 'px'
		});
		console.log('点击左箭头')
		console.log(index)
	});

	// 点击轮播图右箭头

	$('.emp-right').click(function() {
		index++;
		if(index == 1) {
			$('.emp-left').css('display', 'block');
		}
		if(index > length) {
			index = 0;
		}
		if(index == length) {
			$(this).css('display', 'none')
		}
		$('.emp-slideImg ul').css({
			left: index * -imgwidth + 'px'
		});
		console.log('点击右箭头')
		console.log(index)
	});

	// 点击轮播图关闭按钮
	$('.close').click(function() {
		$('.emp-slideImg').css('display', 'none')
		$('.mask-layer').css('display', 'none')
	});

	// 点击下侧描述文字关闭按钮
	$('.close1').click(function() {
		$('.emp-describe').hide(1000);
	})
});