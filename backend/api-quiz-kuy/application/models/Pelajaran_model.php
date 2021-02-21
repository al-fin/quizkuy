<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Pelajaran_model extends CI_Model
{
  public function listing()
  {
    $this->db->select('*');
    $this->db->from('pelajaran');
    $data = $this->db->get();
    return $data->result_array();
  }

  public function findById($id)
  {
    $this->db->select('*');
    $this->db->from('pelajaran');
    $this->db->where('id', $id);
    $data = $this->db->get();
    return $data->row();
  }

  public function empty()
  {
    $this->db->empty_table('pelajaran');
    return $this->db->affected_rows() > 0;
  }

  public function count()
  {
    $this->db->select('*');
    $this->db->from('pelajaran');
    $data = $this->db->get();
    return $data->num_rows();
  }

  public function restore($data)
  {
    $this->db->insert_batch('pelajaran', $data);
    return $this->db->affected_rows() > 0;
  }

  public function create($data)
  {
    $this->db->insert('pelajaran', $data);
    return $this->db->affected_rows() > 0;
  }

  public function update($id, $data)
  {
    $this->db->update('pelajaran', $data, [
      'id' => $id
    ]);
    return true;
  }

  public function delete($id)
  {
    $this->db->delete('pelajaran', [
      'id' => $id
    ]);
    return $this->db->affected_rows() > 0;
  }
}
