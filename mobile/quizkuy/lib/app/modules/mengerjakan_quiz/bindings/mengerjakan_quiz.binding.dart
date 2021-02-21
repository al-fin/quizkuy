import 'package:get/get.dart';

import 'package:quizkuy/app/data/provider/quiz.provider.dart';
import 'package:quizkuy/app/data/repository/quiz.repository.dart';
import 'package:quizkuy/app/modules/mengerjakan_quiz/controllers/mengerjakan_quiz.controller.dart';

class MengerjakanQuizBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<MengerjakanQuizController>(
      () => MengerjakanQuizController(),
    );

    Get.lazyPut<QuizProvider>(
      () => QuizProvider(),
    );

    Get.lazyPut<QuizRepository>(
      () => QuizRepository(),
    );
  }
}
