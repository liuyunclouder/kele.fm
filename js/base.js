(function(){
	
	
	//切换class
	function toggle_class(e){
		var slt = e.data.slt,
			cls = e.data.cls;
			
		if(!slt) {
			$(this).toggleClass(cls);
		}else {
			$(slt, this).toggleClass(cls);
		}	
		
	};
	
	
	
	$(function(){
		
			//导航
		var $J_Nav = $('#J_Nav');
		$J_Nav.delegate('li', 'hover', { cls: 'hover'}, toggle_class);
		
			//瀑布流
		var $pool = $('#J_Pool');
		$pool.masonry({
			itemSelector: '.item',
			columnWidth: 225
			//cornerStampSelector: '.check-more'
		});
		
		$pool.delegate('.item-link', 'hover', { cls: 'link-color', slt: 'h2, p' }, toggle_class);
		
			//查看更多潮货
		$('#J_Check_more').click(function(e){
			e.preventDefault();
			
			$.get('ajax-items.html', function(data){
				var $data = $(data);

				$data.imagesLoaded(function(){
					$pool.append($data).masonry('appended', $data);
				});
				
			});
			
		});
		
		
			//漂浮子导航
		var $J_Fly_nav = $('#J_Fly_nav');
		$J_Fly_nav.delegate('a', 'hover', function(){
			$(this).next().andSelf().toggleClass('c-bdt');
		});
		
		
	});
	
})();