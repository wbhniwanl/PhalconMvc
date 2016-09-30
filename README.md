公司实习生作业

    掌握js基础知识实现金陵注册页面的认证
    熟悉js的函数练习操作
   

环境需求

    php5.6+

简介

    1.源码在js文件夹目录下的security.js
    2.注册页面在index.php中


内容
 在controller中新建三个控制器
     
    ChoiceController.php 选课控制器
          indexAction()//选课界面
          choiceAction()//选课功能
    StudentController.php 学生控制器
          实现数据的修删查改
          indexAction()//列表界面 （实现分页和模糊查询）
           addAction()//功能  （添加学生信息）
           updateAction()//修改功能  （修改学生信息）
           delectAction()//删除功能  （物理删除学生信息）+（逻辑删除）
    CourseController.php 课程控制器
          实现数据的修删查改
          indexAction()//列表界面  （实现分页和模糊查询）
          addAction()//功能 （添加课程信息）
           updateAction()//修改功能 （修改课程信息）
           delectAction()//删除功能 （删除课程信息）
 在model中新建三个数据记录
   * Course.php
   * student.php
   * choice.php
      
      






      
      



