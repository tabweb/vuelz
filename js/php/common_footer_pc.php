<!-- 可视化样式 -->
<style>
<?php 
$dStyle=unserialize($this->activity['style_data_pc']);
if(!empty($dStyle)){
	foreach ($dStyle as $k=>$v){
		echo ".".$v['class']."{".($v['left']?"left:".$v['left']."px;":'').($v['top']?"top:".$v['top']."%;":'').($v['color']?"color:".$v['color']:"")."}";
	}
}
?>
</style>