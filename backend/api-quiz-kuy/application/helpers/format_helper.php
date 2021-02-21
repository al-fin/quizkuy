<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('format_angka')) {
	function format_angka($angka)
	{
		$hasil = number_format($angka, 0, ',', '.');
		return $hasil;
	}
}

function hari_ini($tanggal)
{
	$hari = date("D", strtotime($tanggal));

	switch ($hari) {
		case 'Sun':
			$hari_ini = "Minggu";
			break;

		case 'Mon':
			$hari_ini = "Senin";
			break;

		case 'Tue':
			$hari_ini = "Selasa";
			break;

		case 'Wed':
			$hari_ini = "Rabu";
			break;

		case 'Thu':
			$hari_ini = "Kamis";
			break;

		case 'Fri':
			$hari_ini = "Jumat";
			break;

		case 'Sat':
			$hari_ini = "Sabtu";
			break;

		default:
			$hari_ini = "Tidak di ketahui";
			break;
	}
	return $hari_ini;
}

function format_tgl($tanggal)
{
	if ($tanggal === '0000-00-00') {
		return "-";
	} else {
		$bulan = array(
			0 => '',
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember'
		);
		$pecahkan = explode('-', $tanggal);

		// variabel pecahkan 0 = tanggal
		// variabel pecahkan 1 = bulan
		// variabel pecahkan 2 = tahun

		return hari_ini($tanggal) . ", " . $pecahkan[2] . ' ' . $bulan[(int) $pecahkan[1]] . ' ' . $pecahkan[0];
	}

	function penyebut($nilai)
	{
		$nilai = abs($nilai);
		$huruf = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
		$temp = "";
		if ($nilai < 12) {
			$temp = " " . $huruf[$nilai];
		} else if ($nilai < 20) {
			$temp = penyebut($nilai - 10) . " belas";
		} else if ($nilai < 100) {
			$temp = penyebut($nilai / 10) . " puluh" . penyebut($nilai % 10);
		} else if ($nilai < 200) {
			$temp = " seratus" . penyebut($nilai - 100);
		} else if ($nilai < 1000) {
			$temp = penyebut($nilai / 100) . " ratus" . penyebut($nilai % 100);
		} else if ($nilai < 2000) {
			$temp = " seribu" . penyebut($nilai - 1000);
		} else if ($nilai < 1000000) {
			$temp = penyebut($nilai / 1000) . " ribu" . penyebut($nilai % 1000);
		} else if ($nilai < 1000000000) {
			$temp = penyebut($nilai / 1000000) . " juta" . penyebut($nilai % 1000000);
		} else if ($nilai < 1000000000000) {
			$temp = penyebut($nilai / 1000000000) . " milyar" . penyebut(fmod($nilai, 1000000000));
		} else if ($nilai < 1000000000000000) {
			$temp = penyebut($nilai / 1000000000000) . " trilyun" . penyebut(fmod($nilai, 1000000000000));
		}
		return $temp;
	}
}

function terbilang($nilai)
{
	if ($nilai < 0) {
		$hasil = "minus " . trim(penyebut($nilai)) . " rupiah";
	} else {
		$hasil = trim(penyebut($nilai)) . " rupiah";
	}
	return strtoupper($hasil);
}
