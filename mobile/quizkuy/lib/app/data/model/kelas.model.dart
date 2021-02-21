import 'package:meta/meta.dart';

class KelasModel {
  final String id;
  final String nama;

  KelasModel({
    @required this.id,
    @required this.nama,
  });

  factory KelasModel.fromJson(Map<String, dynamic> item) {
    return KelasModel(
      id: item['id'],
      nama: item['nama'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': this.id,
      'nama': this.nama,
    };
  }
}
