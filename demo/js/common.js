
			//model

			$.get('./hogehoge.json')
						.done(function(data){
							debugger;
						 	var all = Backbone.Model.extend({});

							//全部の商品のデータ
							for(var i = 0 ; i < data.length ; i++){
							var allitem = new all({
								id : data[i].Item.id, //商品id
								name : data[i].Item.item_name, //商品の名前
								price : data[i].Item.item_price, //値段
								detail : data[i].Item.item_detail , //説明
								photo : data[i].Item.item_photo , //写真の名前
								photodir : data[i].Item.item_photo_dir ,		//写真の場所
								stock :data[i].Item.item_stock , //個数
								category : data[i].Category.category_name, //カテゴリの名前
								c_id : data[i].Category.id // カテゴリのid
							});

							//view
							var topitemsView = Backbone.View.extend({
								tagName : 'li',
								template : _.template ($("#item_temp").html() ),
								render : function(){
									var top_temp = this.template( this.model.toJSON() );
									this.$el.html (top_temp);
									return this ;
								}
							});



							var topvw  = new  topitemsView({ model : allitem});

						switch(data[i].Category.id){
								case 1 :
									$("#audio").append(topvw.render().el);
									break;
							  case 2 :
									$("#game").append(topvw.render().el);
									break;
									case 3 :
										$("#daily").append(topvw.render().el);
										break;
										case 4 :
								$("#accessories").append(topvw.render().el);
								break;
						}

								// console.log(topvw.render().el );
								// $("#accessories").append(topvw.render().el);

							}

                            var topSliderView = Backbone.View.extend({
                                template : _.template($("#slide_temp").html()),
                                render : function(){
                                    var it = this.set(this.model.toJSON());
                                    var temp = this.template({ output : it});
                                    return temp;
                                },
                                set : function(array){
                                    var ret =[];

                                    _.each(array.item,function(value,key){
                                        if(value.Item.item_leader){
                                            ret[ret.length] = value.Item;
                                        }
                                    });

                                    return ret;
                                }
                            });
                            var Item = Backbone.Model.extend({});
                            var items = new Item({
                                item : data
                            });
                            var topsv  = new topSliderView({ model : items});
                            var template = topsv.render();
                            $($("section.slider").children("ul")).prepend(template);


                    //Router
							var Router = Backbone.Router.extend({
								routes : {
											'' : 'home',
											'ro_audio' : 'ro_audio',
											'ro_game' : 'ro_game',
											'ro_dialy' : 'ro_dialy',
											'ro_acc' : 'ro_acc'
								},
								home : function(){
									$("#audio").parent().show();
									$("#daily").parent().show();
									$("#game").parent().show();
									$("#accessories").parent().show();

								},
								ro_audio : function(){
									console.log("audio");
									$("#audio").parent().show();
									$("#daily").parent().hide();
									$("#game").parent().hide();
									$("#accessories").parent().hide();
								},
								ro_game : function(){
									console.log("g");
									$("#game").parent().show();
									$("#daily").parent().hide();
									$("#audio").parent().hide();
									$("#accessories").parent().hide();
								},
								ro_dialy : function(){
									console.log("d");
									$("#daily").parent().show();
									$("#audio").parent().hide();
									$("#game").parent().hide();
									$("#accessories").parent().hide();
								},
								ro_acc : function(){
									$("#accessories").parent().show();
									$("#daily").parent().hide();
									$("#game").parent().hide();
									$("#audio").parent().hide();
								}
							});

							var router = new Router();
							Backbone.history.start();
						});
            slideShow();


/*▼画面上部に戻るボタンのアニメーション*/
$(function(){
	$(".item .back").on("touchend click",function(){
		$("html body").animate({scrollTop:0},'slow');
		return false;
	});


});


/*▼スライドショー*/

function slideShow(){
    //setTimeout(function(){
        fadein();
    //},100);
};

var change = 0;
var n = 0;

/*▼フェードインの設定*/
function fadein(){
	$(".slider ul li").eq(n).animate({
		left:0},
		{
			duration:1000,
			complete:function(){
				setTimeout(function(){
					fadeout();
							},3000);
			}

		}
	);
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

				if(n >= $(".slider ul li").length){
					n = 0;
					$(".slider ul li").css({left:960})
				}

				fadein();
			}
		}
	);
}
