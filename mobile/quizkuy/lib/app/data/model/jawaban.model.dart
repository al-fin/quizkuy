import 'package:flutter/widgets.dart';
import 'package:meta/meta.dart';

class JawabanModel {
  final int no;
  final String jawaban;
  final TextEditingController controller;

  JawabanModel({@required this.no, @required this.jawaban, this.controller});

  factory JawabanModel.fromJson(Map<String, dynamic> item) {
    return JawabanModel(
      no: int.parse(item['no']),
      jawaban: item['jawaban'],
      controller: item['controller'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'no': this.no,
      'jawaban': this.jawaban,
      'controller': this.controller,
    };
  }

  factory JawabanModel.fromMap(Map<String, dynamic> item) {
    return JawabanModel(
      no: item['no'],
      jawaban: item['jawaban'],
      controller: item['controller'],
    );
  }
}
