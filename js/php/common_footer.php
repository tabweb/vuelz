
<!-- 可视化样式 -->
<style>
<?php 
$dStyle=unserialize($this->activity['style_data']);
if(!empty($dStyle)){
	foreach ($dStyle as $k=>$v){
		echo ".".$v['class']."{".($v['left']?"left:".$v['left']."px;":'').($v['top']?"top:".$v['top']."%;":'').($v['color']?"color:".$v['color']:"")."}";
	}
}
?>
</style>
<?php 
	//活动状态1上线，2测试
	if($activity['test_onlime']==2){
		$assets=$this->assets();
echo <<<JOT
 <!-- 测试活动-->
 <style>
   .testTip{ pointer-events: none; -webkit-pointer-events: none;}
   .testTip_animal {  position: absolute;  left: 0;  top: 20px;  animation: testTip_animal 10s both infinite;  -webkit-animation: testTip_animal 10s both infinite;  transform-origin: 0 100%;  -webkit-transform-origin: 0 100%;  }
   .testTip_tip {  position: absolute;  left: 96px;  top: 102px;  transform-origin: 0 45px;  -webkit-transform-origin: 0 45px;  animation: testTip_tip 10s both infinite; -webkit-animation: testTip_tip 10s both infinite; }
   @keyframes testTip_animal { 0%, 60%, 100% {  transform: translate3d(-100%, 0, 0) rotate(-30deg);  -wetkbit-transform: translate3d(-100%, 0, 0) rotate(-30deg)  } 10%, 50% {  transform: translate3d(0, 0, 0) rotate(0deg);  -wetkbit-transform: translate3d(0, 0, 0) rotate(0deg)  } }
   @-webkit-keyframes testTip_animal { 0%, 60%, 100% {  transform: translate3d(-100%, 0, 0) rotate(-30deg);  -wetkbit-transform: translate3d(-100%, 0, 0) rotate(-30deg)  } 10%, 50% {  transform: translate3d(0, 0, 0) rotate(0deg);  -wetkbit-transform: translate3d(0, 0, 0) rotate(0deg)  } }
   @keyframes testTip_tip { 0%,5%, 55%, 100% {  transform: scale(0);  -wetkbit-transform: scale(0);  } 15%, 45% {  transform:scale(1);  -wetkbit-transform: scale(1);  } }
   @-webkit-keyframes testTip_tip { 0%,5%, 55%, 100% {  transform: scale(0);  -wetkbit-transform: scale(0);  } 15%, 45% {  transform:scale(1);  -wetkbit-transform: scale(1);  } }
</style>
	<script>
	!$ && document.write("<script src=\"https://res1.i-lz.cn/static/js/jquery.min.js\">"+"</scr"+"ipt>");
	$('body').append('<section class="testTip"><img src="$assets/failureTip/images/animal1.png" class="testTip_animal"><img src="$assets/failureTip/images/tip.png" class="testTip_tip"></section>');
</script>
JOT;
	}
?>