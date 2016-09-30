<?php
namespace MyApp\Models;

use MyApp\Models\Model;

class Student extends Model
{
    public function getSource()
    {
        return 'tp_student';
    }

    public function studentJoin($join, $columns, $where)
    {
        return $this->db->select($this->getSource(), $join, $columns, $where);
    }

}
