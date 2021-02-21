import 'package:flutter/material.dart';
import 'package:get/get.dart';

void showLoading() {
  Get.dialog(
    WillPopScope(
      onWillPop: () async => false,
      child: Center(
        child: Container(
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: new BorderRadius.circular(6),
          ),
          child: CircularProgressIndicator(),
        ),
      ),
    ),
    barrierDismissible: false,
  );
}
