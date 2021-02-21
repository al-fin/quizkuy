import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:quizkuy/app/global_widgets/card_list/card_list.widget.dart';
import 'package:quizkuy/app/global_widgets/card_list/loading_card_list.widget.dart';
import 'package:quizkuy/app/global_widgets/forms/button.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/bouncing_layout.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/white_app_bar.widget.dart';
import 'package:quizkuy/app/global_widgets/white_bottom_sheet/white_bottom_sheet.dart';
import 'package:quizkuy/app/modules/quiz_detail/controllers/quiz_detail.controller.dart';
import 'package:quizkuy/app/routes/app_pages.dart';

import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/utils/confirm.utils.dart';

class QuizDetailView extends GetView<QuizDetailController> {
  final QuizDetailController c = Get.find();

  void mulaiMengerjakan() {
    confirm(
      confirmButtonColor: ThemeColors.ACCENT,
      message: 'Apakah kamu yakin ingin mengerjakan Quiz sekarang?',
      onConfirm: () {
        c.box.write('SEDANG_MENGERJAKAN', true);
        c.box.write(
          'WAKTU_SELESAI',
          DateTime.now().millisecondsSinceEpoch +
              1000 * (c.quiz.value.durasi * 60),
        );
        Get.offAllNamed(Routes.MENGERJAKAN_QUIZ);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(50),
        child: Obx(
          () => WhiteAppBar(
            title: c.isLoading.value ? 'Loading...' : c.quiz.value.nama,
          ),
        ),
      ),
      backgroundColor: ThemeColors.PRIMARY,
      body: BouncingLayout(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Obx(
              () => !c.isLoading.value
                  ? CardList(
                      title: 'Informasi Quiz',
                      items: [
                        'Nama Quiz : ${c.quiz.value.nama}',
                        'Kode Quiz : ${c.quiz.value.kode}',
                        'Durasi : ${c.quiz.value.durasi} Menit',
                        'Tanggal : ${c.quiz.value.tanggal}',
                        'Kelas : ${c.quiz.value.kelas}',
                      ],
                    )
                  : LoadingCardList(title: 'Detail Quiz', itemCount: 5),
            ),
            SizedBox(
              height: 20,
            ),
            Obx(
              () => !c.isLoading.value
                  ? CardList(
                      title: 'Informasi Soal',
                      items: [
                        'Pelajaran : ${c.quiz.value.pelajaran}',
                        'Jenis Soal : ${c.quiz.value.jenisSoal}',
                        'Jumlah Soal : ${c.quiz.value.jumlahSoal}',
                      ],
                    )
                  : LoadingCardList(title: 'Detail Quiz', itemCount: 3),
            ),
            SizedBox(
              height: 20,
            ),
            CardList(
              headerTextColor: Colors.grey[700],
              headerBackgroundColor: Colors.grey[300],
              title: 'Tata Tertib',
              items: [
                '1. Setiap peserta hanya dapat mengerjakan soal 1 kali, dan tidak ada pengerjaan ulang atau perbaikan',
                '2. Peserta harus mempersiapkan perangkat yang digunakan dan sudah terkoneksi dengan internet 10 menit sebelum waktu Quiz dimulai.',
                '3. Perhatikan countdown waktu di sebelah atas, apabila waktu telah habis, anda tidak bisa lanjut mengerjakan Quiz!',
                '4. Dilarang berkomunikasi pribadi dalam bentuk apapun!',
                '5. Dilarang mengambil gambar atau merekam tampilan soal',
                '6. Dilarang membuka aplikasi lain, atau akun anda akan terkunci! 😛'
              ],
            ),
            SizedBox(
              height: 70,
            ),
          ],
        ),
      ),
      bottomSheet: WhiteBottomSheet(
        child: Obx(
          () => Button(
            textColor: Colors.white,
            backgroundColor: ThemeColors.ACCENT,
            text: 'Mulai Mengerjakan',
            endIcon: Icons.arrow_forward,
            onPressed: c.isLoading.value ? null : mulaiMengerjakan,
          ),
        ),
      ),
    );
  }
}
