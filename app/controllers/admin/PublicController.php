<?php
namespace MyApp\Controllers\Admin;

/**
 * Created by PhpStorm.
 * User: tanyunbao
 * Date: 2016/9/28
 * Time: 21:24
 */
class PublicController extends BaseController
{
    public function messageAction($type = 'success', $msgTitle = '操作成功', $redirectUrl = '', $msgCon = '', $waitSeconds = 3)
    {
        $this->message($type, $msgTitle, $redirectUrl, $msgCon, $waitSeconds);
    }
}
