import 'package:get/get.dart';

import 'package:quizkuy/app/modules/onboarding/controllers/onboarding.controller.dart';

class OnboardingBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<OnboardingController>(
      () => OnboardingController(),
    );
  }
}
