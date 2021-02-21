import 'package:flutter/material.dart';
import 'package:get/get.dart';

class BouncingLayout extends StatelessWidget {
  BouncingLayout({
    Key key,
    @required this.child,
  }) : super(key: key);

  final Widget child;
  @override
  Widget build(BuildContext context) {
    return new GestureDetector(
      onTap: () {
        FocusScope.of(context).requestFocus(new FocusNode());
      },
      child: SingleChildScrollView(
        physics: const BouncingScrollPhysics(
          parent: AlwaysScrollableScrollPhysics(),
        ),
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
      ),
    );
  }
}
