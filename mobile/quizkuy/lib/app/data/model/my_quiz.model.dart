import 'package:meta/meta.dart';
import 'package:quizkuy/app/constants/enums/enums.dart';
import 'package:quizkuy/app/utils/format.utils.dart';

class MyQuizModel {
  final String id;
  final String nama;
  final String jenisSoal;
  final int jumlahSoal;
  final int durasi;
  final String tanggal;
  final String kode;
  final int nilai;
  final int rank;
  final QuizStatus status;
  final bool tampilkanNilai;

  MyQuizModel({
    @required this.id,
    @required this.nama,
    @required this.jenisSoal,
    @required this.jumlahSoal,
    @required this.durasi,
    @required this.tanggal,
    @required this.kode,
    @required this.nilai,
    @required this.rank,
    @required this.status,
    @required this.tampilkanNilai,
  });

  factory MyQuizModel.fromJson(Map<String, dynamic> item) {
    return MyQuizModel(
      id: item['id'],
      nama: item['nama'],
      jenisSoal: item['bank_soal']['jenis_soal'],
      jumlahSoal: int.parse('${item['bank_soal']['jumlah_soal']}'),
      durasi: int.parse('${item['durasi']}'),
      tanggal: formatDate(item['tanggal']),
      kode: item['kode'],
      nilai: int.parse('${item['siswa']['nilai']}'),
      rank: int.parse('${item['siswa']['rank']}'),
      tampilkanNilai: item['quiz_status'] == 'SUDAH_DIKERJAKAN' &&
          item['tampilkan_nilai'] == true,
      status: item['quiz_status'] == 'BELUM_DIMULAI'
          ? QuizStatus.BELUM_DIMULAI
          : item['quiz_status'] == 'BELUM_DIKERJAKAN'
              ? QuizStatus.BELUM_DIKERJAKAN
              : item['quiz_status'] == 'SUDAH_DIKERJAKAN'
                  ? QuizStatus.SUDAH_DIKERJAKAN
                  : item['quiz_status'] == 'BELUM_DIKOREKSI'
                      ? QuizStatus.SUDAH_DIKERJAKAN
                      : QuizStatus.UNKNOWN,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': this.id,
      'nama': this.nama,
      'jenis_soal': this.jenisSoal,
      'jumlah_soal': this.jumlahSoal,
      'durasi': this.durasi,
      'tanggal': this.tanggal,
      'kode': this.kode,
      'nilai': this.nilai,
      'rank': this.rank,
      'tampilkan_nilai': this.tampilkanNilai,
      'status': this.status,
    };
  }

  factory MyQuizModel.fromMap(Map<String, dynamic> item) {
    return MyQuizModel(
      id: item['id'],
      nama: item['nama'],
      jenisSoal: item['jenisSoal'],
      jumlahSoal: item['jumlahSoal'],
      durasi: item['durasi'],
      tanggal: item['tanggal'],
      kode: item['kode'],
      nilai: item['nilai'],
      rank: item['rank'],
      tampilkanNilai: item['tampilkanNilai'],
      status: item['status'],
    );
  }
}
