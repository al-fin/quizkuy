import 'package:get/get.dart';

import 'package:quizkuy/app/data/provider/quiz.provider.dart';
import 'package:quizkuy/app/data/repository/quiz.repository.dart';
import 'package:quizkuy/app/modules/quiz_detail/controllers/quiz_detail.controller.dart';

class QuizDetailBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<QuizDetailController>(
      () => QuizDetailController(),
    );

    Get.lazyPut<QuizProvider>(
      () => QuizProvider(),
    );

    Get.lazyPut<QuizRepository>(
      () => QuizRepository(),
    );
  }
}
