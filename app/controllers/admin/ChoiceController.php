<?php
namespace MyApp\Controllers\Admin;

use MyApp\Controllers\Admin\BaseController;
use MyApp\Library\Paginator;
use MyApp\Models\Choice;
use MyApp\Models\Course;
use MyApp\Models\Student;

class ChoiceController extends BaseController
{
    public function indexAction()
    {
        //分页查询
        $choice = new Choice();
        //通过学生学生选课搜索学生信息
        //分页
        $currentPage = $this->request->get('page', 'int', 1); //当前页
        $pageSize    = 10;
        $offset      = $pageSize * ($currentPage - 1); //偏移量
        $username    = $this->request->get('reportPerson', 'string'); //模糊查询分页一定要用get!不能用post
        if ($username) {
            $where["OR"]["courseName[~]"] = $username; //like查询记得加上['And']
            $where["OR"]["stuName[~]"]    = $username; //like查询记得加上['And']
            $where["OR"]["courseNo[~]"]   = $username; //like查询记得加上['And']
        }
        $conut          = $choice->count($where); //查询总数
        $where["LIMIT"] = [$offset, $pageSize];
        $choice         = $choice->select('*', $where);
        //var_dump($choice);die;
        $page = new Paginator($conut, $pageSize); //新建分页对象
        $this->view->setVar('choice', $choice);
        $this->view->setVar('page', $page->showpage());
    }
    public function choiceAction()
    {
        //读取课程的数据
        $course  = new Course();
        $choice  = new Choice();
        $student = new Student();
        $course  = $course->select('*', '');
        $this->view->setVar('course', $course);
        //获取选课的信息 (输入学生名进行选课)
        if ($this->request->isPost()) {
            $request = $this->request;
            $name    = $request->getPost('name', 'string');
            //var_dump($name);die;
            $courseNo = $request->getPost('arr');
            //var_dump($courseNo);die;
            $studentId = $student->select('*', ['name' => $name]);
            // var_dump($studentId);die;
            //循环插入数据
            foreach ($courseNo as $row) {
                $course = new Course();
                $course = $course->select('*', ['courseNo' => $row]);
                $date   = [
                    'stuName'    => $name,
                    'courseNo'   => $course[0]['courseNo'], //课程编号
                    'id'         => $studentId[0]['id'], //学生编号
                    'courseName' => $course[0]['name'],
                ];
                $choice->insert($date);
            }
            if (empty($choice->insert($date))) {
                $this->message('success', "学生选课成功", "/admin/choice/index");
            } else {
                $this->message('success', "学生选课失败", "/admin/choice/index");
            }

        }
        //默认学生名进行选课
        if ($this->request->get()) {
            $request   = $this->request;
            $stuId     = $request->get('id');
            $studentId = $student->select('*', ['id' => $stuId]);
            $this->view->setVar('name', $studentId);
        }
    }

}
