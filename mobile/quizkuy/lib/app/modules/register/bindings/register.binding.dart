import 'package:get/get.dart';
import 'package:quizkuy/app/data/repository/siswa.repository.dart';

import 'package:quizkuy/app/modules/register/controllers/register.controller.dart';
import 'package:quizkuy/app/data/provider/siswa.provider.dart';

import 'package:quizkuy/app/data/repository/kelas.repository.dart';
import 'package:quizkuy/app/data/provider/kelas.provider.dart';

class RegisterBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<RegisterController>(
      () => RegisterController(),
    );

    Get.lazyPut<SiswaProvider>(
      () => SiswaProvider(),
    );

    Get.lazyPut<SiswaRepository>(
      () => SiswaRepository(),
    );

    Get.lazyPut<KelasProvider>(
      () => KelasProvider(),
    );

    Get.lazyPut<KelasRepository>(
      () => KelasRepository(),
    );
  }
}
