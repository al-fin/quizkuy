import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:quizkuy/app/constants/enums/enums.dart';

void sendNotification({
  String title,
  String message,
  Variant variant = Variant.SUCCESS,
}) {
  IconData icon;
  Color backgroundColor;

  switch (variant) {
    case Variant.SUCCESS:
      icon = Icons.check_circle;
      backgroundColor = Colors.green;
      break;
    case Variant.INFO:
      icon = Icons.info;
      backgroundColor = Colors.blue;
      break;
    case Variant.WARNING:
      icon = Icons.warning;
      backgroundColor = Colors.orange;
      break;
    case Variant.DANGER:
      icon = Icons.cancel;
      backgroundColor = Colors.red;
      break;
  }
  Get.snackbar(
    title,
    message,
    shouldIconPulse: false,
    icon: Icon(icon, color: Colors.white),
    backgroundColor: backgroundColor,
    duration: Duration(seconds: 5),
    dismissDirection: SnackDismissDirection.HORIZONTAL,
    colorText: Colors.white,
    margin: EdgeInsets.all(10),
  );
}
