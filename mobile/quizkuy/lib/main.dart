import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:get/get.dart';
import 'package:intl/date_symbol_data_local.dart';

import 'package:quizkuy/app/theme/app.dart';
import 'app/routes/app_pages.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as DotEnv;

import 'global_bindings.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await DotEnv.load(fileName: ".env");
  await GetStorage.init();
  await GetStorage.init('config');
  await initializeDateFormatting('id_ID', null);

  runApp(
    GetMaterialApp(
      title: "Quiz Kuy",
      initialRoute: AppPages.INITIAL,
      getPages: AppPages.routes,
      theme: theme,
      defaultTransition: Transition.cupertino,
      initialBinding: globalBinding,
      debugShowCheckedModeBanner: false,
    ),
  );
}
