/*▼light boxで商品説明を出す*/
$(function(){
	$(".item li a").each(function() {
		//aタグ内にimgタグがあるか？
		if( $(this).find('img')) {
			$(this).attr( "data-lightbox", "image-1" ); // 画像リンクの場合だけ属性を追加する
		}
		
		$(this).on("click",function(){
			var items = $(this).find(".items").html();
			$(".detail_text").html(items);
		});
	});
	
	$(".lb-data").css({"display":"none !important"});
	$(".lb-number").css({"display":"none !important"});
});

/*▼画面上部に戻るボタンのアニメーション*/
$(function(){
	$(".item .back").click(function(){
		$("html body").animate({scrollTop:0},'slow');
		return false;
	})
});

/*▼スライドショー*/

$(function(){
	$(".slider li").css({left:960})
	
	fadein();
});

var change = 0;
var n = 0;

/*▼フェードインの設定*/
function fadein(){
	$(".slider li").eq(n).animate({
		left:0},
		{
			duration:1000,
			complete:function(){
				setTimeout(function(){
					fadeout();
							},3000);
			}
			
		}
	)
}

/*▼フェードアウトの設定*/
function fadeout(){
	$(".slider ul li").eq(n).animate({
		left:-960},
		{
			duration:1000,
			complete:function(){
				if(change == 0){
					n++;
				}
				
				if(n >= $(".slider li").length){
					n = 0;
					$(".slider li").css({left:960})
				}
				
				fadein();
			}
		}
	)
}
