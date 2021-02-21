import 'package:get/get.dart';
import 'package:quizkuy/app/instances/config.dart';
import 'package:quizkuy/app/routes/app_pages.dart';

class OnboardingController extends GetxController {
  void onDone() {
    config.write('ONBOARDING_DONE', true);
    Get.offAllNamed(Routes.LOGIN);
  }
}
