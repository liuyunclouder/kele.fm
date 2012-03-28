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
		
		$pool.delegate('.item', 'hover', { cls: 'link-color'}, toggle_class);
		
		var $pool_alike = $('#J_Pool_alike');
		$pool_alike.masonry({
			itemSelector: '.item',
			columnWidth: 225,
			cornerStampSelector: '.alike'
		});
		
		$pool_alike.delegate('.item', 'hover', { cls: 'link-color' }, toggle_class);
		
			//漂浮子导航
		var $J_Fly_nav = $('#J_Fly_nav');
		$J_Fly_nav.delegate('a', 'hover', function(){
			$(this).next().andSelf().toggleClass('c-bdt');
		});
		
		var doc_height = $(document).height() - 600;
		
		var $J_Another = $('#J_Another');
		
		var fg, clientH = document.documentElement.clientHeight;
		
		$(window).scroll(function(){
			var top_cur = $(window).scrollTop();
			
			if(top_cur <= doc_height) {
				$J_Fly_nav.css('top', top_cur + 74);
			}
			if(top_cur > 1200) {
				fg = true;
			}
			
			if(fg){
				$J_Another.show(function(){
					if($(this).css('right') == 0) return ;
					$(this).animate({
						'right': 0
					}, 'fast');
				});
				if ( $.browser.msie && $.browser.version < 7 ) {
					$J_Another.css('top', top_cur + clientH - 86);
				}
			}
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
					$pool.append($data).masonry( "appended", $data);
				});
				
			});
			
		});
		
			//cell-news-nav hover效果
		$('.cell-news-nav').delegate('a', 'hover', { cls:'hover' }, toggle_class);
		
			//cell-share-board hover效果
		$('.cell-share-board').delegate('a', 'hover', { cls: 'hover' }, toggle_class);
		
		
			//cell-slider
		var $cell_slider = $('#J_Slider'),
			$big_cont = $('.big-cont', $cell_slider),
			$thumb_cont = $('.thumb-cont', $cell_slider),
			num_t = $('img', $thumb_cont).length,
			w_img = 630;
		
		$cell_slider.delegate('.btn-slide', 'click', function(e){
			var $this = $(this),
				i_before = $thumb_cont.find('.cur').index(),
				i_now,
				step;
			e.preventDefault();
			
			if($this.hasClass('prev')) {
				
				i_now = i_before - 1;
				
				go_slide(-1);
				
			}else if($this.hasClass('next')) {
			
				i_now = i_before + 1;
				
				go_slide(1);
				
			}else {
			
				i_now = $this.parent().index();
				step = i_now - i_before - 0;
				
				go_slide(step);
				
			}
			
			$cell_slider.find('.btn-cont a').removeClass('prev-disable next-disable');
			
			if(i_now == 0) {
				$cell_slider.find('.prev').addClass('prev-disable');
			}else if(i_now == num_t-1) {
				$cell_slider.find('.next').addClass('next-disable');
			}

			
			var re = $thumb_cont.find('li').removeClass('cur').eq(i_now).addClass('cur');
			
			
			function go_slide(step){
				
				if((i_before + step) >= num_t || (i_before + step) < 0) {
					i_now = i_before;
					return;
				};
				
				var amount = -(w_img * step),
					l_cur = Number($big_cont.css('left').slice(0, -2));

				
				$big_cont.animate({
					'left': '+=' + amount
				}, 'slow');
				
			};
			
			
		});
		
	});
	
	
	
})();

