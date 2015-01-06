if(jQuery) (function($){
$.extend($.fn, {
fileTree: function(options, file) {
// Default options
if( options.root === undefined ) options.root = '/';
if( options.script === undefined ) options.script = 'jqueryFileTree.js';
if( options.folderEvent === undefined ) options.folderEvent = 'click';
if( options.expandSpeed === undefined ) options.expandSpeed = 500;
if( options.collapseSpeed === undefined ) options.collapseSpeed = 500;
if( options.expandEasing === undefined ) options.expandEasing = null;
if( options.collapseEasing === undefined ) options.collapseEasing = null;
if( options.multiFolder === undefined ) options.multiFolder = true;
if( options.loadMessage === undefined ) options.loadMessage = 'Loading...';
if( options.multiSelect === undefined ) options.multiSelect = false;
$(this).each( function() {
function showTree(element, dir) {
$(element).addClass('wait');
$(".jqueryFileTree.start").remove();
$.post(options.script,
{
dir: dir,
multiSelect: options.multiSelect
})
.done(function(data){
$(element).find('.start').html('');
$(element).removeClass('wait').append(data);
if( options.root == dir ) $(element).find('UL:hidden').show(); else $(element).find('UL:hidden').slideDown({ duration: options.expandSpeed, easing: options.expandEasing });
bindTree(element);
$(this).parent().removeClass('collapsed').addClass('expanded');
_trigger($(this), 'filetreeexpanded', data);
})
.fail(function(){
$(element).find('.start').html('');
$(element).removeClass('wait').append("<li>Unable to get file tree information</li>");
});
}
function bindTree(element) {
$(element).find('LI A').on(options.folderEvent, function() {
// set up data object to send back via trigger
var data = {};
data.li = $(this).closest('li');
data.type = ( data.li.hasClass('directory') ? 'directory' : 'file' );
data.value	= $(this).text();
data.rel	= $(this).prop('rel');
if( $(this).parent().hasClass('directory') ) {
if( $(this).parent().hasClass('collapsed') ) {
// Expand
_trigger($(this), 'filetreeexpand', data);
if( !options.multiFolder ) {
$(this).parent().parent().find('UL').slideUp({ duration: options.collapseSpeed, easing: options.collapseEasing });
$(this).parent().parent().find('LI.directory').removeClass('expanded').addClass('collapsed');
}
$(this).parent().find('UL').remove(); // cleanup
showTree( $(this).parent(), escape($(this).attr('rel').match( /.*\// )) );
} else {
// Collapse
_trigger($(this), 'filetreecollapse', data);
$(this).parent().find('UL').slideUp({ duration: options.collapseSpeed, easing: options.collapseEasing });
$(this).parent().removeClass('expanded').addClass('collapsed');
_trigger($(this), 'filetreecollapsed', data);
}
} else {
// this is a file click, return file information
file($(this).attr('rel'));
_trigger($(this), 'filetreeclicked', data);
}
return false;
});
// Prevent A from triggering the # on non-click events
if( options.folderEvent.toLowerCase != 'click' ) $(element).find('LI A').on('click', function() { return false; });
}
// Loading message
$(this).html('<ul class="jqueryFileTree start"><li class="wait">' + options.loadMessage + '<li></ul>');
// Get the initial file list
showTree( $(this), escape(options.root) );
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
if( $(this).prop('checked') )
_trigger($(this), 'filetreechecked', data);
else
_trigger($(this), 'filetreeunchecked', data);
});
});
}
});
})(jQuery);