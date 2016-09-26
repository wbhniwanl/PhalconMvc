<?php
namespace MyApp\Controllers\Front;

use MyApp\Controllers\Front\BaseController;
use MyApp\Models\TpContact;

class IndexController extends BaseController
{

    public function indexAction()
    {
        $date = new TpContact();
        $test = $date->select('*', '');
        var_dump($test);die;

    }

}
