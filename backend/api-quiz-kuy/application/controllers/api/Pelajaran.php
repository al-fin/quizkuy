<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require(APPPATH . '/libraries/RestController.php');
require(APPPATH . '/libraries/Format.php');
date_default_timezone_set('Asia/Jakarta');

class Pelajaran extends RestController
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
    $this->load->model('pelajaran_model');
  }
  public function index_get($id = null)
  {
    $this->verify_request();

    if ($id === null) {
      $pelajarans = $this->pelajaran_model->listing();

      $response = [
        'data' => $pelajarans
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $pelajaran = $this->pelajaran_model->findById($id);
      if ($pelajaran) {

        $response = [
          'data' => $pelajaran
        ];
        $this->response($response, RestController::HTTP_OK);
      } else {
        $response = [
          'message' => 'Pelajaran dengan id ' . $id . ' tidak ditemukan !'
        ];
        $this->response($response, RestController::HTTP_NOT_FOUND);
      }
    }
  }

  public function index_post()
  {
    $this->verify_request();

    $new_pelajaran = [
      'nama'  => $this->post('nama'),
    ];
    $create_pelajaran = $this->pelajaran_model->create($new_pelajaran);
    if ($create_pelajaran) {

      $response = [
        'data' => $new_pelajaran,
        'message' => 'Pelajaran baru berhasil ditambahkan !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menambahkan pelajaran baru ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function edit_post($id)
  {
    $this->verify_request();
    $last_pelajaran = $this->pelajaran_model->findById($id);
    $new_pelajaran = [
      'nama'  => $this->post('nama'),
    ];
    $edit_pelajaran = $this->pelajaran_model->update($id, $new_pelajaran);
    if ($edit_pelajaran) {
      $new_pelajaran['id'] = $last_pelajaran->id;
      $response = [
        'data' => $new_pelajaran,
        'message' => 'Pelajaran berhasil diedit !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal mengedit pelajaran ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function index_delete($id)
  {
    $this->verify_request();

    $hapus_pelajaran = $this->pelajaran_model->delete($id);
    if ($hapus_pelajaran) {
      $response = [
        'id_pelajaran' => $id,
        'message' => 'Pelajaran berhasil dihapus !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menghapus pelajaran ! Masukkan data dengan benar !'
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
