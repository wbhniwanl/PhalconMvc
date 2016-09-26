<?php
namespace MyApp\Controllers\Admin;

use MyApp\Controllers\Admin\BaseController;
use MyApp\Library\Paginator;
use MyApp\Models\Student;

class StudentController extends BaseController
{
    public function indexAction()
    {
        //分页查询
        $student        = new Student();
        $currentPage    = $this->request->get('page', 'int', 1); //当前页
        $pageSize       = 10;
        $offset         = $pageSize * ($currentPage - 1); //偏移量
        $conut          = $student->count(''); //查询总数
        $where["LIMIT"] = [$offset, $pageSize];
        $student        = $student->select('*', $where);
        $page           = new Paginator($conut, $pageSize); //新建分页对象
        $this->view->setVar('student', $student);
        $this->view->setVar('page', $page->showpage());

    }
    public function addAction()
    {
        //添加学生
        if ($this->request->isPost()) {
            if ($this->request->getPost('name') != null) {
                $request = $this->request;
                $name    = $request->getPost('name');
                $sex     = $request->getPost('sex');
                $qq      = $request->getPost('qq');
                $phone   = $request->getPost('phone');
                $time    = time();
                $this->db->insert('tp_student', [
                    'name'  => $name,
                    'sex'   => $sex,
                    'qq'    => $qq,
                    'phone' => $phone,
                    'time'  => $time,
                ]);
            }
        }

    }
    public function updateAction()
    {
        //修改学生
        $student = new Student();
        if ($this->request->get('id')) {
            $id          = $this->request->get('id');
            $where['id'] = [$id];
            $student     = $student->select('*', $where);
            $this->view->setVar('student', $student);
        }
        //获取修改信息修改学生
        if ($this->request->isPost()) {
            //  echo 11111;die;
            $request     = $this->request;
            $name        = $request->getPost('name');
            $id          = $request->getPost('id');
            $sex         = $request->getPost('sex');
            $qq          = $request->getPost('qq');
            $phone       = $request->getPost('phone');
            $time        = time();
            $where['id'] = [$id];
            $data        = [
                'name'  => $name,
                'sex'   => $sex,
                'qq'    => $qq,
                'phone' => $phone,
                'time'  => $time,
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
                $this->db->delete('tp_student', ['id => :id', array(':id' => $arr)]);
                return $this->response->redirect('/admin/student/index');
            }
        }
    }

}
