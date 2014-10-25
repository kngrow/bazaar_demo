///モデルの作成
var bpModel = {
    ////取得したデータを格納するオブジェクト
    model: [],
    ////取得時にアクセスするAPIのURL
    url: "./hogehoge.json",
    ////データを取得するメソッド
    fetch: function () {
        var that = this;
        return $.get(this.url)
        .done(function(data){
            ////取得したデータを処理
            debugger;
            that.model = data;
        });
    },
    getByCatId: function (id) {
        var result = [];
        _.each(this.model, function (val, key) {
            if ( val.Category.id == id ) {
                result.push(val);
            }
        });
        return result;
    },
    getByleader : function(){
        var leader = [];
        _.each( this.model , function(val , key){
            if( val.Item.item_leader === true){
                leader.push(val);
            }
        });
        return leader;

    }
};

//view
var topitemsView = Backbone.View.extend({
    tagName : 'li',
    template : _.template ($("#item_temp").html() ),
    render : function(){
        for (var id = 1 ; id <= 4 ; id++){
            var items = this.model.getByCatId(id);
            debugger;
            var top_temp = this.template( { items : items } );
            switch(id){
                case 1 :
                    $("#audio").append( top_temp );
                    break;
                    case 2 :
                        $("#game").append(top_temp);
                    break;
                    case 3 :
                        $("#daily").append(top_temp);
                    break;
                    case 4 :
                        $("#accessories").append(top_temp);
                    break;
            }
        }
    }
});

var topSliderView = Backbone.View.extend({
    template : _.template( $("#slide_temp").html() ),
    render : function(){
        var slide_items = this.model.getByleader();
        debugger;
        var slide = this.template({ slide_items : slide_items});
        $($("section.slider").children("ul")).append(slide);
    }
});


var view = new topitemsView({ model: bpModel });
var sv = new topSliderView({model : bpModel});
                /////イニシャライズ処理
bpModel.fetch().done(function (){
    view.render();
    sv.render();
    fadein();
});
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
