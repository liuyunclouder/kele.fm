(function(){
	
	function nav_hover(e){
		var $target = $(this);
		
		$target.toggleClass('hover');
	};
	
	
	$(function(){
		
		$('#J_Nav li').hover(
			function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover');
			}
		);
		
	});
	
})();