import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:quizkuy/app/data/model/my_quiz.model.dart';
import 'package:quizkuy/app/data/model/siswa.model.dart';
import 'package:quizkuy/app/data/repository/quiz.repository.dart';
import 'package:quizkuy/app/data/repository/siswa.repository.dart';
import 'package:quizkuy/app/routes/app_pages.dart';
import 'package:quizkuy/app/utils/lock_screen.utils.dart';
import 'package:quizkuy/app/utils/notification.utils.dart';

class HomeController extends SuperController {
  final GetStorage box = Get.find();
  final QuizRepository quizRepository = Get.find();
  final SiswaRepository siswaRepository = Get.find();

  Rx<SiswaModel> siswa = Rx<SiswaModel>();
  Rx<bool> isLoading = Rx<bool>(false);
  Rx<List<MyQuizModel>> listMyQuiz = Rx<List<MyQuizModel>>([]);
  Rx<String> quizStatus = Rx<String>('ALL');

  HomeController() {
    print('KEYS:');
    print(box.getKeys());
    try {
      siswa.value = SiswaModel.fromJson(box.read('PROFILE'));

      box.listenKey('PROFILE', (value) {
        siswa.value = SiswaModel.fromJson(value);
      });
    } catch (err) {
      print(err);
    }
  }

  void fetchData() async {
    isLoading.value = true;
    print('STATUS:');
    print(quizStatus.value);
    var response =
        await quizRepository.listMyQuiz(siswa.value.id, quizStatus.value);
    var jsonResponse = response.body['data'];
    if (response.body['quiz_status'] == quizStatus.value) {
      listMyQuiz.value = List<MyQuizModel>.from(
        jsonResponse.map((item) => MyQuizModel.fromJson(item)),
      );
    }
    isLoading.value = false;
  }

  void logout() {
    box.erase().then((_) {
      Get.offAllNamed(Routes.LOGIN);
    });
    sendNotification(message: 'Logout berhasil');
  }

  @override
  void onInit() async {
    super.onInit();
    this.fetchData();
  }

  @override
  void onReady() async {
    var response = await siswaRepository.checkStatus(siswa.value.id);
    if (response.body['data']['status'] == 'TERKUNCI') {
      lockScreen();
    }
  }

  @override
  void onPaused() async {}
  @override
  void onDetached() {}
  @override
  void onInactive() {}
  @override
  void onResumed() {}
}
