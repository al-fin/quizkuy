<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Bank_soal_model extends CI_Model
{
  public function listing()
  {
    $this->db->select('bank_soal.*, pelajaran.nama as pelajaran');
    $this->db->from('bank_soal');
    $this->db->join('pelajaran', 'pelajaran.id=bank_soal.pelajaran_id', 'left');
    $data = $this->db->get();
    return $data->result_array();
  }

  public function findById($id)
  {
    $this->db->select('*');
    $this->db->from('bank_soal');
    $this->db->where('id', $id);
    $data = $this->db->get();
    return $data->row_array();
  }

  public function empty()
  {
    $this->db->empty_table('bank_soal');
    return $this->db->affected_rows() > 0;
  }

  public function count()
  {
    $this->db->select('*');
    $this->db->from('bank_soal');
    $data = $this->db->get();
    return $data->num_rows();
  }

  public function restore($data)
  {
    $this->db->insert_batch('bank_soal', $data);
    return $this->db->affected_rows() > 0;
  }

  public function create($data)
  {
    $this->db->insert('bank_soal', $data);
    return $this->db->insert_id();
  }

  public function update($id, $data)
  {
    $this->db->update('bank_soal', $data, [
      'id' => $id
    ]);
    return true;
  }

  public function delete($id)
  {
    $this->db->delete('bank_soal', [
      'id' => $id
    ]);
    return $this->db->affected_rows() > 0;
  }


  public function list_soal($id, $shuffle = FALSE)
  {
    $this->db->select('soal.*');
    $this->db->from('soal');
    $this->db->where('bank_soal.id', $id);
    $this->db->join('bank_soal', 'bank_soal.id=soal.bank_soal_id', 'left');
    if ($shuffle) {
      $this->db->order_by('soal.no', 'RANDOM');
    }
    return $this->db->get()->result_array();
  }

  public function list_soal_join_siswa($quiz_id, $bank_soal_id, $siswa_id)
  {
    $this->db->select('soal.*, jawaban.jawaban as jawaban_siswa, jawaban.nilai');
    $this->db->from('soal');
    $this->db->where('bank_soal.id', $bank_soal_id);
    $this->db->where('jawaban.siswa_id', $siswa_id);
    $this->db->where('jawaban.quiz_id', $quiz_id);
    $this->db->join('bank_soal', 'bank_soal.id=soal.bank_soal_id', 'left');
    $this->db->join('jawaban', 'soal.no=jawaban.soal_no', 'left');
    $this->db->order_by('soal.no');
    return $this->db->get()->result_array();
  }

  public function tambah_soal($data)
  {
    $this->db->insert('soal', $data);
  }

  public function clear_soal($id)
  {
    $this->db->delete('soal', ['bank_soal_id' => $id]);
  }
}
