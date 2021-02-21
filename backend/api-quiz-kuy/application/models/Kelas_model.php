<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Kelas_model extends CI_Model
{
  public function listing()
  {
    $this->db->select('*');
    $this->db->from('kelas');
    $data = $this->db->get();
    return $data->result_array();
  }

  public function findById($id)
  {
    $this->db->select('*');
    $this->db->from('kelas');
    $this->db->where('id', $id);
    $data = $this->db->get();
    return $data->row();
  }

  public function empty()
  {
    $this->db->empty_table('kelas');
    return $this->db->affected_rows() > 0;
  }

  public function count()
  {
    $this->db->select('*');
    $this->db->from('kelas');
    $data = $this->db->get();
    return $data->num_rows();
  }

  public function restore($data)
  {
    $this->db->insert_batch('kelas', $data);
    return $this->db->affected_rows() > 0;
  }

  public function create($data)
  {
    $this->db->insert('kelas', $data);
    return $this->db->affected_rows() > 0;
  }

  public function update($id, $data)
  {
    $this->db->update('kelas', $data, [
      'id' => $id
    ]);
    return true;
  }

  public function delete($id)
  {
    $this->db->delete('kelas', [
      'id' => $id
    ]);
    return $this->db->affected_rows() > 0;
  }
}
