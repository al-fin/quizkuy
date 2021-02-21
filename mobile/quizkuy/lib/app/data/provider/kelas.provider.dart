import 'package:get/get_connect/connect.dart';
import 'package:get/get.dart';
import 'package:quizkuy/app/data/provider/config/api.provider.dart';

const prefix = '/api/kelas';

class KelasProvider extends ApiProvider {
  Future<Response> list() {
    return get('$prefix');
  }
}
