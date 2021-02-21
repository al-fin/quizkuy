import 'package:quizkuy/app/data/provider/kelas.provider.dart';
import 'package:get/get.dart';

class KelasRepository {
  final KelasProvider kelasProvider = Get.find();

  Future<Response> list() {
    return kelasProvider.list();
  }
}
