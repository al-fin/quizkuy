import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:quizkuy/app/data/provider/siswa.provider.dart';
import 'package:quizkuy/app/data/repository/siswa.repository.dart';

Bindings globalBinding = BindingsBuilder(() {
  Get.put<GetStorage>(
    GetStorage(),
  );

  Get.put<SiswaProvider>(
    SiswaProvider(),
  );

  Get.put<SiswaRepository>(
    SiswaRepository(),
  );
});
