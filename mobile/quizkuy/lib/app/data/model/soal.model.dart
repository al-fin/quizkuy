import 'package:meta/meta.dart';

class SoalModel {
  final String id;
  final int no;
  final String pertanyaan;
  final String a;
  final String b;
  final String c;
  final String d;
  final String e;
  final String image;

  SoalModel({
    @required this.id,
    @required this.no,
    @required this.pertanyaan,
    @required this.a,
    @required this.b,
    @required this.c,
    @required this.d,
    @required this.e,
    this.image,
  });

  factory SoalModel.fromJson(Map<String, dynamic> item) {
    return SoalModel(
      id: item['id'],
      no: int.parse('${item["no"]}'),
      pertanyaan: item['pertanyaan'],
      a: item['a'],
      b: item['b'],
      c: item['c'],
      d: item['d'],
      e: item['e'],
      image: item['image'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': this.id,
      'no': this.no,
      'pertanyaan': this.pertanyaan,
      'a': this.a,
      'b': this.b,
      'c': this.c,
      'd': this.d,
      'e': this.e,
      'image': this.image,
    };
  }

  factory SoalModel.fromMap(Map<String, dynamic> item) {
    return SoalModel(
      id: item['id'],
      no: int.parse('${item["no"]}'),
      pertanyaan: item['pertanyaan'],
      a: item['a'],
      b: item['b'],
      c: item['c'],
      d: item['d'],
      e: item['e'],
      image: item['image'],
    );
  }
}
