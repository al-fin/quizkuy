import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:quizkuy/app/data/model/kelas.model.dart';
import 'package:quizkuy/app/global_widgets/app_version/app_version.dart';
import 'package:quizkuy/app/global_widgets/forms/autocomplete.widget.dart'
    as Autocomplete;
import 'package:quizkuy/app/global_widgets/forms/button.widget.dart';
import 'package:quizkuy/app/global_widgets/forms/input.widget.dart';
import 'package:quizkuy/app/global_widgets/forms/input_password.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/bouncing_layout.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/logo_header.widget.dart';

import 'package:quizkuy/app/modules/register/controllers/register.controller.dart';
import 'package:quizkuy/app/routes/app_pages.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

class RegisterView extends GetView<RegisterController> {
  final RegisterController c = Get.find();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ThemeColors.PRIMARY,
      body: BouncingLayout(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            LogoHeader(title: 'Silahkan lengkapi form berikut :'),
            Input(
              label: 'Email',
              controller: c.emailController,
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(
              height: 15,
            ),
            Input(
              label: 'Nama',
              controller: c.namaController,
            ),
            SizedBox(
              height: 15,
            ),
            Input(
              label: 'NISN',
              controller: c.nisnController,
              keyboardType: TextInputType.number,
            ),
            SizedBox(
              height: 15,
            ),
            Obx(
              () => Autocomplete.Autocomplete<KelasModel>(
                label: 'Kelas',
                controller: c.kelasController,
                options: c.optionsKelas.value,
                onSuggestionSelected: (value) {
                  print('VALUE : ');
                  print(value);
                  c.kelas.value = value;
                },
              ),
            ),
            SizedBox(
              height: 15,
            ),
            InputPassword(
              label: 'Password',
              controller: c.passwordController,
            ),
            SizedBox(
              height: 25,
            ),
            Obx(
              () => Button(
                text: 'DAFTAR',
                isLoading: c.isLoading.value,
                onPressed: () {
                  c.register();
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
                  'Sudah punya akun? ',
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
                        'Login',
                        style: ThemeTextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    onTap: () => Get.offAllNamed(Routes.LOGIN),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 50,
            ),
          ],
        ),
      ),
      bottomSheet: AppVersion(),
    );
  }
}
