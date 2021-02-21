<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require(APPPATH . '/libraries/RestController.php');
require(APPPATH . '/libraries/Format.php');
date_default_timezone_set('Asia/Jakarta');

class Bank_soal extends RestController
{
  public function __construct($config = 'rest')
  {
    parent::__construct($config);
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == "OPTIONS") {
      die();
    }
    $this->load->helper(['jwt', 'authorization']);
    $this->load->model('bank_soal_model');
    $this->load->model('pelajaran_model');
  }

  public function index_get($id = null)
  {
    $this->verify_request();
    if ($id === null) {
      $bank_soal = $this->bank_soal_model->listing();

      $response = [
        'data' => $bank_soal
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $bank_soal = $this->bank_soal_model->findById($id);
      if ($bank_soal) {

        $bank_soal['pelajaran'] = $this->pelajaran_model->findById($bank_soal['pelajaran_id']);
        $bank_soal['soal'] = $this->bank_soal_model->list_soal($bank_soal['id']);

        $response = [
          'data' => $bank_soal
        ];
        $this->response($response, RestController::HTTP_OK);
      } else {
        $response = [
          'message' => 'Bank soal dengan id ' . $id . ' tidak ditemukan !'
        ];
        $this->response($response, RestController::HTTP_NOT_FOUND);
      }
    }
  }

  public function index_post()
  {
    $this->verify_request();
    $new_bank_soal = [
      'jenis_soal'  => $this->post('jenis_soal'),
      'pelajaran_id'  => $this->post('pelajaran_id'),
      'judul'  => $this->post('judul'),
      'jumlah_soal'  => $this->post('jumlah_soal'),
    ];

    $soal_id = $this->bank_soal_model->create($new_bank_soal);
    if ($soal_id) {

      $soal = [];
      foreach ($this->post('soal') as $key => $item) {
        $soal[$key] = [
          'bank_soal_id' => $soal_id,
          'no' => $key + 1,
          'pertanyaan' => $item['pertanyaan'],
          'a' => $item['a'],
          'b' => $item['b'],
          'c' => $item['c'],
          'd' => $item['d'],
          'e' => $item['e'],
          'kunci_jawaban' => $item['kunci_jawaban'],
          'image' => $item['image'],
        ];
      }

      foreach ($soal as $item) {
        $this->bank_soal_model->tambah_soal($item);
      }

      $response = [
        'data' => $new_bank_soal,
        'message' => 'Bank soal baru berhasil ditambahkan !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menambahkan bank soal ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function edit_post($id)
  {
    $this->verify_request();

    $new_bank_soal = [
      'jenis_soal'  => $this->post('jenis_soal'),
      'pelajaran_id'  => $this->post('pelajaran_id'),
      'judul'  => $this->post('judul'),
      'jumlah_soal'  => $this->post('jumlah_soal'),
    ];

    $edit_bank_soal = $this->bank_soal_model->update($id, $new_bank_soal);
    if ($edit_bank_soal) {

      $soal = [];
      foreach ($this->post('soal') as $key => $item) {
        $soal[$key] = [
          'bank_soal_id' => $id,
          'no' => $key + 1,
          'pertanyaan' => $item['pertanyaan'],
          'a' => $item['a'],
          'b' => $item['b'],
          'c' => $item['c'],
          'd' => $item['d'],
          'e' => $item['e'],
          'kunci_jawaban' => $item['kunci_jawaban'],
          'image' => $item['image'],
        ];
      }

      $this->bank_soal_model->clear_soal($id);
      foreach ($soal as $item) {
        $this->bank_soal_model->tambah_soal($item);
      }

      $response = [
        'data' => $new_bank_soal,
        'message' => 'Bank soal berhasil diedit !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal mengedit bank soal ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function index_delete($id)
  {
    $this->verify_request();

    $hapus_bank_soal = $this->bank_soal_model->delete($id);

    if ($hapus_bank_soal) {
      $this->bank_soal_model->clear_soal($id);
      $response = [
        'id_bank_soal' => $id,
        'message' => 'Bank soal berhasil dihapus !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menghapus bank soal ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function verify_request()
  {
    $headers = $this->input->request_headers();
    // Extract the token

    if (isset($headers['token'])) {
      $token = $headers['token'];
    } else {
      $status = parent::HTTP_UNAUTHORIZED;
      $response = ['status' => $status, 'message' => 'Unauthorized Access! '];
      $this->response($response, $status);
    }
    // Use try-catch
    // JWT library throws exception if the token is not valid
    try {
      // Validate the token
      // Successfull validation will return the decoded guru data else returns false
      $data = AUTHORIZATION::validateToken($token);
      if ($data === false) {
        $status = parent::HTTP_UNAUTHORIZED;
        $response = ['status' => $status, 'message' => 'Unauthorized Access!'];
        $this->response($response, $status);
        exit();
      } else {
        return $data;
      }
    } catch (Exception $e) {
      // Token is invalid
      // Send the unathorized access message
      $status = parent::HTTP_UNAUTHORIZED;
      $response = ['status' => $status, 'message' => 'Unauthorized Access! '];
      $this->response($response, $status);
    }
  }
}
