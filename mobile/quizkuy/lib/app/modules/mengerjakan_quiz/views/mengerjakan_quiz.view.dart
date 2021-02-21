import 'package:dotted_line/dotted_line.dart';
import 'package:flutter/material.dart';
import 'package:flutter_statusbar_manager/flutter_statusbar_manager.dart';

import 'package:get/get.dart';
import 'package:flutter_countdown_timer/flutter_countdown_timer.dart';
import 'package:lottie/lottie.dart';
import 'package:quizkuy/app/constants/enums/enums.dart';
import 'package:quizkuy/app/global_widgets/forms/button.widget.dart';
import 'package:quizkuy/app/global_widgets/forms/input.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/bouncing_layout.widget.dart';
import 'package:quizkuy/app/global_widgets/soal_options/soal_options.dart';
import 'package:quizkuy/app/global_widgets/white_bottom_sheet/white_bottom_sheet.dart';
import 'package:quizkuy/app/modules/mengerjakan_quiz/controllers/mengerjakan_quiz.controller.dart';
import 'package:quizkuy/app/routes/app_pages.dart';

import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';
import 'package:quizkuy/app/utils/confirm.utils.dart';
import 'package:quizkuy/app/utils/notification.utils.dart';
import 'package:quizkuy/app/utils/show_loading.utils.dart';
import 'package:photo_view/photo_view.dart';

class MengerjakanQuizView extends GetView<MengerjakanQuizController> {
  final MengerjakanQuizController c = Get.find();

  void simpanJawaban() async {
    final success = await c.simpanJawaban();
    if (Get.isDialogOpen) {
      Get.back();
    }
    if (success) {
      showDialogSuccess();
    } else {
      sendNotification(
        message: 'Gagal mengirimkan jawaban!',
        variant: Variant.DANGER,
      );
      Get.back();
    }
  }

  void showDialogSuccess() {
    confirm(
      title: 'Berhasil',
      content: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Lottie.asset(
            'assets/lottie-files/check.json',
            repeat: false,
            width: 150,
          ),
          Text(
            'Terima kasih telah mengikuti Quiz, Jawabanmu sudah dikirimkan ke kami!',
            textAlign: TextAlign.center,
            style: ThemeTextStyle(
              fontSize: 14,
              color: ThemeColors.DARK,
            ),
          ),
        ],
      ),
      showCancelButton: false,
      confirmButtonColor: Colors.green,
      confirmButtonText: 'OKE',
      onConfirm: () {
        Get.offAllNamed(Routes.HOME);
        FlutterStatusbarManager.setHidden(
          false,
          animation: StatusBarAnimation.SLIDE,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(60),
        child: SafeArea(
          child: _buildAppBar(),
        ),
      ),
      backgroundColor: ThemeColors.PRIMARY,
      body: BouncingLayout(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildSoal(),
            SizedBox(
              height: 70,
            ),
          ],
        ),
      ),
      bottomSheet: _buildBottomSheet(),
    );
  }

  Container _buildSoal() {
    return Container(
      padding: EdgeInsets.all(20),
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            blurRadius: 6,
            offset: Offset(0, 6),
            color: Colors.black.withOpacity(0.15),
          )
        ],
      ),
      child: Obx(
        () => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (c.currentSoal.image != null)
              Column(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: Container(
                        height: 200,
                        width: double.infinity,
                        color: Colors.grey[300],
                        child: PhotoView(
                          minScale: PhotoViewComputedScale.covered,
                          imageProvider: NetworkImage(
                            c.currentSoal.image,
                            scale: 1,
                          ),
                        )),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                ],
              ),
            Text(
              c.currentSoal.pertanyaan,
              style: ThemeTextStyle(
                color: Colors.grey[800],
                fontWeight: FontWeight.w300,
                fontSize: 16,
              ),
            ),
            SizedBox(
              height: 10,
            ),
            if (c.quiz.jenisSoal == 'PILIHAN GANDA')
              SoalOptions(
                value: c.currentJawaban.jawaban,
                handleChange: (value) {
                  print('ON CHANGE');
                  print(value);
                  c.handleJawab(value);
                },
                buttonLables: [
                  c.currentSoal.a,
                  c.currentSoal.b,
                  c.currentSoal.c,
                  c.currentSoal.d,
                  c.currentSoal.e,
                ],
                buttonValues: [
                  'a',
                  'b',
                  'c',
                  'd',
                  'e',
                ],
              ),
            if (c.quiz.jenisSoal == 'ESSAY')
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  DottedLine(
                    direction: Axis.horizontal,
                    lineLength: double.infinity,
                    dashColor: Colors.grey[300],
                    dashGapColor: Colors.transparent,
                    dashLength: 6.0,
                    dashRadius: 4.0,
                    dashGapLength: 6.0,
                    dashGapRadius: 0.0,
                    lineThickness: 2.0,
                  ),
                  SizedBox(height: 10),
                  Input(
                    variant: 'outlined',
                    label: 'Jawaban :',
                    placeholder: 'Tulis jawabanmu di sini...',
                    maxLines: 4,
                    controller: c.currentJawaban.controller,
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }

  Container _buildAppBar() {
    return Container(
      padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
      color: ThemeColors.DARK_BLUE,
      child: Column(
        children: [
          Text(
            c.quiz.nama,
            style: ThemeTextStyle(
              color: ThemeColors.LIGHT_BLUE,
              fontWeight: FontWeight.bold,
              fontSize: 20,
              height: 1.5,
            ),
          ),
          if (c.endTime != null)
            CountdownTimer(
              endTime: c.endTime,
              onEnd: () {
                if (c.box.hasData('SEDANG_MENGERJAKAN')) {
                  confirm(
                    title: 'Waktu Habis 😱',
                    message: 'Silahkan klik tombol "Kirimkan Jawaban" !',
                    showCancelButton: false,
                    confirmButtonText: 'Kirimkan Jawaban',
                    onConfirm: () {
                      Get.back();
                      showLoading();
                      simpanJawaban();
                    },
                  );
                }
              },
              widgetBuilder: (_, time) {
                return Container(
                  padding: EdgeInsets.fromLTRB(10, 5, 10, 5),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    '${(time?.hours ?? 0).toString().padLeft(2, "0")} : ${(time?.min ?? 0).toString().padLeft(2, "0")} : ${(time?.sec ?? 0).toString().padLeft(2, "0")}',
                    style: ThemeTextStyle(
                      color:
                          time?.min != null ? Colors.white : ThemeColors.DANGER,
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                      height: 1,
                    ),
                  ),
                );
              },
            ),
        ],
      ),
    );
  }

  Builder _buildBottomSheet() {
    return Builder(
      builder: (context) => WhiteBottomSheet(
        child: Obx(
          () => Row(
            children: [
              Flexible(
                flex: 1,
                fit: FlexFit.tight,
                child: c.no.value != 1
                    ? Button(
                        textColor: Colors.white,
                        backgroundColor: ThemeColors.ACCENT,
                        startIcon: Icons.arrow_back_ios,
                        onPressed: () {
                          FocusScope.of(context).requestFocus(new FocusNode());
                          c.no.value--;
                          c.box.write('NO', c.no.value);
                        },
                      )
                    : SizedBox.shrink(),
              ),
              SizedBox(
                width: 10,
              ),
              Flexible(
                flex: 2,
                fit: FlexFit.tight,
                child: Button(
                  textColor: Colors.grey[800],
                  backgroundColor: Colors.grey[300],
                  text: 'No. ${c.no.value}',
                  onPressed: () {
                    FocusScope.of(context).requestFocus(new FocusNode());
                    Get.bottomSheet(
                      _buildDaftarSoal(),
                    );
                  },
                ),
              ),
              SizedBox(
                width: 10,
              ),
              Flexible(
                flex: 1,
                fit: FlexFit.tight,
                child: c.no.value < (c.quiz.jumlahSoal ?? 0)
                    ? Button(
                        textColor: Colors.white,
                        backgroundColor: ThemeColors.ACCENT,
                        endIcon: Icons.arrow_forward_ios,
                        onPressed: () {
                          FocusScope.of(context).requestFocus(new FocusNode());
                          c.no.value++;
                          c.box.write('NO', c.no.value);
                        },
                      )
                    : Button(
                        textColor: Colors.white,
                        backgroundColor: Colors.green,
                        endIcon: Icons.check,
                        onPressed: () {
                          FocusScope.of(context).requestFocus(new FocusNode());

                          confirm(
                            message:
                                'Apakah kamu yakin sudah mengisi semua soal dan memeriksa kembali jawabanmu?',
                            confirmButtonColor: Colors.green,
                            confirmButtonText: 'Ya',
                            onConfirm: () {
                              Get.back();
                              showLoading();
                              simpanJawaban();
                            },
                          );
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Column _buildDaftarSoal() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: EdgeInsets.only(top: 10),
          width: double.infinity,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(
              top: Radius.circular(15),
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 50,
                height: 5,
                margin: EdgeInsets.only(bottom: 10),
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(5),
                ),
              ),
              Text(
                'Daftar Soal',
                textAlign: TextAlign.center,
                style: ThemeTextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  color: Colors.grey[700],
                ),
              ),
            ],
          ),
        ),
        Container(
          color: Colors.white,
          padding: EdgeInsets.all(20),
          child: GridView.builder(
            shrinkWrap: true,
            itemCount: (c.quiz.jumlahSoal ?? 0),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 5,
            ),
            itemBuilder: (_, index) => Padding(
              padding: EdgeInsets.all(5),
              child: Builder(builder: (_) {
                final currentNo = index + 1;
                final sudahDikerjakan =
                    c.jawaban.value[index].jawaban.length > 0 ||
                        c.jawaban.value[index].controller.text.length > 0;

                return Button(
                  textColor: currentNo == c.no.value
                      ? Colors.white
                      : sudahDikerjakan
                          ? Colors.green
                          : Colors.grey[800],
                  backgroundColor: currentNo == c.no.value
                      ? ThemeColors.ACCENT
                      : sudahDikerjakan
                          ? Colors.green[100]
                          : Colors.grey[300],
                  text: '$currentNo',
                  onPressed: () {
                    if (currentNo != c.no.value) {
                      Get.back();
                      c.no.value = currentNo;
                      c.box.write('NO', c.no.value);
                    }
                  },
                );
              }),
            ),
          ),
        ),
      ],
    );
  }
}
