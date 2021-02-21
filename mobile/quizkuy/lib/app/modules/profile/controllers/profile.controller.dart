import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:quizkuy/app/data/model/kelas.model.dart';
import 'package:quizkuy/app/data/model/siswa.model.dart';
import 'package:quizkuy/app/data/repository/siswa.repository.dart';
import 'package:quizkuy/app/data/repository/kelas.repository.dart';
import 'package:quizkuy/app/constants/enums/enums.dart';
import 'package:quizkuy/app/utils/notification.utils.dart';

class ProfileController extends GetxController {
  final SiswaRepository siswaRepository = Get.find();
  final KelasRepository kelasRepository = Get.find();
  final GetStorage box = Get.find();

  Rx<bool> isLoading = Rx<bool>(false);
  Rx<KelasModel> kelas = Rx<KelasModel>();
  Rx<List<KelasModel>> optionsKelas = Rx<List<KelasModel>>([]);
  SiswaModel siswa;

  TextEditingController emailController = TextEditingController();
  TextEditingController namaController = TextEditingController();
  TextEditingController kelasController = TextEditingController();
  TextEditingController nisnController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  ProfileController() {
    siswa = SiswaModel.fromJson(box.read('PROFILE'));

    emailController.text = siswa.email;
    namaController.text = siswa.nama;
    kelasController.text = siswa.kelas;
    nisnController.text = siswa.nisn;

    kelas.value = KelasModel(
      id: siswa.kelasId,
      nama: siswa.kelas,
    );
  }

  @override
  void onInit() async {
    super.onInit();
    isLoading.value = true;
    var response = await kelasRepository.list();
    var jsonResponse = response.body['data'];

    optionsKelas.value = List<KelasModel>.from(
      jsonResponse.map((item) => KelasModel.fromJson(item)),
    );
    isLoading.value = false;
  }

  @override
  void onClose() {
    super.onClose();
    emailController?.dispose();
    namaController?.dispose();
    nisnController?.dispose();
    kelasController?.dispose();
    passwordController?.dispose();
  }

  bool validate() {
    bool isValid = false;

    if (GetUtils.isNullOrBlank(emailController.text) ||
        GetUtils.isNullOrBlank(namaController.text) ||
        GetUtils.isNullOrBlank(nisnController.text) ||
        GetUtils.isNullOrBlank(kelasController.text)) {
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

  void editProfile() async {
    if (this.validate()) {
      isLoading.value = true;
      var response = await siswaRepository.editProfile(
        siswa.id,
        SiswaModel(
          email: emailController.text,
          nama: namaController.text,
          nisn: nisnController.text,
          password: passwordController.text,
          kelasId: kelas.value.id,
        ),
      );
      if (response.statusCode == 200) {
        SiswaModel siswa = SiswaModel.fromJson(response.body['data']);
        box.write('PROFILE', siswa.toJson());
        sendNotification(
          message: 'Profile kamu berhasil diedit!',
        );
      }
      isLoading.value = false;
    }
  }
}
