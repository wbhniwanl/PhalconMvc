<?php
namespace MyApp\Controllers\Admin;

use MyApp\Controllers\Admin\BaseController;
use MyApp\Library\Paginator;
use MyApp\Models\Choice;
use MyApp\Models\Student;

class DetailController extends BaseController
{
    public function indexAction()
    {
        // 学生表与选课表进行关联查询，通过学生的id查询对于的课程名
        $student = new Student();
        $choice  = new Choice();
        if ($this->request->get()) {
            $request = $this->request;
            $id      = $request->get('id', 'string');
            //单表查询
            $join =
                [
                "[>]tp_choice" => ["tp_student.id" => "id"],
            ];
            $currentPage            = $this->request->get('page', 'int', 1); //当前页
            $pageSize               = 10;
            $offset                 = $pageSize * ($currentPage - 1); //偏移量
            $conut                  = $choice->count(['id' => $id]); //查询总数
            $where["LIMIT"]         = [$offset, $pageSize];
            $where["tp_student.id"] = $id;
            $colum                  = ['tp_student.name', 'tp_choice.courseName', 'tp_student.time', 'tp_student.id'];
            $student                = $student->studentJoin($join, $colum, $where);
            $page                   = new Paginator($conut, $pageSize); //新建分页对象
            $this->view->setVar('date', $student);
            $this->view->setVar('page', $page->showpage());
            //多表查询
            /* $join = [
            "[>]tp_choice" => ["tp_student.id" => "id"],
            "[>]tp_course" => ["tp_choice.courseNo" => "courseNo"],
            ];*/
            /*   $student = $student->studentJoin($join, $colum, ['tp_student.id' => $id]);
        $this->view->setVar('date', $student);*/

        }
    }

}
