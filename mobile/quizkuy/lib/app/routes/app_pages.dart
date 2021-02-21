import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:quizkuy/app/instances/config.dart';

import 'package:quizkuy/app/modules/home/bindings/home.binding.dart';
import 'package:quizkuy/app/modules/home/views/home.view.dart';
import 'package:quizkuy/app/modules/login/bindings/login.binding.dart';
import 'package:quizkuy/app/modules/login/views/login.view.dart';
import 'package:quizkuy/app/modules/mengerjakan_quiz/bindings/mengerjakan_quiz.binding.dart';
import 'package:quizkuy/app/modules/mengerjakan_quiz/views/mengerjakan_quiz.view.dart';
import 'package:quizkuy/app/modules/onboarding/bindings/onboarding.binding.dart';
import 'package:quizkuy/app/modules/onboarding/views/onboarding.view.dart';
import 'package:quizkuy/app/modules/profile/bindings/profile.binding.dart';
import 'package:quizkuy/app/modules/profile/views/profile.view.dart';
import 'package:quizkuy/app/modules/quiz_detail/bindings/quiz_detail.binding.dart';
import 'package:quizkuy/app/modules/quiz_detail/views/quiz_detail.view.dart';
import 'package:quizkuy/app/modules/register/bindings/register.binding.dart';
import 'package:quizkuy/app/modules/register/views/register.view.dart';

part 'app_routes.dart';
part 'middlewares.dart';

class AppPages {
  static const INITIAL = Routes.HOME;

  static final routes = [
    GetPage(
      name: _Paths.LOGIN,
      page: () => LoginView(),
      binding: LoginBinding(),
      middlewares: [
        NotLoggedInMiddleware(),
      ],
    ),
    GetPage(
      name: _Paths.REGISTER,
      page: () => RegisterView(),
      binding: RegisterBinding(),
      middlewares: [
        NotLoggedInMiddleware(),
      ],
    ),
    GetPage(
      name: _Paths.HOME,
      page: () => HomeView(),
      binding: HomeBinding(),
      middlewares: [
        AuthMiddleware(),
        SedangMengerjakanMiddleware(),
      ],
    ),
    GetPage(
      name: _Paths.PROFILE,
      page: () => ProfileView(),
      binding: ProfileBinding(),
      middlewares: [
        AuthMiddleware(),
        SedangMengerjakanMiddleware(),
      ],
    ),
    GetPage(
      name: _Paths.QUIZ_DETAIL,
      page: () => QuizDetailView(),
      binding: QuizDetailBinding(),
      middlewares: [
        AuthMiddleware(),
        SedangMengerjakanMiddleware(),
      ],
    ),
    GetPage(
      name: _Paths.MENGERJAKAN_QUIZ,
      page: () => MengerjakanQuizView(),
      binding: MengerjakanQuizBinding(),
      middlewares: [
        AuthMiddleware(),
      ],
    ),
    GetPage(
      name: _Paths.ONBOARDING,
      page: () => OnboardingView(),
      binding: OnboardingBinding(),
    ),
  ];
}
