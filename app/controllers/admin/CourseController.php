<?php
namespace MyApp\Controllers\Admin;

use MyApp\Controllers\Admin\BaseController;
use MyApp\Library\Paginator;
use MyApp\Models\Course;

class CourseController extends BaseController
{
    public function indexAction()
    {
        //分页查询
        $course         = new Course();
        $currentPage    = $this->request->get('page', 'int', 1); //当前页
        $pageSize       = 10;
        $offset         = $pageSize * ($currentPage - 1); //偏移量
        $conut          = $course->count(''); //查询总数
        $where["LIMIT"] = [$offset, $pageSize];
        $course         = $course->select('*', $where);
        $page           = new Paginator($conut, $pageSize); //新建分页对象
        $this->view->setVar('course', $course);
        $this->view->setVar('page', $page->showpage());

    }
    public function addAction()
    {
        //添加课程
        if ($this->request->isPost()) {
            if ($this->request->getPost('name') != null) {
                $request = $this->request;
                $name    = $request->getPost('name');
                $time    = time();
                $this->db->insert('tp_course', [
                    'name' => $name,
                    'time' => $time,
                ]);
            }
        }

    }
    public function updateAction()
    {
        //修改课程
        $course = new Course();
        if ($this->request->get('id')) {
            $id                = $this->request->get('id');
            $where['courseNo'] = [$id];
            $course            = $course->select('*', $where);
            //var_dump($course);die;
            $this->view->setVar('course', $course);
        }
        //获取修改信息修改课程
        if ($this->request->isPost()) {
            //  echo 11111;die;
            $request           = $this->request;
            $name              = $request->getPost('name');
            $courseNo          = $request->getPost('courseNo');
            $time              = time();
            $where['courseNo'] = [$courseNo];
            $data              = [
                'name'     => $name,
                'courseNo' => $courseNo,
                'time'     => $time,
            ];
            // var_dump($data);die;
            $this->db->update('tp_student', $data, $where);
            return $this->response->redirect('/admin/student/index');
            //  $student = $student->select('*');
            // $this->view->setVar('student', $student);
        }

    }
    public function delectAction()
    {
        //删除数据
        if ($this->request->getPost()) {
            $request = $this->request;
            $date    = $request->getPost('arr');
            foreach ($date as $arr) {
                $this->db->delete('tp_course', ['id => :id', array(':id' => $arr)]);
                return $this->response->redirect('/admin/course/index');
            }
        }
    }
}
