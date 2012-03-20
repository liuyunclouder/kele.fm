(function(){
	

	
	$(function(){
		
		//导航
		$('#J_Nav li').hover(
			function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover');
			}
		);
		
		//瀑布流
		$('#J_Pool').masonry({
			itemSelector: '.item'
		});
		$('.item-link').hover(
			function(){
				$('h2, p',this).addClass('link-color');
			},function(){
				$('h2, p',this).removeClass('link-color');
			}
		);
		
		//漂浮子导航
		$('#J_Fly_nav a').hover(
			function(){
				$(this).next().andSelf().addClass('c-bdt');
			},function(){
				$(this).next().andSelf().removeClass('c-bdt');
			}
		);
		
	});
	
})();