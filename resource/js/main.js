$(document).ready(function(){
	
	searchTime();
	newsTime();
	inputFocus($(".login_box input:text"));
	inputFocus($(".login_box input:password"));
	

	/* pager - recommend*/
	$(".recommend_btn a").on("click", function(e){
		e.preventDefault();
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

	/* 자동완성기능 - auto_search  */
	$(".search form a").on("click", function(e){
		e.stopPropagation();
		e.preventDefault();
		if($(this).hasClass("on")){
			$(this).removeClass("on")
			$(".auto_search").removeClass("on");
		}
		else{
			$(this).addClass("on");
			$(".auto_search").addClass("on");
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
	$("body").on("click", function(){
		$(".s_font").removeClass("list_on help_on");
		$(".search a").removeClass("on");
		$(".auto_search").removeClass("on");
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
			if(searchTop==-220){
				$(".time_search ol").eq(1).remove();
				$(".time_search ol li").eq(0).addClass("on");
				searchTop==20;
				}
		},0) /*딜레이 수정함*/
	}).on("mouseleave", function(){
		searchTime();
		$(".time_search h3").addClass("hidden");
		$(".time_search").removeClass("on")
		$(".time_search ol").eq(0).css({"margin-top":searchTop+20+"px"})
		if(searchTop==-220){
			$(".time_search ol").eq(0).css({"margin-top":0})
		}
		$(".time_search ol li").removeClass("on");
	});

	$(".time_search a").on("focus", function(){
		$(".time_search ol").eq(0).stop().css({"margin-top":"0"});
		clearTimeout(rolling_search);
		$(".time_search h3").removeClass("hidden");
		$(".time_search").addClass("on");
		$(".time_search ol li").eq(0).addClass("on");
		
	})

	$(".time_search a").on("blur", function(){
		clearTimeout(rolling_search);
		searchTop = -20;
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
			if(searchTop==-220){
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
	})

	/*$(".news_rolling li:last-child a").on("blur", function(){
        $(".news_rolling li a").eq(0).focus();
        $(".news_rolling li a").eq(0).blur();
		newsTop = -20;
		newsTime();
	});*/
	$(".news_rolling li:last-child a").on("blur", function(){
        $(".news_rolling li").eq(0).attr("tabIndex", "0").focus();
        $(".news_rolling li").eq(0).attr("tabIndex", "-1").blur();
      newsTop = -20;
      newsTime();
   });
            
    $(".news_rolling li:first-child a").on("blur", function(){
      newsTop = -20;
      newsTime();
	});        

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
	$(".news_header > ul a").on("click", function(e){
		e.preventDefault();
		$(".news_header > ul a").parent().removeClass("on");
		$(this).parent().addClass("on");
		if($(this).parent().index()=="0"){
			$(".news_con").children(".on").removeClass();
			$(".news_con ul").addClass("on");
			$(".news_footer .page_arrow").show();
			$(".news_con ul li").remove();
			NewsRandom();
			Npage = 1;
			$(".news_footer .page_arrow p span").text(Npage);
			var news_page = $(".news_con ul li").length
			var Npage_All = Math.ceil(news_page/12);
			$(".news_footer .page_arrow p").html('<span>1</span>/'+Npage_All);
			$(".news_sel ul a").removeClass("on").eq(0).addClass("on");
			$(".news_sel > a").text("주요언론사");

		}else{
			$(".news_con").children(".on").removeClass();
			$(".news_con div").addClass("on");
			$(".news_footer .page_arrow").hide();
		}
	})

	/* selectbox - news_stand */
	$(".news_sel > a").on("click", function(e){
		e.preventDefault();
		$(this).toggleClass("on");
	})
	$(".news_sel ul a").on("click", function(e){
		e.preventDefault();
		var target_text = $(this).text();
		var idx = $(this).parent().index();
		var flag = 0;
		$(".news_sel ul a").removeClass("on");
		$(this).addClass("on");
		$(".news_sel > a").removeClass("on").text(target_text);
		$(".news_con ul li").remove();		
		
		for(var num=1; num < RandomArr.length; num++){
			if(RandomArr[num][2]==target_text){
				flag++;
				if(flag<=12){
					$(".news_con ul").append('<li class="on"><a href="#"><img src="resource/images/news_img/news'+RandomArr[num][0]+'.gif" alt="'+RandomArr[num][1]+'"></a></li>');
				}else{
					$(".news_con ul").append('<li><a href="#"><img src="resource/images/news_img/news'+RandomArr[num][0]+'.gif" alt="'+RandomArr[num][1]+'"></a></li>');
				}
			}else if(target_text=="주요언론사"){
				if(num<=12){
				$(".news_con ul").append('<li class="on"><a href="#"><img src="resource/images/news_img/news'+RandomArr[num][0]+'.gif" alt="'+RandomArr[num][1]+'"></a></li>');
				}else{
					$(".news_con ul").append('<li><a href="#"><img src="resource/images/news_img/news'+RandomArr[num][0]+'.gif" alt="'+RandomArr[num][1]+'"></a></li>');
				}
			}
		}
		Npage = 1;
		news_page = $(".news_con ul li").length;
		Npage_All = Math.ceil(news_page/12);
		$(".news_footer .page_arrow p").html('<span>1</span>/'+Npage_All);
	})

	var NewsArr = [
			["01","뉴시스","종합/경제"],["02","동아일보","종합/경제"],["03","YTN","종합/경제"],["04","아시아경제","종합/경제"],["05","코리아타임즈","종합/경제"],["06","OSEN","종합/경제"],["07","프레시안","종합/경제"],["08","ChosunBiz","종합/경제"],["09","아이뉴스24","종합/경제"],["10","한국경제TV","종합/경제"],
			["11","블로터","종합/경제"],["12","오마이뉴스","종합/경제"],["13","한겨레","종합/경제"],["14","이데일리","종합/경제"],["15","REUTERS","종합/경제"],["16","sportaikorea","종합/경제"],["17","데일리안","종합/경제"],["18","조선일보","종합/경제"],["19","마이데일리","종합/경제"],["20","스포츠조선","종합/경제"],
			["21","미디어오늘","방송/통신"],["22","노컷뉴스","방송/통신"],["23","서울경제","방송/통신"],["24","전자신문","방송/통신"],["25","헤럴드경제","방송/통신"],["26","코리안헤럴드","방송/통신"],["27","중앙일보","방송/통신"],["28","머니투데이","IT"],["29","경향신문","IT"],["30","MBC","영자지"],
			["31","한국일보","영자지"],["32","SBS","영자지"],["33","매일경제","영자지"],["34","서울신문","스포츠/연예"],["35","JIJI","스포츠/연예"],["36","넷코리아","스포츠/연예"],["37","일간스포츠","스포츠/연예"],["38","파이낸셜뉴스","스포츠/연예"],["39","MBN","스포츠/연예"],["40","뉴데일리","스포츠/연예"],
			["41","세계일보","스포츠/연예"],["42","문화일보","스포츠/연예"],["43","국민일보","스포츠/연예"],["44","KBS","스포츠/연예"],["45","중앙데일리","스포츠/연예"],["46","디지털타임스","스포츠/연예"],["47","한국경제","매거진/전문지"],["48","KBSWORLD","지역"],["49","스포츠동아","지역"]
		]
	
	var RandomArr = [];

	/* random - news */
	function NewsRandom(){
		for(var i=0;i <= NewsArr.length;i++){
			var Rnum = Math.floor(Math.random()*(NewsArr.length));
			
			for(var j=0; j<i; j++){
				if(NewsArr[Rnum] == RandomArr[j]){
					i--;
					break;
				}else{
					RandomArr[i] = NewsArr[Rnum];
				}
			}
		}
		for(var num=1; num < RandomArr.length; num++){
			if(num<=12){
				$(".news_con ul").append('<li class="on"><a href="#"><img src="resource/images/news_img/news'+RandomArr[num][0]+'.gif" alt="'+RandomArr[num][1]+'"></a></li>');
			}else{
				$(".news_con ul").append('<li><a href="#"><img src="resource/images/news_img/news'+RandomArr[num][0]+'.gif" alt="'+RandomArr[num][1]+'"></a></li>');
			}
		}
		$(".news_con ul li:nth-child(6n)").children("a").css({"width":"84px"});
	}
	NewsRandom();
	
	/* paging */
	var news_page = $(".news_con ul li").length
	var Npage_All = Math.ceil(news_page/12);
	var Npage = 1;
	$(".news_footer .page_arrow p").html('<span>1</span>/'+Npage_All);
	
	/* pager - news*/
	$(".news_footer .page_arrow a").on("click", function(e){
		e.preventDefault();
		var target = $(".news_con ul");
		var on_idx = target.children(".on:eq(0)").index();
		var Pnum = 0;
		//if()
		var pre_idx = on_idx-12;
		var next_idx = on_idx+12;
		var next_idx2 = next_idx+12;
		
		if($(this).index() =="1"){
			if(Npage>1){
				Npage--
				target.children(".on").removeClass("on");
				for(pre_idx;pre_idx<on_idx;pre_idx++){
					target.children("li").eq(pre_idx).addClass("on");
				}
			}
		}else{
			if(Npage<Npage_All){
				Npage++
				target.children(".on").removeClass("on");
				for(next_idx;next_idx<next_idx2;next_idx++){
					target.children("li").eq(next_idx).addClass("on");
				}
			}
		}
		$(".news_footer .page_arrow p span").text(Npage);
	})

	/* post */
	$(".post_footer .page_arrow a").on("click", function(e){
		
		e.preventDefault();
		var target = $(".post_menu li");
		var target2 = $(".post_con");
		var target3 = $(".post_footer ul");
		var on_idx = $(".post_menu li.on").index();
		var length = target.length;
		if($(this).index() =="1"){
			if(on_idx>0){
				on_idx--;
				console.log(on_idx)
				target.removeClass("on");
				target2.removeClass("on");
				target3.removeClass("on");
				target.eq(on_idx).addClass("on");
				target2.eq(on_idx).addClass("on");
				target3.eq(on_idx).addClass("on");
				$(".post_footer .page_arrow p span").text(on_idx+1);
			}
		}else{
			if(on_idx<(length-1)){
				on_idx++;
				console.log(on_idx)
				target.removeClass("on");
				target2.removeClass("on");
				target3.removeClass("on");
				target.eq(on_idx).addClass("on");
				target2.eq(on_idx).addClass("on");
				target3.eq(on_idx).addClass("on");
				$(".post_footer .page_arrow p span").text(on_idx+1);
			}
		}
	}) 
	
	$(".post_menu a").on("click", function(e){
		var target = $(".post_footer ul");
		e.preventDefault();
		var idx = $(this).parent().index();
		$(".post_menu li").removeClass("on");
		$(".post_con").removeClass("on");
		$(this).parent().addClass("on");
		$(".post_con").eq(idx).addClass("on");
		$(".post_footer .page_arrow p span").text(idx+1);
		target.removeClass("on");
		target.eq(idx).addClass("on");
	})
})