<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require(APPPATH . '/libraries/RestController.php');
require(APPPATH . '/libraries/Format.php');
date_default_timezone_set('Asia/Jakarta');

class Guru extends RestController
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
    $this->load->model('guru_model');
  }

  public function index_get($id = null)
  {
    $this->verify_request();
    if ($id === null) {
      $gurus = $this->guru_model->listing();

      $response = [
        'data' => $gurus
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $guru = $this->guru_model->findById($id);
      if ($guru) {

        $response = [
          'data' => $guru
        ];
        $this->response($response, RestController::HTTP_OK);
      } else {
        $response = [
          'message' => 'Guru dengan id ' . $id . ' tidak ditemukan !'
        ];
        $this->response($response, RestController::HTTP_NOT_FOUND);
      }
    }
  }

  public function index_post()
  {
    $this->verify_request();
    $new_guru = [
      'nama'  => $this->post('nama'),
      'email'  => $this->post('email'),
      'password'  => md5($this->post('password')),
    ];
    $create_guru = $this->guru_model->create($new_guru);
    if ($create_guru) {
      $response = [
        'data' => $new_guru,
        'message' => 'Guru baru berhasil ditambahkan !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menambahkan guru baru ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function edit_post($id)
  {
    $this->verify_request();
    $last_guru = $this->guru_model->findById($id);

    $password = $this->post('password');

    if ($password !== "" && $password !== null && $password) {
      $new_guru = [
        'nama'  => $this->post('nama'),
        'email'  => $this->post('email'),
        'password'  => md5($password),
      ];
      $edit_guru = $this->guru_model->update($id, $new_guru);
    } else {
      $new_guru = [
        'nama'  => $this->post('nama'),
        'email'  => $this->post('email'),
        'password' => $last_guru->password,
      ];
      $edit_guru = $this->guru_model->update($id, $new_guru);
    }
    if ($edit_guru) {
      $new_guru['id'] = $last_guru->id;
      $response = [
        'data' => $new_guru,
        'message' => 'Guru berhasil diedit !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal mengedit guru ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function index_delete($id)
  {
    $this->verify_request();

    $hapus_guru = $this->guru_model->delete($id);
    if ($hapus_guru) {
      $response = [
        'id_guru' => $id,
        'message' => 'Guru berhasil dihapus !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menghapus guru ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function login_post()
  {
    try {
      // Extract guru data from POST request
      $email = $this->post('email');
      $password = $this->post('password');
      // Check if valid guru
      $auth = $this->guru_model->auth($email, md5($password));

      if ($auth) {
        $token = AUTHORIZATION::generateToken([
          'id' => $auth->id,
        ]);
        $response = [
          'message' => 'Berhasil Login',
          'data' => [
            'id' => $auth->id,
            'nama' => $auth->nama,
            'email'    => $auth->email,
            'token'     => $token,
          ]
        ];
        $this->response($response, RestController::HTTP_OK);
      } else {
        $this->response(['message' => 'Invalid email or password!'], parent::HTTP_BAD_REQUEST);
      }
    } catch (Exception $e) {
      $this->response(['message' => 'An error occured!'], parent::HTTP_INTERNAL_ERROR);
    }
  }

  public function verify_post()
  {
    // Extract the token
    $token = $this->post('token');
    // Use try-catch
    // JWT library throws exception if the token is not valid
    try {
      // Validate the token
      // Successfull validation will return the decoded guru data else returns false
      $data = AUTHORIZATION::validateToken($token);
      if ($data) {
        $status = parent::HTTP_OK;
        $response = ['status' => $status, 'exist' => true, 'message' => 'Token valid !'];
        $this->response($response, $status);
      } else {
        $status = parent::HTTP_OK;
        $response = ['status' => $status, 'exist' => false, 'message' => 'Unauthorized Access! '];
        $this->response($response, $status);
      }
    } catch (Exception $e) {
      // Token is invalid
      // Send the unathorized access message
      $status = parent::HTTP_UNAUTHORIZED;
      $response = ['status' => $status, 'exist' => false, 'message' => 'Unauthorized Access! '];
      $this->response($response, $status);
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
