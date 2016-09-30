<?php
/**
 * 公用controller，除了index其他页面不需要登录，切记此controller中的action为非必须登录action
 */
namespace MyApp\Controllers\Admin;

use Phalcon\Mvc\Controller;

class BaseController extends Controller
{

    public function afterExecuteRoute()
    {
        $this->view->setViewsDir($this->view->getViewsDir() . '/admin/');
    }

    protected function initialize()
    {

    }
    public static function message($type, $content, $url = '')
    {
        $click = $url ? $url : ($referer ? $referer : 'javascript:history.back()');
        $html  = <<<EOT
			<!DOCTYPE html>
			<html lang="zh-hans">
			<head>
				<meta charset="UTF-8">
				<meta name="renderer" content="webkit">
				<meta http-equiv="X-UA-Compatible" content="IE=Edge">
				<title>提示信息页面</title>
				</head>
				<style>
					.success h1{color: #74CC00;}
					.error h1{color: red;}
				</style>
			<body>
			<div class="container">
				<div class="wrapper">
					<div style="padding:30px 15px;text-align:center;" class="cloum mb0 $type">
						<!--<div class="cloum-title"><h3>提示信息：</h3></div>-->
						<h1 style="padding: 0 0 10px;font-size: 20px;" class="block">$content</h1>
						<p>系统自动跳转，如果不想等待，<a style="color:#29a2da;text-decoration:none;" href="$click">点击这里跳转</a></p>
					</div>
				</div>
			</div>
			<script type="text/javascript">

			    var url = "$url";
			    setTimeout(function(){
			        if(url){
			            window.location.href = url;
			        }else{
			            history.back();
			        }
			    }, 2000);

			</script>
			</body>
			</html>
EOT;
        echo $html;
        exit();

    }
}
