import 'package:get/get_connect/connect.dart';
import 'package:get/get.dart';
import 'package:quizkuy/app/data/model/simpan_jawaban.model.dart';
import 'package:quizkuy/app/data/provider/config/api.provider.dart';

const prefix = '/api/quiz';

class QuizProvider extends ApiProvider {
  Future<Response> listMyQuiz(String id, String status) {
    return get('$prefix/my_quiz/$id', query: {
      'status': status,
    });
  }

  Future<Response> detail(String id) {
    return get('$prefix/$id');
  }

  Future<Response> simpanJawaban(SimpanJawabanModel body) {
    return post('$prefix/simpan_jawaban', body.toJson());
  }
}
