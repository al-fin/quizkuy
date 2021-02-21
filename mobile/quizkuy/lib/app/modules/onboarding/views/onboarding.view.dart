import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:lottie/lottie.dart';

import 'package:quizkuy/app/modules/onboarding/controllers/onboarding.controller.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

class OnboardingView extends GetView<OnboardingController> {
  final OnboardingController c = Get.find();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IntroductionScreen(
        onDone: c.onDone,
        showSkipButton: true,
        showNextButton: true,
        skip: Text("Skip",
            style: ThemeTextStyle(
              color: Colors.grey,
            )),
        next: Text(
          "Next",
          style: ThemeTextStyle(
            fontWeight: FontWeight.w600,
            color: ThemeColors.PRIMARY,
          ),
        ),
        done: Row(
          children: [
            Text(
              "Mulai",
              style: ThemeTextStyle(
                fontWeight: FontWeight.w600,
                color: ThemeColors.PRIMARY,
              ),
            ),
            SizedBox(
              width: 10,
            ),
            Icon(
              Icons.arrow_forward,
              color: ThemeColors.PRIMARY,
            ),
          ],
        ),
        dotsDecorator: const DotsDecorator(
          size: Size(10.0, 10.0),
          color: Color(0xFFBDBDBD),
          activeSize: Size(22.0, 10.0),
          activeShape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(25.0)),
          ),
        ),
        skipFlex: 0,
        nextFlex: 0,
        pages: [
          _buildScreen(
            image: 'assets/lottie-files/berbasis-online.json',
            title: 'Berbasis Online',
            content: 'Kerjakan Quiz dari mana saja yang kamu mau.',
          ),
          _buildScreen(
            image: 'assets/lottie-files/penilaian-otomatis.json',
            title: 'Sistem Penilaian Otomatis',
            content:
                'Dapatkan nilai Quiz yang telah kamu kerjakan secara langsung.',
          ),
          _buildScreen(
            image: 'assets/lottie-files/lebih-aman.json',
            title: 'Aman',
            content:
                'Aplikasi akan terkunci secara otomatis apabila pengguna membuka aplikasi lain.',
          ),
        ],
      ),
    );
  }

  PageViewModel _buildScreen({
    image,
    title,
    content,
  }) {
    return PageViewModel(
      titleWidget: Text(
        title,
        style: ThemeTextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 24,
        ),
      ),
      bodyWidget: Text(
        content,
        textAlign: TextAlign.center,
        style: ThemeTextStyle(
          fontWeight: FontWeight.w300,
          color: Colors.grey,
          fontSize: 18,
        ),
      ),
      image: Center(
        child: Lottie.asset(
          image,
          repeat: true,
          width: double.infinity,
          fit: BoxFit.fill,
        ),
      ),
    );
  }
}
