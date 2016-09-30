<?php
namespace MyApp\Controllers\Admin;

use MyApp\Controllers\Admin\BaseController;
use MyApp\Library\Paginator;
use MyApp\Models\Choice;
use MyApp\Models\Student;
use Phalcon\Mvc\View;

class StudentController extends BaseController
{
    public function indexAction()
    {
        $student = new Student();
        //通过学生姓名搜索学生信息
        //分页
        $currentPage = $this->request->get('page', 'int', 1); //当前页
        $pageSize    = 10;
        $offset      = $pageSize * ($currentPage - 1); //偏移量
        $username    = $this->request->get('reportPerson', 'string'); //模糊查询分页一定要用get!不能用post
        if ($username) {
            $where["AND"]["name[~]"] = $username; //like查询记得加上['And']
        }
        $conut          = $student->count($where); //查询总数
        $where["ORDER"] = ["time" => "DESC"];
        $where["LIMIT"] = [$offset, $pageSize];
        $student        = $student->select('*', $where);
        $page1          = new Paginator($conut, $pageSize); //新建分页对象
        $this->view->setVar('student', $student);
        $this->view->setVar('page', $page1->showpage());
    }
    public function addAction()
    {
        //添加学生
        //层层判断不为空
        $student = new Student();
        if ($this->request->isPost()) {
            if ($this->request->getPost('name') != null) {
                if ($this->request->getPost('sex') != null) {
                    if ($this->request->getPost('qq') != null) {
                        if ($this->request->getPost('phone') != null) {
                            $request = $this->request;
                            $name    = $request->getPost('name', 'string');
                            $sex     = $request->getPost('sex', 'string');
                            $qq      = $request->getPost('qq', 'string');
                            $phone   = $request->getPost('phone', 'string');
                            $time    = time();
                            $date    = [
                                'name'  => $name,
                                'sex'   => $sex,
                                'qq'    => $qq,
                                'phone' => $phone,
                                'time'  => $time];
                            //插入成功的弹窗
                            if ($student->insert($date)) {
                                $this->message('success', "插入学生成功！", '/admin/student/index');
                            } else {
                                $this->message('error', "插入学生失败！", '/admin/student/index');
                            }
                        }
                    }
                }
            }
        }
    }
    public function updateAction()
    {
        //定位学生信息
        $student = new Student();
        if ($this->request->get('id')) {
            $id          = $this->request->get('id');
            $where['id'] = [$id];
            $student     = $student->select('*', $where);
            $this->view->setVar('student', $student);
        }
        //获取修改信息修改学生
        if ($this->request->isPost()) {
            //echo 11111;die;
            $request     = $this->request;
            $name        = $request->getPost('name', 'string');
            $id          = $request->getPost('id', 'string');
            $sex         = $request->getPost('sex', 'string');
            $qq          = $request->getPost('qq', 'string');
            $phone       = $request->getPost('phone', 'string');
            $time        = time();
            $where['id'] = $id;
            $data        = [
                'name'  => $name,
                'sex'   => $sex,
                'qq'    => $qq,
                'phone' => $phone,
                'time'  => $time,
            ];
            // $student->update($data, $where);
            //在此处只能使用db进行更新！目前还找不到原因
            if ($this->db->update('tp_student', $data, $where)) {
                $this->message('success', "更新学生信息成功！", '/admin/student/index');
            } else {
                $this->message('error', "更新学生信息失败！", '/admin/student/index');
            }
            return $this->response->redirect('/admin/student/index');
        }
    }
    public function delectAction()
    {
        //删除数据(物理删除)
        $student = new Student();
        $choice  = new Choice();
        if ($this->request->getPost()) {
            $request = $this->request;
            $date    = $request->getPost('arr');
            //var_dump($date);die;
            foreach ($date as $row) {
                //遍历删除学生数据
                $del = $student->delete(['id' => $row]);
                //遍历删除课程记录数据
                $del = $choice->delete(['id' => $row]);
            }
            if (empty($del)) {
                $this->message('success', "删除学习数据成功！", '/admin/student/index');
            } else {
                $this->message('error', "数据已经删除学生没有选课！", '/admin/student/index');
            }
        }
        return $this->response->redirect('/admin/student/index');
    }
}
