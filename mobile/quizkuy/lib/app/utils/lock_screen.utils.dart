import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:quizkuy/app/data/model/siswa.model.dart';
import 'package:quizkuy/app/data/repository/siswa.repository.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';
import 'package:quizkuy/app/utils/notification.utils.dart';
import 'package:quizkuy/app/utils/show_loading.utils.dart';

import 'confirm.utils.dart';

void lockScreen({lastCheck = ''}) {
  final GetStorage box = Get.find();
  final SiswaRepository siswaRepository = Get.find();

  confirm(
    title: 'Akun Terkunci',
    content: Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Image.asset(
          'assets/lock.jpg',
          height: 150,
        ),
        SizedBox(
          height: 20,
        ),
        Text(
          'Silahkan hubungi guru untuk membuka akunmu!',
          textAlign: TextAlign.center,
          style: ThemeTextStyle(
            fontSize: 14,
            color: ThemeColors.DARK,
          ),
        ),
        if (lastCheck != '')
          Text(
            'Terkahir dicek  $lastCheck',
            textAlign: TextAlign.center,
            style: ThemeTextStyle(
              fontSize: 10,
              color: Colors.grey,
            ),
          ),
      ],
    ),
    showCancelButton: false,
    confirmButtonText: 'Cek Status Akun',
    confirmButtonColor: ThemeColors.PRIMARY,
    onConfirm: () async {
      Get.back();
      showLoading();
      DateTime now = new DateTime.now();
      final _lastCheck =
          '${now.hour.toString().padLeft(2, "0")}:${now.minute.toString().padLeft(2, "0")}';

      final siswa = SiswaModel.fromJson(box.read('PROFILE'));
      var response = await siswaRepository.checkStatus(siswa.id);
      if (response.body['data']['status'] == 'TERVERIFIKASI') {
        Get.back();
        box.remove('TERKUNCI');
        sendNotification(message: 'Selamat, akunmu telah dibuka kembali!');
      } else {
        Get.back();
        lockScreen(lastCheck: _lastCheck);
      }
    },
  );
}
