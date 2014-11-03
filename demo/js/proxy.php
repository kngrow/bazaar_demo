<?php
header("Content-Type:application/json");
/* URLが指すXMLコンテンツを取得して返す（Ajaxの中継用）*/
if(isset($_POST['URL'])){
    if("hogehoge"==$_POST['URL']){
        //$url="http://metaregi.me-ta-tag.com/pages/metaread";
        $url ="../hogehoge.json";
        echo file_get_contents($url);
    }
}
/* curlが使えるならこうする（xampp liteには無い）
$ch = curl_init($_POST['URL']);
curl_exec($ch);
curl_close($ch);
*/
?>
