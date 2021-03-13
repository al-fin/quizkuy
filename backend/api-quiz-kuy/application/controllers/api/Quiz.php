<?php
defined('BASEPATH') or exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require(APPPATH . '/libraries/RestController.php');
require(APPPATH . '/libraries/Format.php');
date_default_timezone_set('Asia/Jakarta');

class Quiz extends RestController
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
  public function index_get($id = null)
  {
    $this->verify_request();

    if ($id === null) {
      $quiz = [];

      foreach ($this->quiz_model->listing() as $key => $item) {
        $new = $item;
        $new['tampilkan_nilai'] = $new['tampilkan_nilai'] == '0' ? false : true;
        $new['bank_soal'] = $this->bank_soal_model->findById($item['bank_soal_id']);
        $new['bank_soal']['pelajaran'] = $this->pelajaran_model->findById($new['bank_soal']['pelajaran_id']);
        $new['kelas'] = $this->kelas_model->findById($item['kelas_id']);

        $quiz[$key] = $new;
      }

      $response = [
        'data' => $quiz
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $quiz = $this->quiz_model->findById($id);
      $quiz['tampilkan_nilai'] = $quiz['tampilkan_nilai'] == '0' ? false : true;
      if ($quiz) {
        $quiz['bank_soal'] = $this->bank_soal_model->findById($quiz['bank_soal_id']);
        $quiz['bank_soal']['pelajaran'] = $this->pelajaran_model->findById($quiz['bank_soal']['pelajaran_id']);
        $quiz['bank_soal']['soal'] = $this->bank_soal_model->list_soal($quiz['bank_soal_id'], TRUE);
        $quiz['kelas'] = $this->kelas_model->findById($quiz['kelas_id']);
        $quiz['siswa'] = [];

        $kumpulan_nilai = [];

        if ($quiz['bank_soal']['jenis_soal'] == 'PILIHAN GANDA') {

          $NILAI_PER_SOAL = 100 / $quiz['bank_soal']['jumlah_soal'];
          foreach ($this->siswa_model->listing_by_kelas($quiz['kelas_id']) as $key => $item) {
            $quiz['siswa'][$key] = $item;
            $soal = $this->bank_soal_model->list_soal($quiz['bank_soal_id']);

            $nilai = 0;

            $sudah_mengerjakan = $this->quiz_model->sudah_mengerjakan([
              'siswa_id' => $item['id'],
              'quiz_id' => $quiz['id'],
            ]);
            if ($sudah_mengerjakan) {

              foreach ($soal as $k => $s) {
                $kunci_jawaban = $s['kunci_jawaban'];
                $jawaban_siswa = $this->quiz_model->jawaban_siswa([
                  'siswa_id' => $item['id'],
                  'soal_no' => $s['no'],
                  'quiz_id' => $quiz['id'],
                ]);

                if ($jawaban_siswa == $kunci_jawaban) {
                  $nilai += $NILAI_PER_SOAL;
                }
              }
              $quiz['siswa'][$key]['sudah_mengerjakan'] = true;
            } else {
              $quiz['siswa'][$key]['sudah_mengerjakan'] = false;
            }

            $quiz['siswa'][$key]['quiz_status'] = getQuizStatus([
              'status' => $quiz['status'],
              'jenis_soal' => $quiz['bank_soal']['jenis_soal'],
              'sudah_mengerjakan' => $quiz['siswa'][$key]['sudah_mengerjakan'],
              'sudah_dikoreksi' => false,
            ]);


            // NILAI  
            if (!in_array($nilai, $kumpulan_nilai)) {
              array_push($kumpulan_nilai, $nilai);
            }
            $quiz['siswa'][$key]['nilai'] = $nilai;

            // TIMESTAMP
            $quiz['siswa'][$key]['timestamp'] = $this->quiz_model->timestamp_jawaban_siswa(
              [
                'siswa_id' => $item['id'],
                'quiz_id' => $quiz['id'],
              ]
            );
          }

          rsort($kumpulan_nilai);
          foreach ($quiz['siswa'] as $key => $s) {
            $quiz['siswa'][$key]['rank'] = array_search($s['nilai'], $kumpulan_nilai) + 1;
          }
        }


        if ($quiz['bank_soal']['jenis_soal'] == 'ESSAY') {

          foreach ($this->siswa_model->listing_by_kelas($quiz['kelas_id']) as $key => $item) {
            $quiz['siswa'][$key] = $item;
            $soal = $this->bank_soal_model->list_soal($quiz['bank_soal_id']);

            $nilai = 0;

            $sudah_mengerjakan = $this->quiz_model->sudah_mengerjakan([
              'siswa_id' => $item['id'],
              'quiz_id' => $quiz['id'],
            ]);
            if ($sudah_mengerjakan) {

              foreach ($soal as $k => $s) {
                $kunci_jawaban = $s['kunci_jawaban'];
                $jawaban_siswa = $this->quiz_model->jawaban_siswa_row([
                  'siswa_id' => $item['id'],
                  'quiz_id' => $quiz['id'],
                  'soal_no' => $s['no'],
                ]);

                if (isset($jawaban_siswa['nilai'])) {
                  $nilai += $jawaban_siswa['nilai'];
                }
              }
              $quiz['siswa'][$key]['sudah_mengerjakan'] = true;
            } else {
              $quiz['siswa'][$key]['sudah_mengerjakan'] = false;
            }
            $quiz['siswa'][$key]['sudah_dikoreksi'] = isset($this->quiz_model->jawaban_siswa_row([
              'siswa_id' => $item['id'],
              'quiz_id' => $quiz['id'],
              'soal_no' => 1,
            ])['nilai']);


            $quiz['siswa'][$key]['quiz_status'] = getQuizStatus([
              'status' => $quiz['status'],
              'jenis_soal' => $quiz['bank_soal']['jenis_soal'],
              'sudah_mengerjakan' => $quiz['siswa'][$key]['sudah_mengerjakan'],
              'sudah_dikoreksi' => $quiz['siswa'][$key]['sudah_dikoreksi'],
            ]);

            // NILAI  
            if (!in_array($nilai, $kumpulan_nilai)) {
              array_push($kumpulan_nilai, $nilai);
            }
            $quiz['siswa'][$key]['nilai'] = $nilai;

            // TIMESTAMP
            $quiz['siswa'][$key]['timestamp'] = $this->quiz_model->timestamp_jawaban_siswa(
              [
                'siswa_id' => $item['id'],
                'quiz_id' => $quiz['id'],
              ]
            );
          }

          rsort($kumpulan_nilai);
          foreach ($quiz['siswa'] as $key => $s) {
            $quiz['siswa'][$key]['rank'] = array_search($s['nilai'], $kumpulan_nilai) + 1;
          }
        }

        // var_dump($kumpulan_nilai);
        // die();


        $response = [
          'data' => $quiz
        ];
        $this->response($response, RestController::HTTP_OK);
      } else {
        $response = [
          'message' => 'Quiz dengan id ' . $id . ' tidak ditemukan !'
        ];
        $this->response($response, RestController::HTTP_NOT_FOUND);
      }
    }
  }


  public function my_quiz_get($siswa_id)
  {
    $this->verify_request();

    $quiz = [];

    $siswa = $this->siswa_model->findById($siswa_id);

    foreach ($this->quiz_model->listing_where([
      'kelas_id' => $siswa['kelas_id'],
    ]) as $quiz_key => $quiz_item) {
      $new_quiz = $quiz_item;
      $new_quiz['bank_soal'] = $this->bank_soal_model->findById($quiz_item['bank_soal_id']);
      $new_quiz['kelas'] = $this->kelas_model->findById($quiz_item['kelas_id']);
      $new_quiz['tampilkan_nilai'] = $new_quiz['tampilkan_nilai'] == '0' ? false : true;

      $new_quiz['bank_soal'] = $this->bank_soal_model->findById($new_quiz['bank_soal_id']);
      $siswa = [];

      $kumpulan_nilai = [];

      if ($new_quiz['bank_soal']['jenis_soal'] == 'PILIHAN GANDA') {
        $NILAI_PER_SOAL = 100 / $new_quiz['bank_soal']['jumlah_soal'];
        foreach ($this->siswa_model->listing_by_kelas($new_quiz['kelas_id']) as $key => $item) {
          $siswa[$key] = $item;
          $soal = $this->bank_soal_model->list_soal($new_quiz['bank_soal_id']);

          $nilai = 0;

          $sudah_mengerjakan = $this->quiz_model->sudah_mengerjakan([
            'siswa_id' => $item['id'],
            'quiz_id' => $new_quiz['id'],
          ]);
          if ($sudah_mengerjakan) {
            foreach ($soal as $k => $s) {
              $kunci_jawaban = $s['kunci_jawaban'];
              $jawaban_siswa = $this->quiz_model->jawaban_siswa([
                'siswa_id' => $item['id'],
                'soal_no' => $s['no'],
                'quiz_id' => $new_quiz['id'],
              ]);

              if ($jawaban_siswa == $kunci_jawaban) {
                $nilai += $NILAI_PER_SOAL;
              }
            }
            $siswa[$key]['sudah_mengerjakan'] = true;
          } else {
            $siswa[$key]['sudah_mengerjakan'] = false;
          }
          $siswa[$key]['sudah_dikoreksi'] = isset($this->quiz_model->jawaban_siswa_row([
            'siswa_id' => $item['id'],
            'quiz_id' => $new_quiz['id'],
            'soal_no' => 1,
          ])['nilai']);

          if (!in_array($nilai, $kumpulan_nilai)) {
            array_push($kumpulan_nilai, $nilai);
          }
          $siswa[$key]['nilai'] = $nilai;
          $new_quiz['quiz_status'] = "UNKNOWN";
        }

        rsort($kumpulan_nilai);
        foreach ($siswa as $key => $s) {
          $siswa[$key]['rank'] = array_search($s['nilai'], $kumpulan_nilai) + 1;
        }
      }

      if ($new_quiz['bank_soal']['jenis_soal'] == 'ESSAY') {

        foreach ($this->siswa_model->listing_by_kelas($new_quiz['kelas_id']) as $key => $item) {
          $siswa[$key] = $item;
          $soal = $this->bank_soal_model->list_soal($new_quiz['bank_soal_id']);

          $nilai = 0;

          $sudah_mengerjakan = $this->quiz_model->sudah_mengerjakan([
            'siswa_id' => $item['id'],
            'quiz_id' => $new_quiz['id'],
          ]);
          if ($sudah_mengerjakan) {

            foreach ($soal as $k => $s) {
              $kunci_jawaban = $s['kunci_jawaban'];
              $jawaban_siswa = $this->quiz_model->jawaban_siswa_row([
                'siswa_id' => $item['id'],
                'quiz_id' => $new_quiz['id'],
                'soal_no' => $s['no'],
              ]);

              if (isset($jawaban_siswa['nilai'])) {
                $nilai += $jawaban_siswa['nilai'];
              }
            }
            $siswa[$key]['sudah_mengerjakan'] = true;
          } else {
            $siswa[$key]['sudah_mengerjakan'] = false;
          }
          $siswa[$key]['sudah_dikoreksi'] = isset($this->quiz_model->jawaban_siswa_row([
            'siswa_id' => $item['id'],
            'quiz_id' => $new_quiz['id'],
            'soal_no' => 1,
          ])['nilai']);

          // NILAI  
          if (!in_array($nilai, $kumpulan_nilai)) {
            array_push($kumpulan_nilai, $nilai);
          }
          $siswa[$key]['nilai'] = $nilai;

          // TIMESTAMP
          $siswa[$key]['timestamp'] = $this->quiz_model->timestamp_jawaban_siswa(
            [
              'siswa_id' => $item['id'],
              'quiz_id' => $new_quiz['id'],
            ]
          );
        }

        rsort($kumpulan_nilai);
        foreach ($siswa as $key => $s) {
          $siswa[$key]['rank'] = array_search($s['nilai'], $kumpulan_nilai) + 1;
        }
      }

      $new_quiz['siswa'] = search_array($siswa, 'id', $siswa_id)[0];


      // var_dump($kumpulan_nilai);
      // die();


      $quiz[$quiz_key] = $new_quiz;
    }

    $data = [];
    foreach ($quiz as $item) {
      $item['quiz_status'] = getQuizStatus([
        'status' => $item['status'],
        'jenis_soal' => $item['bank_soal']['jenis_soal'],
        'sudah_mengerjakan' => $item['siswa']['sudah_mengerjakan'],
        'sudah_dikoreksi' => $item['siswa']['sudah_dikoreksi'],
      ]);

      if ($this->input->get('status') == NULL || $this->input->get('status') == 'ALL' || $this->input->get('status') == $item['quiz_status'] || ($this->input->get('status') == 'SUDAH_DIKERJAKAN' && $item['quiz_status'] == 'BELUM_DIKOREKSI')) {
        array_push($data, $item);
      }
    }



    $response = [
      'quiz_status' => $this->input->get('status'),
      'data' => $data
    ];
    $this->response($response, RestController::HTTP_OK);
  }

  public function detail_jawaban_get($quiz_id, $siswa_id)
  {
    $this->verify_request();

    $quiz = [];

    $siswa = $this->siswa_model->findById($siswa_id);
    $quiz_item = $this->quiz_model->findById(($quiz_id));


    $quiz_item['kelas'] = $this->kelas_model->findById($quiz_item['kelas_id']);

    $quiz_item['bank_soal'] = $this->bank_soal_model->findById($quiz_item['bank_soal_id']);
    $quiz_item['bank_soal']['pelajaran'] = $this->pelajaran_model->findById($quiz_item['bank_soal']['pelajaran_id']);
    $quiz_item['bank_soal']['soal'] = $this->bank_soal_model->list_soal_join_siswa($quiz_id, $quiz_item['bank_soal_id'], $siswa_id);


    $siswa = [];

    $kumpulan_nilai = [];

    if ($quiz_item['bank_soal']['jenis_soal'] == 'PILIHAN GANDA') {
      $NILAI_PER_SOAL = 100 / $quiz_item['bank_soal']['jumlah_soal'];
      foreach ($this->siswa_model->listing_by_kelas($quiz_item['kelas_id']) as $key => $item) {
        $siswa[$key] = $item;
        $soal = $this->bank_soal_model->list_soal($quiz_item['bank_soal_id']);

        $nilai = 0;

        $sudah_mengerjakan = $this->quiz_model->sudah_mengerjakan([
          'siswa_id' => $item['id'],
          'quiz_id' => $quiz_item['id'],
        ]);
        if ($sudah_mengerjakan) {
          foreach ($soal as $k => $s) {

            $kunci_jawaban = $s['kunci_jawaban'];
            $jawaban_siswa = $this->quiz_model->jawaban_siswa([
              'siswa_id' => $item['id'],
              'soal_no' => $s['no'],
              'quiz_id' => $quiz_item['id'],
            ]);

            if ($jawaban_siswa == $kunci_jawaban) {
              $nilai += $NILAI_PER_SOAL;
              $siswa[$key]['benar'] = (!isset($siswa[$key]['benar']) ? 0 : $siswa[$key]['benar']) + 1;
            } else {
              $siswa[$key]['salah'] = (!isset($siswa[$key]['salah']) ? 0 : $siswa[$key]['salah']) + 1;
            }
          }
          $siswa[$key]['sudah_mengerjakan'] = true;
        } else {
          $siswa[$key]['sudah_mengerjakan'] = false;
        }

        $quiz['siswa'][$key]['quiz_status'] = getQuizStatus([
          'status' => $quiz_item['status'],
          'jenis_soal' => $quiz_item['bank_soal']['jenis_soal'],
          'sudah_mengerjakan' => $siswa[$key]['sudah_mengerjakan'],
          'sudah_dikoreksi' => false,
        ]);


        if (!in_array($nilai, $kumpulan_nilai)) {
          array_push($kumpulan_nilai, $nilai);
        }
        $siswa[$key]['nilai'] = $nilai;

        // TIMESTAMP
        $quiz_item['timestamp'] = $this->quiz_model->timestamp_jawaban_siswa(
          [
            'siswa_id' => $siswa_id,
            'quiz_id' => $quiz_id,
          ]
        );
      }

      rsort($kumpulan_nilai);
      foreach ($siswa as $key => $s) {
        $siswa[$key]['rank'] = array_search($s['nilai'], $kumpulan_nilai) + 1;
      }

      $quiz_item['siswa'] = $siswa;
    }



    if ($quiz_item['bank_soal']['jenis_soal'] == 'ESSAY') {

      foreach ($this->siswa_model->listing_by_kelas($quiz_item['kelas_id']) as $key => $item) {
        $quiz_item['siswa'][$key] = $item;
        $soal = $this->bank_soal_model->list_soal($quiz_item['bank_soal_id']);

        $nilai = 0;

        $sudah_mengerjakan = $this->quiz_model->sudah_mengerjakan([
          'siswa_id' => $item['id'],
          'quiz_id' => $quiz_item['id'],
        ]);
        if ($sudah_mengerjakan) {

          foreach ($soal as $k => $s) {
            $kunci_jawaban = $s['kunci_jawaban'];
            $jawaban_siswa = $this->quiz_model->jawaban_siswa_row([
              'siswa_id' => $item['id'],
              'quiz_id' => $quiz_item['id'],
              'soal_no' => $s['no'],
            ]);

            if (isset($jawaban_siswa['nilai'])) {
              $nilai += $jawaban_siswa['nilai'];
            }
          }
          $quiz_item['siswa'][$key]['sudah_mengerjakan'] = true;
        } else {
          $quiz_item['siswa'][$key]['sudah_mengerjakan'] = false;
        }
        $quiz_item['siswa'][$key]['sudah_dikoreksi'] = isset($this->quiz_model->jawaban_siswa_row([
          'siswa_id' => $item['id'],
          'quiz_id' => $quiz_item['id'],
          'soal_no' => 1,
        ])['nilai']);


        $quiz_item['siswa'][$key]['quiz_status'] = getQuizStatus([
          'status' => $quiz_item['status'],
          'jenis_soal' => $quiz_item['bank_soal']['jenis_soal'],
          'sudah_mengerjakan' => $quiz_item['siswa'][$key]['sudah_mengerjakan'],
          'sudah_dikoreksi' => $quiz_item['siswa'][$key]['sudah_dikoreksi'],
        ]);


        // NILAI  
        if (!in_array($nilai, $kumpulan_nilai)) {
          array_push($kumpulan_nilai, $nilai);
        }
        $quiz_item['siswa'][$key]['nilai'] = $nilai;

        // TIMESTAMP
        $quiz_item['siswa'][$key]['timestamp'] = $this->quiz_model->timestamp_jawaban_siswa(
          [
            'siswa_id' => $item['id'],
            'quiz_id' => $quiz_item['id'],
          ]
        );
      }

      rsort($kumpulan_nilai);
      foreach ($quiz_item['siswa'] as $key => $s) {
        $quiz_item['siswa'][$key]['rank'] = array_search($s['nilai'], $kumpulan_nilai) + 1;
      }
    }
    $quiz_item['siswa'] = search_array($quiz_item['siswa'], 'id', $siswa_id)[0];




    // var_dump($kumpulan_nilai);
    // die();


    $quiz = $quiz_item;



    $response = [
      'data' => $quiz
    ];
    $this->response($response, RestController::HTTP_OK);
  }

  public function generate_kode($length = 8)
  {
    return strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, $length));
  }

  public function index_post()
  {
    $this->verify_request();


    $new_quiz = [
      'kode'  => $this->generate_kode(8),
      'nama'  => $this->post('nama'),
      'bank_soal_id'  => $this->post('bank_soal_id'),
      'kelas_id'  => $this->post('kelas_id'),
      'tanggal'  => $this->post('tanggal'),
      'durasi'  => $this->post('durasi'),
      'tampilkan_nilai'  => $this->post('tampilkan_nilai'),
      'status'  => "TIDAK AKTIF",
    ];
    // var_dump($new_quiz);
    // die();
    $create_quiz = $this->quiz_model->create($new_quiz);
    if ($create_quiz) {

      $response = [
        'data' => $new_quiz,
        'message' => 'Quiz baru berhasil ditambahkan !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menambahkan quiz baru ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function change_status_post($id)
  {
    // $this->verify_request();
    $new_quiz = [
      'status'  => $this->post('status'),
    ];
    $edit_quiz = $this->quiz_model->update($id, $new_quiz);
    if ($edit_quiz) {
      $response = [
        'data' => $new_quiz,
        'message' => 'Status Quiz berhasil diganti !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal mengedit quiz ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function edit_post($id)
  {
    $this->verify_request();
    $last_quiz = $this->quiz_model->findById($id);
    $new_quiz = [
      'nama'  => $this->post('nama'),
      'bank_soal_id'  => $this->post('bank_soal_id'),
      'kelas_id'  => $this->post('kelas_id'),
      'tanggal'  => $this->post('tanggal'),
      'durasi'  => $this->post('durasi'),
      'tampilkan_nilai'  => $this->post('tampilkan_nilai'),
    ];
    $edit_quiz = $this->quiz_model->update($id, $new_quiz);
    if ($edit_quiz) {
      $new_quiz['id'] = $last_quiz->id;
      $response = [
        'data' => $new_quiz,
        'message' => 'Quiz berhasil diedit !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal mengedit quiz ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function index_delete($id)
  {
    $this->verify_request();

    $hapus_quiz = $this->quiz_model->delete($id);
    if ($hapus_quiz) {

      $response = [
        'id_quiz' => $id,
        'message' => 'Quiz berhasil dihapus !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menghapus quiz ! Masukkan data dengan benar !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function simpan_jawaban_post()
  {
    $this->verify_request();

    $jawaban = $this->post('jawaban');

    // $quiz_aktif = $this->quiz_model->quiz_aktif([
    //   'quiz_id' => $this->post('quiz_id'),
    //   'siswa_id' => $this->post('siswa_id')
    // ]);
    $sudah_mengerjakan = $this->quiz_model->sudah_mengerjakan([
      'quiz_id' => $this->post('quiz_id'),
      'siswa_id' => $this->post('siswa_id')
    ]);

    if ($sudah_mengerjakan == FALSE) {
      foreach ($jawaban as $item) {
        $this->quiz_model->simpan_jawaban([
          'quiz_id' => $this->post('quiz_id'),
          'siswa_id' => $this->post('siswa_id'),
          'soal_no' => $item['no'],
          'jawaban' => $item['jawaban'],
          'timestamp' => date('Y-m-d H:i:s'),
        ]);
      }
      $response = [
        'message' => 'Jawaban berhasil disimpan !'
      ];
      $this->response($response, RestController::HTTP_OK);
    } else {
      $response = [
        'message' => 'Gagal menyimpan jawaban, soal tidak aktif atau kamu sudah mengerjakan soal ini !'
      ];
      $this->response($response, RestController::HTTP_BAD_REQUEST);
    }
  }

  public function reset_jawaban_post()
  {
    $this->verify_request();

    $this->quiz_model->reset_jawaban([
      'quiz_id' => $this->post('quiz_id'),
      'siswa_id' => $this->post('siswa_id'),
    ]);

    $response = [
      'message' => 'Jawaban berhasil direset !'
    ];
    $this->response($response, RestController::HTTP_OK);
  }

  public function koreksi_post()
  {
    $this->verify_request();

    $koreksi = $this->post('koreksi');

    foreach ($koreksi as $item) {
      $this->quiz_model->koreksi([
        'quiz_id' => $this->post('quiz_id'),
        'siswa_id' => $this->post('siswa_id'),
        'soal_no' => $item['no'],
        'nilai' => $item['nilai'],
      ]);
    }

    $response = [
      'message' => 'Jawaban berhasil dikoreksi !'
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
