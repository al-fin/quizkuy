import 'package:quizkuy/app/data/model/simpan_jawaban.model.dart';
import 'package:quizkuy/app/data/provider/quiz.provider.dart';
import 'package:get/get.dart';

class QuizRepository {
  final QuizProvider quizProvider = Get.find();

  Future<Response> listMyQuiz(String id, String status) {
    return quizProvider.listMyQuiz(id, status);
  }

  Future<Response> detail(String id) {
    return quizProvider.detail(id);
  }

  Future<Response> simpanJawaban(SimpanJawabanModel body) {
    return quizProvider.simpanJawaban(body);
  }
}
