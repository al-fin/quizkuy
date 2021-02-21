import 'package:get/get.dart';
import 'package:quizkuy/app/data/provider/quiz.provider.dart';
import 'package:quizkuy/app/data/repository/quiz.repository.dart';

import 'package:quizkuy/app/modules/home/controllers/home.controller.dart';

class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<HomeController>(
      () => HomeController(),
    );

    Get.lazyPut<QuizProvider>(
      () => QuizProvider(),
    );

    Get.lazyPut<QuizRepository>(
      () => QuizRepository(),
    );
  }
}
