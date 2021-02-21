<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require(APPPATH . '/libraries/RestController.php');
require(APPPATH . '/libraries/Format.php');
date_default_timezone_set('Asia/Jakarta');

class Kelas extends RestController
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
    $this->load->model('kelas_model');
  }
  public function index_get($id = null)
  {
    // $this->verify_request();

    if ($id === null) {
      $kelas = $this->kelas_model->listing();

      $response = [
        'data' => $kelas
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $kelas = $this->kelas_model->findById($id);
      if ($kelas) {

        $response = [
          'data' => $kelas
        ];
        $this->response($response, RestController::HTTP_OK);
      } else {
        $response = [
          'message' => 'Kelas dengan id ' . $id . ' tidak ditemukan !'
        ];
        $this->response($response, RestController::HTTP_NOT_FOUND);
      }
    }
  }

  public function index_post()
  {
    $this->verify_request();

    $new_kelas = [
      'nama'  => $this->post('nama'),
    ];
    $create_kelas = $this->kelas_model->create($new_kelas);
    if ($create_kelas) {

      $response = [
        'data' => $new_kelas,
        'message' => 'Kelas baru berhasil ditambahkan !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menambahkan kelas baru ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function edit_post($id)
  {
    $this->verify_request();
    $last_kelas = $this->kelas_model->findById($id);
    $new_kelas = [
      'nama'  => $this->post('nama'),
    ];
    $edit_kelas = $this->kelas_model->update($id, $new_kelas);
    if ($edit_kelas) {
      $new_kelas['id'] = $last_kelas->id;
      $response = [
        'data' => $new_kelas,
        'message' => 'Kelas berhasil diedit !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal mengedit kelas ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function index_delete($id)
  {
    $this->verify_request();

    $hapus_kelas = $this->kelas_model->delete($id);
    if ($hapus_kelas) {
      $response = [
        'id_kelas' => $id,
        'message' => 'Kelas berhasil dihapus !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menghapus kelas ! Masukkan data dengan benar !'
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
