import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

void confirm({
  Function onConfirm,
  String title = 'Konfirmasi',
  String message,
  Color confirmButtonColor = ThemeColors.DANGER,
  String confirmButtonText = 'Ya',
  bool showCancelButton = true,
  Widget content,
}) {
  Get.defaultDialog(
    onWillPop: () async => false,
    custom: Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        shape: BoxShape.rectangle,
        color: Colors.white,
        borderRadius: new BorderRadius.all(new Radius.circular(32.0)),
      ),
    ),
    title: title,
    titleStyle: ThemeTextStyle(
      fontWeight: FontWeight.bold,
      fontSize: 18,
      color: ThemeColors.DARK,
    ),
    content: content,
    middleText: message,
    middleTextStyle: ThemeTextStyle(
      fontSize: 14,
      color: ThemeColors.DARK,
    ),
    actions: [
      if (showCancelButton)
        FlatButton(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
          ),
          textColor: ThemeColors.DARK,
          child: Text("Batalkan"),
          onPressed: () {
            Get.back();
          },
        ),
      RaisedButton(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
        color: confirmButtonColor,
        textColor: Colors.white,
        child: Text(confirmButtonText),
        elevation: 0,
        onPressed: onConfirm,
      ),
    ],
    barrierDismissible: false,
  );
}
