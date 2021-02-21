import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:quizkuy/app/data/model/auth.model.dart';
import 'package:quizkuy/app/data/model/siswa.model.dart';
import 'package:quizkuy/app/data/repository/siswa.repository.dart';
import 'package:quizkuy/app/constants/enums/enums.dart';
import 'package:quizkuy/app/routes/app_pages.dart';
import 'package:quizkuy/app/utils/notification.utils.dart';

class LoginController extends GetxController {
  final SiswaRepository siswaRepository = Get.find();
  final GetStorage box = Get.find();

  RxBool isLoading = RxBool(false);

  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  void onClose() {
    super.onClose();
    emailController?.dispose();
    passwordController?.dispose();
  }

  bool validate() {
    bool isValid = false;

    if (GetUtils.isNullOrBlank(emailController.text) ||
        GetUtils.isNullOrBlank(passwordController.text)) {
      sendNotification(
        message: 'Harap lengkapi semua form!',
        variant: Variant.WARNING,
      );
    } else if (!GetUtils.isEmail(emailController.text)) {
      sendNotification(
        message: 'Format email tidak valid!',
        variant: Variant.WARNING,
      );
    } else {
      isValid = true;
    }

    return isValid;
  }

  void login() async {
    if (this.validate()) {
      isLoading.value = true;
      var response = await siswaRepository.login(
        AuthModel(
          email: emailController.text,
          password: passwordController.text,
        ),
      );
      print('RESPONSE :');
      print(response.body);
      if (response.statusCode == 200) {
        SiswaModel siswa = SiswaModel.fromJson(response.body['data']);
        box.write('PROFILE', siswa.toJson());
        box.write('TOKEN', response.body['data']['token']);
        Get.offAllNamed(Routes.HOME);
        sendNotification(message: 'Login berhasil!');
      }
      isLoading.value = false;
    }
  }
}
