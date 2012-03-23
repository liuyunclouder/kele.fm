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
	
	//masonry cornerStamp
	$.Mason.prototype.resize = function() {
		this._getColumns();
		this._reLayout();
	};
	$.Mason.prototype._reLayout = function( callback ) {
		var freeCols = this.cols;
		if ( this.options.cornerStampSelector ) {
			var $cornerStamp = this.element.find( this.options.cornerStampSelector ),
			cornerStampX = $cornerStamp.offset().left -
			( this.element.offset().left + this.offset.x + parseInt($cornerStamp.css('marginLeft')) );
			freeCols = Math.floor( cornerStampX / this.columnWidth );
		}
		// reset columns
		var i = this.cols;
		this.colYs = [];
		while (i--) {
			this.colYs.push( this.offset.y );
		}
		for ( i = freeCols; i < this.cols; i++ ) {
			this.colYs[i] = this.offset.y + $cornerStamp.outerHeight(true);
		}
		// apply layout logic to all bricks
		this.layout( this.$bricks, callback );
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
		
		var $pool_alike = $('#J_Pool_alike');
		$pool_alike.masonry({
			itemSelector: '.item',
			columnWidth: 225,
			cornerStampSelector: '.alike'
		});
		
		$pool_alike.delegate('.item-link', 'hover', { cls: 'link-color', slt: 'h2, p' }, toggle_class);
		
			//漂浮子导航
		var $J_Fly_nav = $('#J_Fly_nav');
		$J_Fly_nav.delegate('a', 'hover', function(){
			$(this).next().andSelf().toggleClass('c-bdt');
		});
		
		
			//查看更多潮货
		
		$(document.getElementById('J_Check_more')).click(function(e){
			e.preventDefault();
			
			if($(e.target).parents('.check-more').length == 0) {
				return;
			}
			$.get('ajax-items.html', function(data){
				var $data = $(data);
			
				$data.imagesLoaded(function(){
					$pool.append($data).masonry('appended', $data);
				});
				
			});
			
		});
		
			//cell-news-nav hover效果
		//var $cell_news_nav = $('.cell-news-nav');
		$('.cell-news-nav').delegate('a', 'hover', { cls:'hover' }, toggle_class);
		
		
		
	});
	
	
	
})();

