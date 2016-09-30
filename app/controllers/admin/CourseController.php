<?php
namespace MyApp\Controllers\Admin;

use MyApp\Controllers\Admin\BaseController;
use MyApp\Library\Paginator;
use MyApp\Models\Choice;
use MyApp\Models\Course;

class CourseController extends BaseController
{
    public function indexAction()
    {
        //通过课程名进行查询
        $course = new Course();
        //通过课程名进行查询
        //分页
        $currentPage = $this->request->get('page', 'int', 1); //当前页
        $pageSize    = 10;
        $offset      = $pageSize * ($currentPage - 1); //偏移量
        $username    = $this->request->get('reportPerson', 'string'); //模糊查询分页一定要用get!不能用post
        if ($username) {
            $where["OR"]["courseNo[~]"] = $username; //like查询记得加上['And']
            $where["OR"]["name[~]"]     = $username; //like查询记得加上['And']
        }
        $conut          = $course->count($where); //查询总数
        $where["ORDER"] = ["time" => "DESC"];
        $where["LIMIT"] = [$offset, $pageSize];
        $course         = $course->select('*', $where);
        $page           = new Paginator($conut, $pageSize); //新建分页对象
        $this->view->setVar('course', $course);
        $this->view->setVar('page', $page->showpage());
    }
    public function addAction()
    {
        //添加课程
        $course = new Course();
        if ($this->request->isPost()) {
            if ($this->request->getPost('name') != null) {
                $request = $this->request;
                $name    = $request->getPost('name', 'string');
                //var_dump($name);die;
                $time = time();
                $date = [
                    'name' => $name,
                    'time' => $time,
                ];
                if ($course->insert($date)) {
                    $this->message('success', "插入课程成功！", '/admin/course/index');
                } else {
                    $this->message('error', "插入课程失败！", '/admin/course/index');
                }
            }
        }
    }
    public function updateAction()
    {
        //获取课程详细信息
        $course = new Course();
        if ($this->request->get('id')) {
            $id                = $this->request->get('id', 'string');
            $where['courseNo'] = [$id];
            $course            = $course->select('*', $where);
            //var_dump($course);die;
            $this->view->setVar('course', $course);
        }
        //获取修改信息修改课程
        if ($this->request->isPost()) {
            //echo 11111;die;
            $request           = $this->request;
            $name              = $request->getPost('name', 'string');
            $courseNo          = $request->getPost('courseNo', 'string');
            $time              = time();
            $where['courseNo'] = $courseNo;
            $data              = [
                'courseNo' => $courseNo,
                'name'     => $name,
                'time'     => $time,
            ];
            // var_dump($data);die;
            if ($course->update($data, $where)) {
                $this->message('success', "更新课程信息成功！", '/admin/course/index');
            } else {
                $this->message('error', "更新课程信息失败！", '/admin/course/index');
            }
        }
    }
    public function delectAction()
    {
        //删除数据（物理删除）
        $course = new Course();
        $choice = new Choice();
        if ($this->request->getPost()) {
            $request = $this->request;
            $date    = $request->getPost('arr');
            //var_dump($date);die;
            foreach ($date as $row) {
                //遍历删除课程数据
                $del = $course->delete(['courseNo' => $row]);
                //遍历删除课程记录数据
                $del = $choice->delete(['courseNo' => $row]);
                //return $this->response->redirect('/admin/student/index');
            }
            if (empty($del)) {
                $this->message('success', "删除课程数据成功！", '/admin/course/index');
            } else {
                $this->message('error', "数据已经删除没有学生选择此课程！", '/admin/course/index');
            }

        }
        return $this->response->redirect('/admin/course/index');
    }
}
