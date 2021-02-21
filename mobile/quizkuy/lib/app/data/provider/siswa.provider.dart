import 'package:get/get_connect/connect.dart';
import 'package:quizkuy/app/data/model/auth.model.dart';
import 'package:quizkuy/app/data/model/siswa.model.dart';
import 'package:get/get.dart';
import 'package:quizkuy/app/data/provider/config/api.provider.dart';

const prefix = '/api/siswa';

class SiswaProvider extends ApiProvider {
  Future<Response> login(AuthModel body) {
    print(body.toJson());
    return post('$prefix/login', body.toJson());
  }

  Future<Response> register(SiswaModel body) {
    print(body.toJson());
    return post('$prefix', body.toJson());
  }

  Future<Response> editProfile(String id, SiswaModel body) {
    print(body.toJson());
    return post('$prefix/edit/$id', body.toJson());
  }

  Future<Response> changeStatus(String id, String status) {
    return post('$prefix/update_status/$id', {'status': status});
  }

  Future<Response> checkStatus(String id) {
    return get('$prefix/check_status/$id');
  }
}
