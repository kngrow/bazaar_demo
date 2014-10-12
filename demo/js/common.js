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

$(function(){
			//model

			$.get('/reji/items/metaread')
						.done(function(data){
							debugger;

						 	var all = Backbone.Model.extend();


							//全部の商品のデータ
							var allitem = new all({
								id : data[0].Item.id, //商品id
								name : data[0].Item.item_name, //商品の名前
								price : data[0].Item.item_price, //値段
								detail : data[0].Item.item_detail , //説明
								photo : data[0].Item.item_photo , //写真の名前
								photodir : data[0].Item.item_photo_dir ,		//写真の場所
								// /regi/img/item/item_photo/'item_photo_dir'/'item_photo でとれるはず
								 stock :data[0].Item.item_stock //個数
							});
							console.log( allitem.toJSON() );


							//view
							var topitemsView = Backbone.View.extend({
								template : _.template ($("#item_temp").html() ),
								render : function(){
									var top_temp = this.template( this.model.toJSON() );
									this.$el.html (top_temp);
									return this ;
								}
							});


								var topvw  = new  topitemsView({ model : allitem});

								console.log(topvw.render().el );
								$("#item").append(topvw.render().el);
						});
});




			//
			// var task = Backbone.Model.extend({
			// 	defaults: {
			// 		 title : 'dont it... ',
			// 		completed : true
			// 	},
			// 		toggle: function(){
			// 				this.set('title', "toggled");
			// 	}
			// });
			//
			// var task1 =  new task();



		//view
//
// 		var  topitemsView = Backbone.View.extend({
// 			id : "li-id",
// 			template : _.template( $("#item_temp").html() ),
//
// 			render : function(){
// 				var temp = this.template( this.model.toJSON() );
// 				this.$el.html( temp );
// 				return this;
// 			}
//
// 		});
//
// var View1 = new topitemsView({model : task1});
//
// console.log(View1.render().el);
//
// $("#item").append(item.render().el);
// });
