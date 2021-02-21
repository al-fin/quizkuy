<?php

function search_array($array, $key, $value)
{
    $results = array();

    if (is_array($array)) {
        if (isset($array[$key]) && $array[$key] == $value) {
            $results[] = $array;
        }

        foreach ($array as $subarray) {
            $results = array_merge($results, search_array($subarray, $key, $value));
        }
    }

    return $results;
}

function getQuizStatus($data)
{
    // * EXAMPLE : 
    // $data = [
    //     'status'=> 'TIDAK AKTIF',
    //     'jenis_soal'=> 'ESSAY',
    //     'sudah_mengerjakan'=> true,
    //     'sudah_dikoreksi'=> true,
    // ];
    // var_dump($data);
    // die();

    $quiz_status = 'UNKNOWN';
    if (
        $data['status'] == 'TIDAK AKTIF' &&
        $data['sudah_mengerjakan'] == false
    ) {
        $quiz_status = "BELUM_DIMULAI";
    } else if (
        $data['status'] == 'AKTIF' &&
        $data['sudah_mengerjakan'] == false
    ) {
        $quiz_status = "BELUM_DIKERJAKAN";
    } else if (
        ($data['jenis_soal'] == 'PILIHAN GANDA' && $data['sudah_mengerjakan'] == true)
        ||
        ($data['jenis_soal'] == 'ESSAY' && $data['sudah_mengerjakan'] == true && $data['sudah_dikoreksi'] == true)
    ) {
        $quiz_status = "SUDAH_DIKERJAKAN";
    } else if ($data['jenis_soal'] == 'ESSAY' && $data['sudah_mengerjakan'] == true && $data['sudah_dikoreksi'] == false) {
        $quiz_status = "BELUM_DIKOREKSI";
    } else {
        $quiz_status = "UNKNOWN";
    }
    return $quiz_status;
}
