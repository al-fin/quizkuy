import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Layout extends StatelessWidget {
  Layout({
    Key key,
    @required this.child,
  }) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: ConstrainedBox(
        constraints: new BoxConstraints(
          minHeight: Get.height,
          minWidth: Get.width,
        ),
        child: Padding(
          padding: EdgeInsets.all(20),
          child: child,
        ),
      ),
    );
  }
}
