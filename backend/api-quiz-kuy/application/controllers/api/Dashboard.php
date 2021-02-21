<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require(APPPATH . '/libraries/RestController.php');
require(APPPATH . '/libraries/Format.php');
date_default_timezone_set('Asia/Jakarta');

class Dashboard extends RestController
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
    $this->load->model('quiz_model');
    $this->load->model('kelas_model');
    $this->load->model('siswa_model');
    $this->load->model('pelajaran_model');
    $this->load->model('bank_soal_model');
  }
  public function index_get()
  {
    $this->verify_request();

    $quiz = [];

    foreach ($this->quiz_model->listing_where(['status' => 'AKTIF']) as $key => $item) {
      $new = $item;
      $new['tampilkan_nilai'] = $new['tampilkan_nilai'] == '0' ? false : true;
      $new['bank_soal'] = $this->bank_soal_model->findById($item['bank_soal_id']);
      $new['bank_soal']['pelajaran'] = $this->pelajaran_model->findById($new['bank_soal']['pelajaran_id']);
      $new['kelas'] = $this->kelas_model->findById($item['kelas_id']);

      $quiz[$key] = $new;
    }

    $kelas = [];
    $siswa = [];

    foreach ($this->db->get('kelas')->result_array() as $key => $item) {
      $kelas[$key] = $item['nama'];
      $siswa[$key] = $this->db->where('kelas_id', $item['id'])->get('siswa')->num_rows();
    }

    $response = [
      'data' => [
        'quiz_aktif' => $quiz,
        'count' => [
          'quiz' => $this->db->get('quiz')->num_rows(),
          'bank_soal' => $this->db->get('bank_soal  ')->num_rows(),
          'siswa' => $this->db->get('siswa')->num_rows(),
          'guru' => $this->db->get('guru')->num_rows(),
          'kelas' => $this->db->get('kelas')->num_rows(),
          'pelajaran' => $this->db->get('pelajaran')->num_rows(),
        ],
        'chart' => [
          'kelas' => $kelas,
          'siswa' => $siswa,
        ]
      ],
    ];
    $this->response($response, RestController::HTTP_OK);
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
