<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Guru_model extends CI_Model
{
  public function listing()
  {
    $this->db->select('*');
    $this->db->from('guru');
    $data = $this->db->get();
    return $data->result_array();
  }

  public function count()
  {
    $this->db->select('*');
    $this->db->from('guru');
    $data = $this->db->get();
    return $data->num_rows();
  }

  public function findById($id)
  {
    $this->db->select('*');
    $this->db->from('guru');
    $this->db->where('id', $id);
    $data = $this->db->get();
    return $data->row();
  }

  public function create($data)
  {
    $this->db->insert('guru', $data);
    return $this->db->affected_rows() > 0;
  }

  public function update($id, $data)
  {
    $this->db->update('guru', $data, [
      'id' => $id
    ]);
    return true;
  }

  public function delete($id)
  {
    $this->db->delete('guru', [
      'id' => $id
    ]);
    return $this->db->affected_rows() > 0;
  }

  public function empty()
  {
    $this->db->empty_table('guru');
    return $this->db->affected_rows() > 0;
  }

  public function auth($email, $password)
  {
    $this->db->select('*');
    $this->db->from('guru');
    $this->db->where('email', $email);
    $this->db->where('password', $password);
    $data = $this->db->get();
    return $data->row();
  }

  public function restore($data)
  {
    $this->db->insert_batch('guru', $data);
    return $this->db->affected_rows() > 0;
  }
}
