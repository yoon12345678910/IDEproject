var currPageNo;
var maxPageNo;
var uid
//$(document).ready(function(){});
$(function(){
	$.post('http://192.168.0.160:9998/getSession', 
			function(data){
		/*데이터 빼오기 정의.*/
	});
  loadProductList(uid);
  
 
});



$('#prevBtn').click(function(event){
	if (currPageNo > 1) {
	  loadProductList(currPageNo - 1);
	}
});

$('#nextBtn').click(function(event){
	if (currPageNo < maxPageNo) {
	  loadProductList(currPageNo + 1);
	}
});

/*function setPageNo(currPageNo, maxPageNo) {
  window.currPageNo = currPageNo;
  window.maxPageNo = maxPageNo;
  
  $('#pageNo').html(currPageNo);
  
  if (currPageNo <= 1) $('#prevBtn').css('display', 'none');
  else $('#prevBtn').css('display', '');
  
  if (currPageNo >= maxPageNo) $('#nextBtn').css('display', 'none');
  else $('#nextBtn').css('display', '');
}*/
	
function loadProductList() {
	$.getJSON('../json/project/listCollabo.do?uid=' + uid, 
    function(data){
      var collabos = data.collabos;
      
      require(['text!templates/product-table.html'], function(html){
        var template = Handlebars.compile(html);
        $('#listDiv').html( template(data) );
      });
    });
	
}































