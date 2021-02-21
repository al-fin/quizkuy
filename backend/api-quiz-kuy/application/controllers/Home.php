<?php
defined('BASEPATH') or exit('No direct script access allowed');
date_default_timezone_set('Asia/Jakarta');

class Home extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }
  public function index()
  {
    echo 'Server API QuizKuy | ' . date('Y-m-d H:i:s');
  }
}
