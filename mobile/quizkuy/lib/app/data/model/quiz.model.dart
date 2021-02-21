import 'package:meta/meta.dart';
import 'package:quizkuy/app/data/model/soal.model.dart';
import 'package:quizkuy/app/utils/format.utils.dart';

class QuizModel {
  final String id;
  final String nama;
  final String jenisSoal;
  final int jumlahSoal;
  final int durasi;
  final String tanggal;
  final String kode;
  final String kelas;
  final String pelajaran;
  final List<SoalModel> soal;

  QuizModel({
    @required this.id,
    @required this.nama,
    @required this.jenisSoal,
    @required this.jumlahSoal,
    @required this.durasi,
    @required this.tanggal,
    @required this.kode,
    @required this.kelas,
    @required this.pelajaran,
    @required this.soal,
  });

  factory QuizModel.fromJson(Map<String, dynamic> item) {
    return QuizModel(
      id: item['id'],
      nama: item['nama'],
      jenisSoal: item['bank_soal']['jenis_soal'],
      jumlahSoal: int.parse('${item['bank_soal']['jumlah_soal']}'),
      durasi: int.parse('${item['durasi']}'),
      tanggal: formatDate(item['tanggal']),
      kode: item['kode'],
      kelas: item['kelas']['nama'],
      pelajaran: item['bank_soal']['pelajaran']['nama'],
      soal: List<SoalModel>.from(
        item['bank_soal']['soal'].map((item) => SoalModel.fromJson(item)),
      ),
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
      'kelas': this.kelas,
      'pelajaran': this.pelajaran,
      'soal': this.soal,
    };
  }

  factory QuizModel.fromMap(Map<String, dynamic> item) {
    print('item:');
    print(item);
    return QuizModel(
      id: item['id'],
      nama: item['nama'],
      jenisSoal: item['jenis_soal'],
      jumlahSoal: item['jumlah_soal'],
      durasi: item['durasi'],
      tanggal: item['tanggal'],
      kode: item['kode'],
      kelas: item['kelas'],
      pelajaran: item['pelajaran'],
      soal: List<SoalModel>.from(
        item['soal'].map((item) => SoalModel.fromJson(item)),
      ),
    );
  }
}
