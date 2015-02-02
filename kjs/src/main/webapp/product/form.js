var product;

$('#btnCancel').click(function(){
  $('.my-update-form').css('display', 'none');
  $('.my-new-form').css('display', '');
  product = null;
});

$('#btnDelete').click(function(){
  deleteProduct($('#no').val());
});

$('#btnUpdate').click(function(){
  if (product.name == $('#name').val() &&
      product.quantity == $('#quantity').val() &&
      product.makerNo == $('#makerNo').val() &&
      yyyyMMdd(product.madeDate) == $('#madeDate').val()) {
    alert('변경한 것이 없습니다!');
    return;
  }
  
  if (!validateForm()) return;
  
  updateProduct($('#no').val());
});

$('#btnAdd').click(function(){
  if (!validateForm()) return;
  
  /*$.post(URL, 성공함수)
     .fail(실패함수)
     .done(성공함수2)
     .always(마무리함수);
  */
  $.post('../json/product/add.do' /* URL */
      , { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
        name : $('#name').val(),
        quantity : $('#quantity').val(),
        makerNo : $('#makerNo').val(),
        madeDate : $('#madeDate').val(),
        photofile2 : $('#photofile').val()
      } 
      , function(result){ /* 서버로부터 응답을 받았을 때 호출될 메서드*/
        if (result.status == "success") {
          loadProductList(1);
          $('#btnCancel').click(); // click 이벤트 발생시킴.
        } else {
          alert("등록 실패!");
        }
      } 
      , 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리*/)
   /* 서버 요청이 실패했을 때 호출될 함수 등록*/   
   .fail(function(jqXHR, textStatus, errorThrown){ 
     alert(textStatus + ":" + errorThrown);
   });
  
});

function loadProduct(productNo) {
  $.getJSON('../json/product/view.do?no=' + productNo, 
    function(data){
      $('#btnCancel').click();
      
      $('#no').val(data.product.no);
      $('#name').val(data.product.name);
      $('#quantity').val(data.product.quantity);
      $('#makerNo').val(data.product.makerNo);
      
      if (data.product.madeDate) {
        $('#madeDate').val(yyyyMMdd(data.product.madeDate));
      }
      
      product = data.product;
      
      $('.my-update-form').css('display', '');
      $('.my-new-form').css('display', 'none');
    });
}

function deleteProduct(productNo) {
  $.getJSON('../json/product/delete.do?no=' + productNo, 
    function(data){
      if (data.status == 'success') {
        loadProductList(0);
        
        $('#btnCancel').click();
      }
    });
}

function validateForm() {
  if ( $('#name').val().length == 0) {
    alert('제품명은 필수 입력 항목입니다.');
    return false;
  }
  
  if ( $('#quantity').val().length == 0) {
    alert('수량은 필수 입력 항목입니다.');
    return false;
  }
  
  if ( $('#makerNo').val() == '0') {
    alert('제조사를 선택하세요');
    return false;
  }
  
  return true;
}

function yyyyMMdd(date) {
  if (date) {
    var date = new Date(date);
    var str = date.getFullYear() + '-';
    
    if (date.getMonth() < 9) str += '0';
    str += (date.getMonth() + 1) + '-';
    
    if (date.getDate() < 10) str += '0';
    str += date.getDate();
    
    return str;
    
  } else {
    return '';
  }
}

function updateProduct() {
  $.post('../json/product/update.do'
      , {
        no : $('#no').val(),
        name : $('#name').val(),
        quantity : $('#quantity').val(),
        makerNo : $('#makerNo').val(),
        madeDate : $('#madeDate').val(),
        photofile2 : $('#photofile').val()
      } 
      , function(result){
        if (result.status == "success") {
          loadProductList(0);
          $('#btnCancel').click(); 
        } else {
          alert("변경 실패!");
        }
      } 
      , 'json')
   .fail(function(jqXHR, textStatus, errorThrown){ 
     alert(textStatus + ":" + errorThrown);
   });
}