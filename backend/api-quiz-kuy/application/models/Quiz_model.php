<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Quiz_model extends CI_Model
{
  public function listing()
  {
    $this->db->select('*');
    $this->db->from('quiz');
    $data = $this->db->get();
    return $data->result_array();
  }

  public function listing_where($where)
  {
    $this->db->select('*');
    $this->db->from('quiz');

    foreach ($where as $key => $value) {
      $this->db->where($key, $value);
    }
    $data = $this->db->get();
    return $data->result_array();
  }

  public function findById($id)
  {
    $this->db->select('*');
    $this->db->from('quiz');
    $this->db->where('id', $id);
    $data = $this->db->get();
    return $data->row_array();
  }


  public function empty()
  {
    $this->db->empty_table('quiz');
    return $this->db->affected_rows() > 0;
  }

  public function count()
  {
    $this->db->select('*');
    $this->db->from('quiz');
    $data = $this->db->get();
    return $data->num_rows();
  }

  public function restore($data)
  {
    $this->db->insert_batch('quiz', $data);
    return $this->db->affected_rows() > 0;
  }

  public function create($data)
  {
    $this->db->insert('quiz', $data);
    return $this->db->affected_rows() > 0;
  }

  public function update($id, $data)
  {
    $this->db->update('quiz', $data, [
      'id' => $id
    ]);
    return true;
  }

  public function delete($id)
  {
    $this->db->delete('quiz', [
      'id' => $id
    ]);
    $this->db->delete('jawaban', [
      'quiz_id' => $id
    ]);
    return $this->db->affected_rows() > 0;
  }

  public function jawaban_siswa($data)
  {
    $this->db->select('*');
    $this->db->from('jawaban');

    $this->db->where('siswa_id', $data['siswa_id']);
    $this->db->where('quiz_id', $data['quiz_id']);
    $this->db->where('soal_no', $data['soal_no']);

    $data = $this->db->get();
    return $data->row_array()['jawaban'];
  }

  public function jawaban_siswa_row($data)
  {
    $this->db->select('*');
    $this->db->from('jawaban');

    $this->db->where('siswa_id', $data['siswa_id']);
    $this->db->where('quiz_id', $data['quiz_id']);
    $this->db->where('soal_no', $data['soal_no']);

    $data = $this->db->get();
    return $data->row_array();
  }



  public function timestamp_jawaban_siswa($data)
  {
    $this->db->select('*');
    $this->db->from('jawaban');

    $this->db->where('siswa_id', $data['siswa_id']);
    $this->db->where('quiz_id', $data['quiz_id']);

    $data = $this->db->get();
    return isset($data->row_array()['timestamp']) ? $data->row_array()['timestamp'] : null;
  }

  public function sudah_mengerjakan($data)
  {
    $this->db->select('*');
    $this->db->from('jawaban');

    $this->db->where('quiz_id', $data['quiz_id']);
    $this->db->where('siswa_id', $data['siswa_id']);

    if (isset($data['soal_no'])) {
      $this->db->where('soal_no', $data['soal_no']);
    }

    $data = $this->db->get();
    return $data->num_rows() > 0;
  }

  public function quiz_aktif($data)
  {
    $this->db->select('*');
    $this->db->from('quiz');

    $this->db->where('quiz.id', $data['quiz_id']);
    $this->db->where('status', 'AKTIF');

    $data = $this->db->get();

    return $data->num_rows() > 0;
  }

  public function simpan_jawaban($jawaban)
  {
    $this->db->insert('jawaban', $jawaban);
    return $this->db->affected_rows() > 0;
  }


  public function koreksi($data)
  {
    $this->db->update('jawaban', [
      'nilai' => $data['nilai'],
    ], [
      'siswa_id' => $data['siswa_id'],
      'quiz_id' => $data['quiz_id'],
      'soal_no' => $data['soal_no'],
    ]);
    return true;
  }

  public function reset_jawaban($where)
  {
    $this->db->delete('jawaban', $where);
    return $this->db->affected_rows() > 0;
  }
}
