import 'package:meta/meta.dart';
import 'package:quizkuy/app/data/model/jawaban.model.dart';

class SimpanJawabanModel {
  final String quizId;
  final String siswaId;
  final List<JawabanModel> jawaban;

  SimpanJawabanModel({
    @required this.quizId,
    @required this.siswaId,
    @required this.jawaban,
  });

  Map<String, dynamic> toJson() {
    return {
      'quiz_id': this.quizId,
      'siswa_id': this.siswaId,
      'jawaban': this.jawaban.map((item) => item.toJson()).toList(),
    };
  }
}
