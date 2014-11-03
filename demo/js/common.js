///モデルの作成
var bpModel = {
  ////取得したデータを格納するオブジェクト
  model: [],
  ////取得時にアクセスするAPIのURL
  url: "http://metaregi.me-ta-tag.com/items/metaread",
  ////データを取得するメソッド
  fetch: function () {
    var that = this;
    $("#loading").addClass("loading");
    return $.ajax({
        type: 'post',
        url :  'js/proxy.php',
        data : { URL : that.url },
        success :function(data){
          that.model = data;
        },
        complete : function(data){
        }

    });

  },
  getByCatId: function (id,flag) {
    var result = [];
    var ret = [];
    _.each(this.model, function (val, key) {
      if ( val.Category.id == id ) {
        result.push(val);
      }
      if(flag){
        ret = result;
      }else{
        ret = _.shuffle(result);
      }

      //console.log();
    });
    return ret;
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
  render : function(flag){
    $("#audio").empty();
    $("#daily").empty();
    $("#game").empty();
    $("#accessories").empty();
    for (var id = 1 ; id <= 4 ; id++){
      var items;
      if(flag){
        items = this.model.getByCatId(id,true);
      }else{
        items = this.model.getByCatId(id,false);
      }

      //debugger;
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
            //debugger;
            var slide = this.template({ slide_items : slide_items});
            $($("section.slider").children("ul")).append(slide);
          }
        });

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
            view.render(false);
            $("#audio").parent().show();
            $("#daily").parent().show();
            $("#game").parent().show();
            $("#accessories").parent().show();
            $("article .item .category li").addClass("none");

          },
          ro_audio : function(){
            view.render(true);
            //console.log("audio");
            $("#audio").parent().show();
            $("#daily").parent().hide();
            $("#game").parent().hide();
            $("#accessories").parent().hide();
            $("article .item .category li").removeClass("none");
          },
          ro_game : function(){
            view.render(true);
            //console.log("g");
            $("#game").parent().show();
            $("#daily").parent().hide();
            $("#audio").parent().hide();
            $("#accessories").parent().hide();
            $("article .item .category li").removeClass("none");
          },
          ro_dialy : function(){
            view.render(true);
            //console.log("d");
            $("#daily").parent().show();
            $("#audio").parent().hide();
            $("#game").parent().hide();
            $("#accessories").parent().hide();
            $("article .item .category li").removeClass("none");
          },
          ro_acc : function(){
            view.render(true);
            $("#accessories").parent().show();
            $("#daily").parent().hide();
            $("#game").parent().hide();
            $("#audio").parent().hide();
            $("article .item .category li").removeClass("none");
          }
        });

        var router = new Router();

        var view = new topitemsView({ model: bpModel });
        var sv = new topSliderView({model : bpModel});
        /////イニシャライズ処理

          bpModel.fetch().done(function (){
            //view.render();
            sv.render();
            Backbone.history.start();
            fadein();

        });


        /*▼画面上部に戻るボタンのアニメーション*/
        $(function(){
          $(".item .back").on("touchend click",function(){
            $("html body").animate({scrollTop:0},'slow');
            return false;
          });
          $("#audio").prev("h2").on("touchend click",function(){
            location.href = "#ro_audio";
          });
          $("#game").prev("h2").on("touchend click",function(){
            location.href = "#ro_game";
          });
          $("#daily").prev("h2").on("touchend click",function(){
            location.href = "#ro_dialy";
          });
          $("#accessories").prev("h2").on("touchend click",function(){
            location.href = "#ro_acc";
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
