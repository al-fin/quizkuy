import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:quizkuy/app/global_widgets/layouts/bouncing_layout.widget.dart';
import 'package:quizkuy/app/global_widgets/white_tooltip/white_tooltip.widget.dart';
import 'package:quizkuy/app/modules/home/controllers/home.controller.dart';
import 'package:quizkuy/app/modules/home/views/widgets/home_appbar/home_appbar.dart';
import 'package:quizkuy/app/modules/home/views/widgets/quiz_card/loading_quiz_card.dart';
import 'package:quizkuy/app/modules/home/views/widgets/quiz_card/quiz_card.dart';
import 'package:quizkuy/app/routes/app_pages.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';
import 'package:quizkuy/app/utils/confirm.utils.dart';

const List<String> QUIZ_STATUS = [
  'ALL',
  'BELUM_DIKERJAKAN',
  'BELUM_DIMULAI',
  'SUDAH_DIKERJAKAN',
];

class HomeView extends GetView<HomeController> {
  final HomeController c = Get.find();

  void handleLogout() {
    confirm(
      message: 'Apakah kamu yakin ingin logout?',
      onConfirm: c.logout,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(85),
        child: Obx(
          () => HomeAppbar(
            name:
                'Hai, ${c.siswa.value.nama.split(' ')[0].toLowerCase() == 'muhammad' ? c.siswa.value.nama.split(' ')[1] : c.siswa.value.nama.split(' ')[0]}',
            buttonText: 'Edit Profile',
            onButtonTap: () => Get.toNamed(Routes.PROFILE),
            handleLogout: handleLogout,
          ),
        ),
      ),
      body: Stack(
        children: [
          RefreshIndicator(
            onRefresh: () async {
              c.fetchData();
            },
            child: Container(
              decoration: BoxDecoration(
                color: ThemeColors.PRIMARY,
                borderRadius: BorderRadius.vertical(
                  top: Radius.circular(20),
                ),
              ),
              child: BouncingLayout(
                child: Obx(
                  () => !c.isLoading.value
                      ? c.listMyQuiz.value.length > 0
                          ? _buildQuizCard()
                          : _buildEmptyData()
                      : _buildLoadingQuizCard(),
                ),
              ),
            ),
          ),
          Positioned(
            height: 50,
            width: Get.width,
            left: 0,
            bottom: 0,
            child: CurvedNavigationBar(
              height: 50,
              animationDuration: Duration(milliseconds: 250),
              backgroundColor: Colors.transparent,
              items: [
                WhiteTooltip(
                  message: 'Semua',
                  child: Icon(
                    Icons.apps,
                    size: 30,
                    color: Colors.blue,
                  ),
                ),
                WhiteTooltip(
                  message: 'Belum Dikerjakan',
                  child: Icon(
                    Icons.help_outline,
                    size: 30,
                    color: Colors.orange,
                  ),
                ),
                WhiteTooltip(
                  message: 'Belum Dimulai',
                  child: Icon(
                    Icons.alarm_off,
                    size: 30,
                    color: Colors.grey,
                  ),
                ),
                WhiteTooltip(
                  message: 'Sudah Dikerjakan',
                  child: Icon(
                    Icons.check_circle_outline,
                    size: 30,
                    color: Colors.green,
                  ),
                ),
              ],
              onTap: (index) {
                print(index);
                c.quizStatus.value = QUIZ_STATUS[index];
                c.fetchData();
              },
            ),
          ),
        ],
      ),
    );
  }

  Column _buildQuizCard() {
    return Column(
      children: c.listMyQuiz.value
          .map(
            (item) => QuizCard(
                title: item.nama,
                contents: [
                  'Jenis Soal : ${item.jenisSoal}',
                  'Jumlah Soal : ${item.jumlahSoal}',
                  'Durasi : ${item.durasi} Menit',
                  'Tanggal : ${item.tanggal}'
                ],
                code: item.kode,
                status: item.status,
                nilai: item.nilai,
                rank: item.rank,
                tampilkanNilai: item.tampilkanNilai,
                onDetailTap: () {
                  Get.toNamed(
                    Routes.QUIZ_DETAIL,
                    arguments: {
                      'quiz_id': item.id,
                    },
                  );
                }),
          )
          .toList(),
    );
  }

  Column _buildLoadingQuizCard() {
    return Column(
      children: [
        LoadingQuizCard(),
        LoadingQuizCard(),
      ],
    );
  }

  Column _buildEmptyData() {
    return Column(
      children: [
        SizedBox(
          height: 50,
        ),
        Lottie.asset(
          'assets/lottie-files/empty-box.json',
          repeat: false,
          width: 250,
          height: 250,
          fit: BoxFit.fill,
        ),
        Text(
          'Belum ada data!',
          style: ThemeTextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 18,
            color: Colors.white,
          ),
        ),
        Text(
          'Pull down untuk me-refresh aplikasi!',
          textAlign: TextAlign.center,
          style: ThemeTextStyle(
            fontWeight: FontWeight.w300,
            fontSize: 16,
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}
