<?php
$plugin_row=Yii::app()->cache->get('plugin_'.$this->activity['type']);
$_fromType=0;
if (empty($this->fromType)){
	if (!empty($_SERVER['HTTP_REFERER'])){
		if (strpos($_SERVER['HTTP_REFERER'], '//mp.weixinbridge.com/mp/wapredirect')!==false){
			$_fromType=4; // 来源于公众号图文
		}
	}
}else{
	$_fromType=$this->fromType;
}
$_media_id='';
$_media_area='';
$_media_nickname='';
$_media_account='';
$_media_order_id='';
if (!empty($_GET['media_id'])){
	$media=authcode($_GET['media_id']);
	if (!empty($media)){
		$media_arr=explode(',', $media);
		$_media_id=intval($media_arr[0]);
		if (!Yii::app()->cache->get('stat_media_id'.$_media_id)){
			$media=Yii::app()->cache->get('stat_media_id'.$_media_id);
		}else{
			$media=Yii::app()->db->createCommand()
				->select('id,nickname,account,area')
				->from('sys_media')
				->where("id=".$_media_id)
				->queryRow();
			Yii::app()->cache->set('stat_media_id'.$_media_id, $media, 60*60);
		}
		$_media_area=$media['area'];
		$_media_nickname=$media['nickname'];
		$_media_account=$media['account'];
		$_media_order_id=intval($media_arr[1]);
	}
}
?>
<script>
var stat_modName="plugin",stat_akey='<?php echo 'whd_'.$this->activity['akey'];?>',site_module='<?php echo $plugin_row['name'];?>',stat_tenantId=<?php echo intval($this->activity['tenant_id']);?>,stat_ghid='<?php echo $this->activity['ghid'];?>',stat_sex=<?php echo intval($this->userinfo['sex'])?>,stat_aid='<?php echo $this->activity['aid'];?>',stat_wxid='<?php echo $this->userinfo['openid'];?>',stat_fromWxid='<?php echo $this->fromwx;?>',stat_fromType='<?php echo $_fromType;?>',stat_chid='<?php echo $_REQUEST['chid']; ?>',stat_chtype='<?php  echo $_REQUEST['chtype'];?>',stat_srcId='<?php  echo $_REQUEST['srcId'];?>',stat_media_id='<?php echo $_media_id;?>',stat_media_area='<?php echo $_media_area;?>',stat_media_nickname='<?php echo $_media_nickname;?>',stat_media_account='<?php echo $_media_account;?>',stat_media_order_id='<?php echo $_media_order_id;?>',stat_level=<?php echo intval($_GET['stat_level']) ?>;
</script>