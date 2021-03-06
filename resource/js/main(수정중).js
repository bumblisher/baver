$(document).ready(function(){
	
	searchTime();
	newsTime();
	inputFocus($(".login_box input:text"));
	inputFocus($(".login_box input:password"));
	

	/* pager - recommend*/
	$(".recommend_btn a").on("click", function(){
		var target = $(this).parents(".recommend").find("ul");
		var on_idx = target.index($(".on"));
		var length = target.length;

		$(this).attr("class")=="rb_next" ? on_idx++ : on_idx-- ;
		
		if(on_idx<length){
			target.removeClass("on");
			target.eq(on_idx).addClass("on");
		}else if(on_idx==length){
			target.removeClass("on");
			target.eq(0).addClass("on");
		}
	})

	/* active on - s_font */
	$(".s_font > a").on("click", function(e){
		e.stopPropagation();
		e.preventDefault();
		if($(this).index()==0){
			if($(this).parent().hasClass("list_on")){
				$(this).parent().removeClass("list_on")
			}else{$(this).parent().removeClass("help_on").addClass("list_on");}
		}else{
			if($(this).parent().hasClass("help_on")){
				$(this).parent().removeClass("help_on")
			}else{$(this).parent().removeClass("list_on").addClass("help_on");}
		}
	});

	/* active out - s_font */
	$("body").on("click", function(e){
		$(".s_font").removeClass("list_on help_on");
	})

	/* checkbox - login_box */
	$(".login_box input:checkbox").on("click", function(){
		$(this).prop("checked") ? $(this).addClass("on") : $(this).removeClass("on")
	})

	/* rolling - time_search */
	var searchTop = -20;
	var newsTop = -20;
	
	$(".time_search").on("mouseenter", function(){
		clearTimeout(rolling_search);
		timer = setTimeout(function(){
			$(".time_search").addClass("on");
			$(".time_search h3").removeClass("hidden");
			$(".time_search ol").eq(0).css({"margin-top":0})
			
			var idx = -(searchTop/20)-1;
			$(".time_search ol li").eq(idx).addClass("on");
		},500)
	}).on("mouseleave", function(){
		clearTimeout(timer);
		searchTime();
		$(".time_search h3").addClass("hidden");
		$(".time_search").removeClass("on")
		$(".time_search ol").eq(0).css({"margin-top":searchTop+20+"px"})
		$(".time_search ol li").removeClass("on");
	});

	$(".time_search a").on("focus", function(){
		$(".time_search ol").eq(0).animate({"margin-top":"0"},0);
		clearTimeout(rolling_search);
		$(".time_search h3").removeClass("hidden");
		$(".time_search").addClass("on");
		$(".time_search ol li").eq(0).addClass("on");
		
	})

	$(".time_search a").on("blur", function(){
		searchTop = -20
		searchTime();
		$(".time_search").removeClass("on");
		$(".time_search h3").addClass("hidden");
		$(".time_search ol li").removeClass("on");
	})

	function searchTime(){
		rolling_search = setInterval(function(){
			if(searchTop==-200){
				$(".time_search ol").clone().css({"margin-top":0}).appendTo($(".time_search"));
			}
			if(searchTop==-200){
				$(".time_search ol").eq(1).remove();
				$(".time_search ol").eq(0).css({"margin-top":0})
				searchTop=-20;
				}
			$(".time_search ol").eq(0).animate({"margin-top":searchTop+"px"},500, function(){searchTop = searchTop-20;});
		},2000)
	}
	
	/* rolling - news_box */
	$(".news_rolling").on("mouseenter", function(){
		clearTimeout(rolling_news);
	}).on("mouseleave", function(){
		newsTime();
	});

	$(".news_rolling a").on("focus", function(){
		clearTimeout(rolling_news);
		var idx = $(this).index();
		$(".news_rolling ul").eq(0).css({"margin-top":"0"})
	})

	$(".news_rolling a").on("blur", function(){
		newsTop = -20;
		newsTime();
	})

	function newsTime(){
		rolling_news = setInterval(function(){
			if(newsTop==-100){
				$(".news_rolling ul").clone().css({"margin-top":0}).appendTo($(".news_rolling"));
			}
			if(newsTop==-120){
				$(".news_rolling ul").eq(1).remove();
				$(".news_rolling ul").eq(0).css({"margin-top":0})
				newsTop=-20;
				}
			$(".news_rolling ul").eq(0).animate({"margin-top":newsTop+"px"},500, function(){newsTop = newsTop-20;});
		},3000)
	}	

	/* 자동완성기능(미완)  */
	$(".search form a").on("click", function(){
		$(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
	})

	/* inputValue - login_box */
	function inputFocus(target){
		target.on("focus", function(){
			if($(this).val()==""){$(this).parent().children("label").text("");}
		})
		target.on("blur", function(){
			if($(this).val()==""){
				$(this).attr("type")=="text" ? $(this).parent().children("label").text("아이디") : $(this).parent().children("label").text("비밀번호");
				}
		})
	}

	/* tabMenu - news_con */
	$(".news_header > ul a").on("click", function(){
		$(".news_header > ul a").parent().removeClass("on");
		$(this).parent().addClass("on");
		if($(this).parent().index()=="0"){
			$(".news_con").children(".on").removeClass();
			$(".news_con ul").addClass("on");
			$(".news_footer .page_arrow").show();
		}else{
			$(".news_con").children(".on").removeClass();
			$(".news_con div").addClass("on");
			$(".news_footer .page_arrow").hide();
		}
	})

	/* selectbox - news_stand */
	$(".news_sel > a").on("click", function(){
		$(this).toggleClass("on");
	})
	$(".news_sel ul a").on("click", function(){
		var target_text = $(this).text();
		$(".news_sel ul a").removeClass("on");
		$(this).addClass("on");
		$(".news_sel > a").removeClass("on").text(target_text);
	})

	var NewsArr = [
			["01","뉴시스"],["02","동아일보"],["03","YTN"],["04","아시아경제"],["05","코리아타임즈"],["06","OSEN"],["07","프레시안"],["08","ChosunBiz"],["09","아이뉴스24"],["10","한국경제TV"],
			["11","블로터"],["12","오마이뉴스"],["13","한겨레"],["14","이데일리"],["15","REUTERS"],["16","sportaikorea"],["17","데일리안"],["18","조선일보"],["19","마이데일리"],["20","스포츠조선"],
			["21","미디어오늘"],["22","노컷뉴스"],["23","서울경제"],["24","전자신문"],["25","헤럴드경제"],["26","코리안헤럴드"],["27","중앙일보"],["28","머니투데이"],["29","경향신문"],["30","MBC"],
			["31","한국일보"],["32","SBS"],["33","매일경제"],["34","서울신문"],["35","JIJI"],["36","넷코리아"],["37","일간스포츠"],["38","파이낸셜뉴스"],["39","MBN"],["40","뉴데일리"],
			["41","세계일보"],["42","문화일보"],["43","국민일보"],["44","KBS"],["45","중앙데일리"],["46","디지털타임스"],["47","한국경제"],["48","KBSWORLD"],["49","스포츠동아"]
		]
	
	var RandomArr = [];

	/* random - news */
	function NewsRandom(){
		for(var i=0;i < NewsArr.length;i++){
			var r = Math.floor(Math.random()*(NewsArr.length));
			
		}
	}

	NewsRandom();
})