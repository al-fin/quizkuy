import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:quizkuy/app/data/model/kelas.model.dart';
import 'package:quizkuy/app/global_widgets/forms/autocomplete.widget.dart'
    as Autocomplete;
import 'package:quizkuy/app/global_widgets/forms/button.widget.dart';
import 'package:quizkuy/app/global_widgets/forms/input.widget.dart';
import 'package:quizkuy/app/global_widgets/forms/input_password.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/bouncing_layout.widget.dart';
import 'package:quizkuy/app/global_widgets/layouts/white_app_bar.widget.dart';

import 'package:quizkuy/app/modules/profile/controllers/profile.controller.dart';
import 'package:quizkuy/app/theme/colors.dart';

class ProfileView extends GetView<ProfileController> {
  final ProfileController c = Get.find();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(50),
        child: WhiteAppBar(
          title: 'Edit Profile',
        ),
      ),
      backgroundColor: ThemeColors.PRIMARY,
      body: BouncingLayout(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
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
                disabled: true,
                label: 'Kelas',
                controller: c.kelasController,
                options: c.optionsKelas.value,
                onSuggestionSelected: (value) {
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
                text: 'SIMPAN',
                isLoading: c.isLoading.value,
                onPressed: () {
                  c.editProfile();
                  FocusScope.of(context).unfocus();
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
