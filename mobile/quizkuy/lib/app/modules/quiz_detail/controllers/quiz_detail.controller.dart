import 'dart:convert';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:quizkuy/app/data/model/quiz.model.dart';
import 'package:quizkuy/app/data/repository/quiz.repository.dart';

class QuizDetailController extends GetxController {
  final QuizRepository quizRepository = Get.find();
  final GetStorage box = Get.find();

  Rx<bool> isLoading = Rx<bool>(false);
  Rx<QuizModel> quiz = Rx<QuizModel>();

  @override
  void onInit() async {
    super.onInit();
    fetchData();
  }

  void fetchData() async {
    isLoading.value = true;
    var response = await quizRepository.detail(Get.arguments['quiz_id']);
    var jsonResponse = response.body['data'];
    quiz.value = QuizModel.fromJson(jsonResponse);
    isLoading.value = false;
    box.write('QUIZ_MODEL', json.encode(quiz.value));
  }
}
