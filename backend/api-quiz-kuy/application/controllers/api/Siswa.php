<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require(APPPATH . '/libraries/RestController.php');
require(APPPATH . '/libraries/Format.php');
date_default_timezone_set('Asia/Jakarta');

class Siswa extends RestController
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
    $this->load->model('siswa_model');
  }
  public function index_get($id = null)
  {
    $this->verify_request();

    if ($id === null) {
      $siswa = $this->siswa_model->listing();

      $response = [
        'data' => $siswa
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $siswa = $this->siswa_model->findById($id);
      if ($siswa) {

        $response = [
          'data' => $siswa
        ];
        $this->response($response, RestController::HTTP_OK);
      } else {
        $response = [
          'message' => 'Siswa dengan id ' . $id . ' tidak ditemukan !'
        ];
        $this->response($response, RestController::HTTP_NOT_FOUND);
      }
    }
  }

  public function check_status_get($id)
  {
    $this->verify_request();

    $siswa = $this->siswa_model->findById($id);
    if ($siswa) {

      $response = [
        'data' => [
          'status' => $siswa['status']
        ]
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Siswa dengan id ' . $id . ' tidak ditemukan !'
      ];
      $this->response($response, RestController::HTTP_NOT_FOUND);
    }
  }

  public function get_by_kelas_get($id)
  {
    $this->verify_request();

    $siswa = $this->siswa_model->listing_by_kelas($id);

    $response = [
      'data' => $siswa
    ];
    $this->response($response, RestController::HTTP_OK);
  }

  public function index_post()
  {
    // $this->verify_request();

    if ($this->siswa_model->check_duplicate([
      'siswa.nama'  => $this->post('nama'),
      'siswa.nisn'  => $this->post('nisn'),
      'siswa.email'  => $this->post('email'),
    ])) {
      $response = [
        'message' => 'Akun ini sudah terdaftar, silahkan Login!'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    } else {
      $new_siswa = [
        'kelas_id'  => $this->post('kelas_id'),
        'nama'  => $this->post('nama'),
        'nisn'  => $this->post('nisn'),
        'email'  => $this->post('email'),
        'status'  => $this->post('status'),
        'password'  => md5($this->post('password')),
      ];
      $create_siswa = $this->siswa_model->create($new_siswa);
      if ($create_siswa) {
        $response = [
          'data' => $new_siswa,
          'message' => 'Siswa baru berhasil ditambahkan !'
        ];
        $this->response($response, RestController::HTTP_OK);
      } else {
        $response = [
          'message' => 'Masukkan data dengan benar !'
        ];
        $this->response($response, RestController::HTTP_BAD_REQUEST);
      }
    }
  }

  public function edit_post($id)
  {
    $this->verify_request();
    $new_siswa = [
      'nama'  => $this->post('nama'),
      'kelas_id'  => $this->post('kelas_id'),
      'nisn'  => $this->post('nisn'),
      'email'  => $this->post('email'),
    ];

    if ($this->post('password') != '') {
      $new_siswa['password'] = md5($this->post('password'));
    }

    $edit_siswa = $this->siswa_model->update($id, $new_siswa);
    if ($edit_siswa) {
      $siswa = $this->siswa_model->findById($id);
      $response = [
        'message' => 'Siswa berhasil diedit !',
        'data' => [
          'id' => $siswa['id'],
          'nama' => $siswa['nama'],
          'kelas'    => $siswa['kelas'],
          'kelas_id'    => $siswa['kelas_id'],
          'nisn'    => $siswa['nisn'],
          'email'    => $siswa['email'],
          'status'    => $siswa['status'],
        ]
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function update_status_post($id)
  {
    $this->verify_request();
    $last_siswa = $this->siswa_model->findById($id);
    $new_siswa = [
      'status'  => $this->post('status'),
    ];

    $edit_siswa = $this->siswa_model->update($id, $new_siswa);
    if ($edit_siswa) {
      $new_siswa['id'] = $last_siswa['id'];
      $response = [
        'data' => $new_siswa,
        'message' => 'Berhasil !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function approve_all_post()
  {
    $this->verify_request();
    $approve_siswa = $this->siswa_model->approve_all();
    if ($approve_siswa) {
      $response = [
        'message' => 'Berhasil !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function index_delete($id)
  {
    $this->verify_request();

    $hapus_siswa = $this->siswa_model->delete($id);
    if ($hapus_siswa) {
      $response = [
        'id_siswa' => $id,
        'message' => 'Siswa berhasil dihapus !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menghapus siswa ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }


  public function login_post()
  {
    try {
      // Extract siswa data from POST request
      $email = $this->post('email');
      $password = $this->post('password');
      // Check if valid siswa
      $auth = $this->siswa_model->auth($email, md5($password));

      if ($auth) {
        if ($auth->status == 'TERVERIFIKASI' || $auth->status == 'TERKUNCI') {
          $token = AUTHORIZATION::generateToken([
            'id' => $auth->id,
          ]);
          $response = [
            'message' => 'Berhasil Login',
            'data' => [
              'id' => $auth->id,
              'nama' => $auth->nama,
              'kelas'    => $auth->kelas,
              'kelas_id'    => $auth->kelas_id,
              'nisn'    => $auth->nisn,
              'email'    => $auth->email,
              'status'    => $auth->status,
              'token'     => $token,
            ]
          ];
          $this->response($response, RestController::HTTP_OK);
        } else if ($auth->status == 'DITOLAK') {
          $this->response(['message' => 'Pengajuan akun kamu ditolak!'], parent::HTTP_BAD_REQUEST);
        } else {
          $this->response(['message' => 'Akun kamu masih dalam tahap verifikasi!'], parent::HTTP_BAD_REQUEST);
        }
      } else {
        $this->response(['message' => 'Username atau password anda salah!'], parent::HTTP_BAD_REQUEST);
      }
    } catch (Exception $e) {
      $this->response(['message' => 'An error occured!'], parent::HTTP_INTERNAL_ERROR);
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
