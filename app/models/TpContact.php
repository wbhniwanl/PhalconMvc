<?php
namespace MyApp\Models;

use MyApp\Models\Model;

class TpContact extends Model
{
    public function getSource()
    {
        return 'tp_contact';
    }
    public function selectC()
    {
        // echo 1111;die;
        // $date = $this->db->select($this->getSource(), '*');
        //var_dump($date);

    }

}
