import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_statusbar_manager/flutter_statusbar_manager.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:quizkuy/app/data/model/jawaban.model.dart';
import 'package:quizkuy/app/data/model/quiz.model.dart';
import 'package:quizkuy/app/data/model/simpan_jawaban.model.dart';
import 'package:quizkuy/app/data/model/siswa.model.dart';
import 'package:quizkuy/app/data/model/soal.model.dart';
import 'package:quizkuy/app/data/repository/quiz.repository.dart';
import 'package:quizkuy/app/data/repository/siswa.repository.dart';
import 'package:quizkuy/app/utils/lock_screen.utils.dart';

class MengerjakanQuizController extends SuperController {
  final GetStorage box = Get.find();
  final QuizRepository quizRepository = Get.find();
  final SiswaRepository siswaRepository = Get.find();

  int endTime;
  QuizModel quiz;

  SiswaModel siswa;
  Rx<bool> isLoading = Rx<bool>(false);
  Rx<int> no = Rx<int>(1);
  Rx<List<JawabanModel>> jawaban = Rx<List<JawabanModel>>([]);

  SoalModel get currentSoal => quiz.soal[no.value - 1];

  JawabanModel get currentJawaban =>
      jawaban.value.singleWhere((item) => item.no == currentSoal.no,
          orElse: () => JawabanModel(
              no: currentSoal.no,
              jawaban: '',
              controller: TextEditingController()));

  MengerjakanQuizController() {
    siswa = SiswaModel.fromJson(box.read('PROFILE'));

    FlutterStatusbarManager.setHidden(
      true,
      animation: StatusBarAnimation.SLIDE,
    );
    quiz = QuizModel.fromMap(json.decode(box.read('QUIZ_MODEL')));

    if (box.hasData('NO')) {
      no.value = box.read('NO');
    }

    if (box.hasData('JAWABAN') && quiz.jenisSoal == 'PILIHAN GANDA') {
      jawaban.value = List<JawabanModel>.from(
        json
            .decode(box.read('JAWABAN'))
            .map((item) => JawabanModel.fromMap(item))
            .toList(),
      );
    } else {
      jawaban.value = quiz.soal
          .map(
            (item) => JawabanModel(
              no: item.no,
              jawaban: '',
              controller: TextEditingController(),
            ),
          )
          .toList();
    }

    endTime = box.read('WAKTU_SELESAI');
  }

  void handleJawab(String value) {
    final index = jawaban.value.indexWhere((item) => item.no == currentSoal.no);
    print('INDEX:');
    print(index);
    if (index == -1) {
      jawaban.value.add(JawabanModel(no: currentSoal.no, jawaban: value));
    } else {
      jawaban.value[index] = JawabanModel(no: currentSoal.no, jawaban: value);
    }
    jawaban.refresh();
    print('JAWABAN:');
    print(json.encode(jawaban.value[0]));
    box.write('JAWABAN', json.encode(jawaban.value));
  }

  Future<bool> simpanJawaban() async {
    isLoading.value = true;
    var response = await quizRepository.simpanJawaban(SimpanJawabanModel(
      quizId: quiz.id,
      siswaId: siswa.id,
      jawaban: List<JawabanModel>.from(
        jawaban.value.map(
          (item) => JawabanModel(
            no: item.no,
            jawaban: quiz.jenisSoal == "PILIHAN GANDA"
                ? item.jawaban
                : '${item?.controller?.text}',
          ),
        ),
      ),
    ));
    isLoading.value = false;
    if (response.statusCode == 200) {
      box.remove('SEDANG_MENGERJAKAN');
      box.remove('WAKTU_SELESAI');
      box.remove('JAWABAN');
      box.remove('NO');
      Get.back();
      return Future.value(true);
    } else {
      return Future.value(false);
    }
  }

  @override
  void onReady() async {
    var response = await siswaRepository.checkStatus(siswa.id);
    if (response.body['data']['status'] == 'TERKUNCI') {
      lockScreen();
    }
  }

  @override
  void onPaused() async {
    print('=== PAUSED ===');
    final terkunci = box.hasData('TERKUNCI');
    if (!terkunci && !Get.isDialogOpen) {
      await box.write('TERKUNCI', true);
      lockScreen();
      siswaRepository.changeStatus(siswa.id, 'TERKUNCI');
    }
  }

  @override
  void onDetached() {}
  @override
  void onInactive() {}
  @override
  void onResumed() {}
}
