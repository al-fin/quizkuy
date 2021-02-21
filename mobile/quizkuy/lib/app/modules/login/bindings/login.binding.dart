import 'package:get/get.dart';
import 'package:quizkuy/app/data/repository/siswa.repository.dart';

import 'package:quizkuy/app/modules/login/controllers/login.controller.dart';
import 'package:quizkuy/app/data/provider/siswa.provider.dart';

class LoginBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<LoginController>(
      () => LoginController(),
    );

    Get.lazyPut<SiswaProvider>(
      () => SiswaProvider(),
    );

    Get.lazyPut<SiswaRepository>(
      () => SiswaRepository(),
    );
  }
}
