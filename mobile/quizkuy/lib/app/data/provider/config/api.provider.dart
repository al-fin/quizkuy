import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:get/get_connect/connect.dart';
import 'package:get_storage/get_storage.dart';
import 'package:get/get.dart';
import 'package:quizkuy/app/constants/enums/enums.dart';
import 'package:quizkuy/app/routes/app_pages.dart';
import 'package:quizkuy/app/utils/notification.utils.dart';

class ApiProvider extends GetConnect {
  final GetStorage box = Get.find();

  void logger(response) {
    print('STATUS CODE :');
    print(response.statusCode);
    print('BODY :');
    print(json.encode(response.body));
  }

  @override
  void onInit() {
    httpClient.baseUrl = env['BASE_URL'];

    httpClient.addRequestModifier((request) {
      request.headers['token'] = box.read('TOKEN');
      return request;
    });

    httpClient.addResponseModifier((request, response) {
      this.logger(response);

      switch (response.statusCode) {
        case 200:
          break;
        case 500:
          sendNotification(
            title: 'Server sedang error!',
            message: 'Tunggu beberapa saat dan coba lagi!',
            variant: Variant.DANGER,
          );
          break;
        case 400:
          sendNotification(
            message: response.body['message'],
            variant: Variant.DANGER,
          );
          break;
        case 401:
          box.erase().then((_) {
            Get.offAllNamed(Routes.LOGIN);
          });
          sendNotification(
            title: 'Session Expired!',
            message: 'Silahkan login ulang!',
            variant: Variant.DANGER,
          );
          break;
        default:
          sendNotification(
            title: 'Gagal terhubung dengan Server!',
            message: 'Status Code : ${response.statusCode}',
            variant: Variant.DANGER,
          );
      }

      return response;
    });
  }
}
