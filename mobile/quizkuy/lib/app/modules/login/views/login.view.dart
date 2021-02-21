import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:quizkuy/app/global_widgets/app_version/app_version.dart';
import 'package:quizkuy/app/global_widgets/forms/circle_button.widget.dart';
import 'package:quizkuy/app/global_widgets/forms/input.widget.dart';
import 'package:quizkuy/app/global_widgets/forms/input_password.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/bouncing_layout.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/logo_header.widget.dart';

import 'package:quizkuy/app/modules/login/controllers/login.controller.dart';
import 'package:quizkuy/app/routes/app_pages.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

class LoginView extends GetView<LoginController> {
  final LoginController c = Get.find();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ThemeColors.PRIMARY,
      body: BouncingLayout(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            LogoHeader(title: 'Silahkan Login terlebih dahulu!'),
            Input(
              icon: Icons.mail_outline,
              label: 'Email',
              controller: c.emailController,
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(
              height: 15,
            ),
            InputPassword(
              icon: Icons.lock_outline,
              label: 'Password',
              controller: c.passwordController,
            ),
            SizedBox(
              height: 25,
            ),
            Obx(
              () => CircleButton(
                icon: Icons.arrow_forward,
                isLoading: c.isLoading.value,
                onPressed: () {
                  c.login();
                  FocusScope.of(context).unfocus();
                },
              ),
            ),
            SizedBox(
              height: 25,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Belum punya akun? ',
                  style: ThemeTextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w200,
                  ),
                ),
                Material(
                  color: Colors.transparent,
                  child: InkWell(
                    child: Padding(
                      padding: EdgeInsets.all(5),
                      child: Text(
                        'Daftar Sekarang',
                        style: ThemeTextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    onTap: () => Get.toNamed(Routes.REGISTER),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      bottomSheet: AppVersion(),
    );
  }
}
