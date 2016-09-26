<?php
namespace MyApp\Controllers\Admin;

use MyApp\Controllers\Admin\BaseController;
use MyApp\Library\Paginator;
use MyApp\Models\Choice;

class ChoiceController extends BaseController
{
    public function indexAction()
    {
        //分页查询
        $choice         = new Choice();
        $currentPage    = $this->request->get('page', 'int', 1); //当前页
        $pageSize       = 10;
        $offset         = $pageSize * ($currentPage - 1); //偏移量
        $conut          = $choice->count(''); //查询总数
        $where["LIMIT"] = [$offset, $pageSize];
        $choice         = $choice->select('*', $where);
        $page           = new Paginator($conut, $pageSize); //新建分页对象
        $this->view->setVar('choice', $choice);
        $this->view->setVar('page', $page->showpage());
    }

}
