import 'package:meta/meta.dart';

class SiswaModel {
  final String id;
  final String email;
  final String nama;
  final String nisn;
  final String kelasId;
  final String kelas;
  final String password;
  final String status;

  SiswaModel({
    this.id,
    @required this.email,
    @required this.nama,
    @required this.nisn,
    @required this.password,
    @required this.kelasId,
    this.kelas,
    this.status,
  });

  factory SiswaModel.fromJson(Map<String, dynamic> item) {
    return SiswaModel(
      id: item['id'],
      email: item['email'],
      nama: item['nama'],
      nisn: item['nisn'],
      kelasId: item['kelas_id'],
      kelas: item['kelas'],
      password: item['password'],
      status: item['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': this.id,
      'email': this.email,
      'nama': this.nama,
      'nisn': this.nisn,
      'kelas_id': this.kelasId,
      'kelas': this.kelas,
      'password': this.password,
      'status': this.status,
    };
  }
}
