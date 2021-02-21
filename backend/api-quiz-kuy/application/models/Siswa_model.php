<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Siswa_model extends CI_Model
{
  public function listing()
  {
    $this->db->select('siswa.*, kelas.nama as kelas');
    $this->db->from('siswa');
    $this->db->join('kelas', 'kelas.id=siswa.kelas_id', 'left');
    $this->db->order_by('siswa.nama', 'desc');

    if ($_GET['kelas_id'] != NULL) {
      $this->db->where('siswa.kelas_id', $_GET['kelas_id']);
    }

    $data = $this->db->get();
    return $data->result_array();
  }

  public function listing_by_kelas($id)
  {
    $this->db->select('siswa.*, kelas.nama as kelas');
    $this->db->from('siswa');
    $this->db->where('siswa.kelas_id', $id);
    $this->db->join('kelas', 'kelas.id=siswa.kelas_id', 'left');
    $data = $this->db->get();
    return $data->result_array();
  }


  public function findById($id)
  {
    $this->db->select('siswa.*, kelas.nama as kelas');
    $this->db->from('siswa');
    $this->db->join('kelas', 'kelas.id=siswa.kelas_id', 'left');
    $this->db->where('siswa.id', $id);
    $data = $this->db->get();
    return $data->row_array();
  }

  public function empty()
  {
    $this->db->empty_table('siswa');
    return $this->db->affected_rows() > 0;
  }

  public function count()
  {
    $this->db->select('*');
    $this->db->from('siswa');
    $data = $this->db->get();
    return $data->num_rows();
  }

  public function restore($data)
  {
    $this->db->insert_batch('siswa', $data);
    return $this->db->affected_rows() > 0;
  }

  public function create($data)
  {
    $this->db->insert('siswa', $data);
    return $this->db->affected_rows() > 0;
  }

  public function update($id, $data)
  {
    $this->db->update('siswa', $data, [
      'id' => $id
    ]);
    return true;
  }

  public function approve_all()
  {
    $this->db->update('siswa', [
      'status' => 'TERVERIFIKASI'
    ], [
      'status' => 'MENUNGGU VERIFIKASI'
    ]);
    return true;
  }

  public function delete($id)
  {
    $this->db->delete('siswa', [
      'id' => $id
    ]);
    return $this->db->affected_rows() > 0;
  }

  public function auth($email, $password)
  {
    $this->db->select('siswa.*, kelas.nama as kelas');
    $this->db->from('siswa');
    $this->db->join('kelas', 'kelas.id=siswa.kelas_id', 'left');
    $this->db->where('email', $email);
    $this->db->where('password', $password);
    $data = $this->db->get();
    return $data->row();
  }

  public function check_duplicate($where)
  {
    $this->db->select('siswa.*');
    $this->db->from('siswa');
    foreach ($where as $key => $value) {
      $this->db->or_where($key, $value);
    }
    $data = $this->db->get();
    return $data->num_rows() > 0;
  }
}
