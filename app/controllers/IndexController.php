<?php

namespace MyApp\Controllers;

use MyApp\Controllers\BaseController;
use MyApp\Services\CountersService;

class IndexController extends BaseController
{

    public function indexAction()
    {

        echo 111111;die;
        // echo 'app/controllers/IndexController.php';
        // $this->view->disable();
    }
    public function telAction()
    {
        $arr   = [8, 2, 1, 0, 3];
        $index = [2, 0, 3, 2, 4, 0, 1, 3, 2, 3, 3];
        $tel   = '';
        foreach ($index as $value) {
            $tel .= $arr[$value];
        }
        echo $tel;
        $tile  = $this->request->get('title', 'string');
        $email = $this->request->get('email', 'email');
        $num   = $this->request->get('num', 'int');
        var_dump($tile, $email, $num);
        $countersService = new CountersService;
        $countersService->demo();
        //$countersService->getData();

        $this->view->disable();

    }

}
