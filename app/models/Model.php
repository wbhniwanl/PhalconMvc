<?php
namespace MyApp\Models;

use \Phalcon\DI;
use \Phalcon\DI\Injectable;

class Model extends Injectable
{

    public function __construct()
    {
        $di = DI::getDefault();
        $this->setDI($di);
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource()
    {
        return '';
    }

    public function insert($data = [])
    {
        return $this->db->insert($this->getSource(), $data);
    }

    public function update($data = [], $where = [])
    {
        if (empty($where)) {
            return 0;
        }
        return $this->db->update($this->getSource(), $data, $where);
    }

    public function select($columns, $where)
    {
        return $this->db->select($this->getSource(), $columns, $where);
    }

    public function count($where)
    {
        return $this->db->count($this->getSource(), $where);
    }

    public function delete($where)
    {
        if (empty($where)) {
            return 0;
        }
        return $this->db->delete($this->getSource(), $where);
    }

    public function get($columns, $where)
    {
        return $this->db->get($this->getSource(), $columns, $where);
    }

    public function has($where)
    {
        return $this->db->has($this->getSource(),$where);
    }
    /**
     * 取指定列最大值
     * @param string $column
     * @param array $where
     */
    public function max($column = '', $where = [])
    {
        return $this->db->max($this->getSource(), $column, $where);
    }
    /**
     * 取指定列最小值
     * @param string $column
     * @param array $where
     */
    public function min($column = '', $where = [])
    {
        return $this->db->min($this->getSource(), $column, $where);
    }
}
