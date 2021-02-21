import 'package:quizkuy/app/data/model/auth.model.dart';
import 'package:quizkuy/app/data/model/siswa.model.dart';
import 'package:quizkuy/app/data/provider/siswa.provider.dart';
import 'package:get/get.dart';

class SiswaRepository {
  final SiswaProvider siswaProvider = Get.find();

  Future<Response> login(AuthModel body) {
    return siswaProvider.login(body);
  }

  Future<Response> register(SiswaModel body) {
    return siswaProvider.register(body);
  }

  Future<Response> editProfile(String id, SiswaModel body) {
    return siswaProvider.editProfile(id, body);
  }

  Future<Response> changeStatus(String id, String status) {
    return siswaProvider.changeStatus(id, status);
  }

  Future<Response> checkStatus(String id) {
    return siswaProvider.checkStatus(id);
  }
}
