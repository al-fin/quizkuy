part of 'app_pages.dart';

final GetStorage box = Get.find<GetStorage>();

class AuthMiddleware extends GetMiddleware {
  AuthMiddleware() : super(priority: 1);

  RouteSettings redirect(String route) {
    final token = box.hasData('TOKEN');

    return token ? null : RouteSettings(name: _Paths.LOGIN);
  }
}

class NotLoggedInMiddleware extends GetMiddleware {
  NotLoggedInMiddleware() : super(priority: 1);

  RouteSettings redirect(String route) {
    final token = box.hasData('TOKEN');
    final onboardingDone = config.hasData('ONBOARDING_DONE');

    return !onboardingDone
        ? RouteSettings(name: _Paths.ONBOARDING)
        : !token
            ? null
            : RouteSettings(name: _Paths.HOME);
  }
}

class SedangMengerjakanMiddleware extends GetMiddleware {
  SedangMengerjakanMiddleware() : super(priority: 2);

  RouteSettings redirect(String route) {
    final sedangMengerjakan = box.hasData('SEDANG_MENGERJAKAN');
    final token = box.hasData('TOKEN');

    return !token
        ? RouteSettings(name: _Paths.LOGIN)
        : token && !sedangMengerjakan
            ? null
            : RouteSettings(name: _Paths.MENGERJAKAN_QUIZ);
  }
}
