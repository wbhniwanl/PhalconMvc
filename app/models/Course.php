<?php
namespace MyApp\Models;

class Course extends Model
{
    public function getSource()
    {
        return 'tp_course';
    }
    public function selectC()
    {
        // echo 1111;die;
        // $date = $this->db->select($this->getSource(), '*');
        //var_dump($date);

    }

}
