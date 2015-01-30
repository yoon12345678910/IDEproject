document.write("<script src='/modules/editor.js'></script>");

var self = this;
if(jQuery) (function($){
	
	$.extend($.fn, {
		fileTree: function(o, h) {
			// Defaults
			if( !o ) var o = {};
			if( o.root == undefined ) o.root = '/home';
			if( o.script == undefined ) o.script = 'jqueryFileTree.js';
			if( o.folderEvent == undefined ) o.folderEvent = 'dbclick';
			if( o.expandSpeed == undefined ) o.expandSpeed= 500;
			if( o.collapseSpeed == undefined ) o.collapseSpeed= 500;
			if( o.expandEasing == undefined ) o.expandEasing = null;
			if( o.collapseEasing == undefined ) o.collapseEasing = null;
			if( o.multiFolder == undefined ) o.multiFolder = true;
			if( o.loadMessage == undefined ) o.loadMessage = 'Loading...';
			
			$(this).each( function() {
				
				function showTree(c, t) {
					$(c).addClass('wait');
					$(".jqueryFileTree.start").remove();
					$.post(o.script, { dir: t }, function(data) {
						$(c).find('.start').html('');
						$(c).removeClass('wait').append(data);
						if( o.root == t ) $(c).find('UL:hidden').show(); else $(c).find('UL:hidden').slideDown({ duration: o.expandSpeed, easing: o.expandEasing });
						bindTree(c);
					});
				}
				
				function bindTree(t) {
					$(t).find('LI A').bind(o.folderEvent, function() {
						
						
					// set up data object to send back via trigger
						var data = {};
						data.li = $(this).closest('li');
						data.type = ( data.li.hasClass('directory') ? 'directory' : 'file' );
						data.value	= $(this).text();
						data.rel	= $(this).prop('rel');
						
						
						if( $(this).parent().hasClass('directory') ) {
							
							_trigger($(this), 'dirtreeclicked', data);
							
							if( $(this).parent().hasClass('collapsed') ) {
						
								
								// Expand
								if( !o.multiFolder ) {
									$(this).parent().parent().find('UL').slideUp({ duration: o.collapseSpeed, easing: o.collapseEasing });
									$(this).parent().parent().find('LI.directory').removeClass('expanded').addClass('collapsed');
								}
								$(this).parent().find('UL').remove(); // cleanup
								showTree( $(this).parent(), escape($(this).attr('rel').match( /.*\// )) );
								$(this).parent().removeClass('collapsed').addClass('expanded');
							} else {
								// Collapse
								$(this).parent().find('UL').slideUp({ duration: o.collapseSpeed, easing: o.collapseEasing });
								$(this).parent().removeClass('expanded').addClass('collapsed');
							}
						} else {
							
							
						// this is a file click, return file information
							h($(this).attr('rel'));
							
							console.log("rel", data.rel);
							
							
							_trigger($(this), 'filetreeclicked', data);
						}
						return false;
					});
					
					// Prevent A from triggering the # on non-click events
					if( o.folderEvent.toLowerCase != 'click' ) $(t).find('LI A').bind('click', function() { return false; });
				}
				// Loading message
				$(this).html('<ul class="jqueryFileTree start"><li class="wait">' + o.loadMessage + '<li></ul>');
				// Get the initial file list
				showTree( $(this), escape(o.root) );
				
			// wrapper to append trigger type to data
				function _trigger(element, eventType, data) {
				data.trigger = eventType;
				element.trigger(eventType, data);
				}
				// checkbox event (multiSelect)
				$(this).on('change', 'input:checkbox' , function(){
				var data = {};
				data.li = $(this).closest('li');
				data.type	= ( data.li.hasClass('directory') ? 'directory' : 'file' );
				data.value	= data.li.children('a').text();
				data.rel	= data.li.children('a').prop('rel');
				// propagate check status to (visible) child checkboxes
				data.li.find('input:checkbox').prop( 'checked', $(this).prop('checked') );
				// set triggers
				if( $(this).prop('checked') ){
				_trigger($(this), 'filetreechecked', data);
				}
				else
				_trigger($(this), 'filetreeunchecked', data);
				});
				
				
				
			});
		}
	});
	
	
})(jQuery);