
// create a sliding drawer effect for text-area elements
(function($){
	// show all elements in a textarea box
	$.fn.showTextDrawer = function(options){

		var _defaults = {
			expandText : "expand",
			contractText : "contract",
			animationSpeed : 700,
			minSize : 200,
			maxSize : 400,
			zIndex : 200,
			afterChange : function(){ return true; }
		};

		// extend the default settings
		var _settings = $.extend({}, _defaults, options);

		this.each(function(index, elm){

			var $textarea = $(elm),
				$parent = $textarea.parent(),
				bindingBox = $('<div>').addClass("show-text-drawer"),
				showAllButton = $('<a>').attr('href', '#').text("expand"),
				textareaContainer = $('<div>').css({'z-index' : _settings.zIndex--, 
													'position' : 'absolute',
													'width' : $textarea.width()
													});

			// remove textelement from DOM so we can work on it
			$textarea.detach();	

			// append all to parent
			$parent.append(
				// binding box will be a placeholder for the textarea
				bindingBox.append(
					// textareaContainer will hold the textarea and the button to show/hide
					textareaContainer.append($textarea, showAllButton)
				)
			);

			// get the height difference
			bindingBox.css('margin-bottom', textareaContainer.height() - $textarea.height());

			// get new height / width from whole element
			bindingBox.css({ 'min-width' : textareaContainer.outerWidth(), 'height' : $textarea.outerHeight()});

			// set event handler on a elm
			showAllButton.on("click.show-text-drawer", function(e){
				// stop default behavior
				e.preventDefault();

				// show or hide box?
				if(bindingBox.data('show-text-drawer')){
					// animate the textbox to it's original form
					$textarea.animate(
						{'height': bindingBox.data('show-text-drawer')}, 
						700, 
						"easeOutExpo", 
						function(){
							bindingBox.removeData('show-text-drawer');
					});
					//set button text
					$(this).text(_settings.expandText);
				} else {	
					// get line number of textarea
					var lineNum = $textarea.val().split("\n").length;
					var textareaHeight = $textarea.height();
					// test if show-all is greater than the maxSize limit
					lineNum = lineNum * 20 > _settings.maxSize ? _settings.maxSize : lineNum * 20;
					// make sure lineNum is larger than the our minimum display size
					lineNum = lineNum < _settings.minSize ? _settings.minSize : lineNum;
					// set data to textarea's default height
					bindingBox.data('show-text-drawer', textareaHeight);		

					textareaContainer.css( 'min-width', $textarea.width() );
					// textareaContainer.css({ position : 'absolute'});
					// animate to our new height
					$textarea.animate(
						{'height': lineNum}, 
						700, 
						"easeInQuart"
					);
					//set button text
					$(this).text(_settings.contractText);
				}

			});
		});
	};
})( jQuery );