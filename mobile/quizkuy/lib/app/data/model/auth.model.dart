import 'package:meta/meta.dart';

class AuthModel {
  final String email;

  final String password;

  AuthModel({
    @required this.email,
    @required this.password,
  });

  factory AuthModel.fromJson(Map<String, dynamic> item) {
    return AuthModel(
      email: item['email'],
      password: item['password'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'email': this.email,
      'password': this.password,
    };
  }
}
